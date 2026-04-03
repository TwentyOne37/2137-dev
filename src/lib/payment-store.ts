export interface PaymentSession {
  email: string;
  telegram: string;
  twitter: string;
  createdAt: number;
}

const store = new Map<string, PaymentSession>();
const MAX_AGE = 3_600_000; // 1 hour

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

  const ref = crypto.randomUUID().slice(0, 8);
  store.set(ref, {
    email: contact.email?.trim() ?? "",
    telegram: contact.telegram?.trim() ?? "",
    twitter: contact.twitter?.trim() ?? "",
    createdAt: now,
  });
  return ref;
}

export function getSession(ref: string): PaymentSession | undefined {
  return store.get(ref);
}
