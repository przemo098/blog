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
    <div className="sticky top-0 z-50 text-white px-4 sm:px-8 py-3 sm:py-5 shadow-lg rounded-none" style={{ background: 'linear-gradient(to right, #1e293b, #0f172a)' }}>
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex items-start sm:items-center justify-between">
          <div>
            <h1 className="text-lg sm:text-2xl font-bold tracking-tight m-0">
              Przemysław Kamiński
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5 mb-0">
              Senior Full Stack Developer & Consultant
            </p>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 ml-2">
            <button
              id="cv-reset-btn"
              onClick={() => withScrollLock(() => CvSateController.resetFilters())}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors border border-slate-600"
            >
              Reset
            </button>
            <button
              id="cv-print-btn"
              onClick={() => handlePrint()}
              className="px-2.5 sm:px-3 py-1.5 sm:py-2 text-sm rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors border border-slate-600"
              title="Print CV"
            >
              <PrintIcon fontSize="small" />
            </button>
          </div>
        </div>
        <CvFilters />
      </div>
    </div>
  );
}
