'use client';

import { useEffect, useState } from 'react';

// Module-level guard — Blazor WASM runtime cannot be started twice
let blazorStarted = false;

export default function BlazorTodoContainer() {
  const [loaded, setLoaded] = useState(blazorStarted);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (blazorStarted) return;
    blazorStarted = true;

    const scripts: HTMLScriptElement[] = [];

    // Load the JS bridge first, then Blazor WASM
    const bridge = document.createElement('script');
    bridge.src = '/micro-fe/blazor/blazorTodoBridge.js';
    scripts.push(bridge);
    document.body.appendChild(bridge);

    bridge.onload = () => {
      const blazorScript = document.createElement('script');
      blazorScript.src = '/micro-fe/blazor/_framework/blazor.webassembly.js';
      blazorScript.setAttribute('autostart', 'false');
      scripts.push(blazorScript);

      blazorScript.onload = async () => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const blazor = (window as any).Blazor;
          if (blazor) {
            await blazor.start({
              loadBootResource: (type: string, name: string) => {
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

    // No cleanup — Blazor runtime cannot be unloaded
  }, []);

  if (error) return <p className="text-sm text-red-500">{error}</p>;

  return (
    <div id="blazor-todo-host">
      {!loaded && <p className="text-sm text-slate-400 animate-pulse">Loading Blazor (.NET 10)...</p>}
    </div>
  );
}
