import { test, expect } from '@playwright/test';

test('app loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Earth - React95 Style/i);
});

test('default view shows desktop icons', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Curriculum Vitae', { exact: true })).toBeVisible();
  await expect(page.getByText('Flight Centre Amendments', { exact: true })).toBeVisible();
  await expect(page.getByText('Flight Centre Insurance', { exact: true })).toBeVisible();
});
