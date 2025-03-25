'use client';

import { Card, CardContent } from '@mui/material';
import CvHeader from './CvHeader';
import CvWorkExperience from './CvWorkExperience';
import CvContact from './CvContact';
import CvEducation from './CvEducation';
import CvQualifications from './CvQualifications';

export function CvPage() {
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