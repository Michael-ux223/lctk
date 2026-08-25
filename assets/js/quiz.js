(() => {
  const letters = ['A', 'B', 'C', 'D'];
  const params = new URLSearchParams(location.search);
  const categoryId = params.get('cat') || 'all';

  let ctx = null;
  let attempt = null;
  let index = 0;
  let answered = false;
  let questionStartedAt = 0;
  let timerHandle = null;

  const el = {
    quiz: document.getElementById('quiz'),
    current: document.getElementById('current'),
    score: document.getElementById('score'),
    correct: document.getElementById('correct'),
    wrong: document.getElementById('wrong'),
    pct: document.getElementById('pct-done'),
    timer: document.getElementById('timer'),
    avg: document.getElementById('avg-time'),
    remain: document.getElementById('remain'),
    bar: document.getElementById('bar'),
    progressLabel: document.getElementById('progress-label'),
    catTitle: document.getElementById('cat-title'),
    heading: document.getElementById('heading'),
  };

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function fmtMs(ms) {
    if (ms == null || ms <= 0) return '—';
    return ms < 1000 ? `${ms} ms` : `${(ms / 1000).toFixed(1)} dtk`;
  }

  function fmtSec(sec) {
    sec = Math.max(0, Math.floor(sec || 0));
    return `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;
  }

  function preparedMap() {
    return Object.fromEntries((attempt.preparedQuestions || []).map((q) => [q.id, q]));
  }

  function answeredMap() {
    const map = {};
    (attempt.answers || []).forEach((a) => { map[a.questionId] = a; });
    return map;
  }

  function syncStats() {
    const answeredCount = attempt.answeredCount;
    const pct = attempt.percentDone;
    el.score.textContent = attempt.score;
    el.correct.textContent = attempt.correctCount;
    el.wrong.textContent = attempt.wrongCount;
    el.pct.textContent = `${pct}%`;
    el.bar.style.width = `${pct}%`;
    el.progressLabel.textContent = `${answeredCount} / ${attempt.totalQuestions} dikerjakan`;
    el.avg.textContent = fmtMs(attempt.avgTimeMs);
    el.current.textContent = `${Math.min(index + 1, attempt.totalQuestions)}`;
    el.remain.textContent = String(Math.max(0, attempt.totalQuestions - answeredCount));
  }

  function tickTimer() {
    if (!attempt) return;
    const sec =
      attempt.status === 'completed' && attempt.durationSeconds != null
        ? attempt.durationSeconds
        : Math.max(0, Math.floor((Date.now() - Date.parse(attempt.startedAt)) / 1000));
    el.timer.textContent = fmtSec(sec);
  }

  function findResumeIndex() {
    const map = answeredMap();
    const order = attempt.questionOrder;
    for (let i = 0; i < order.length; i++) {
      if (!map[order[i]]) return i;
    }
    return order.length;
  }

  function render() {
    if (attempt.status === 'completed' || index >= attempt.questionOrder.length) {
      return showResult();
    }
    answered = false;
    const qid = attempt.questionOrder[index];
    const q = preparedMap()[qid];
    const prev = answeredMap()[qid];
    syncStats();
    questionStartedAt = Date.now();
    if (!q) {
      el.quiz.innerHTML = '<div class="loading">Soal tidak ditemukan.</div>';
      return;
    }

    const img = q.image
      ? `<img class="q-image" src="${esc(q.image)}" alt="Ilustrasi soal">`
      : '';

    el.quiz.innerHTML = `
      <div class="qno">SOAL ${index + 1} / ${attempt.totalQuestions}</div>
      ${img}
      <div class="question">${esc(q.question)}</div>
      <div class="options">
        ${q.options.map((o, i) => `
          <button type="button" class="option" data-choice="${i}">
            <span class="letter">${letters[i]}</span>${esc(o)}
          </button>`).join('')}
      </div>
      <div id="feedback" class="feedback"></div>
      <div class="actions">
        <span class="tiny">Autosave JSON · ABCD sudah diacak</span>
        <button type="button" class="btn primary" id="next" disabled>
          ${index === attempt.totalQuestions - 1 ? 'Lihat Hasil' : 'Soal Berikutnya →'}
        </button>
      </div>`;

    document.querySelectorAll('button.option').forEach((btn) => {
      btn.addEventListener('click', () => answer(Number(btn.dataset.choice)));
    });
    document.getElementById('next').addEventListener('click', nextQuestion);

    if (prev) {
      paint(prev.selectedOption, prev.isCorrect, q);
      document.getElementById('next').disabled = false;
      answered = true;
    }
  }

  function paint(choice, ok, q) {
    const buttons = document.querySelectorAll('button.option');
    buttons.forEach((b) => { b.disabled = true; });
    const fb = document.getElementById('feedback');
    if (ok) {
      buttons[choice]?.classList.add('correct');
      fb.className = 'feedback show ok';
      fb.innerHTML = `<strong>✓ BENAR</strong>${esc(q.explanation)}`;
    } else {
      buttons[choice]?.classList.add('wrong');
      buttons[q.answer]?.classList.add('correct');
      fb.className = 'feedback show no';
      fb.innerHTML = `<strong>✕ SALAH</strong>Benar: <b>${letters[q.answer]}. ${esc(q.options[q.answer])}</b><br>${esc(q.explanation)}`;
    }
  }

  function answer(choice) {
    if (answered || !attempt) return;
    answered = true;
    const qid = attempt.questionOrder[index];
    const spent = Math.max(0, Date.now() - questionStartedAt);
    try {
      const result = ctx.attempts.saveAnswer(
        ctx.auth.currentUser().id,
        attempt.id,
        qid,
        choice,
        spent
      );
      attempt = result.attempt;
      paint(choice, result.isCorrect, result.question);
      syncStats();
      document.getElementById('next').disabled = false;
      if (attempt.status === 'completed') setTimeout(showResult, 350);
    } catch (ex) {
      answered = false;
      alert(ex.message);
    }
  }

  function nextQuestion() {
    if (!answered) return;
    index++;
    if (index >= attempt.questionOrder.length || attempt.status === 'completed') showResult();
    else render();
  }

  function showResult() {
    syncStats();
    el.bar.style.width = '100%';
    clearInterval(timerHandle);
    tickTimer();
    const total = attempt.totalQuestions;
    const pct = Math.round((attempt.score / total) * 100);
    const grade = pct >= 90 ? 'Mantap!' : pct >= 75 ? 'Bagus!' : pct >= 60 ? 'Lumayan.' : 'Drill lagi.';
    const map = preparedMap();
    const wrongs = (attempt.answers || []).filter((a) => !a.isCorrect);

    el.quiz.innerHTML = `
      <div class="result">
        <h2>Attempt selesai</h2>
        <div class="score">${attempt.score}/${total}</div>
        <p class="muted">${pct}% · waktu ${fmtSec(attempt.durationSeconds)} · avg ${fmtMs(attempt.avgTimeMs)}</p>
        <h3>${grade}</h3>
        <div class="actions" style="justify-content:center">
          <a class="btn ghost" href="profile.html">Profil & insights</a>
          <button type="button" class="btn primary" id="restart-btn">Attempt baru</button>
        </div>
      </div>
      ${wrongs.length ? `<div><h3>Koreksi (${wrongs.length})</h3>
        ${wrongs.map((r, n) => {
          const q = map[r.questionId];
          if (!q) return '';
          const img = q.image ? `<img class="q-image" src="${esc(q.image)}" alt="">` : '';
          return `<div class="review-item">${img}<b>${n + 1}. ${esc(q.question)}</b>
            <div class="tiny">Jawabanmu: ${letters[r.selectedOption]}. ${esc(q.options[r.selectedOption] || '')}</div>
            <div><b>Benar: ${letters[q.answer]}. ${esc(q.options[q.answer])}</b></div>
            <div class="tiny">${esc(q.explanation)}</div></div>`;
        }).join('')}</div>` : '<div class="review-item">Perfect — tidak ada yang salah.</div>'}`;

    document.getElementById('restart-btn')?.addEventListener('click', () => start(true));
  }

  function start(forceNew) {
    el.quiz.innerHTML = '<div class="loading">Menyiapkan attempt…</div>';
    try {
      attempt = ctx.attempts.start(ctx.auth.currentUser().id, categoryId, { forceNew });
      index = findResumeIndex();
      clearInterval(timerHandle);
      tickTimer();
      timerHandle = setInterval(tickTimer, 1000);
      if (attempt.status === 'completed' || index >= attempt.questionOrder.length) showResult();
      else render();
    } catch (ex) {
      el.quiz.innerHTML = `<div class="loading">${esc(ex.message)}</div>`;
    }
  }

  (async () => {
    ctx = await LCTK.AppContext.create();
    const user = ctx.auth.currentUser();
    if (!user) { location.href = 'login.html'; return; }

    const meta =
      categoryId === 'all'
        ? { title: 'Semua kategori', desc: 'Campuran semua tipe' }
        : ctx.bank.categoryMeta(categoryId) || { title: categoryId, desc: '' };

    el.catTitle.textContent = meta.title;
    el.heading.textContent = meta.title;
    document.getElementById('sub').textContent = meta.desc || 'Soal & ABCD diacak · autosave per soal';

    document.getElementById('logout-btn').addEventListener('click', () => {
      ctx.auth.logout();
      location.href = 'login.html';
    });
    document.getElementById('new-attempt-btn').addEventListener('click', () => {
      if (confirm('Mulai attempt baru di kategori ini?')) start(true);
    });

    start(false);
  })();
})();
