import { randomUUID } from "node:crypto";
import { getState, setState } from "./_lib/store.js";
import { json } from "./_lib/helpers.js";

export default async (req) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const body = await req.json().catch(() => ({}));
  const rawName = (body.name || "").toString().trim().slice(0, 24);
  if (!rawName) return json({ error: "Vul een naam in." }, 400);

  const state = await getState();

  if (state.phase !== "lobby") {
    return json({ error: "De quiz is al gestart. Vraag de quizmaster om te resetten of wacht op de volgende sessie." }, 409);
  }

  const existingNames = Object.values(state.participants).map((p) => p.name.toLowerCase());
  let finalName = rawName;
  let n = 2;
  while (existingNames.includes(finalName.toLowerCase())) {
    finalName = `${rawName} (${n})`;
    n++;
  }

  const id = randomUUID();
  state.participants[id] = {
    name: finalName,
    score: 0,
    joinedAt: Date.now(),
    answers: {},
  };

  await setState(state);
  return json({ participantId: id, name: finalName });
};
