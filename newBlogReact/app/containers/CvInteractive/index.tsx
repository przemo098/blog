import React from 'react';
import CvHeader from './cvHeader';
import CvContact from './contact';
import CvWorkExprience from './CvWorkExprience';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

export default function CvInteractive() {
  return <React.Fragment>
    <CvHeader/>
    <CvContact/>
    <CvWorkExprience/>

  </React.Fragment>;
}
