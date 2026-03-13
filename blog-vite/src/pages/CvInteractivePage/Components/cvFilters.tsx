'use client';

import { CvSateController, CvState } from "../slice-CV";
import { useUnwrap } from "../../../utils/hooks";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterListIcon from '@mui/icons-material/FilterList';
import { withScrollLock } from "../scrollLock";

function FilterToggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-full transition-all border ${
        checked
          ? 'bg-white text-slate-800 border-white font-semibold shadow-md'
          : 'bg-transparent text-slate-300 border-slate-500 hover:border-slate-300'
      }`}
    >
      {label}
      <KeyboardArrowDownIcon
        sx={{ fontSize: 16 }}
        className={`transition-transform ${checked ? 'rotate-180' : ''}`}
      />
    </button>
  );
}

export function CvFilters() {
  const cvFilters = useUnwrap(CvState);

  return (
    <div id="cv-filters" className="flex items-center gap-2">
      <FilterListIcon sx={{ fontSize: 18 }} className="text-slate-400" />
      <FilterToggle
        label="Frontend"
        checked={cvFilters?.isFeSelected}
        onChange={() => withScrollLock(() => CvSateController.switchFeFilter())}
      />
      <FilterToggle
        label="Backend"
        checked={cvFilters?.isBeSelected}
        onChange={() => withScrollLock(() => CvSateController.switchBeFilter())}
      />
      <FilterToggle
        label="DevOps"
        checked={cvFilters?.isDevOpsSelected}
        onChange={() => withScrollLock(() => CvSateController.switchDevOpsFilter())}
      />
    </div>
  );
}
