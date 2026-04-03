export interface PaymentSession {
  email: string;
  telegram: string;
  twitter: string;
  createdAt: number;
}

const store = new Map<string, PaymentSession>();
const MAX_AGE = 3_600_000; // 1 hour
const MAX_SESSIONS = 10_000;
const MAX_FIELD_LEN = 200;

function sanitize(val: unknown): string {
  if (typeof val !== "string") return "";
  return val.trim().slice(0, MAX_FIELD_LEN);
}

export function createSession(contact: {
  email?: string;
  telegram?: string;
  twitter?: string;
}): string {
  // Cleanup stale entries
  const now = Date.now();
  for (const [key, val] of store) {
    if (now - val.createdAt > MAX_AGE) store.delete(key);
  }

  // Hard cap to prevent memory exhaustion
  if (store.size >= MAX_SESSIONS) {
    const oldest = store.keys().next().value!;
    store.delete(oldest);
  }

  const ref = crypto.randomUUID().slice(0, 8);
  store.set(ref, {
    email: sanitize(contact.email),
    telegram: sanitize(contact.telegram),
    twitter: sanitize(contact.twitter),
    createdAt: now,
  });
  return ref;
}

export function getSession(ref: string): PaymentSession | undefined {
  return store.get(ref);
}
