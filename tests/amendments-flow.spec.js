import { test, expect } from '@playwright/test';

test('open amendments case study from desktop icon', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Flight Centre Amendments', { exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Flight Centre Amendments' })).toBeVisible();
});
