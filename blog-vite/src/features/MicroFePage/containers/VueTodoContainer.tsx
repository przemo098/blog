'use client';

import { useEffect, useRef, useState } from 'react';

export default function VueTodoContainer() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/micro-fe/vue/vue-todo.js';
    script.onload = () => setLoaded(true);
    script.onerror = () => setError('Failed to load Vue micro FE');
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!loaded || !root) return;

    const host = document.createElement('div');
    const el = document.createElement('vue-todo-list');
    host.appendChild(el);
    root.appendChild(host);

    return () => {
      if (host.parentNode === root) root.removeChild(host);
    };
  }, [loaded]);

  if (error) return <p className="text-sm text-red-500">{error}</p>;
  if (!loaded) return <p className="text-sm text-slate-400 animate-pulse">Loading Vue...</p>;

  return <div ref={rootRef} />;
}
