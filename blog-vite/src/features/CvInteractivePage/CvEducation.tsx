'use client';

import CvParagraph from './CvParagraph';
import SchoolIcon from '@mui/icons-material/School';

export default function CvEducation() {
  return (
    <div>
      <CvParagraph text="Education" />
      <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-4">
        <div className="text-slate-400 mt-0.5">
          <SchoolIcon />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-800 m-0">
            Wroclaw University of Technology
          </h3>
          <span className="text-xs font-medium text-slate-400">02.2012 – 10.2017</span>
          <p className="text-sm text-slate-600 mt-1 mb-0">
            BSc. Teleinformatics + MSc. Informatics (internet engineering)
          </p>
        </div>
      </div>
    </div>
  );
}
