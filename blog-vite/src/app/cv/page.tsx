'use client';

import CvHeader from '@/pages/CvInteractivePage/cvHeader';
import CvWorkExperience from '@/pages/CvInteractivePage/CvWorkExprience';
import CvContact from '@/pages/CvInteractivePage/CvContact';
import CvEducation from '@/pages/CvInteractivePage/CvEducation';
import CvQualifications from '@/pages/CvInteractivePage/CvQualifications';
import { Card, CardContent } from '@mui/material';

export default function CV() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Card className="max-w-[1000px] m-6">
        <CardContent>
          <CvHeader />
          <CvContact />
          <CvWorkExperience />
          <CvEducation />
          <CvQualifications />
        </CardContent>
      </Card>
    </div>
  );
} 