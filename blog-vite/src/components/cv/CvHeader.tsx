'use client';

import { Typography, Box } from '@mui/material';

export default function CvHeader() {
  return (
    <Box className="mb-8">
      <Typography variant="h3" component="h1" className="mb-2">
        John Doe
      </Typography>
      <Typography variant="h5" color="text.secondary" className="mb-4">
        Full Stack Developer
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Experienced full-stack developer with expertise in React, .NET, and cloud technologies.
        Passionate about creating efficient, scalable solutions and mentoring other developers.
      </Typography>
    </Box>
  );
} 