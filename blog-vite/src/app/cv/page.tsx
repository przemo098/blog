'use client';

import { useRef } from 'react';
import CvHeader from '@/features/CvInteractivePage/cvHeader';
import CvWorkExperience from '@/features/CvInteractivePage/CvWorkExprience';
import CvContact from '@/features/CvInteractivePage/CvContact';
import CvSummary from '@/features/CvInteractivePage/CvSummary';
import CvEducation from '@/features/CvInteractivePage/CvEducation';
import CvQualifications from '@/features/CvInteractivePage/CvQualifications';
import CvGuide from '@/features/CvInteractivePage/CvGuide';

export default function CV() {
  const printRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen py-0 sm:py-8 px-0 sm:px-4" style={{ background: 'linear-gradient(to bottom right, #f8fafc, #f1f5f9)' }}>
      <CvGuide />
      <div className="max-w-[900px] mx-auto">
        {/* Header outside overflow-hidden so sticky works */}
        <CvHeader printRef={printRef} />
        <div ref={printRef} className="bg-white rounded-none shadow-xl">
          <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
            <CvContact />
            <CvSummary />
            <CvWorkExperience />
            <CvEducation />
            <CvQualifications />
          </div>
        </div>
      </div>
    </div>
  );
}
