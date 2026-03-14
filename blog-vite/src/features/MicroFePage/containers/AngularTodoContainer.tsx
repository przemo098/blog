'use client';

import { useEffect, useState } from 'react';

export default function AngularTodoContainer() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/micro-fe/angular/main.js';
    script.onload = () => setLoaded(true);
    script.onerror = () => setError('Failed to load Angular micro FE');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (error) return <p className="text-sm text-red-500">{error}</p>;
  if (!loaded) return <p className="text-sm text-slate-400 animate-pulse">Loading Angular...</p>;

  return <div dangerouslySetInnerHTML={{ __html: '<angular-todo-list></angular-todo-list>' }} />;
}
