(function () {
  const SS_PW = "scandi_host_pw";
  let password = sessionStorage.getItem(SS_PW) || "";
  let pollTimer = null;
  let acting = false;

  const screens = {
    login: document.getElementById("screen-login"),
    dashboard: document.getElementById("screen-dashboard"),
  };

  function showScreen(name) {
    Object.entries(screens).forEach(([key, el]) => el.classList.toggle("hidden", key !== name));
  }

  // ---------- LOGIN ----------
  const loginForm = document.getElementById("loginForm");
  const pwInput = document.getElementById("pwInput");
  const loginError = document.getElementById("loginError");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loginError.textContent = "";
    const pw = pwInput.value;
    try {
      await apiGet("/host-state", { "x-host-password": pw });
      password = pw;
      sessionStorage.setItem(SS_PW, pw);
      initDashboard();
    } catch (err) {
      loginError.textContent = "Verkeerd wachtwoord.";
    }
  });

  // ---------- SHARE LINK ----------
  function setupShareLink() {
    const link = window.location.origin + "/";
    document.getElementById("shareLink").textContent = link;
    document.getElementById("qrImg").src =
      "https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=" + encodeURIComponent(link);
    document.getElementById("copyLinkBtn").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(link);
        const btn = document.getElementById("copyLinkBtn");
        const original = btn.textContent;
        btn.textContent = "Gekopieerd ✓";
        setTimeout(() => (btn.textContent = original), 1500);
      } catch (e) {
        /* clipboard kan geblokkeerd zijn; link staat al zichtbaar */
      }
    });
  }

  // ---------- ACTIONS ----------
  async function doAction(action, payload) {
    if (acting) return;
    acting = true;
    setControlsDisabled(true);
    try {
      await apiPost("/host-action", { password, action, payload });
      await refresh();
    } catch (err) {
      alert(err.message);
    } finally {
      acting = false;
      setControlsDisabled(false);
    }
  }

  function setControlsDisabled(disabled) {
    document.querySelectorAll("#hostControls button").forEach((b) => (b.disabled = disabled));
  }

  document.getElementById("resetProgressBtn").addEventListener("click", () => {
    if (confirm("Scores en voortgang resetten? Deelnemers blijven ingeschreven.")) doAction("resetProgress");
  });
  document.getElementById("resetAllBtn").addEventListener("click", () => {
    if (confirm("Alles resetten, inclusief alle deelnemers?")) doAction("resetAll");
  });

  // ---------- RENDER ----------
  const phasePill = document.getElementById("phasePill");
  const hostRoundBadge = document.getElementById("hostRoundBadge");
  const hostRoundName = document.getElementById("hostRoundName");
  const hostQuestionCount = document.getElementById("hostQuestionCount");
  const hostLobbyView = document.getElementById("hostLobbyView");
  const hostQuestionView = document.getElementById("hostQuestionView");
  const hostLeaderboardView = document.getElementById("hostLeaderboardView");
  const hostEndedView = document.getElementById("hostEndedView");
  const hostControls = document.getElementById("hostControls");

  const PHASE_LABELS = {
    lobby: "Wachtruimte",
    question: "Vraag actief",
    reveal: "Antwoord onthuld",
    leaderboard: "Tussenstand",
    ended: "Afgelopen",
  };

  function render(data) {
    phasePill.textContent = PHASE_LABELS[data.phase] || data.phase;

    hostRoundBadge.className = "round-badge" + (data.roundAccent ? " accent-" + data.roundAccent : "");
    hostRoundBadge.querySelector(".emoji").textContent = data.roundEmoji || "🌌";
    hostRoundName.textContent = data.roundName || "Wachtruimte";
    hostQuestionCount.textContent =
      data.phase === "question" || data.phase === "reveal"
        ? `Vraag ${data.questionIndex + 1} / ${data.totalInRound}`
        : "";

    hostLobbyView.classList.add("hidden");
    hostQuestionView.classList.add("hidden");
    hostLeaderboardView.classList.add("hidden");
    hostEndedView.classList.add("hidden");

    if (data.phase === "lobby") {
      hostLobbyView.classList.remove("hidden");
      document.getElementById("lobbyParticipantCount").textContent = `${data.totalParticipants} deelnemer(s) ingeschreven`;
    } else if (data.phase === "question" || data.phase === "reveal") {
      hostQuestionView.classList.remove("hidden");
      renderHostQuestion(data);
    } else if (data.phase === "leaderboard") {
      hostLeaderboardView.classList.remove("hidden");
      renderLeaderboardList(document.getElementById("hostLeaderboardList"), data.participants);
    } else if (data.phase === "ended") {
      hostEndedView.classList.remove("hidden");
      renderLeaderboardList(document.getElementById("hostFinalLeaderboardList"), data.participants);
    }

    renderParticipants(data.participants);
    document.getElementById("participantTotal").textContent = data.totalParticipants;
    renderControls(data);
  }

  function renderHostQuestion(data) {
    document.getElementById("hostQuestionText").textContent = data.question.prompt;
    const list = document.getElementById("hostOptionsList");
    list.innerHTML = "";

    data.question.options.forEach((opt, i) => {
      const row = document.createElement("div");
      row.className = "host-option-row" + (data.revealed && i === data.question.correctIndex ? " correct-answer" : "");
      row.innerHTML = `<span class="letter" style="width:24px;height:24px;border-radius:6px;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:.8rem;">${
        OPTION_LETTERS[i] || i + 1
      }</span><span>${opt}</span>${data.revealed && i === data.question.correctIndex ? '<span class="count-badge">Correct ✓</span>' : ""}`;
      list.appendChild(row);
    });

    if (data.revealed) {
      const fact = document.createElement("p");
      fact.className = "fun-fact";
      fact.style.marginTop = "1rem";
      fact.innerHTML = `<strong>Bon à savoir —</strong> ${data.question.funFact}`;
      list.appendChild(fact);
    }

    document.getElementById("hostAnsweredCount").textContent = `${data.answeredCount} / ${data.totalParticipants} deelnemers hebben geantwoord`;
  }

  function renderControls(data) {
    hostControls.innerHTML = "";
    const addBtn = (label, action, cls, payload) => {
      const btn = document.createElement("button");
      btn.className = "btn " + (cls || "");
      btn.textContent = label;
      btn.addEventListener("click", () => doAction(action, payload));
      hostControls.appendChild(btn);
      return btn;
    };

    if (data.phase === "lobby") {
      addBtn("▶️ Start de quiz", "start", "btn-gold");
    } else if (data.phase === "question") {
      addBtn("👁️ Antwoord onthullen", "reveal", "btn-gold");
    } else if (data.phase === "reveal") {
      const isLastInRound = data.questionIndex + 1 >= data.totalInRound;
      addBtn(isLastInRound ? "🏆 Naar tussenstand" : "➡️ Volgende vraag", "next", "btn-gold");
    } else if (data.phase === "leaderboard") {
      const isLastRound = data.roundIndex + 1 >= data.totalRounds;
      addBtn(isLastRound ? "🎊 Quiz afronden" : "➡️ Volgende ronde", "next", "btn-gold");
    } else if (data.phase === "ended") {
      addBtn("🔁 Nieuwe ronde spelen (zelfde spelers)", "resetProgress", "btn-secondary");
    }
  }

  function renderParticipants(participants) {
    const el = document.getElementById("participantsList");
    el.innerHTML = "";
    if (!participants.length) {
      el.innerHTML = '<p class="small-note">Nog niemand ingeschreven.</p>';
      return;
    }
    participants.forEach((p) => {
      const row = document.createElement("div");
      row.className = "participant-row";
      row.innerHTML = `
        <span class="status-dot ${p.hasAnsweredCurrent ? "answered" : ""}"></span>
        <span class="p-name">${escapeHtml(p.name)}</span>
        <span class="p-score">${p.score} pt</span>
        <button class="kick-btn" title="Verwijder deelnemer">✕</button>`;
      row.querySelector(".kick-btn").addEventListener("click", () => {
        if (confirm(`${p.name} verwijderen uit de quiz?`)) doAction("kick", { participantId: p.id });
      });
      el.appendChild(row);
    });
  }

  function renderLeaderboardList(el, participants) {
    el.innerHTML = "";
    const sorted = [...participants].sort((a, b) => b.score - a.score);
    const maxScore = Math.max(1, ...sorted.map((p) => p.score));
    const medals = ["🥇", "🥈", "🥉"];
    sorted.forEach((p, i) => {
      const pct = Math.max(4, Math.round((p.score / maxScore) * 100));
      const row = document.createElement("div");
      row.className = "leaderboard-row";
      row.innerHTML = `
        <span class="fill" style="width:${pct}%"></span>
        <span class="rank">${medals[i] || i + 1}</span>
        <span class="name">${escapeHtml(p.name)}</span>
        <span class="points">${p.score}</span>`;
      el.appendChild(row);
    });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // ---------- POLLING ----------
  async function refresh() {
    try {
      const data = await apiGet("/host-state", { "x-host-password": password });
      render(data);
    } catch (err) {
      if (err.status === 401) {
        sessionStorage.removeItem(SS_PW);
        stopPolling();
        showScreen("login");
      }
    }
  }

  function stopPolling() {
    if (pollTimer) clearInterval(pollTimer);
    pollTimer = null;
  }

  function initDashboard() {
    showScreen("dashboard");
    setupShareLink();
    refresh();
    stopPolling();
    pollTimer = setInterval(refresh, 1500);
  }

  // ---------- INIT ----------
  if (password) {
    initDashboard();
  } else {
    showScreen("login");
  }
})();
