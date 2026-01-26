import { test, expect } from '@playwright/test';

test('CV window visual snapshot', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  await page.getByText('CV', { exact: true }).click();
  const cvWindow = page.getByLabel('CV window');
  await expect(cvWindow).toBeVisible();
  await expect(cvWindow).toHaveScreenshot('cv-window.png');
});

test('CV heading visual snapshot', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  await page.getByText('CV', { exact: true }).click();
  const heading = page.getByRole('heading', { name: 'Joel Hickey' });
  await expect(heading).toBeVisible();
  await expect(heading).toHaveScreenshot('cv-heading.png');
});
