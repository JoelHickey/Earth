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

test('CV close button meets 44px target size', async ({ page }) => {
  await page.goto('/');
  await page.getByText('CV', { exact: true }).click();
  const closeButton = page.getByRole('button', { name: '✕' });
  await expect(closeButton).toBeVisible();
  const box = await closeButton.boundingBox();
  expect(box).not.toBeNull();
  expect(box.width).toBeGreaterThanOrEqual(44);
  expect(box.height).toBeGreaterThanOrEqual(44);
});

test('CV close button keeps distance from scrollbar', async ({ page }) => {
  await page.goto('/');
  await page.getByText('CV', { exact: true }).click();

  const cvContent = page.getByLabel('CV content');
  const cvWindow = cvContent.locator('..');
  const closeButton = cvWindow.getByRole('button', { name: '✕' });

  await expect(closeButton).toBeVisible();
  const contentBox = await cvContent.boundingBox();
  const closeBox = await closeButton.boundingBox();

  expect(contentBox).not.toBeNull();
  expect(closeBox).not.toBeNull();

  const gap = contentBox.x + contentBox.width - (closeBox.x + closeBox.width);
  expect(gap).toBeGreaterThanOrEqual(8);
});
