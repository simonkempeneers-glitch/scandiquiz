import { getState, setState } from "./_lib/store.js";
import { ROUNDS, computePoints } from "./_lib/quizdata.js";
import { json } from "./_lib/helpers.js";

export default async (req) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const body = await req.json().catch(() => ({}));
  const { participantId, questionId, choice } = body;

  const state = await getState();

  if (state.phase !== "question") {
    return json({ error: "Er is nu geen vraag open om op te antwoorden." }, 400);
  }

  const participant = state.participants[participantId];
  if (!participant) return json({ error: "Onbekende deelnemer. Doe opnieuw mee." }, 404);

  const currentQid = `${state.roundIndex}-${state.questionIndex}`;
  if (questionId !== currentQid) {
    return json({ error: "Deze vraag is niet meer actief." }, 409);
  }
  if (participant.answers[currentQid]) {
    return json({ error: "Je hebt deze vraag al beantwoord." }, 409);
  }

  const round = ROUNDS[state.roundIndex];
  const question = round.questions[state.questionIndex];
  if (typeof choice !== "number" || choice < 0 || choice >= question.options.length) {
    return json({ error: "Ongeldig antwoord." }, 400);
  }

  const now = Date.now();
  const elapsedMs = state.questionOpenedAt ? Math.max(0, now - state.questionOpenedAt) : 0;
  const correct = choice === question.correctIndex;
  const points = correct ? computePoints(elapsedMs) : 0;

  participant.answers[currentQid] = { choice, elapsedMs, correct, points, answeredAt: now };
  participant.score += points;

  await setState(state);
  return json({ ok: true });
};
