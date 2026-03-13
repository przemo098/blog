'use client';

import { CvFilters } from "./Components/cvFilters";
import { CvSateController } from "./slice-CV";
import { withScrollLock } from "./scrollLock";
import PrintIcon from '@mui/icons-material/Print';
import { RefObject } from "react";
import { useReactToPrint } from "react-to-print";

interface CvHeaderProps {
  printRef: RefObject<HTMLDivElement | null>;
}

export default function CvHeader({ printRef }: CvHeaderProps) {
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'CV - Przemysław Kamiński',
  });

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-slate-800 to-slate-900 text-white px-8 py-5 shadow-lg rounded-t-2xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold tracking-tight m-0">
            Przemysław Kamiński
          </h1>
          <p className="text-slate-400 text-sm mt-0.5 mb-0">
            Senior Full Stack Developer & Consultant
          </p>
        </div>
        <div className="flex items-center gap-3">
          <CvFilters />
          <div className="w-px h-6 bg-slate-600" />
          <button
            id="cv-reset-btn"
            onClick={() => withScrollLock(() => CvSateController.resetFilters())}
            className="px-4 py-2 text-sm rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors border border-slate-600"
          >
            Reset
          </button>
          <button
            id="cv-print-btn"
            onClick={() => handlePrint()}
            className="px-3 py-2 text-sm rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors border border-slate-600"
            title="Print CV"
          >
            <PrintIcon fontSize="small" />
          </button>
        </div>
      </div>
    </div>
  );
}
