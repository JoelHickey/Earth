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

test('CV font sizes meet minimum readability thresholds', async ({ page }) => {
  await page.goto('/');
  await page.getByText('CV', { exact: true }).click();

  const title = page.getByRole('heading', { name: 'Joel Hickey' });
  const sectionHeading = page.getByRole('heading', { name: 'Introduction' });
  const bodyParagraph = page.getByText(
    'At an early age I was blessed with a passion for design',
    { exact: false }
  );

  const titleSize = await title.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
  const headingSize = await sectionHeading.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
  const bodySize = await bodyParagraph.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));

  expect(titleSize).toBeGreaterThanOrEqual(32);
  expect(headingSize).toBeGreaterThanOrEqual(20);
  expect(bodySize).toBeGreaterThanOrEqual(14);
});

test('CV story buttons meet minimum text size', async ({ page }) => {
  await page.goto('/');
  await page.getByText('CV', { exact: true }).click();

  const buttons = [
    page.getByRole('button', { name: 'View Amendments story' }),
    page.getByRole('button', { name: 'View Travel insurance story' }),
    page.getByRole('button', { name: 'View Bulk shipments story' })
  ];

  for (const button of buttons) {
    await expect(button).toBeVisible();
    const fontSize = await button.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    expect(fontSize).toBeGreaterThanOrEqual(12);
  }
});

test('CV headings follow a basic hierarchy', async ({ page }) => {
  await page.goto('/');
  await page.getByText('CV', { exact: true }).click();

  const h1 = page.getByRole('heading', { level: 1 });
  const h2 = page.getByRole('heading', { level: 2 });

  await expect(h1).toHaveCount(1);
  const h2Count = await h2.count();
  expect(h2Count).toBeGreaterThan(0);
});

test('CV section landmarks are labeled', async ({ page }) => {
  await page.goto('/');
  await page.getByText('CV', { exact: true }).click();

  await expect(page.getByRole('region', { name: 'Experience' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Education' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Tools' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Say Hello' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'References' })).toBeVisible();
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

test('CV focus indicators are visible', async ({ page }) => {
  await page.goto('/');
  await page.getByText('CV', { exact: true }).click();

  const closeButton = page.getByRole('button', { name: '✕' });
  const dribbbleLink = page.getByRole('link', { name: 'Dribbble profile' });

  await closeButton.focus();
  const closeOutlineStyle = await closeButton.evaluate((el) => getComputedStyle(el).outlineStyle);
  const closeOutlineWidth = await closeButton.evaluate((el) => parseFloat(getComputedStyle(el).outlineWidth));
  expect(closeOutlineStyle).not.toBe('none');
  expect(closeOutlineWidth).toBeGreaterThan(0);

  await dribbbleLink.focus();
  const linkOutlineStyle = await dribbbleLink.evaluate((el) => getComputedStyle(el).outlineStyle);
  const linkOutlineWidth = await dribbbleLink.evaluate((el) => parseFloat(getComputedStyle(el).outlineWidth));
  expect(linkOutlineStyle).not.toBe('none');
  expect(linkOutlineWidth).toBeGreaterThan(0);
});

test('CV hover styles are visible on links', async ({ page }) => {
  await page.goto('/');
  await page.getByText('CV', { exact: true }).click();

  const amendmentsButton = page.getByRole('button', { name: 'View Amendments story' });
  const dribbbleLink = page.getByRole('link', { name: 'Dribbble profile' });

  await amendmentsButton.hover();
  const buttonDecoration = await amendmentsButton.evaluate(
    (el) => getComputedStyle(el).textDecorationLine
  );
  expect(buttonDecoration).toContain('underline');

  await dribbbleLink.hover();
  const linkDecoration = await dribbbleLink.evaluate(
    (el) => getComputedStyle(el).textDecorationLine
  );
  expect(linkDecoration).toContain('underline');
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

test('CV story links have descriptive aria labels', async ({ page }) => {
  await page.goto('/');
  await page.getByText('CV', { exact: true }).click();

  await expect(page.getByRole('button', { name: 'View Amendments story' })).toHaveAttribute(
    'aria-label',
    'View Amendments story'
  );
  await expect(page.getByRole('button', { name: 'View Travel insurance story' })).toHaveAttribute(
    'aria-label',
    'View Travel insurance story'
  );
  await expect(page.getByRole('button', { name: 'View Bulk shipments story' })).toHaveAttribute(
    'aria-label',
    'View Bulk shipments story'
  );
});

test('CV external profile link is present', async ({ page }) => {
  await page.goto('/');
  await page.getByText('CV', { exact: true }).click();
  const dribbbleLink = page.getByRole('link', { name: 'Dribbble profile' });
  await expect(dribbbleLink).toHaveAttribute('href', 'https://dribbble.com/joelhickey');
  await expect(dribbbleLink).toHaveAttribute('target', '_blank');
});

test('CV scroll position resets after reopen', async ({ page }) => {
  await page.goto('/');
  await page.getByText('CV', { exact: true }).click();
  const cvContent = page.getByLabel('CV content');
  await cvContent.evaluate((el) => {
    el.scrollTop = el.scrollHeight;
  });
  await page.getByRole('button', { name: '✕' }).click();
  await page.getByText('CV', { exact: true }).click();
  const scrollTop = await page.getByLabel('CV content').evaluate((el) => el.scrollTop);
  expect(scrollTop).toBe(0);
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

test('CV reflows at 200% zoom without horizontal scroll', async ({ page }) => {
  await page.setViewportSize({ width: 900, height: 700 });
  await page.goto('/');
  await page.getByText('CV', { exact: true }).click();

  await page.evaluate(() => {
    document.body.style.zoom = '2';
  });

  const cvContent = page.getByLabel('CV content');
  const scrollWidth = await cvContent.evaluate((el) => el.scrollWidth);
  const clientWidth = await cvContent.evaluate((el) => el.clientWidth);

  expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
});

test('CV reflows at 400% zoom without horizontal scroll', async ({ page }) => {
  await page.setViewportSize({ width: 900, height: 700 });
  await page.goto('/');
  await page.getByText('CV', { exact: true }).click();

  await page.evaluate(() => {
    document.body.style.zoom = '4';
  });

  const cvContent = page.getByLabel('CV content');
  const scrollWidth = await cvContent.evaluate((el) => el.scrollWidth);
  const clientWidth = await cvContent.evaluate((el) => el.clientWidth);

  expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
});
