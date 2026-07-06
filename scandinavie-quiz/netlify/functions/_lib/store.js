import { getStore } from "@netlify/blobs";

const STORE_NAME = "scandinavie-quiz-state";
const KEY = "state";

export function defaultState() {
  return {
    phase: "lobby", // lobby | question | reveal | leaderboard | ended
    roundIndex: 0,
    questionIndex: 0,
    questionOpenedAt: null,
    revealed: false,
    participants: {}, // id -> { name, score, joinedAt, answers: { [qid]: {choice, elapsedMs, correct, points, answeredAt} } }
    createdAt: Date.now(),
  };
}

export async function getState() {
  const store = getStore({ name: STORE_NAME, consistency: "strong" });
  const state = await store.get(KEY, { type: "json" });
  if (!state) {
    const fresh = defaultState();
    await store.setJSON(KEY, fresh);
    return fresh;
  }
  return state;
}

export async function setState(state) {
  const store = getStore({ name: STORE_NAME, consistency: "strong" });
  await store.setJSON(KEY, state);
  return state;
}
