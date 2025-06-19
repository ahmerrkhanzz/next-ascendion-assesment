import { mfaStore, sessionStore } from '@/lib/store';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { username, code } = req.body;
  const mfa = mfaStore.get(username);

  if (!mfa) return res.status(400).json({ message: 'No MFA session found' });
  if (mfa.attempts >= 3) return res.status(403).json({ message: 'Account locked' });

  if (mfa.code !== code) {
    mfaStore.set(username, { ...mfa, attempts: mfa.attempts + 1 });
    return res.status(400).json({ message: 'Invalid code' });
  }

  res.json({ success: true });
}