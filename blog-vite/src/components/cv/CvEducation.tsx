'use client';

import { Typography, Box, Grid } from '@mui/material';

export default function CvEducation() {
  return (
    <Box className="mb-8">
      <Typography variant="h6" className="mb-4">
        Education
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box>
            <Typography variant="subtitle1" className="font-bold">
              Master of Computer Science
            </Typography>
            <Typography variant="body2" color="text.secondary">
              University of Technology
            </Typography>
            <Typography variant="body2" color="text.secondary">
              2015 - 2017
            </Typography>
            <Typography variant="body2" className="mt-2">
              Specialized in Software Engineering and Distributed Systems
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Typography variant="subtitle1" className="font-bold">
              Bachelor of Computer Science
            </Typography>
            <Typography variant="body2" color="text.secondary">
              University of Technology
            </Typography>
            <Typography variant="body2" color="text.secondary">
              2011 - 2015
            </Typography>
            <Typography variant="body2" className="mt-2">
              Focus on Computer Science and Software Development
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
} 