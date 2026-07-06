import { getState } from "./_lib/store.js";
import { sanitizeForHost } from "./_lib/quizdata.js";
import { json, checkHostPassword } from "./_lib/helpers.js";

export default async (req) => {
  const password = req.headers.get("x-host-password") || new URL(req.url).searchParams.get("password");
  if (!checkHostPassword(password)) {
    return json({ error: "Mot de passe quizmaster incorrect." }, 401);
  }
  const state = await getState();
  return json(sanitizeForHost(state));
};
