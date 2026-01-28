import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('CV window has no accessibility violations', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Curriculum Vitae', { exact: true }).click();
  await expect(page.getByText('Senior Product Designer')).toBeVisible();

  const results = await new AxeBuilder({ page })
    .include('[aria-label="Curriculum Vitae window"]')
    .withTags(['wcag2a', 'wcag2aa', 'wcag2aaa', 'best-practice'])
    .exclude('iframe')
    .analyze();

  expect(results.violations).toEqual([]);
});
