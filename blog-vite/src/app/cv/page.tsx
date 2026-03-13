'use client';

import { useRef } from 'react';
import CvHeader from '@/pages/CvInteractivePage/cvHeader';
import CvWorkExperience from '@/pages/CvInteractivePage/CvWorkExprience';
import CvContact from '@/pages/CvInteractivePage/CvContact';
import CvEducation from '@/pages/CvInteractivePage/CvEducation';
import CvQualifications from '@/pages/CvInteractivePage/CvQualifications';
import CvGuide from '@/pages/CvInteractivePage/CvGuide';

export default function CV() {
  const printRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <CvGuide />
      <div className="max-w-[900px] mx-auto">
        {/* Header outside overflow-hidden so sticky works */}
        <CvHeader printRef={printRef} />
        <div ref={printRef} className="bg-white rounded-b-2xl shadow-xl">
          <div className="p-8 space-y-8">
            <CvContact />
            <CvWorkExperience />
            <CvEducation />
            <CvQualifications />
          </div>
        </div>
      </div>
    </div>
  );
}
