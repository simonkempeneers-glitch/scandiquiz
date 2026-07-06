import { getState } from "./_lib/store.js";
import { ROUNDS } from "./_lib/quizdata.js";
import { json } from "./_lib/helpers.js";

export default async (req) => {
  const url = new URL(req.url);
  const participantId = url.searchParams.get("participantId") || null;

  const state = await getState();
  const round = ROUNDS[state.roundIndex] || null;
  const question = round ? round.questions[state.questionIndex] : null;
  const qid = question ? `${state.roundIndex}-${state.questionIndex}` : null;

  const payload = {
    phase: state.phase,
    roundIndex: state.roundIndex,
    roundName: round ? round.name : null,
    roundEmoji: round ? round.emoji : null,
    roundAccent: round ? round.accent : null,
    totalRounds: ROUNDS.length,
    revealed: state.revealed,
    participantCount: Object.keys(state.participants).length,
    question: question
      ? {
          id: qid,
          index: state.questionIndex,
          totalInRound: round.questions.length,
          prompt: question.prompt,
          options: question.options,
        }
      : null,
  };

  if (participantId && state.participants[participantId]) {
    const me = state.participants[participantId];
    payload.you = { name: me.name, score: me.score };
    payload.yourAnswer = qid ? me.answers[qid] || null : null;
  } else if (participantId) {
    payload.unknownParticipant = true;
  }

  if (state.phase === "reveal" && question) {
    const counts = new Array(question.options.length).fill(0);
    Object.values(state.participants).forEach((p) => {
      const a = p.answers[qid];
      if (a) counts[a.choice] = (counts[a.choice] || 0) + 1;
    });
    payload.correctIndex = question.correctIndex;
    payload.funFact = question.funFact;
    payload.answerCounts = counts;
  }

  if (state.phase === "leaderboard" || state.phase === "ended") {
    payload.leaderboard = Object.entries(state.participants)
      .map(([id, p]) => ({ id, name: p.name, score: p.score }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 25);
  }

  return json(payload);
};
