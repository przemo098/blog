import React, { useState } from 'react';
import ExposureIcon from '@material-ui/icons/Exposure';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import CvHeader from './cvHeader';
import CvWorkExprience from './CvWorkExprience';
import CvContact from './CvContact';
import CvEducation from './CvEducation';
import CvQualifications from './CvQualifications';
import Grid from '@material-ui/core/Grid';

export interface ICvInterActiveFilters {
  showFe: boolean;
  showBe: boolean;
  showDevOps: boolean;
}

const initialState: ICvInterActiveFilters = {
  showBe: true,
  showFe: true,
  showDevOps: true,
};

export default function CvInteractive() {
  const [filters, setFilters] = useState<ICvInterActiveFilters>(initialState);

  return (
    <div>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() =>
                    setFilters({ showFe: !filters.showFe, ...filters })
                  }
                  name="checkedB"
                  color="primary"
                />
              }
              label="Frontend"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() =>
                    setFilters({ showBe: !filters.showBe, ...filters })
                  }
                  name="checkedB"
                  color="primary"
                />
              }
              label="Backend"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() =>
                    setFilters({ showDevOps: !filters.showDevOps, ...filters })
                  }
                  name="checkedB"
                  color="primary"
                />
              }
              label="Devops"
            />
          </Grid>
          <Grid item>
            <ExposureIcon />
            <CvHeader />
            <CvContact />
            <CvWorkExprience {...filters} />
            <CvEducation />
            <CvQualifications />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
