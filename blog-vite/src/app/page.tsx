'use client';

import Link from 'next/link';
import ArticleIcon from '@mui/icons-material/Article';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-96px)] sm:min-h-[calc(100vh-112px)] bg-gradient-to-br from-slate-50 to-slate-100 py-8 sm:py-12 px-4">
      <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 mb-1 sm:mb-2 text-center">Przemysław Kamiński</h1>
      <p className="text-sm sm:text-lg text-slate-500 mb-6 sm:mb-10 text-center">Senior Full Stack Developer & Consultant</p>
      <div className="grid grid-cols-3 gap-3 sm:flex sm:gap-6 w-full max-w-md sm:max-w-none sm:w-auto">
        <Link
          href="/cv"
          className="flex flex-col items-center gap-2 sm:gap-3 bg-white rounded-xl sm:rounded-2xl shadow-lg px-3 sm:px-10 py-5 sm:py-8 hover:shadow-xl transition-shadow border border-slate-200 hover:border-slate-300"
        >
          <ArticleIcon className="text-slate-700 !text-[28px] sm:!text-[40px]" />
          <span className="text-xs sm:text-sm font-medium text-slate-700 text-center">CV</span>
        </Link>
        <Link
          href="/chat"
          className="flex flex-col items-center gap-2 sm:gap-3 bg-white rounded-xl sm:rounded-2xl shadow-lg px-3 sm:px-10 py-5 sm:py-8 hover:shadow-xl transition-shadow border border-slate-200 hover:border-slate-300"
        >
          <SmartToyIcon className="text-slate-700 !text-[28px] sm:!text-[40px]" />
          <span className="text-xs sm:text-sm font-medium text-slate-700 text-center">Chat Bot</span>
        </Link>
        <Link
          href="/retro"
          className="flex flex-col items-center gap-2 sm:gap-3 bg-white rounded-xl sm:rounded-2xl shadow-lg px-3 sm:px-10 py-5 sm:py-8 hover:shadow-xl transition-shadow border border-slate-200 hover:border-slate-300"
        >
          <AutoAwesomeIcon className="text-slate-700 !text-[28px] sm:!text-[40px]" />
          <span className="text-xs sm:text-sm font-medium text-slate-700 text-center">Retro</span>
        </Link>
      </div>
    </div>
  );
}
