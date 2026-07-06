(function () {
  const LS_ID = "scandi_participant_id";
  const LS_NAME = "scandi_participant_name";

  const screens = {
    join: document.getElementById("screen-join"),
    waiting: document.getElementById("screen-waiting"),
    question: document.getElementById("screen-question"),
    reveal: document.getElementById("screen-reveal"),
    leaderboard: document.getElementById("screen-leaderboard"),
    ended: document.getElementById("screen-ended"),
  };

  const scorePill = document.getElementById("scorePill");
  const scoreValue = document.getElementById("scoreValue");

  let participantId = localStorage.getItem(LS_ID);
  let participantName = localStorage.getItem(LS_NAME);
  let lastQuestionId = null;
  let hasAnsweredCurrent = false;
  let selectedChoice = null;
  let pollTimer = null;
  let submitting = false;

  function showScreen(name) {
    Object.entries(screens).forEach(([key, el]) => {
      el.classList.toggle("hidden", key !== name);
    });
  }

  function setScore(score) {
    if (typeof score === "number") {
      scorePill.classList.remove("hidden");
      scoreValue.textContent = score;
    }
  }

  // ---------- JOIN ----------
  const joinForm = document.getElementById("joinForm");
  const nameInput = document.getElementById("nameInput");
  const joinBtn = document.getElementById("joinBtn");
  const joinError = document.getElementById("joinError");

  joinForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    if (!name) return;
    joinBtn.disabled = true;
    joinError.textContent = "";
    try {
      const res = await apiPost("/join", { name });
      participantId = res.participantId;
      participantName = res.name;
      localStorage.setItem(LS_ID, participantId);
      localStorage.setItem(LS_NAME, participantName);
      document.getElementById("waitingName").textContent = participantName;
      startPolling();
    } catch (err) {
      joinError.textContent = err.message;
    } finally {
      joinBtn.disabled = false;
    }
  });

  // ---------- RENDER: QUESTION ----------
  const questionRoundBadge = document.getElementById("questionRoundBadge");
  const questionRoundName = document.getElementById("questionRoundName");
  const progressLine = document.getElementById("progressLine");
  const questionText = document.getElementById("questionText");
  const optionsGrid = document.getElementById("optionsGrid");
  const answeredNote = document.getElementById("answeredNote");

  function renderRoundBadge(badgeEl, nameEl, emoji, name, accent) {
    badgeEl.className = "round-badge accent-" + accent;
    badgeEl.querySelector(".emoji").textContent = emoji;
    nameEl.textContent = name;
  }

  function renderProgress(total, currentIndex) {
    progressLine.innerHTML = "";
    for (let i = 0; i < total; i++) {
      const dot = document.createElement("div");
      dot.className = "progress-dot";
      if (i < currentIndex) dot.classList.add("done");
      if (i === currentIndex) dot.classList.add("current");
      progressLine.appendChild(dot);
    }
  }

  function renderQuestion(data) {
    renderRoundBadge(questionRoundBadge, questionRoundName, data.roundEmoji, data.roundName, data.roundAccent);
    renderProgress(data.question.totalInRound, data.question.index);
    questionText.textContent = data.question.prompt;

    const alreadyAnswered = !!data.yourAnswer;
    optionsGrid.innerHTML = "";
    optionsGrid.classList.toggle("two", data.question.options.length === 2);

    data.question.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.disabled = alreadyAnswered || submitting;
      if (alreadyAnswered && data.yourAnswer.choice === i) btn.classList.add("selected");
      btn.innerHTML = `<span class="letter">${OPTION_LETTERS[i] || i + 1}</span><span class="label">${opt}</span>`;
      btn.addEventListener("click", () => submitAnswer(data.question.id, i));
      optionsGrid.appendChild(btn);
    });

    answeredNote.classList.toggle("hidden", !alreadyAnswered);
    showScreen("question");
  }

  async function submitAnswer(questionId, choice) {
    if (submitting || hasAnsweredCurrent) return;
    submitting = true;
    selectedChoice = choice;
    Array.from(optionsGrid.children).forEach((btn, i) => {
      btn.disabled = true;
      if (i === choice) btn.classList.add("selected");
    });
    try {
      await apiPost("/answer", { participantId, questionId, choice });
      hasAnsweredCurrent = true;
      answeredNote.classList.remove("hidden");
    } catch (err) {
      // Vraag kan intussen gesloten zijn; volgende poll corrigeert de UI.
      console.warn(err.message);
    } finally {
      submitting = false;
    }
  }

  // ---------- RENDER: REVEAL ----------
  const revealRoundBadge = document.getElementById("revealRoundBadge");
  const revealRoundName = document.getElementById("revealRoundName");
  const revealQuestionText = document.getElementById("revealQuestionText");
  const revealOptionsGrid = document.getElementById("revealOptionsGrid");
  const resultBanner = document.getElementById("resultBanner");
  const funFactText = document.getElementById("funFactText");

  function renderReveal(data) {
    renderRoundBadge(revealRoundBadge, revealRoundName, data.roundEmoji, data.roundName, data.roundAccent);
    revealQuestionText.textContent = data.question.prompt;
    funFactText.textContent = data.funFact || "";

    const totalVotes = (data.answerCounts || []).reduce((a, b) => a + b, 0) || 1;
    revealOptionsGrid.innerHTML = "";
    revealOptionsGrid.classList.toggle("two", data.question.options.length === 2);

    data.question.options.forEach((opt, i) => {
      const count = (data.answerCounts && data.answerCounts[i]) || 0;
      const pct = Math.round((count / totalVotes) * 100);
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.disabled = true;
      if (i === data.correctIndex) btn.classList.add("correct");
      else if (data.yourAnswer && data.yourAnswer.choice === i) btn.classList.add("incorrect");
      btn.innerHTML = `
        <span class="bar" style="width:${pct}%"></span>
        <span class="letter">${OPTION_LETTERS[i] || i + 1}</span>
        <span class="label">${opt}</span>
        <span class="count">${count}</span>`;
      revealOptionsGrid.appendChild(btn);
    });

    if (data.yourAnswer) {
      resultBanner.classList.remove("hidden");
      if (data.yourAnswer.correct) {
        resultBanner.className = "result-banner good";
        resultBanner.textContent = `✅ Goed! +${data.yourAnswer.points} punten`;
      } else {
        resultBanner.className = "result-banner bad";
        resultBanner.textContent = `❌ Helaas, dat was niet juist.`;
      }
    } else {
      resultBanner.classList.remove("hidden");
      resultBanner.className = "result-banner bad";
      resultBanner.textContent = `⏱️ Je hebt niet op tijd geantwoord.`;
    }

    showScreen("reveal");
  }

  // ---------- RENDER: LEADERBOARD ----------
  function renderLeaderboardInto(el, leaderboard) {
    el.innerHTML = "";
    const maxScore = Math.max(1, ...leaderboard.map((p) => p.score));
    const medals = ["🥇", "🥈", "🥉"];
    leaderboard.forEach((p, i) => {
      const row = document.createElement("div");
      row.className = "leaderboard-row" + (p.id === participantId ? " me" : "");
      const pct = Math.max(4, Math.round((p.score / maxScore) * 100));
      row.innerHTML = `
        <span class="fill" style="width:${pct}%"></span>
        <span class="rank">${medals[i] || i + 1}</span>
        <span class="name">${escapeHtml(p.name)}</span>
        <span class="points">${p.score}</span>`;
      el.appendChild(row);
    });
  }

  function renderLeaderboard(data) {
    document.getElementById("leaderboardSubtitle").textContent = `Na ronde: ${data.roundName || ""}`;
    renderLeaderboardInto(document.getElementById("leaderboardList"), data.leaderboard || []);
    showScreen("leaderboard");
  }

  function renderEnded(data) {
    renderLeaderboardInto(document.getElementById("finalLeaderboardList"), data.leaderboard || []);
    const list = data.leaderboard || [];
    const winner = list[0];
    document.getElementById("endedSubtitle").textContent = winner
      ? `🏆 ${winner.name} wint de quiz met ${winner.score} punten!`
      : "Bedankt voor het meespelen.";
    showScreen("ended");
    maybeConfetti();
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  let confettiShown = false;
  function maybeConfetti() {
    if (confettiShown) return;
    confettiShown = true;
    const colors = ["#52e3c2", "#8c6fe6", "#ff6fb1", "#f4c05a", "#37b6c9"];
    const wrap = document.createElement("div");
    wrap.className = "confetti";
    for (let i = 0; i < 60; i++) {
      const piece = document.createElement("span");
      piece.style.left = Math.random() * 100 + "%";
      piece.style.background = colors[i % colors.length];
      piece.style.animationDuration = 2.5 + Math.random() * 2.5 + "s";
      piece.style.animationDelay = Math.random() * 1.5 + "s";
      wrap.appendChild(piece);
    }
    document.body.appendChild(wrap);
    setTimeout(() => wrap.remove(), 6000);
  }

  // ---------- POLLING ----------
  async function poll() {
    try {
      const url = `/state?participantId=${encodeURIComponent(participantId)}`;
      const data = await apiGet(url);

      if (data.unknownParticipant) {
        // Server werd gereset: terug naar join-scherm.
        localStorage.removeItem(LS_ID);
        localStorage.removeItem(LS_NAME);
        stopPolling();
        scorePill.classList.add("hidden");
        showScreen("join");
        return;
      }

      if (data.you) setScore(data.you.score);

      const currentQid = data.question ? data.question.id : null;
      if (currentQid !== lastQuestionId) {
        lastQuestionId = currentQid;
        hasAnsweredCurrent = !!data.yourAnswer;
        selectedChoice = data.yourAnswer ? data.yourAnswer.choice : null;
      }

      switch (data.phase) {
        case "lobby":
          document.getElementById("waitingCount").textContent = data.participantCount;
          showScreen("waiting");
          break;
        case "question":
          hasAnsweredCurrent = !!data.yourAnswer;
          renderQuestion(data);
          break;
        case "reveal":
          renderReveal(data);
          break;
        case "leaderboard":
          renderLeaderboard(data);
          break;
        case "ended":
          renderEnded(data);
          break;
      }
    } catch (err) {
      console.warn("poll error", err.message);
    }
  }

  function startPolling() {
    document.getElementById("waitingName").textContent = participantName || "deelnemer";
    poll();
    if (pollTimer) clearInterval(pollTimer);
    pollTimer = setInterval(poll, 1500);
  }

  function stopPolling() {
    if (pollTimer) clearInterval(pollTimer);
    pollTimer = null;
  }

  // ---------- INIT ----------
  if (participantId && participantName) {
    startPolling();
  } else {
    showScreen("join");
  }
})();
