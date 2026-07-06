// Petits utilitaires partagés pour les appels fetch.
const API_BASE = "/api";

async function apiGet(path, headers) {
  const res = await fetch(API_BASE + path, { headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Erreur (${res.status})`);
  return data;
}

async function apiPost(path, body, headers) {
  const res = await fetch(API_BASE + path, {
    method: "POST",
    headers: { "content-type": "application/json", ...(headers || {}) },
    body: JSON.stringify(body || {}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || `Erreur (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return data;
}

const OPTION_LETTERS = ["A", "B", "C", "D"];
