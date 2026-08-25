/**
 * LCTK Quiz — OOP core (static / GitHub Pages)
 * Storage: JSON in localStorage (+ export/import file)
 */
(function (global) {
  'use strict';

  const STORAGE_KEY = 'lctk_quiz_v2';

  class JsonStore {
    constructor(key = STORAGE_KEY) {
      this.key = key;
      this.data = this._load();
    }

    _default() {
      return {
        version: 2,
        users: [],
        sessionUserId: null,
        attempts: [],
        answers: [],
      };
    }

    _load() {
      try {
        const raw = localStorage.getItem(this.key);
        if (!raw) return this._default();
        const parsed = JSON.parse(raw);
        return { ...this._default(), ...parsed };
      } catch {
        return this._default();
      }
    }

    save() {
      localStorage.setItem(this.key, JSON.stringify(this.data));
    }

    exportJson() {
      return JSON.stringify(this.data, null, 2);
    }

    importJson(text) {
      const parsed = JSON.parse(text);
      if (!parsed || typeof parsed !== 'object') throw new Error('File JSON tidak valid.');
      this.data = { ...this._default(), ...parsed };
      this.save();
    }

    clearAll() {
      this.data = this._default();
      this.save();
    }
  }

  class CryptoUtil {
    static async sha256(text) {
      const buf = new TextEncoder().encode(text);
      const hash = await crypto.subtle.digest('SHA-256', buf);
      return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('');
    }

    static randomSalt() {
      const a = new Uint8Array(16);
      crypto.getRandomValues(a);
      return [...a].map((b) => b.toString(16).padStart(2, '0')).join('');
    }
  }

  class User {
    constructor({ id, username, passwordHash, salt, createdAt }) {
      this.id = id;
      this.username = username;
      this.passwordHash = passwordHash;
      this.salt = salt;
      this.createdAt = createdAt;
    }

    toPublic() {
      return { id: this.id, username: this.username, createdAt: this.createdAt };
    }
  }

  class AuthService {
    constructor(store) {
      this.store = store;
    }

    currentUser() {
      const id = this.store.data.sessionUserId;
      if (!id) return null;
      const row = this.store.data.users.find((u) => u.id === id);
      return row ? new User(row) : null;
    }

    async register(username, password) {
      username = String(username || '').trim();
      password = String(password || '');
      if (!/^[A-Za-z0-9_]{3,24}$/.test(username)) {
        throw new Error('Username 3–24 karakter (huruf, angka, underscore).');
      }
      if (password.length < 6) throw new Error('Password minimal 6 karakter.');
      const exists = this.store.data.users.some(
        (u) => u.username.toLowerCase() === username.toLowerCase()
      );
      if (exists) throw new Error('Username sudah dipakai di perangkat ini.');

      const salt = CryptoUtil.randomSalt();
      const passwordHash = await CryptoUtil.sha256(salt + password);
      const user = {
        id: 'u_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
        username,
        passwordHash,
        salt,
        createdAt: new Date().toISOString(),
      };
      this.store.data.users.push(user);
      this.store.data.sessionUserId = user.id;
      this.store.save();
      return new User(user);
    }

    async login(username, password) {
      username = String(username || '').trim();
      password = String(password || '');
      const row = this.store.data.users.find(
        (u) => u.username.toLowerCase() === username.toLowerCase()
      );
      if (!row) throw new Error('Username atau password salah.');
      const hash = await CryptoUtil.sha256(row.salt + password);
      if (hash !== row.passwordHash) throw new Error('Username atau password salah.');
      this.store.data.sessionUserId = row.id;
      this.store.save();
      return new User(row);
    }

    logout() {
      this.store.data.sessionUserId = null;
      this.store.save();
    }
  }

  class QuestionBank {
    constructor(payload) {
      this.categories = payload.categories || [];
      this.questions = payload.questions || [];
      this._byId = Object.fromEntries(this.questions.map((q) => [q.id, q]));
    }

    static async load(url = 'data/questions.json') {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Gagal memuat bank soal.');
      return new QuestionBank(await res.json());
    }

    byId(id) {
      return this._byId[id] || null;
    }

    byCategory(categoryId) {
      return this.questions.filter((q) => q.category === categoryId);
    }

    categoryMeta(id) {
      return this.categories.find((c) => c.id === id) || null;
    }

    label(categoryId) {
      if (categoryId === 'all') return 'Semua kategori';
      return this.categoryMeta(categoryId)?.title || categoryId;
    }
  }

  class QuizEngine {
    static shuffle(arr) {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    /** Shuffle options; return { options, answer } with remapped index */
    static shuffleOptions(question) {
      const indexed = question.options.map((text, i) => ({ text, i }));
      const shuffled = QuizEngine.shuffle(indexed);
      return {
        options: shuffled.map((x) => x.text),
        answer: shuffled.findIndex((x) => x.i === question.answer),
      };
    }

    static prepareAttemptQuestions(questions) {
      const order = QuizEngine.shuffle(questions);
      return order.map((q) => {
        const sh = QuizEngine.shuffleOptions(q);
        return {
          id: q.id,
          category: q.category,
          question: q.question,
          explanation: q.explanation,
          image: q.image || null,
          options: sh.options,
          answer: sh.answer,
        };
      });
    }
  }

  class AttemptService {
    constructor(store, bank) {
      this.store = store;
      this.bank = bank;
    }

    _answersFor(attemptId) {
      return this.store.data.answers.filter((a) => a.attemptId === attemptId);
    }

    hydrate(attempt) {
      const answers = this._answersFor(attempt.id);
      const answeredCount = answers.length;
      const total = attempt.totalQuestions;
      const percentDone = total ? Math.round((answeredCount / total) * 1000) / 10 : 0;
      const avgTimeMs = answeredCount
        ? Math.round(answers.reduce((s, a) => s + (a.timeSpentMs || 0), 0) / answeredCount)
        : 0;
      let durationSeconds = attempt.durationSeconds;
      if (durationSeconds == null) {
        durationSeconds = Math.max(
          0,
          Math.floor((Date.now() - Date.parse(attempt.startedAt)) / 1000)
        );
      }
      return {
        ...attempt,
        answers,
        answeredCount,
        percentDone,
        avgTimeMs,
        durationSeconds,
      };
    }

    getActive(userId) {
      const row = [...this.store.data.attempts]
        .reverse()
        .find((a) => a.userId === userId && a.status === 'in_progress');
      return row ? this.hydrate(row) : null;
    }

    start(userId, categoryId, { forceNew = false } = {}) {
      if (!forceNew) {
        const active = this.getActive(userId);
        if (active && active.categoryId === categoryId) return active;
        if (active) this._abandon(active.id);
      } else {
        const active = this.getActive(userId);
        if (active) this._abandon(active.id);
      }

      const source =
        categoryId === 'all'
          ? this.bank.questions
          : this.bank.byCategory(categoryId);
      if (!source.length) throw new Error('Tidak ada soal di kategori ini.');

      const prepared = QuizEngine.prepareAttemptQuestions(source);
      const attempt = {
        id: 'a_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
        userId,
        categoryId,
        status: 'in_progress',
        score: 0,
        correctCount: 0,
        wrongCount: 0,
        totalQuestions: prepared.length,
        questionOrder: prepared.map((q) => q.id),
        preparedQuestions: prepared,
        startedAt: new Date().toISOString(),
        finishedAt: null,
        durationSeconds: null,
      };
      this.store.data.attempts.push(attempt);
      this.store.save();
      return this.hydrate(attempt);
    }

    _abandon(attemptId) {
      const a = this.store.data.attempts.find((x) => x.id === attemptId);
      if (a && a.status === 'in_progress') {
        a.status = 'abandoned';
        a.finishedAt = new Date().toISOString();
        a.durationSeconds = Math.max(
          0,
          Math.floor((Date.now() - Date.parse(a.startedAt)) / 1000)
        );
        this.store.save();
      }
    }

    getById(attemptId, userId) {
      const row = this.store.data.attempts.find(
        (a) => a.id === attemptId && a.userId === userId
      );
      if (!row) throw new Error('Attempt tidak ditemukan.');
      return this.hydrate(row);
    }

    saveAnswer(userId, attemptId, questionId, selectedOption, timeSpentMs) {
      const attempt = this.store.data.attempts.find(
        (a) => a.id === attemptId && a.userId === userId
      );
      if (!attempt) throw new Error('Attempt tidak ditemukan.');
      if (attempt.status !== 'in_progress') throw new Error('Attempt sudah selesai.');

      const prepared = (attempt.preparedQuestions || []).find((q) => q.id === questionId);
      if (!prepared) throw new Error('Soal tidak valid untuk attempt ini.');

      if (this.store.data.answers.some((a) => a.attemptId === attemptId && a.questionId === questionId)) {
        throw new Error('Soal ini sudah dijawab.');
      }

      const isCorrect = selectedOption === prepared.answer;
      this.store.data.answers.push({
        id: 'ans_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
        attemptId,
        questionId,
        category: prepared.category,
        selectedOption,
        isCorrect,
        timeSpentMs: Math.max(0, timeSpentMs | 0),
        answeredAt: new Date().toISOString(),
      });

      if (isCorrect) {
        attempt.score += 1;
        attempt.correctCount += 1;
      } else {
        attempt.wrongCount += 1;
      }

      const answered = this._answersFor(attemptId).length;
      if (answered >= attempt.totalQuestions) {
        attempt.status = 'completed';
        attempt.finishedAt = new Date().toISOString();
        attempt.durationSeconds = Math.max(
          0,
          Math.floor((Date.now() - Date.parse(attempt.startedAt)) / 1000)
        );
      }

      this.store.save();
      const hydrated = this.hydrate(attempt);
      return {
        isCorrect,
        correctAnswer: prepared.answer,
        explanation: prepared.explanation,
        attempt: hydrated,
        question: prepared,
      };
    }

    listForUser(userId, limit = 30) {
      return this.store.data.attempts
        .filter((a) => a.userId === userId)
        .slice()
        .reverse()
        .slice(0, limit)
        .map((a) => this.hydrate(a));
    }
  }

  class ProfileAnalyzer {
    constructor(store, bank, attempts) {
      this.store = store;
      this.bank = bank;
      this.attempts = attempts;
    }

    advice(category, accuracy) {
      const label = this.bank.label(category);
      if (accuracy < 40) return `Prioritas tinggi: hafalkan dasar ${label} dari awal.`;
      if (accuracy < 60) return `Perlu drill ulang ${label}: fokus soal yang sering salah.`;
      return `Tingkatkan ${label}: buat catatan singkat dari yang salah.`;
    }

    build(userId) {
      const completed = this.attempts
        .listForUser(userId, 50)
        .filter((a) => a.status === 'completed');

      let totalCorrect = 0;
      let totalWrong = 0;
      let durationSum = 0;
      let timeSum = 0;
      let timeCount = 0;
      let best = 0;
      const catMap = {};

      completed.forEach((a) => {
        totalCorrect += a.correctCount;
        totalWrong += a.wrongCount;
        durationSum += a.durationSeconds || 0;
        const acc = a.totalQuestions ? (a.correctCount / a.totalQuestions) * 100 : 0;
        if (acc > best) best = acc;
        a.answers.forEach((ans) => {
          timeSum += ans.timeSpentMs || 0;
          timeCount++;
          if (!catMap[ans.category]) catMap[ans.category] = { correct: 0, wrong: 0, total: 0 };
          catMap[ans.category].total++;
          if (ans.isCorrect) catMap[ans.category].correct++;
          else catMap[ans.category].wrong++;
        });
      });

      const categories = Object.entries(catMap)
        .map(([category, s]) => ({
          category,
          label: this.bank.label(category),
          total: s.total,
          correct: s.correct,
          wrong: s.wrong,
          accuracy: s.total ? Math.round((s.correct / s.total) * 1000) / 10 : 0,
        }))
        .sort((a, b) => a.accuracy - b.accuracy);

      const improve = categories
        .filter((c) => c.accuracy < 75)
        .map((c) => ({
          ...c,
          advice: this.advice(c.category, c.accuracy),
        }));

      const missMap = {};
      completed.forEach((a) => {
        a.answers
          .filter((x) => !x.isCorrect)
          .forEach((ans) => {
            missMap[ans.questionId] = (missMap[ans.questionId] || 0) + 1;
          });
      });

      const memorize = Object.entries(missMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 30)
        .map(([qid, missCount]) => {
          const q = this.bank.byId(qid);
          if (!q) return null;
          return {
            questionId: qid,
            question: q.question,
            correctOption: q.options[q.answer],
            explanation: q.explanation,
            category: q.category,
            label: this.bank.label(q.category),
            missCount,
            image: q.image || null,
          };
        })
        .filter(Boolean);

      const attemptInsights = completed.slice(0, 5).map((a) => this._analyzeAttempt(a));

      const avgAccuracy =
        completed.length === 0
          ? 0
          : Math.round(
              (completed.reduce(
                (s, a) => s + (a.totalQuestions ? (a.correctCount / a.totalQuestions) * 100 : 0),
                0
              ) /
                completed.length) *
                10
            ) / 10;

      return {
        overall: {
          completedAttempts: completed.length,
          avgAccuracy,
          bestAccuracy: Math.round(best * 10) / 10,
          totalCorrect,
          totalWrong,
          avgDurationSeconds: completed.length ? Math.round(durationSum / completed.length) : 0,
          avgTimePerQuestionMs: timeCount ? Math.round(timeSum / timeCount) : 0,
        },
        categories,
        improve,
        memorize,
        recentAttempts: completed.slice(0, 10),
        attemptInsights,
      };
    }

    _analyzeAttempt(attempt) {
      const byCat = {};
      attempt.answers.forEach((ans) => {
        if (!byCat[ans.category]) byCat[ans.category] = { correct: 0, wrong: 0, total: 0 };
        byCat[ans.category].total++;
        if (ans.isCorrect) byCat[ans.category].correct++;
        else byCat[ans.category].wrong++;
      });

      const improve = Object.entries(byCat)
        .map(([category, s]) => {
          const accuracy = s.total ? Math.round((s.correct / s.total) * 1000) / 10 : 0;
          return {
            category,
            label: this.bank.label(category),
            accuracy,
            wrong: s.wrong,
            total: s.total,
            advice: this.advice(category, accuracy),
          };
        })
        .filter((x) => x.accuracy < 70)
        .sort((a, b) => a.accuracy - b.accuracy);

      const preparedMap = Object.fromEntries(
        (attempt.preparedQuestions || []).map((q) => [q.id, q])
      );

      const memorize = attempt.answers
        .filter((a) => !a.isCorrect)
        .map((a) => {
          const pq = preparedMap[a.questionId] || this.bank.byId(a.questionId);
          if (!pq) return null;
          return {
            questionId: a.questionId,
            question: pq.question,
            correctOption: pq.options[pq.answer],
            yourOption: pq.options[a.selectedOption],
            explanation: pq.explanation,
            category: pq.category,
            label: this.bank.label(pq.category),
            image: pq.image || null,
          };
        })
        .filter(Boolean);

      const accuracy = attempt.totalQuestions
        ? Math.round((attempt.correctCount / attempt.totalQuestions) * 1000) / 10
        : 0;

      return {
        attemptId: attempt.id,
        categoryId: attempt.categoryId,
        accuracy,
        score: attempt.score,
        correctCount: attempt.correctCount,
        wrongCount: attempt.wrongCount,
        durationSeconds: attempt.durationSeconds,
        avgTimeMs: attempt.avgTimeMs,
        finishedAt: attempt.finishedAt,
        improve,
        memorize,
      };
    }
  }

  class AppContext {
    constructor(store, bank, auth, attempts, profile) {
      this.store = store;
      this.bank = bank;
      this.auth = auth;
      this.attempts = attempts;
      this.profile = profile;
    }

    static async create() {
      const store = new JsonStore();
      const bank = await QuestionBank.load();
      const auth = new AuthService(store);
      const attempts = new AttemptService(store, bank);
      const profile = new ProfileAnalyzer(store, bank, attempts);
      return new AppContext(store, bank, auth, attempts, profile);
    }
  }

  global.LCTK = {
    JsonStore,
    AuthService,
    QuestionBank,
    QuizEngine,
    AttemptService,
    ProfileAnalyzer,
    AppContext,
    STORAGE_KEY,
  };
})(window);
