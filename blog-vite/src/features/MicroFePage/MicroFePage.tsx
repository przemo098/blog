'use client';

import { ReactNode, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { getMicroFeBus } from './shared/microFeBus';

const ReactTodo = dynamic(() => import('./react-app/ReactTodoList'), { ssr: false });
const AngularTodo = dynamic(() => import('./containers/AngularTodoContainer'), { ssr: false });
const VueTodo = dynamic(() => import('./containers/VueTodoContainer'), { ssr: false });
const BlazorTodo = dynamic(() => import('./containers/BlazorTodoContainer'), { ssr: false });

function ReactLogo() {
  return (
    <svg width="20" height="20" viewBox="-11.5 -10.232 23 20.463" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle r="2.05" fill="#61dafb" />
      <g stroke="#61dafb" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function AngularLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 256 272" xmlns="http://www.w3.org/2000/svg">
      <path d="M.1 45.522L125.908.697l129.196 44.028-20.919 166.45-108.277 59.966-106.583-59.169L.1 45.522z" fill="#e23237" />
      <path d="M255.104 44.725L125.908.697v270.444l108.277-59.866 20.919-166.55z" fill="#b52e31" />
      <path d="M126.107 32.274L47.714 206.693l29.285-.498 15.739-39.828h70.083l17.14 40.326h27.57L126.107 32.274zm.2 55.882l26.496 55.383h-49.806l23.31-55.383z" fill="#fff" />
    </svg>
  );
}

function VueLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 261.76 226.69" xmlns="http://www.w3.org/2000/svg">
      <path d="M161.096.001l-30.225 52.351L100.647.001H0l130.871 226.69L261.76.001z" fill="#41b883" />
      <path d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.525 136.01L209.396.001z" fill="#34495e" />
    </svg>
  );
}

function BlazorLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#512bd4" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.8337 8.1013a13.9123 13.9123 0 0 1-13.6424 11.72 10.1053 10.1053 0 0 1-1.994-.121 6.111 6.111 0 0 1-5.0824-5.7607 5.9344 5.9344 0 0 1 11.867-.0838c.025.9835-.4011 1.8464-1.277 1.8713-.9356 0-1.3742-.6677-1.3742-1.5674v-2.5001a1.5313 1.5313 0 0 0-1.5196-1.5328H8.7152a3.6481 3.6481 0 1 0 2.6948 6.0794l.0733-.1093.0734.1213a2.5807 2.5807 0 0 0 2.2007 1.0479 2.9088 2.9088 0 0 0 2.6947-3.0406 7.912 7.912 0 0 0-.217-1.9324 7.4043 7.4043 0 0 0-14.6395 1.6033 7.4971 7.4971 0 0 0 7.307 7.4043s.549.05 1.1677.0357a15.8029 15.8029 0 0 0 8.4747-2.5283c.036-.025.0719.025.048.0614a12.4392 12.4392 0 0 1-9.6901 3.9625A8.7442 8.7442 0 0 1 .003 13.8603a9.049 9.049 0 0 1 3.6349-7.2471 8.8634 8.8634 0 0 1 5.229-1.7262h2.813a7.9145 7.9145 0 0 0 5.8386-2.5777.1093.1093 0 0 1 .0594-.034.1115.1115 0 0 1 .1195.0522.113.113 0 0 1 .0155.0672 7.9345 7.9345 0 0 1-1.2274 3.5493.1075.1075 0 0 0-.0132.0609.1098.1098 0 0 0 .0724.0945.109.109 0 0 0 .0619.0033 8.5054 8.5054 0 0 0 5.9134-4.876.1554.1554 0 0 1 .0546-.0527.1497.1497 0 0 1 .147 0 .1535.1535 0 0 1 .0546.0527 10.779 10.779 0 0 1 1.0575 6.8746zm-14.9383 3.527a2.188 2.188 0 1 0 2.1877 2.1878v-2.0425a.1577.1577 0 0 0-.1497-.1497Z" />
    </svg>
  );
}

function MfeCard({ title, icon, badge, children }: { title: string; icon: ReactNode; badge: string; children: ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
        </div>
        <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
          {badge}
        </span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export default function MicroFePage() {
  useEffect(() => {
    getMicroFeBus();
  }, []);

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: 'linear-gradient(to bottom right, #f8fafc, #f1f5f9)' }}>
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Micro Frontends</h1>
        <p className="text-sm text-slate-500 mb-8">
          Four frameworks sharing the same TODO state via a framework-agnostic event bus.
          Changes in any app instantly propagate to all others.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MfeCard title="React" icon={<ReactLogo />} badge="Full CRUD">
            <ReactTodo />
          </MfeCard>
          <MfeCard title="Angular" icon={<AngularLogo />} badge="Full CRUD">
            <AngularTodo />
          </MfeCard>
          <MfeCard title="Vue" icon={<VueLogo />} badge="Full CRUD">
            <VueTodo />
          </MfeCard>
          <MfeCard title="Blazor (.NET 10)" icon={<BlazorLogo />} badge="Full CRUD">
            <BlazorTodo />
          </MfeCard>
        </div>

        {/* Architecture Diagram */}
        <details className="mt-10 bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <summary className="px-6 py-4 cursor-pointer select-none bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-800 hover:bg-slate-100 transition-colors">
            Architecture Diagram
          </summary>
          <div className="p-6">
            <ArchitectureDiagram />
          </div>
        </details>
      </div>
    </div>
  );
}

function ArchitectureDiagram() {
  const fws = [
    { name: 'React', color: '#61dafb', bg: '#f0faff', tech: 'Native component', load: 'useMicroFeBus() hook' },
    { name: 'Angular', color: '#e23237', bg: '#fff5f5', tech: 'Custom Element', load: '<angular-todo-list>' },
    { name: 'Vue', color: '#41b883', bg: '#f0fff4', tech: 'Custom Element (Shadow DOM)', load: '<vue-todo-list>' },
    { name: 'Blazor', color: '#512bd4', bg: '#f5f3ff', tech: 'WASM + JS Bridge', load: 'DotNetObjectReference' },
  ];

  return (
    <div className="space-y-6 text-xs">
      {/* Host Layer */}
      <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-3">Next.js Host</div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="bg-white border border-slate-200 rounded px-3 py-2 text-slate-700 font-mono">/micro-fe</div>
          <span className="text-slate-400">&rarr;</span>
          <div className="bg-white border border-slate-200 rounded px-3 py-2 text-slate-700 font-mono">MicroFePage.tsx</div>
          <span className="text-slate-400">&rarr;</span>
          <div className="bg-white border border-slate-200 rounded px-3 py-2 text-slate-500">
            dynamic import (ssr: false) &times; 4
          </div>
        </div>
      </div>

      {/* Arrow down */}
      <div className="flex justify-center">
        <svg width="24" height="32" viewBox="0 0 24 32" className="text-slate-300">
          <path d="M12 0 L12 24 M6 18 L12 24 L18 18" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* Micro FEs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {fws.map((fw) => (
          <div key={fw.name} className="border rounded-lg p-3 text-center" style={{ borderColor: fw.color + '40', background: fw.bg }}>
            <div className="font-semibold text-sm mb-1" style={{ color: fw.color }}>{fw.name}</div>
            <div className="text-slate-500 text-[10px]">{fw.tech}</div>
            <div className="text-slate-400 text-[10px] font-mono mt-1">{fw.load}</div>
          </div>
        ))}
      </div>

      {/* Bidirectional arrows */}
      <div className="flex justify-center gap-1 items-center">
        {fws.map((fw) => (
          <div key={fw.name} className="flex flex-col items-center" style={{ flex: 1 }}>
            <svg width="24" height="40" viewBox="0 0 24 40">
              <path d="M12 0 L12 40" stroke={fw.color} strokeWidth="1.5" strokeDasharray="4 2" />
              <path d="M8 6 L12 0 L16 6" stroke={fw.color} strokeWidth="1.5" fill="none" />
              <path d="M8 34 L12 40 L16 34" stroke={fw.color} strokeWidth="1.5" fill="none" />
            </svg>
          </div>
        ))}
      </div>

      {/* Event Bus */}
      <div className="border-2 border-amber-300 rounded-lg p-4 bg-amber-50 text-center">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 mb-2">Shared State</div>
        <div className="font-mono text-sm text-amber-800 font-semibold mb-2">window.__microFeBus</div>
        <div className="flex justify-center gap-2 flex-wrap">
          {['addTodo()', 'updateTodo()', 'deleteTodo()', 'subscribe()', 'getState()'].map((m) => (
            <span key={m} className="bg-white border border-amber-200 rounded px-2 py-0.5 text-amber-700 font-mono text-[10px]">{m}</span>
          ))}
        </div>
      </div>

      {/* Data Flow */}
      <div className="border border-slate-200 rounded-lg p-4 bg-white">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Data Flow</div>
        <ol className="list-decimal list-inside space-y-1 text-slate-600 text-xs">
          <li>User performs action (add/edit/delete) in <strong>any</strong> micro FE</li>
          <li>Micro FE calls <code className="bg-slate-100 px-1 rounded text-[11px]">__microFeBus.addTodo()</code> / <code className="bg-slate-100 px-1 rounded text-[11px]">updateTodo()</code> / <code className="bg-slate-100 px-1 rounded text-[11px]">deleteTodo()</code></li>
          <li>Bus updates internal state and calls <code className="bg-slate-100 px-1 rounded text-[11px]">notify()</code></li>
          <li>All subscribed callbacks receive the new <code className="bg-slate-100 px-1 rounded text-[11px]">TodoState</code></li>
          <li>Each micro FE re-renders with updated items</li>
        </ol>
      </div>
    </div>
  );
}
