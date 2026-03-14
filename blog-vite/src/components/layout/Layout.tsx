'use client';

import Header from "./Header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className="print-hide"><Header /></div>
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <footer className="print-hide text-center text-sm text-slate-400 py-4 bg-slate-50 border-t border-slate-200">
        © 2026 Przemysław Kamiński
      </footer>
    </div>
  );
}
