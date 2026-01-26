import { test, expect } from '@playwright/test';

test('app loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Earth - React95 Style/i);
});

test('default view shows desktop icons', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('CV', { exact: true })).toBeVisible();
  await expect(page.getByText('FCTG Amendments', { exact: true })).toBeVisible();
  await expect(page.getByText('FCTG Insurance', { exact: true })).toBeVisible();
});
