'use client';

import { Typography, Box, Grid } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function CvContact() {
  return (
    <Box className="mb-8">
      <Typography variant="h6" className="mb-4">
        Contact Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box className="flex items-center gap-2">
            <EmailIcon color="primary" />
            <Typography>john.doe@example.com</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box className="flex items-center gap-2">
            <PhoneIcon color="primary" />
            <Typography>+1 234 567 890</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box className="flex items-center gap-2">
            <LocationOnIcon color="primary" />
            <Typography>New York, NY</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box className="flex items-center gap-2">
            <LinkedInIcon color="primary" />
            <Typography>linkedin.com/in/johndoe</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
} 