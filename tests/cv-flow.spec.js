import { test, expect } from '@playwright/test';

test('open CV window from desktop icon', async ({ page }) => {
  await page.goto('/');
  await page.getByText('CV', { exact: true }).click();
  await expect(page.getByText('Senior Product Designer')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Introduction' })).toBeVisible();
});

test('close CV window', async ({ page }) => {
  await page.goto('/');
  await page.getByText('CV', { exact: true }).click();
  await expect(page.getByText('Senior Product Designer')).toBeVisible();
  await page.getByRole('button', { name: '✕' }).click();
  await expect(page.getByText('Senior Product Designer')).not.toBeVisible();
});

test('scroll CV window to lower section', async ({ page }) => {
  await page.goto('/');
  await page.getByText('CV', { exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Introduction' })).toBeVisible();
  await page.getByText('Awards').scrollIntoViewIfNeeded();
  await expect(page.getByText('Awards')).toBeVisible();
});
