import { test, expect } from '@playwright/test';

const openOldFlowWindow = async (page) => {
  await page.goto('/');
  await page.getByText('Flight Centre Amendments', { exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Streamlining amendments' })).toBeVisible();
  const demoToggle = page.getByText('Interactive Demo', { exact: true });
  await expect(demoToggle).toBeVisible();
  await demoToggle.click();

  await expect(page.getByRole('heading', { name: 'Hawaii Family Vacation' })).toBeVisible();
  await expect(page.getByTitle('Actions menu').first()).toBeVisible();
};

const openOldFlowAmendModal = async (page) => {
  await openOldFlowWindow(page);
  await page.getByTitle('Actions menu').first().click();
  await page.getByText('🐢 Amend (Old Flow)').click();
  await expect(page.getByRole('heading', { name: 'Amend Hotel' })).toBeVisible();
};

const selectAmendmentOptions = async (page) => {
  await page.locator('#amendment-reason').click();
  await page.getByRole('option', { name: 'Downgrade' }).click();

  await page.locator('#amendment-type').click();
  await page.getByRole('option', { name: 'Pricing Adjustment' }).click();
};

const goToSearchResults = async (page) => {
  await openOldFlowAmendModal(page);
  await selectAmendmentOptions(page);

  await page.getByRole('button', { name: /Continue to Travellers/i }).click();
  await expect(page.getByText('Select Travellers for Amendment')).toBeVisible();

  await page.getByRole('button', { name: /Continue to Search/i }).click();
  await expect(page.getByText('Search Parameters')).toBeVisible();

  await page.getByRole('button', { name: /Search Availability/i }).click();
  await expect(page.getByText('Searching available hotels...')).toBeVisible({ timeout: 5000 });
  await expect(page.getByText('Searching available hotels...')).toBeHidden({ timeout: 20000 });
  await expect(page.getByText('Found 8 available hotels')).toBeVisible({ timeout: 15000 });
};

const goToCartPage = async (page) => {
  await goToSearchResults(page);
  await expect(page.getByRole('button', { name: /Select Room/i }).first()).toBeVisible({ timeout: 15000 });
  await page.getByRole('button', { name: /Select Room/i }).first().click();
  await expect(page.getByRole('button', { name: /Add to Cart/i })).toBeVisible({ timeout: 15000 });
  await page.getByRole('button', { name: /Add to Cart/i }).click();
  await expect(page.getByRole('button', { name: /Proceed to Travellers/i })).toBeVisible({ timeout: 10000 });
};

const goToTravellersPage = async (page) => {
  await goToCartPage(page);
  await page.getByRole('button', { name: /Proceed to Travellers/i }).click();
  await expect(page.getByRole('button', { name: /Go to Payment/i })).toBeVisible({ timeout: 10000 });
};

const goToPaymentPage = async (page) => {
  await goToTravellersPage(page);
  await page.getByRole('button', { name: /Go to Payment/i }).scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: /Go to Payment/i }).click({ force: true });
  await expect(page.getByText('Loading payment form...')).toBeVisible({ timeout: 5000 });
  await expect(page.getByText('Loading payment form...')).toBeHidden({ timeout: 20000 });
  await expect(page.getByText('Credit Card Details')).toBeVisible({ timeout: 20000 });
};

test('open amendments case study from desktop icon', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Flight Centre Amendments', { exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Streamlining amendments' })).toBeVisible();
});

test('old flow amend modal validation + cancel', async ({ page }) => {
  test.setTimeout(60000);
  await openOldFlowAmendModal(page);

  const continueToTravellers = page.getByRole('button', { name: /Continue to Travellers/i });
  await expect(continueToTravellers).toHaveAttribute('aria-disabled', 'true');

  await page.locator('#amendment-reason').click();
  await page.getByRole('option', { name: 'Downgrade' }).click();

  await expect(page.getByText('Amendment Fee')).toHaveCount(0);
  await expect(continueToTravellers).toHaveAttribute('aria-disabled', 'true');

  await page.locator('#amendment-type').click();
  await page.getByRole('option', { name: 'Pricing Adjustment' }).click();

  await expect(page.getByText('Amendment Fee')).toBeVisible();
  await expect(continueToTravellers).toHaveAttribute('aria-disabled', 'false');

  await page.getByRole('button', { name: 'Cancel' }).click();
  await expect(page.getByRole('heading', { name: 'Amend Hotel' })).toHaveCount(0);
});

test('old flow travellers modal back + close', async ({ page }) => {
  test.setTimeout(80000);
  await openOldFlowAmendModal(page);
  await selectAmendmentOptions(page);

  await page.getByRole('button', { name: /Continue to Travellers/i }).click();
  await expect(page.getByText('Select Travellers for Amendment')).toBeVisible();

  await page.getByRole('button', { name: /Back/i }).click();
  await expect(page.getByRole('heading', { name: 'Amend Hotel' })).toBeVisible();
  await page.getByRole('button', { name: /Continue to Travellers/i }).click();
  await expect(page.getByText('Select Travellers for Amendment')).toBeVisible();

  await page.getByRole('button', { name: 'Close travellers modal' }).click();
  await expect(page.getByText('Select Travellers for Amendment')).toHaveCount(0);
});

test('old flow search modal back + room selection gate', async ({ page }) => {
  test.setTimeout(120000);
  await openOldFlowAmendModal(page);
  await selectAmendmentOptions(page);

  await page.getByRole('button', { name: /Continue to Travellers/i }).click();
  await expect(page.getByText('Select Travellers for Amendment')).toBeVisible();
  await page.getByRole('button', { name: /Continue to Search/i }).click();
  await expect(page.getByText('Search Parameters')).toBeVisible();

  await page.getByRole('button', { name: /Back/i }).click();
  await expect(page.getByText('Select Travellers for Amendment')).toBeVisible();
  await page.getByRole('button', { name: /Continue to Search/i }).click();
  await expect(page.getByText('Search Parameters')).toBeVisible();

  await page.getByRole('button', { name: /Search Availability/i }).click();
  await expect(page.getByText('Searching available hotels...')).toBeVisible({ timeout: 5000 });
  await expect(page.getByText('Searching available hotels...')).toBeHidden({ timeout: 20000 });
  await expect(page.getByRole('button', { name: /Add to Cart/i })).toHaveCount(0);

  await expect(page.getByRole('button', { name: /Select Room/i }).first()).toBeVisible({ timeout: 15000 });
  await page.getByRole('button', { name: /Select Room/i }).first().click();
  await expect(page.getByRole('button', { name: /Add to Cart/i })).toBeVisible({ timeout: 15000 });
});

test('old flow search results back + cancel', async ({ page }) => {
  test.setTimeout(120000);
  await goToSearchResults(page);

  await page.getByRole('button', { name: 'Back to Search' }).click();
  await expect(page.getByText('Search Parameters')).toBeVisible();

  await page.getByRole('button', { name: /Search Availability/i }).click();
  await expect(page.getByText('Found 8 available hotels')).toBeVisible({ timeout: 15000 });

  await page.getByRole('button', { name: 'Cancel amendment' }).click();
  await expect(page.getByRole('heading', { name: 'Hawaii Family Vacation' })).toBeVisible();
  await expect(page.getByText('Found 8 available hotels')).toHaveCount(0);
});

test('old flow cart back + cancel', async ({ page }) => {
  test.setTimeout(120000);
  await goToCartPage(page);

  await page.getByRole('button', { name: 'Back to Results' }).click();
  await expect(page.getByText('Found 8 available hotels')).toBeVisible({ timeout: 15000 });

  await page.getByRole('button', { name: /Select Room/i }).first().click();
  await page.getByRole('button', { name: /Add to Cart/i }).click();
  await expect(page.getByRole('button', { name: /Proceed to Travellers/i })).toBeVisible({ timeout: 10000 });

  await page.getByRole('button', { name: 'Cancel amendment' }).click();
  await expect(page.getByRole('heading', { name: 'Hawaii Family Vacation' })).toBeVisible();
  await expect(page.getByRole('button', { name: /Proceed to Travellers/i })).toHaveCount(0);
});

test('old flow travellers back + cancel', async ({ page }) => {
  test.setTimeout(120000);
  await goToTravellersPage(page);

  await page.getByRole('button', { name: 'Back to Review' }).click();
  await expect(page.getByRole('button', { name: /Proceed to Travellers/i })).toBeVisible({ timeout: 10000 });

  await page.getByRole('button', { name: /Proceed to Travellers/i }).click();
  await expect(page.getByRole('button', { name: /Go to Payment/i })).toBeVisible({ timeout: 10000 });

  await page.getByRole('button', { name: 'Cancel amendment' }).click();
  await expect(page.getByRole('heading', { name: 'Hawaii Family Vacation' })).toBeVisible();
  await expect(page.getByRole('button', { name: /Go to Payment/i })).toHaveCount(0);
});

test('old flow payment back + cancel', async ({ page }) => {
  test.setTimeout(150000);
  await goToPaymentPage(page);

  await page.getByRole('button', { name: 'Back to Travellers' }).click();
  await expect(page.getByRole('button', { name: /Go to Payment/i })).toBeVisible({ timeout: 10000 });

  await goToPaymentPage(page);
  await page.getByRole('button', { name: 'Cancel amendment' }).click();
  await expect(page.getByRole('heading', { name: 'Hawaii Family Vacation' })).toBeVisible();
});

test('old flow data integrity across cart and payment', async ({ page }) => {
  test.setTimeout(150000);
  await goToSearchResults(page);

  await page.getByText('Royal Hawaiian Resort', { exact: true }).scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: /Select Room/i }).nth(1).click();
  await page.getByRole('button', { name: /Add to Cart/i }).click();

  await expect(page.getByRole('heading', { name: 'Royal Hawaiian Resort' }).first()).toBeVisible();
  await page.getByRole('button', { name: /Proceed to Travellers/i }).click();
  await page.getByRole('button', { name: /Go to Payment/i }).scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: /Go to Payment/i }).click({ force: true });
  await expect(page.getByText('Credit Card Details')).toBeVisible({ timeout: 20000 });

  await expect(page.getByText('Payment Summary')).toBeVisible();
  await expect(page.getByText('Hotel booking')).toBeVisible();
  await expect(page.getByText('$425')).toBeVisible();
});

test('old flow accessibility labels exist', async ({ page }) => {
  test.setTimeout(60000);
  await openOldFlowWindow(page);

  await expect(page.getByText('Interactive Demo', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Actions menu' }).first()).toBeVisible();

  await openOldFlowAmendModal(page);
  await expect(page.getByRole('button', { name: 'Close amend modal' })).toBeVisible();
});

test('old flow responsive search results actions', async ({ page }) => {
  test.setTimeout(120000);
  await page.setViewportSize({ width: 375, height: 667 });
  await goToSearchResults(page);

  await expect(page.getByRole('button', { name: 'Back to Search' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Cancel amendment' })).toBeVisible();
});

test('old flow visual snapshot search results', async ({ page, browserName }) => {
  test.setTimeout(120000);
  if (browserName !== 'chromium') {
    test.skip();
  }
  await goToSearchResults(page);

  const resultsContainer = page.getByText('Found 8 available hotels').locator('..');
  await expect(resultsContainer).toHaveScreenshot('old-flow-search-results.png', {
    animations: 'disabled'
  });
});
test('old flow amendment task completes', async ({ page }) => {
  test.setTimeout(150000);
  await openOldFlowAmendModal(page);
  await selectAmendmentOptions(page);

  await page.getByRole('button', { name: /Continue to Travellers/i }).click();
  await expect(page.getByText('Select Travellers for Amendment')).toBeVisible();

  await page.getByRole('button', { name: /Continue to Search/i }).click();
  await expect(page.getByText('Search Parameters')).toBeVisible();

  await page.getByRole('button', { name: /Search Availability/i }).click();
  await expect(page.getByText('Searching available hotels...')).toBeVisible({ timeout: 5000 });
  await expect(page.getByText('Searching available hotels...')).toBeHidden({ timeout: 20000 });
  await expect(page.getByRole('button', { name: /Select Room/i }).first()).toBeVisible({ timeout: 15000 });
  await page.getByRole('button', { name: /Select Room/i }).first().click();
  await expect(page.getByRole('button', { name: /Add to Cart/i })).toBeVisible({ timeout: 15000 });
  await page.getByRole('button', { name: /Add to Cart/i }).click();

  await expect(page.getByRole('button', { name: /Proceed to Travellers/i })).toBeVisible({ timeout: 10000 });
  await page.getByRole('button', { name: /Proceed to Travellers/i }).click();

  await expect(page.getByRole('button', { name: /Go to Payment/i })).toBeVisible({ timeout: 10000 });
  await page.getByRole('button', { name: /Go to Payment/i }).scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: /Go to Payment/i }).click({ force: true });

  await expect(page.getByText('Loading payment form...')).toBeVisible({ timeout: 5000 });
  await expect(page.getByText('Loading payment form...')).toBeHidden({ timeout: 20000 });
  await expect(page.getByText('Credit Card Details')).toBeVisible({ timeout: 20000 });
  await page.getByText('Payment Summary').scrollIntoViewIfNeeded();
  await expect(page.getByRole('button', { name: /Confirm Payment/i })).toBeVisible({ timeout: 15000 });
  await page.getByRole('button', { name: /Confirm Payment/i }).click({ force: true });

  await expect(page.getByText('Amendment Completed')).toBeVisible({ timeout: 20000 });
});

test('old flow actions menu toggles', async ({ page }) => {
  test.setTimeout(30000);
  await openOldFlowWindow(page);

  const actionsMenu = page.getByTitle('Actions menu').first();
  await actionsMenu.click();
  await expect(page.getByText('🐢 Amend (Old Flow)')).toBeVisible();

  await actionsMenu.click();
  await expect(page.getByText('🐢 Amend (Old Flow)')).toHaveCount(0);
});

test('old flow tabs navigation', async ({ page }) => {
  test.setTimeout(60000);
  await openOldFlowWindow(page);

  await page.getByRole('tab', { name: /documents/i }).click();
  await expect(page.getByText('Documents Screen')).toBeVisible();

  await page.getByRole('tab', { name: /payments/i }).click();
  await expect(page.getByText('Payments Screen')).toBeVisible();

  await page.getByRole('tab', { name: /notes/i }).click();
  await expect(page.getByText('Notes Screen')).toBeVisible();

  await page.getByRole('tab', { name: /history/i }).click();
  await expect(page.getByText('History Screen')).toBeVisible();

  await page.getByRole('tab', { name: /itinerary/i }).click();
  await expect(page.getByRole('heading', { name: 'Hawaii Family Vacation' })).toBeVisible();
});

test('old flow demo toggle returns case study', async ({ page }) => {
  test.setTimeout(60000);
  await openOldFlowWindow(page);

  await page.getByText('Interactive Demo', { exact: true }).click();
  const discoveryHeading = page.getByText('Discovery', { exact: true });
  await discoveryHeading.scrollIntoViewIfNeeded();
  await expect(discoveryHeading).toBeVisible({ timeout: 15000 });
});

test('old flow amend modal close icon', async ({ page }) => {
  test.setTimeout(60000);
  await openOldFlowAmendModal(page);

  await page.getByRole('button', { name: 'Close amend modal' }).click();
  await expect(page.getByRole('heading', { name: 'Amend Hotel' })).toHaveCount(0);
});

test('old flow search modal close icon', async ({ page }) => {
  test.setTimeout(80000);
  await openOldFlowAmendModal(page);
  await selectAmendmentOptions(page);

  await page.getByRole('button', { name: /Continue to Travellers/i }).click();
  await expect(page.getByText('Select Travellers for Amendment')).toBeVisible();
  await page.getByRole('button', { name: /Continue to Search/i }).click();
  await expect(page.getByText('Search Parameters')).toBeVisible();

  await page.getByRole('button', { name: 'Close search modal' }).click();
  await expect(page.getByText('Search Parameters')).toHaveCount(0);
});

test('old flow header close exits window', async ({ page }) => {
  test.setTimeout(40000);
  await openOldFlowWindow(page);

  await page.getByRole('button', { name: 'Close Amendments' }).click();
  await expect(page.getByRole('heading', { name: 'Streamlining amendments' })).toHaveCount(0);
});

test('new flow amendment task can start', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Flight Centre Amendments', { exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Streamlining amendments' })).toBeVisible();
  const demoToggle = page.getByText('Interactive Demo', { exact: true });
  await expect(demoToggle).toBeVisible();
  await demoToggle.click();

  await page.getByTitle('Actions menu').first().click();
  await page.getByText('⚡ Amend (New Flow)').click();
  await expect(page.getByText('Search Parameters')).toBeVisible();
});

test('dream flow amendment task can start', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Flight Centre Amendments', { exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Streamlining amendments' })).toBeVisible();
  const demoToggle = page.getByText('Interactive Demo', { exact: true });
  await expect(demoToggle).toBeVisible();
  await demoToggle.click();

  await page.getByTitle('Actions menu').first().click();
  await page.getByText('🚀 Amend (Dream Flow)').click();
  await expect(page.getByText('AI-Powered Amendment')).toBeVisible();
});
