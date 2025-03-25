'use client';

import SideBar from "./SideBar";
import Header from "./Header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />
        <main style={{ flex: 1, padding: '20px' }}>
          {children}
        </main>
      </div>
      <footer style={{ padding: '20px', textAlign: 'center' }}>
        © 2024 Your Blog Name
      </footer>
    </div>
  );
} 