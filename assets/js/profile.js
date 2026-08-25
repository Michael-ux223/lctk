(() => {
  const root = document.getElementById('profile-root');

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function fmtSec(sec) {
    sec = Math.max(0, Math.floor(sec || 0));
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  }

  function fmtMs(ms) {
    if (!ms) return '—';
    return ms < 1000 ? `${ms} ms` : `${(ms / 1000).toFixed(1)} dtk`;
  }

  function meter(pct) {
    return `<div class="meter"><i style="width:${Math.max(0, Math.min(100, pct))}%"></i></div>`;
  }

  (async () => {
    const ctx = await LCTK.AppContext.create();
    const user = ctx.auth.currentUser();
    if (!user) { location.href = 'login.html'; return; }

    document.getElementById('who').textContent = '@' + user.username;
    document.getElementById('title').textContent = '@' + user.username;
    document.getElementById('logout-btn').addEventListener('click', () => {
      ctx.auth.logout();
      location.href = 'login.html';
    });

    const p = ctx.profile.build(user.id);
    const o = p.overall;

    root.innerHTML = `
      <div class="profile-grid">
        <div class="stat"><b>${o.avgAccuracy}%</b><span>Avg Accuracy</span></div>
        <div class="stat"><b>${o.bestAccuracy}%</b><span>Best</span></div>
        <div class="stat"><b>${o.completedAttempts}</b><span>Attempt</span></div>
        <div class="stat"><b>${fmtSec(o.avgDurationSeconds)}</b><span>Avg waktu</span></div>
      </div>
      <p class="muted">Benar ${o.totalCorrect} · salah ${o.totalWrong} · avg/soal ${fmtMs(o.avgTimePerQuestionMs)}</p>

      <h2 class="section-title">Akurasi per tipe</h2>
      ${(p.categories || []).length ? p.categories.map((c) => `
        <div class="chip"><h3>${esc(c.label)} — ${c.accuracy}%</h3>
        <p>${c.correct} benar / ${c.wrong} salah (${c.total})</p>${meter(c.accuracy)}</div>`).join('')
        : '<div class="chip"><p>Belum ada attempt selesai.</p></div>'}

      <h2 class="section-title">Perlu ditingkatkan</h2>
      ${(p.improve || []).length ? p.improve.map((i) => `
        <div class="chip"><h3>${esc(i.label)} (${i.accuracy}%)</h3><p>${esc(i.advice)}</p></div>`).join('')
        : '<div class="chip"><p>Belum ada topik lemah terdeteksi.</p></div>'}

      <h2 class="section-title">Perlu dihafal (sering salah)</h2>
      <div class="chip">
        ${(p.memorize || []).length ? p.memorize.map((m) => `
          <div class="memo-item">
            ${m.image ? `<img class="q-image" src="${esc(m.image)}" alt="">` : ''}
            <b>${esc(m.question)}</b>
            <div class="tiny">${esc(m.label)} · salah ${m.missCount}x</div>
            <div><b>Hafalkan:</b> ${esc(m.correctOption)}</div>
            <div class="tiny">${esc(m.explanation)}</div>
          </div>`).join('') : '<p class="muted" style="margin:0">Belum ada.</p>'}
      </div>

      <h2 class="section-title">Insight per attempt</h2>
      ${(p.attemptInsights || []).length ? p.attemptInsights.map((a) => `
        <div class="attempt-block">
          <h3>${esc(ctx.bank.label(a.categoryId) || a.categoryId || 'Attempt')} — ${a.accuracy}%</h3>
          <p class="tiny">Waktu ${fmtSec(a.durationSeconds)} · avg ${fmtMs(a.avgTimeMs)} · ${a.correctCount} benar / ${a.wrongCount} salah</p>
          <b>Tingkatkan:</b>
          ${(a.improve || []).length ? a.improve.map((i) => `
            <div class="chip"><h3>${esc(i.label)} (${i.accuracy}%)</h3><p>${esc(i.advice)}</p></div>`).join('')
            : '<p class="muted">Tidak ada topik &lt; 70%.</p>'}
          <b>Hafalkan dari yang salah:</b>
          ${(a.memorize || []).slice(0, 10).map((m) => `
            <div class="memo-item">
              <b>${esc(m.question)}</b>
              <div class="tiny">Jawabanmu: ${esc(m.yourOption || '')}</div>
              <div><b>Benar:</b> ${esc(m.correctOption)}</div>
              <div class="tiny">${esc(m.explanation)}</div>
            </div>`).join('') || '<p class="muted">Perfect.</p>'}
        </div>`).join('') : '<div class="chip"><p>Belum ada attempt selesai.</p></div>'}
    `;
  })();
})();
