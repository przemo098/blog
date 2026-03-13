import { test, expect } from '@playwright/test';

test('CV scroll position stays stable when toggling all filters', async ({ page }) => {
  // Skip intro.js guide
  await page.addInitScript(() => {
    localStorage.setItem('cv-guide-dismissed', 'true');
  });

  await page.goto('/cv');
  await page.waitForSelector('[data-cv-block]');
  await page.waitForTimeout(500);

  // Find Volvo IT block and scroll it to the top (just below sticky header)
  const volvoBlock = page.locator('[data-cv-block]', { hasText: 'Volvo IT' });
  await volvoBlock.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);

  // Scroll so Volvo IT is right below the sticky header
  const headerHeight = await page.locator('.sticky').evaluate(el => el.getBoundingClientRect().height);
  const volvoBox = await volvoBlock.boundingBox();
  if (volvoBox) {
    await page.evaluate(
      ({ blockY, hHeight }) => window.scrollBy(0, blockY - hHeight - 5),
      { blockY: volvoBox.y, hHeight: headerHeight }
    );
  }
  await page.waitForTimeout(200);

  // Measure distance from sticky header bottom to Volvo IT top
  const gapBefore = await page.evaluate(() => {
    const header = document.querySelector('.sticky')!;
    const volvo = Array.from(document.querySelectorAll('[data-cv-block]')).find(el => el.textContent?.includes('Volvo IT'))!;
    return volvo.getBoundingClientRect().top - header.getBoundingClientRect().bottom;
  });

  // Toggle all three filters
  await page.locator('button:has-text("Frontend")').click({ force: true });
  await page.waitForTimeout(300);
  await page.locator('button:has-text("Backend")').click({ force: true });
  await page.waitForTimeout(300);
  await page.locator('button:has-text("DevOps")').click({ force: true });
  await page.waitForTimeout(300);

  // Measure gap again
  const gapAfter = await page.evaluate(() => {
    const header = document.querySelector('.sticky')!;
    const volvo = Array.from(document.querySelectorAll('[data-cv-block]')).find(el => el.textContent?.includes('Volvo IT'))!;
    return volvo.getBoundingClientRect().top - header.getBoundingClientRect().bottom;
  });

  const drift = Math.abs(gapAfter - gapBefore);
  expect(drift, `Gap changed by ${drift}px (before: ${gapBefore}px, after: ${gapAfter}px)`).toBeLessThan(5);
});
