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

test('CV story buttons meet 44px target size', async ({ page }) => {
  await page.goto('/');
  await page.getByText('CV', { exact: true }).click();

  const buttons = [
    page.getByRole('button', { name: 'View Amendments story' }),
    page.getByRole('button', { name: 'View Travel insurance story' }),
    page.getByRole('button', { name: 'View Bulk shipments story' })
  ];

  for (const button of buttons) {
    await expect(button).toBeVisible();
    const box = await button.boundingBox();
    expect(box).not.toBeNull();
    expect(box.width).toBeGreaterThanOrEqual(44);
    expect(box.height).toBeGreaterThanOrEqual(44);
  }
});

test('CV dribbble link meets 44px target height', async ({ page }) => {
  await page.goto('/');
  await page.getByText('CV', { exact: true }).click();
  const dribbbleLink = page.getByRole('link', { name: 'Dribbble profile' });
  await expect(dribbbleLink).toBeVisible();
  const box = await dribbbleLink.boundingBox();
  expect(box).not.toBeNull();
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

test('CV keyboard navigation reaches close button', async ({ page }) => {
  await page.goto('/');
  await page.getByText('CV', { exact: true }).click();
  const closeButton = page.getByRole('button', { name: '✕' });
  await expect(closeButton).toBeVisible();
  await page.getByLabel('CV content').focus();

  let focused = false;
  for (let i = 0; i < 10; i += 1) {
    await page.keyboard.press('Shift+Tab');
    if (await closeButton.evaluate((el) => el === document.activeElement)) {
      focused = true;
      break;
    }
  }

  expect(focused).toBe(true);
});

test('CV scroll reaches lower sections', async ({ page }) => {
  await page.goto('/');
  await page.getByText('CV', { exact: true }).click();
  await page.getByRole('heading', { name: 'Education' }).scrollIntoViewIfNeeded();
  await expect(page.getByRole('heading', { name: 'Education' })).toBeVisible();
  await page.getByRole('heading', { name: 'Tools' }).scrollIntoViewIfNeeded();
  await expect(page.getByRole('heading', { name: 'Tools' })).toBeVisible();
  await page.getByRole('heading', { name: 'Say Hello' }).scrollIntoViewIfNeeded();
  await expect(page.getByRole('heading', { name: 'Say Hello' })).toBeVisible();
  await page.getByRole('heading', { name: 'References' }).scrollIntoViewIfNeeded();
  await expect(page.getByRole('heading', { name: 'References' })).toBeVisible();
});

test('CV link opens amendments story', async ({ page }) => {
  await page.goto('/');
  await page.getByText('CV', { exact: true }).click();
  await page.getByRole('button', { name: 'View Amendments story' }).click();
  await expect(page.getByRole('heading', { name: 'Flight Centre Amendments' })).toBeVisible();
});

test('CV link opens travel insurance story', async ({ page }) => {
  await page.goto('/');
  await page.getByText('CV', { exact: true }).click();
  await page.getByRole('button', { name: 'View Travel insurance story' }).click();
  await expect(page.getByRole('heading', { name: 'Travel Insurance Integration' })).toBeVisible();
});

test('CV external profile link is present', async ({ page }) => {
  await page.goto('/');
  await page.getByText('CV', { exact: true }).click();
  const dribbbleLink = page.getByRole('link', { name: 'Dribbble profile' });
  await expect(dribbbleLink).toHaveAttribute('href', 'https://dribbble.com/joelhickey');
  await expect(dribbbleLink).toHaveAttribute('target', '_blank');
});

test('CV window stays within small viewport', async ({ page }) => {
  await page.setViewportSize({ width: 900, height: 700 });
  await page.goto('/');
  await page.getByText('CV', { exact: true }).click();
  const cvWindow = page.getByLabel('CV window');
  const box = await cvWindow.boundingBox();
  expect(box).not.toBeNull();
  expect(box.width).toBeLessThanOrEqual(900);
  expect(box.height).toBeLessThanOrEqual(700);
});

test('CV focus remains inside window when tabbing', async ({ page }) => {
  await page.goto('/');
  await page.getByText('CV', { exact: true }).click();
  const cvWindow = page.getByLabel('CV window');
  await page.getByLabel('CV content').focus();
  await expect(cvWindow).toBeVisible();

  for (let i = 0; i < 12; i += 1) {
    await page.keyboard.press('Tab');
    const isInside = await page.evaluate(() => {
      const active = document.activeElement;
      return Boolean(active && active.closest('[aria-label="CV window"]'));
    });
    expect(isInside).toBe(true);
  }
});

test('CV window stays usable on mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByText('CV', { exact: true }).click();
  const cvWindow = page.getByLabel('CV window');
  const box = await cvWindow.boundingBox();
  expect(box).not.toBeNull();
  expect(box.width).toBeLessThanOrEqual(390);
  expect(box.height).toBeLessThanOrEqual(844);
  await expect(page.getByRole('heading', { name: 'Introduction' })).toBeVisible();
});
