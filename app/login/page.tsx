'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginFlow() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [secureWord, setSecureWord] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/getSecureWord', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    });
    const data = await res.json();
    if (res.ok) {
      setSecureWord(data.secureWord);
      setStep(2);
    } else setMessage(data.message);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const hashed = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
    const hashedPassword = Array.from(new Uint8Array(hashed)).map(b => b.toString(16).padStart(2, '0')).join('');

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, hashedPassword, secureWord })
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      setStep(4);
    } else setMessage(data.message);
  };

  const handleVerifyMfa = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/verifyMfa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, code })
    });
    const data = await res.json();
    if (res.ok) {
      router.push('/dashboard');
    } else setMessage(data.message);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Multi-Step Login</h1>

      {message && <p className="text-red-500 mb-2">{message}</p>}

      {step === 1 && (
        <form onSubmit={handleUsernameSubmit} className="space-y-4">
          <input value={username} onChange={(e) => setUsername(e.target.value)} required
            placeholder="Username" className="w-full p-2 border rounded" />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Get Secure Word</button>
        </form>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <p className="text-green-500">Secure Word: {secureWord}</p>
          <p className="text-sm text-yellow-500">(Expires in 60s)</p>
          <button onClick={() => setStep(3)} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            required placeholder="Password" className="w-full p-2 border rounded" />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
        </form>
      )}

      {step === 4 && (
        <form onSubmit={handleVerifyMfa} className="space-y-4">
          <input type="text" value={code} onChange={(e) => setCode(e.target.value)}
            required placeholder="Enter MFA Code" className="w-full p-2 border rounded" />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Verify</button>
        </form>
      )}
    </div>
  );
}