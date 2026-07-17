const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

// Best-effort in-memory limiter: state resets on cold start and isn't shared
// across serverless instances. Good enough for a low-traffic contact form;
// swap for a shared store (e.g. Upstash Redis) if abuse becomes real.
const hits = new Map<string, number[]>();

export const checkRateLimit = (key: string): boolean => {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    hits.set(key, timestamps);
    return false;
  }

  timestamps.push(now);
  hits.set(key, timestamps);
  return true;
};
