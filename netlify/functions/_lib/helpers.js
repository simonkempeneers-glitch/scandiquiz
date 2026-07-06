export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export function checkHostPassword(password) {
  const expected = process.env.HOST_PASSWORD || "scandi2026";
  return password === expected;
}
