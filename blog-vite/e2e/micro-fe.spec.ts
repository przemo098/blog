import { test, expect, type Page, type Locator } from '@playwright/test';

// page.locator pierces shadow DOM; page.getByTestId does NOT
function tid(page: Page, id: string) {
  return page.locator(`[data-testid="${id}"]`);
}

async function addIn(input: Locator, text: string) {
  await input.fill(text);
  await input.press('Enter');
}

async function getBusItemCount(page: Page): Promise<number> {
  return await page.evaluate(() => window.__microFeBus?.getState().items.length ?? 0);
}

test('Micro FE — add/edit/delete across all 4 frameworks with shared state', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('cv-guide-dismissed', 'true'));
  await page.goto('/micro-fe');

  // --- All 4 cards loaded ---
  const cards = page.locator('.grid > [class*="rounded-xl"]');
  await expect(cards).toHaveCount(4);

  // Inputs for each framework
  const reactInput = tid(page, 'react-todo-input');
  const angularInput = tid(page, 'angular-todo-input');
  const vueInput = tid(page, 'vue-todo-input');
  const blazorInput = tid(page, 'blazor-todo-input');

  // Wait for all micro FEs to fully load
  await expect(reactInput).toBeVisible({ timeout: 10000 });
  await expect(angularInput).toBeVisible({ timeout: 15000 });
  await expect(vueInput).toBeVisible({ timeout: 15000 });
  await expect(blazorInput).toBeVisible({ timeout: 30000 });

  // =============================================
  // 1. ADD in React → visible in all 4
  // =============================================
  await addIn(reactInput, 'From React');
  expect(await getBusItemCount(page)).toBe(1);
  await expect(tid(page, 'react-todo-item')).toHaveCount(1);
  await expect(tid(page, 'angular-todo-item')).toHaveCount(1, { timeout: 3000 });
  await expect(tid(page, 'vue-todo-item')).toHaveCount(1, { timeout: 3000 });
  await expect(tid(page, 'blazor-todo-item')).toHaveCount(1, { timeout: 3000 });

  // --- Verify edit/delete buttons visible in all 4 frameworks ---
  for (const fw of ['react', 'angular', 'vue', 'blazor']) {
    const item = tid(page, `${fw}-todo-item`).first();
    await expect(item.locator('button', { hasText: 'edit' })).toBeVisible({ timeout: 3000 });
    await expect(item.locator('button', { hasText: 'delete' })).toBeVisible({ timeout: 3000 });
  }

  // =============================================
  // 2. ADD in Angular → visible in all 4
  // =============================================
  await addIn(angularInput, 'From Angular');
  expect(await getBusItemCount(page)).toBe(2);
  await expect(tid(page, 'react-todo-item')).toHaveCount(2, { timeout: 3000 });
  await expect(tid(page, 'angular-todo-item')).toHaveCount(2);
  await expect(tid(page, 'vue-todo-item')).toHaveCount(2, { timeout: 3000 });
  await expect(tid(page, 'blazor-todo-item')).toHaveCount(2, { timeout: 3000 });

  // =============================================
  // 3. ADD in Vue → visible in all 4
  // =============================================
  await addIn(vueInput, 'From Vue');
  expect(await getBusItemCount(page)).toBe(3);
  await expect(tid(page, 'react-todo-item')).toHaveCount(3, { timeout: 3000 });
  await expect(tid(page, 'angular-todo-item')).toHaveCount(3, { timeout: 3000 });
  await expect(tid(page, 'vue-todo-item')).toHaveCount(3);
  await expect(tid(page, 'blazor-todo-item')).toHaveCount(3, { timeout: 3000 });

  // =============================================
  // 4. ADD in Blazor → visible in all 4
  // =============================================
  await addIn(blazorInput, 'From Blazor');
  expect(await getBusItemCount(page)).toBe(4);
  await expect(tid(page, 'react-todo-item')).toHaveCount(4, { timeout: 3000 });
  await expect(tid(page, 'angular-todo-item')).toHaveCount(4, { timeout: 3000 });
  await expect(tid(page, 'vue-todo-item')).toHaveCount(4, { timeout: 3000 });
  await expect(tid(page, 'blazor-todo-item')).toHaveCount(4);

  // =============================================
  // 5. EDIT + DELETE in React
  // =============================================
  await tid(page, 'react-todo-item').filter({ hasText: 'From React' }).locator('span').dblclick();
  await tid(page, 'react-todo-edit').fill('React Edited');
  await tid(page, 'react-todo-edit').press('Enter');
  await expect(tid(page, 'react-todo-item').filter({ hasText: 'React Edited' })).toBeVisible();

  await tid(page, 'react-todo-item').filter({ hasText: 'React Edited' }).locator('button', { hasText: 'delete' }).click();
  expect(await getBusItemCount(page)).toBe(3);

  // =============================================
  // 6. EDIT + DELETE in Angular
  // =============================================
  await tid(page, 'angular-todo-item').filter({ hasText: 'From Angular' }).locator('.todo-text').dblclick();
  const angularEdit = tid(page, 'angular-todo-edit');
  await angularEdit.clear();
  await angularEdit.pressSequentially('Angular Edited');
  await angularEdit.press('Enter');
  await expect(tid(page, 'angular-todo-item').filter({ hasText: 'Angular Edited' })).toBeVisible({ timeout: 3000 });

  await tid(page, 'angular-todo-item').filter({ hasText: 'Angular Edited' }).locator('button', { hasText: 'delete' }).click();
  expect(await getBusItemCount(page)).toBe(2);

  // =============================================
  // 7. EDIT + DELETE in Vue
  // =============================================
  await tid(page, 'vue-todo-item').filter({ hasText: 'From Vue' }).locator('.todo-text').dblclick();
  const vueEdit = tid(page, 'vue-todo-edit');
  await vueEdit.clear();
  await vueEdit.pressSequentially('Vue Edited');
  await vueEdit.press('Enter');
  await expect(tid(page, 'vue-todo-item').filter({ hasText: 'Vue Edited' })).toBeVisible({ timeout: 3000 });

  await tid(page, 'vue-todo-item').filter({ hasText: 'Vue Edited' }).locator('button', { hasText: 'delete' }).click();
  expect(await getBusItemCount(page)).toBe(1);

  // =============================================
  // 8. EDIT + DELETE in Blazor
  // =============================================
  await tid(page, 'blazor-todo-item').filter({ hasText: 'From Blazor' }).locator('button', { hasText: 'edit' }).click();
  await tid(page, 'blazor-todo-edit').fill('Blazor Edited');
  await tid(page, 'blazor-todo-edit').press('Enter');
  await expect(tid(page, 'blazor-todo-item').filter({ hasText: 'Blazor Edited' })).toBeVisible({ timeout: 3000 });

  await tid(page, 'blazor-todo-item').filter({ hasText: 'Blazor Edited' }).locator('button', { hasText: 'delete' }).click();
  expect(await getBusItemCount(page)).toBe(0);

  // All frameworks empty
  await expect(tid(page, 'react-todo-item')).toHaveCount(0);
  await expect(tid(page, 'angular-todo-item')).toHaveCount(0, { timeout: 3000 });
  await expect(tid(page, 'vue-todo-item')).toHaveCount(0, { timeout: 3000 });
  await expect(tid(page, 'blazor-todo-item')).toHaveCount(0, { timeout: 3000 });
});
