'use client';

import { useEffect, useState } from 'react';

const GUIDE_STORAGE_KEY = 'cv-guide-dismissed';

export default function CvGuide() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const dismissed = localStorage.getItem(GUIDE_STORAGE_KEY);
    if (dismissed) return;

    const timer = setTimeout(async () => {
      const introJs = (await import('intro.js')).default;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - CSS dynamic import
      await import('intro.js/introjs.css');

      const intro = introJs();
      intro.setOptions({
        steps: [
          {
            element: '#cv-filters',
            intro: '<strong>Filter by specialization</strong><br/>Toggle <b>Frontend</b>, <b>Backend</b>, <b>DevOps</b>, or <b>AI/LLM</b> to reveal detailed tech stacks and descriptions for each work position.',
            position: 'bottom',
          },
          {
            element: '#cv-reset-btn',
            intro: '<strong>Reset filters</strong><br/>Click here to clear all active filters and return to the default CV view.',
            position: 'bottom',
          },
          {
            element: '#cv-print-btn',
            intro: '<strong>Print / Save as PDF</strong><br/>Prints only the CV content — no sidebar or navigation. Perfect for saving a clean PDF copy.',
            position: 'left',
          },
        ],
        showProgress: true,
        showBullets: true,
        exitOnOverlayClick: true,
        doneLabel: 'Got it!',
        nextLabel: 'Next →',
        prevLabel: '← Back',
      });

      intro.oncomplete(() => {
        localStorage.setItem(GUIDE_STORAGE_KEY, 'true');
      });

      intro.onexit(() => {
        localStorage.setItem(GUIDE_STORAGE_KEY, 'true');
      });

      intro.start();
    }, 500);

    return () => clearTimeout(timer);
  }, [ready]);

  return null;
}
