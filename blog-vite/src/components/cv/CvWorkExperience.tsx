'use client';

import { Typography, Box, Accordion, AccordionSummary, AccordionDetails, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CvData } from './data';

export default function CvWorkExperience() {
  return (
    <Box className="mb-8">
      <Typography variant="h6" className="mb-4">
        Work Experience
      </Typography>
      {CvData.map((work, index) => (
        <Accordion key={index} className="mb-2">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box>
              <Typography variant="subtitle1" className="font-bold">
                {work.jobTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {work.placeWithDate}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {work.description && (
              <Typography variant="body2" className="mb-4">
                {work.description}
              </Typography>
            )}
            
            {work.projects && work.projects.length > 0 && (
              <Box className="mb-4">
                <Typography variant="subtitle2" className="font-bold mb-2">
                  Projects:
                </Typography>
                {work.projects.map((project, pIndex) => (
                  <Box key={pIndex} className="mb-2">
                    <Typography variant="subtitle2" className="font-semibold">
                      {project.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {project.timeframe.startDate.format('MM.YYYY')} - {project.timeframe.endDate.format('MM.YYYY')}
                    </Typography>
                    <Typography variant="body2" className="mt-1">
                      {project.description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}

            <Grid container spacing={2}>
              {work.frontend && (
                <Grid item xs={12} md={4}>
                  <Box>
                    <Typography variant="subtitle2" className="font-bold">
                      Frontend
                    </Typography>
                    <Typography variant="body2" className="mt-1">
                      {work.frontend.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="mt-1">
                      {work.frontend.techStack}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {work.backend && (
                <Grid item xs={12} md={4}>
                  <Box>
                    <Typography variant="subtitle2" className="font-bold">
                      Backend
                    </Typography>
                    <Typography variant="body2" className="mt-1">
                      {work.backend.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="mt-1">
                      {work.backend.techStack}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {work.devops && (
                <Grid item xs={12} md={4}>
                  <Box>
                    <Typography variant="subtitle2" className="font-bold">
                      DevOps
                    </Typography>
                    <Typography variant="body2" className="mt-1">
                      {work.devops.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="mt-1">
                      {work.devops.techStack}
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
} 