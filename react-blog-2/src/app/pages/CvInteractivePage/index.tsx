import React from 'react';
import CvHeader from './cvHeader';
import CvWorkExprience from './CvWorkExprience';
import ExposureIcon from '@material-ui/icons/Exposure';
import CvContact from './CvContact';
import CvEducation from './CvEducation';
import CvQualifications from './CvQualifications';

export default function CvInteractive() {
  return (
    <React.Fragment>
      <ExposureIcon />
      <CvHeader />
      <CvContact />
      <CvWorkExprience />
      <CvEducation />
      <CvQualifications />
    </React.Fragment>
  );
}
