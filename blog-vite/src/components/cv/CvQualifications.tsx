'use client';

import { Typography, Box, Grid, Chip } from '@mui/material';

export default function CvQualifications() {
  const skills = [
    'React',
    'TypeScript',
    '.NET Core',
    'Node.js',
    'Docker',
    'Kubernetes',
    'Azure',
    'AWS',
    'SQL',
    'MongoDB',
    'Redis',
    'RabbitMQ',
    'Git',
    'CI/CD',
    'Terraform',
    'Microservices',
    'REST APIs',
    'GraphQL',
    'Redux',
    'Material-UI',
    'Tailwind CSS',
    'Jest',
    'NUnit',
    'Agile',
    'Scrum'
  ];

  return (
    <Box className="mb-8">
      <Typography variant="h6" className="mb-4">
        Skills & Qualifications
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box>
            <Typography variant="subtitle2" className="font-bold mb-2">
              Technical Skills
            </Typography>
            <Box className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Typography variant="subtitle2" className="font-bold mb-2">
              Certifications
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box>
                  <Typography variant="body2" className="font-semibold">
                    AWS Certified Solutions Architect
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Issued: 2022
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <Typography variant="body2" className="font-semibold">
                    Certified Kubernetes Administrator
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Issued: 2021
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
} 