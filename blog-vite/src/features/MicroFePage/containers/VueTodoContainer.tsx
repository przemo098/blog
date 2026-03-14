'use client';

import { useEffect, useState } from 'react';

export default function VueTodoContainer() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/micro-fe/vue/vue-todo.js';
    script.onload = () => setLoaded(true);
    script.onerror = () => setError('Failed to load Vue micro FE');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (error) return <p className="text-sm text-red-500">{error}</p>;
  if (!loaded) return <p className="text-sm text-slate-400 animate-pulse">Loading Vue...</p>;

  return <div dangerouslySetInnerHTML={{ __html: '<vue-todo-list></vue-todo-list>' }} />;
}
