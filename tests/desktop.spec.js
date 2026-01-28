import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('desktop icons are accessible buttons', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Curriculum Vitae' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Flight Centre Amendments' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Flight Centre Insurance' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Earth' })).toBeVisible();
});

test('desktop icons are keyboard activatable', async ({ page }) => {
  await page.goto('/');
  const cvIcon = page.getByRole('button', { name: 'Curriculum Vitae' });
  await cvIcon.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByText('Senior Product Designer')).toBeVisible();
});

test('desktop icons meet target size', async ({ page }) => {
  await page.goto('/');
  const icons = [
    page.getByRole('button', { name: 'Curriculum Vitae' }),
    page.getByRole('button', { name: 'Flight Centre Amendments' }),
    page.getByRole('button', { name: 'Flight Centre Insurance' }),
    page.getByRole('button', { name: 'Earth' })
  ];

  for (const icon of icons) {
    const box = await icon.boundingBox();
    expect(box).not.toBeNull();
    expect(box.width).toBeGreaterThanOrEqual(44);
    expect(box.height).toBeGreaterThanOrEqual(44);
  }
});

test('desktop icons show hover and focus outlines', async ({ page }) => {
  await page.goto('/');
  const cvIcon = page.getByRole('button', { name: 'Curriculum Vitae' });

  await cvIcon.hover();
  const hoverOutlineStyle = await cvIcon.evaluate((el) => getComputedStyle(el).outlineStyle);
  const hoverOutlineWidth = await cvIcon.evaluate((el) => parseFloat(getComputedStyle(el).outlineWidth));
  expect(hoverOutlineStyle).not.toBe('none');
  expect(hoverOutlineWidth).toBeGreaterThan(0);

  await cvIcon.focus();
  const focusOutlineStyle = await cvIcon.evaluate((el) => getComputedStyle(el).outlineStyle);
  const focusOutlineWidth = await cvIcon.evaluate((el) => parseFloat(getComputedStyle(el).outlineWidth));
  expect(focusOutlineStyle).not.toBe('none');
  expect(focusOutlineWidth).toBeGreaterThan(0);
});

test('desktop view has no serious accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .exclude('iframe')
    .analyze();

  const seriousViolations = results.violations.filter(
    (violation) => violation.impact === 'critical' || violation.impact === 'serious'
  );

  expect(seriousViolations).toEqual([]);
});
