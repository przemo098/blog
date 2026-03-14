'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ArticleIcon from '@mui/icons-material/Article';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const navItems = [
  { label: 'CV', href: '/cv', icon: <ArticleIcon fontSize="small" /> },
  { label: 'Chat', href: '/chat', icon: <SmartToyIcon fontSize="small" /> },
  { label: 'Retro', href: '/retro', icon: <AutoAwesomeIcon fontSize="small" /> },
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
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
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
