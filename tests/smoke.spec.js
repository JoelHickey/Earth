import { test, expect } from '@playwright/test';

test('app loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Joel Hickey \| Portfolio/i);
});

test('default view shows desktop icons', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Curriculum Vitae', { exact: true })).toBeVisible();
  await expect(page.getByText('Streamlining Amendments', { exact: true })).toBeVisible();
  await expect(page.getByText('Travel Insurance', { exact: true })).toBeVisible();
});
