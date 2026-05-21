'use client'; // stateful form

import { useState } from 'react';

export default function HomePage() {
  const [location, setLocation] = useState('');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setStory('');

    const trimmed = location.trim();
    if (!trimmed) {
      setError('Bitte gib einen Ort ein.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Etwas ist schiefgelaufen.');
      } else {
        setStory(data.story);
      }
    } catch {
      setError('Netzwerkfehler – versuch es nochmal.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="font-head text-5xl font-extrabold text-navy">Strolly</h1>
      <p className="mt-2 font-body text-lg text-text-soft">
        Dein Audio-Guide für die Stadt.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 flex w-full max-w-md flex-col gap-3"
      >
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="z. B. Marienplatz München"
          className="rounded-[18px] border border-gray-200 px-5 py-3 font-body text-navy outline-none focus:ring-2 focus:ring-teal"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-pill bg-teal px-6 py-3 font-body font-semibold text-white hover:bg-teal-dark disabled:opacity-60"
        >
          {loading ? 'Story lädt...' : 'Story hören'}
        </button>
      </form>

      {error && (
        <p className="mt-4 font-body text-sm text-[#8E1F2A]">{error}</p>
      )}

      {story && (
        <div className="mt-6 max-w-md rounded-[18px] bg-teal-light p-5">
          <p className="font-body text-navy">{story}</p>
        </div>
      )}
    </main>
  );
}
