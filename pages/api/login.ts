import { wordStore, sessionStore, mfaStore } from '@/lib/store';
import { isSecureWordExpired, generateMfaCode } from '@/lib/auth';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { username, hashedPassword, secureWord } = req.body;
  const entry = wordStore.get(username);

  if (!entry || isSecureWordExpired(entry.issuedAt)) {
    return res.status(400).json({ message: 'Secure word expired or missing' });
  }
  if (entry.secureWord !== secureWord) {
    return res.status(400).json({ message: 'Secure word mismatch' });
  }

  const token = `session-${Date.now()}`;
  sessionStore.set(username, token);
  mfaStore.set(username, { code: generateMfaCode('static_secret'), attempts: 0 });

  res.json({ token });
}