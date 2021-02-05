import React from 'react';
import CvHeader from './cvHeader';
import CvWorkExprience from './CvWorkExprience';
import ExposureIcon from '@material-ui/icons/Exposure';
import CvContact from './CvContact';
import CvEducation from './CvEducation';
import CvQualifications from './CvQualifications';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import FormGroup from '@material-ui/core/FormGroup';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from '../../../utils/redux-injectors';
import { cvFilterActions, sliceCV } from './slice-CV';
import { RootState } from '../../../types';

const useStyles = makeStyles({
  root: {
    maxWidth: 1000,
    margin: 25,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Row = styled.div`
  display: flex;
`;

export default function CvInteractive() {
  useInjectReducer({ key: sliceCV.name, reducer: sliceCV.reducer });
  // useInjectSaga({ key: slice.name, saga: githubRepoFormSaga });
  const cvFilters = useSelector((state: RootState) => state.cvFilters);
  const dispatch = useDispatch();

  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;

  return (
    <Row>
      <Card>
        <h4>Filters</h4>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={cvFilters?.isFeSelected}
                onChange={() => dispatch(cvFilterActions.switchFeFilter())}
                name="checkedB"
                color="primary"
              />
            }
            label="Frontend"
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={cvFilters?.isBeSelected}
                onChange={() => dispatch(cvFilterActions.switchBeFilter())}
                name="checkedB"
                color="primary"
              />
            }
            label="Backend"
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={cvFilters?.isDevOpsSelected}
                onChange={() => dispatch(cvFilterActions.switchDevOpsFilter())}
                name="checkedB"
                color="primary"
              />
            }
            label="Devops"
          />
        </FormGroup>
      </Card>

      <Card className={classes.root}>
        <CardContent>
          <Button variant="contained">Default</Button>
          <ExposureIcon />
          <CvHeader />
          <CvContact />
          <CvWorkExprience />
          <CvEducation />
          <CvQualifications />
        </CardContent>
      </Card>
    </Row>
  );
}
