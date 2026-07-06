import { getState, setState, defaultState } from "./_lib/store.js";
import { ROUNDS, sanitizeForHost } from "./_lib/quizdata.js";
import { json, checkHostPassword } from "./_lib/helpers.js";

export default async (req) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const body = await req.json().catch(() => ({}));
  const { password, action, payload } = body;

  if (!checkHostPassword(password)) {
    return json({ error: "Mot de passe quizmaster incorrect." }, 401);
  }

  let state = await getState();

  switch (action) {
    case "start": {
      state.roundIndex = 0;
      state.questionIndex = 0;
      state.phase = "question";
      state.questionOpenedAt = Date.now();
      state.revealed = false;
      break;
    }
    case "reveal": {
      if (state.phase === "question") {
        state.phase = "reveal";
        state.revealed = true;
      }
      break;
    }
    case "next": {
      const round = ROUNDS[state.roundIndex];
      if (state.phase === "reveal") {
        if (round && state.questionIndex + 1 < round.questions.length) {
          state.questionIndex += 1;
          state.phase = "question";
          state.questionOpenedAt = Date.now();
          state.revealed = false;
        } else {
          state.phase = "leaderboard";
        }
      } else if (state.phase === "leaderboard") {
        if (state.roundIndex + 1 < ROUNDS.length) {
          state.roundIndex += 1;
          state.questionIndex = 0;
          state.phase = "question";
          state.questionOpenedAt = Date.now();
          state.revealed = false;
        } else {
          state.phase = "ended";
        }
      }
      break;
    }
    case "showLeaderboard": {
      state.phase = "leaderboard";
      break;
    }
    case "backToReveal": {
      if (state.phase === "leaderboard") {
        state.phase = "reveal";
      }
      break;
    }
    case "endQuiz": {
      state.phase = "ended";
      break;
    }
    case "resetProgress": {
      const participants = state.participants;
      Object.values(participants).forEach((p) => {
        p.score = 0;
        p.answers = {};
      });
      state = defaultState();
      state.participants = participants;
      break;
    }
    case "resetAll": {
      state = defaultState();
      break;
    }
    case "kick": {
      if (payload && payload.participantId) {
        delete state.participants[payload.participantId];
      }
      break;
    }
    default:
      return json({ error: "Action inconnue." }, 400);
  }

  await setState(state);
  return json({ ok: true, state: sanitizeForHost(state) });
};
