import { test, expect } from '@playwright/test';

const openOldFlowWindow = async (page) => {
  await page.goto('/');
  const amendmentsIcon = page.locator('[aria-label="Flight Centre Amendments"]');
  await expect(amendmentsIcon).toHaveCount(1);
  await amendmentsIcon.click({ force: true });
  await expect(page.getByRole('heading', { name: 'Streamlining amendments' })).toBeVisible();
  const demoToggle = page.getByRole('switch', { name: 'Interactive demo toggle' });
  await expect(demoToggle).toBeVisible();
  await demoToggle.click();

  const demoWindow = page.getByRole('region', { name: 'Amendments demo window' });
  await expect(demoWindow).toBeVisible();
  await expect(page.getByText('Hawaii Family Vacation', { exact: true })).toBeVisible();
  return demoWindow;
};

const openOldFlowAmendModal = async (page) => {
  await openOldFlowWindow(page);
  await page.getByRole('button', { name: 'More options' }).first().click();
  await page.getByText('🐢 Amend (Old Flow)').click();
  await expect(page.getByRole('heading', { name: 'Amend Hotel' })).toBeVisible();
};

const selectAmendmentOptions = async (page) => {
  await page.getByRole('combobox', { name: 'Reason for Amendment' }).selectOption('downgrade');
  await page.getByRole('combobox', { name: 'Type of Amendment' }).selectOption('pricing_adjustment');
};

test('capture old flow screenshots', async ({ page }) => {
  test.setTimeout(180000);
  await page.setViewportSize({ width: 1280, height: 800 });

  const demoWindow = await openOldFlowWindow(page);
  await demoWindow.screenshot({ path: 'tests/artifacts/old-flow-itinerary.png' });

  await page.getByRole('button', { name: 'More options' }).first().click();
  await page.getByText('🐢 Amend (Old Flow)').click();
  const amendModal = page.getByRole('dialog', { name: 'Amend Hotel' });
  await expect(amendModal).toBeVisible();
  await amendModal.screenshot({ path: 'tests/artifacts/old-flow-amend-modal.png' });

  await selectAmendmentOptions(page);
  await page.getByRole('button', { name: /Continue to Travellers/i }).click();
  const travellersModal = page.getByRole('dialog', { name: 'Adjust Travellers' });
  await expect(travellersModal).toBeVisible();
  await travellersModal.screenshot({ path: 'tests/artifacts/old-flow-travellers-modal.png' });

  await page.getByRole('button', { name: /Continue to Search/i }).click();
  const searchModal = page.getByRole('dialog', { name: 'Search Parameters' });
  await expect(searchModal).toBeVisible();
  await searchModal.screenshot({ path: 'tests/artifacts/old-flow-search-parameters.png' });

  await page.getByRole('button', { name: /Search Availability/i }).click();
  await expect(page.getByText('Searching available hotels...')).toBeVisible({ timeout: 10000 });
  await expect(page.getByText('Searching available hotels...')).toBeHidden({ timeout: 30000 });
  await expect(page.getByText('Found 8 available hotels')).toBeVisible({ timeout: 15000 });
  await demoWindow.screenshot({ path: 'tests/artifacts/old-flow-search-results.png' });

  await page.getByRole('button', { name: /Select Room/i }).first().click();
  await page.getByRole('button', { name: /Add to Cart/i }).click();
  await expect(page.getByText('New Hotel Selection')).toBeVisible({ timeout: 10000 });
  await demoWindow.screenshot({ path: 'tests/artifacts/old-flow-cart.png' });

  await page.getByRole('button', { name: /Proceed to Travellers/i }).click();
  await expect(page.getByText('Traveller 1')).toBeVisible({ timeout: 10000 });
  await demoWindow.screenshot({ path: 'tests/artifacts/old-flow-travellers.png' });

  await page.getByRole('button', { name: /Go to Payment/i }).scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: /Go to Payment/i }).click({ force: true });
  await expect(page.getByText('Loading payment form...')).toBeVisible({ timeout: 10000 });
  await expect(page.getByText('Loading payment form...')).toBeHidden({ timeout: 30000 });
  await expect(page.getByText('Credit Card Details')).toBeVisible({ timeout: 20000 });
  await demoWindow.screenshot({ path: 'tests/artifacts/old-flow-payment.png' });
});
