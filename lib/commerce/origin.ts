// Compare with the external Host header: Next's internal URL may use localhost
// behind a reverse proxy. Never accept a missing/opaque Origin for mutations.
export function sameOrigin(request: Request) {
  try {
    const origin = new URL(request.headers.get("origin") ?? "");
    const host = request.headers.get("host") ?? new URL(request.url).host;
    return ["http:", "https:"].includes(origin.protocol) && origin.host === host;
  } catch { return false; }
}
