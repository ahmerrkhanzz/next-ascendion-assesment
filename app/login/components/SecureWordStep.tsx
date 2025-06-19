import { generateSecureWord, canRequestSecureWord } from '@/lib/auth';
import { wordStore } from '@/lib/store';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { username } = req.body;
  if (!username) return res.status(400).json({ message: 'Username required' });

  const now = Date.now();
  const last = wordStore.get(username)?.issuedAt || 0;

  if (!canRequestSecureWord(now, last)) {
    return res.status(429).json({ message: 'Wait 10 seconds before retrying' });
  }

  const secureWord = generateSecureWord(username, now);
  wordStore.set(username, { secureWord, issuedAt: now });
  res.json({ secureWord });
}