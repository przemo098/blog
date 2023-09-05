import CvHeader from './cvHeader';
import CvWorkExperience from './CvWorkExprience';
import CvContact from './CvContact';
import CvEducation from './CvEducation';
import CvQualifications from './CvQualifications';
import {Card, CardContent} from '@mui/material';

export function CvPage() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%'}}>
      <Card style={{maxWidth: 1000, margin: 25}}>
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
