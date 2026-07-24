'use client';

import { useEffect, useRef, useState } from 'react';

let blazorStarted = false;
let blazorHostEl: HTMLDivElement | null = null;

export default function BlazorTodoContainer() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(blazorStarted);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (blazorStarted) {
      setLoaded(true);
      return;
    }
    blazorStarted = true;

    const host = document.createElement('div');
    host.id = 'blazor-todo-host';
    blazorHostEl = host;

    const bridge = document.createElement('script');
    bridge.src = '/micro-fe/blazor/blazorTodoBridge.js';
    document.body.appendChild(bridge);

    bridge.onload = () => {
      const blazorScript = document.createElement('script');
      blazorScript.src = '/micro-fe/blazor/_framework/blazor.webassembly.js';
      blazorScript.setAttribute('autostart', 'false');

      blazorScript.onload = async () => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const blazor = (window as any).Blazor;
          if (blazor) {
            await blazor.start({
              loadBootResource: (_type: string, name: string) => {
                return `/micro-fe/blazor/_framework/${name}`;
              },
            });
          }
          setLoaded(true);
        } catch {
          setError('Failed to start Blazor runtime');
        }
      };

      blazorScript.onerror = () => setError('Failed to load Blazor micro FE');
      document.body.appendChild(blazorScript);
    };

    bridge.onerror = () => setError('Failed to load Blazor bridge script');
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!loaded || !root || !blazorHostEl) return;

    root.appendChild(blazorHostEl);

    return () => {
      if (blazorHostEl && blazorHostEl.parentNode === root) {
        root.removeChild(blazorHostEl);
      }
    };
  }, [loaded]);

  if (error) return <p className="text-sm text-red-500">{error}</p>;
  if (!loaded) return <p className="text-sm text-slate-400 animate-pulse">Loading Blazor (.NET 10)...</p>;

  return <div ref={rootRef} />;
}
