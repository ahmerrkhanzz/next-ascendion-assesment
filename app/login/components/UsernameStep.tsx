// login/components/UsernameStep.tsx
'use client';

import { useState } from 'react';

export default function UsernameStep({ onNext }: { onNext: (username: string, secureWord: string) => void }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/getSecureWord', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.message || 'Something went wrong');
      return;
    }

    const { secureWord } = await res.json();
    onNext(username, secureWord);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="p-2 border rounded w-full"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Get Secure Word</button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
