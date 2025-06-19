import crypto from 'crypto';

const SECRET = 'my_secret_key';

export function generateSecureWord(username: string, timestamp: number) {
  return crypto.createHmac('sha256', SECRET).update(username + timestamp).digest('hex');
}

export function canRequestSecureWord(now: number, last: number) {
  return now - last > 10000; // 10s
}

export function isSecureWordExpired(issuedAt: number) {
  return Date.now() - issuedAt > 60000; // 60s
}

export function generateMfaCode(secret: string) {
  return crypto.createHmac('sha1', secret).digest('hex').slice(0, 6);
}