'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ArticleIcon from '@mui/icons-material/Article';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import RadarIcon from '@mui/icons-material/Radar';

// `hard: true` wymusza pełne przeładowanie strony (natywne <a> zamiast <Link>).
// Micro FE osadza Angular/Vue/Blazor, które manipulują DOM poza Reactem — nawigacja
// client-side z/do tych stron powoduje crash Reacta ("Cannot read properties of null
// (reading 'removeChild')"). Pełny reload izoluje je i gwarantuje czysty start Radaru.
const navItems = [
  { label: 'CV', href: '/cv', icon: <ArticleIcon fontSize="small" /> },
  { label: 'Chat', href: '/chat', icon: <SmartToyIcon fontSize="small" /> },
  { label: 'Retro', href: '/retro', icon: <AutoAwesomeIcon fontSize="small" /> },
  { label: 'Micro FE', href: '/micro-fe', icon: <ViewModuleIcon fontSize="small" />, hard: true },
  { label: 'Radar', href: '/radar-przetargowy', icon: <RadarIcon fontSize="small" />, hard: true },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-[1200px] mx-auto px-3 sm:px-6 flex items-center h-12 sm:h-14">
        <Link href="/" className="text-base sm:text-lg font-semibold tracking-wide text-slate-100 hover:text-white mr-4 sm:mr-10">
          PK
        </Link>
        <nav className="flex gap-0.5 sm:gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const className = `flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
              isActive
                ? 'bg-slate-700 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`;
            // Pełne przeładowanie dla stron z manipulacją DOM poza Reactem (Micro FE, Radar).
            if (item.hard) {
              return (
                <a key={item.href} href={item.href} className={className}>
                  {item.icon}
                  {item.label}
                </a>
              );
            }
            return (
              <Link key={item.href} href={item.href} className={className}>
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
