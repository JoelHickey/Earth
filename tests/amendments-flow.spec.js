import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { registerAmendmentsBaselineTests } from './utils/uiBaselineChecks';

const openOldFlowWindow = async (page) => {
  await page.goto('/');
  const amendmentsIcon = page.getByRole('button', { name: 'Streamlining Amendments' });
  await expect(amendmentsIcon).toBeVisible({ timeout: 30000 });
  await amendmentsIcon.click();
  await expect(page.getByRole('heading', { name: 'Streamlining Amendments' })).toBeVisible();
  const demoToggle = page.getByRole('switch', { name: 'Interactive demo toggle' });
  await expect(demoToggle).toBeVisible();
  await demoToggle.click();

  const demoWindow = page.getByRole('region', { name: 'Amendments demo window' });
  await expect(demoWindow).toBeVisible();
  await expect(page.getByText('Hawaii Family Vacation', { exact: true })).toBeVisible();
  const actionsMenu = demoWindow.getByRole('button', { name: 'More options' }).first();
  await actionsMenu.scrollIntoViewIfNeeded();
  await expect(actionsMenu).toBeVisible();
};

const openOldFlowAmendModal = async (page) => {
  await openOldFlowWindow(page);
  await page.getByRole('button', { name: 'More options' }).first().click();
  await page.getByText('🐢 Amend (Old Flow)').click();
  await expect(page.getByRole('heading', { name: 'Amend Hotel' })).toBeVisible();
};

const openDreamFlow = async (page) => {
  await openOldFlowWindow(page);
  await page.getByRole('button', { name: 'More options' }).first().click();
  const dreamOption = page.getByText('🚀 Amend (Dream Flow)', { exact: true });
  await expect(dreamOption).toBeVisible({ timeout: 5000 });
  await dreamOption.click();
  const dreamInput = page.getByRole('textbox', { name: 'Describe the change' });
  await expect(dreamInput).toBeVisible({ timeout: 15000 });
};

const openDreamResults = async (page) => {
  await openDreamFlow(page);
  const dreamInput = page.getByRole('textbox', { name: 'Describe the change' });
  await dreamInput.click();
  await expect(page.getByText('AI suggestion', { exact: true })).toBeVisible({ timeout: 20000 });
  await expect(page.getByText('Hilton Hawaiian Village · Ocean View Suite')).toBeVisible({ timeout: 20000 });
};

const selectAmendmentOptions = async (page) => {
  await page.getByRole('combobox', { name: 'Reason for Amendment' }).selectOption('downgrade');
  await page.getByRole('combobox', { name: 'Type of Amendment' }).selectOption('pricing_adjustment');
};

const goToSearchResults = async (page) => {
  await openOldFlowAmendModal(page);
  await selectAmendmentOptions(page);

  await page.getByRole('button', { name: /Continue to Travellers/i }).click();
  await expect(page.getByRole('dialog', { name: 'Travellers' })).toBeVisible();

  await page.getByRole('button', { name: /Continue to Search/i }).click();
  await expect(page.getByText('Search Parameters')).toBeVisible();

  await page.getByRole('button', { name: /Search Availability/i }).click();
  await expect(page.getByText('Searching available hotels...')).toBeVisible({ timeout: 5000 });
  await expect(page.getByText('Searching available hotels...')).toBeHidden({ timeout: 20000 });
  await expect(page.getByText('Found 8 available hotels')).toBeVisible({ timeout: 15000 });
};

const goToSearchModal = async (page) => {
  await openOldFlowAmendModal(page);
  await selectAmendmentOptions(page);

  await page.getByRole('button', { name: /Continue to Travellers/i }).click();
  await expect(page.getByRole('dialog', { name: 'Travellers' })).toBeVisible();

  await page.getByRole('button', { name: /Continue to Search/i }).click();
  await expect(page.getByText('Search Parameters')).toBeVisible();
};

const goToCartPage = async (page) => {
  await goToSearchResults(page);
  const hiltonCard = page.getByRole('button', { name: /Hilton Hawaiian Village/ }).first();
  await expect(hiltonCard).toBeVisible({ timeout: 15000 });
  await hiltonCard.click();
  await expect(page.getByText('Available rooms')).toBeVisible({ timeout: 15000 });
  await page.getByRole('button', { name: 'Add to Cart', exact: true }).first().click();
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
  await expect(page.getByText('Payment Details')).toBeVisible({ timeout: 20000 });
};

const openNewFlow = async (page) => {
  await openOldFlowWindow(page);
  await page.getByRole('button', { name: 'More options' }).first().click();
  await page.getByText('⚡ Amend (New Flow)').click();
  await expect(page.getByText('Search Parameters')).toBeVisible();
};

const goToNewFlowStep2 = async (page) => {
  await openNewFlow(page);
  await page.getByRole('button', { name: /Search Hotels/i }).click();
  await expect(page.getByText('Searching available hotels...')).toBeVisible({ timeout: 5000 });
  await expect(page.getByText('Searching available hotels...')).toBeHidden({ timeout: 20000 });
  const royalCard = page.getByRole('button', { name: /Royal Hawaiian Resort/ }).first();
  await expect(royalCard).toBeVisible();
};

const goToNewFlowStep3 = async (page) => {
  await goToNewFlowStep2(page);
  const resultsSection = page.getByText('Found 8 available hotels').locator('..');
  const royalCard = resultsSection.getByText('Royal Hawaiian Resort', { exact: true }).first();
  await royalCard.scrollIntoViewIfNeeded();
  await royalCard.click({ force: true });
  const addToCartButton = resultsSection.getByRole('button', { name: 'Add to Cart', exact: true }).first();
  await expect(addToCartButton).toBeVisible({ timeout: 15000 });
  await addToCartButton.click();
  await expect(page.getByText('Preparing checkout...')).toBeVisible({ timeout: 5000 });
  await expect(page.getByText('Preparing checkout...')).toBeHidden({ timeout: 10000 });
  await expect(page.getByText('Payment Details')).toBeVisible({ timeout: 15000 });
};

registerAmendmentsBaselineTests({ test, expect, openOldFlowWindow });

test('open amendments case study from desktop icon', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Streamlining Amendments' }).click();
  await expect(page.getByRole('heading', { name: 'Streamlining Amendments' })).toBeVisible();
});

test('old flow amend modal validation + cancel', async ({ page }) => {
  test.setTimeout(60000);
  await openOldFlowAmendModal(page);

  const continueToTravellers = page.getByRole('button', { name: /Continue to Travellers/i });
  await expect(continueToTravellers).toHaveAttribute('aria-disabled', 'true');

  await page.getByRole('combobox', { name: 'Reason for Amendment' }).selectOption('downgrade');

  await expect(page.getByText('Amendment Fee')).toHaveCount(0);
  await expect(continueToTravellers).toHaveAttribute('aria-disabled', 'true');

  await page.getByRole('combobox', { name: 'Type of Amendment' }).selectOption('pricing_adjustment');

  await expect(page.getByText('Amendment Fee')).toBeVisible();
  await expect(continueToTravellers).toHaveAttribute('aria-disabled', 'false');

  await page.getByRole('button', { name: 'Cancel' }).click();
  await expect(page.getByRole('heading', { name: 'Amend Hotel' })).toHaveCount(0);
});

test('old flow amend modal dropdown permutations', async ({ page }) => {
  test.setTimeout(60000);
  await openOldFlowAmendModal(page);

  const reasonSelect = page.getByRole('combobox', { name: 'Reason for Amendment' });
  const typeSelect = page.getByRole('combobox', { name: 'Type of Amendment' });
  const continueToTravellers = page.getByRole('button', { name: /Continue to Travellers/i });

  await reasonSelect.selectOption('upgrade');
  await typeSelect.selectOption('room_change');
  await expect(page.getByText('Amendment Fee')).toBeVisible();
  await expect(continueToTravellers).toHaveAttribute('aria-disabled', 'false');

  await reasonSelect.selectOption('date_change');
  await typeSelect.selectOption('availability_issue');
  await expect(page.getByText('Amendment Fee')).toBeVisible();
  await expect(continueToTravellers).toHaveAttribute('aria-disabled', 'false');
});

test('old flow travellers modal back + close', async ({ page }) => {
  test.setTimeout(80000);
  await openOldFlowAmendModal(page);
  await selectAmendmentOptions(page);

  await page.getByRole('button', { name: /Continue to Travellers/i }).click();
  await expect(page.getByRole('dialog', { name: 'Travellers' })).toBeVisible();

  await page.getByRole('button', { name: /Back/i }).click();
  await expect(page.getByRole('heading', { name: 'Amend Hotel' })).toBeVisible();
  await page.getByRole('button', { name: /Continue to Travellers/i }).click();
  await expect(page.getByRole('dialog', { name: 'Travellers' })).toBeVisible();

  const travellersDialog = page.getByRole('dialog', { name: 'Travellers' });
  await travellersDialog.getByRole('button', { name: /Close/i }).click();
  await expect(travellersDialog).toHaveCount(0);
});

test('old flow travellers modal checkbox toggles', async ({ page }) => {
  test.setTimeout(80000);
  await openOldFlowAmendModal(page);
  await selectAmendmentOptions(page);

  await page.getByRole('button', { name: /Continue to Travellers/i }).click();
  const travellersDialog = page.getByRole('dialog', { name: 'Travellers' });
  await expect(travellersDialog).toBeVisible();

  const traveller = travellersDialog.getByLabel('Joel Hickey (Adult)');
  await expect(traveller).toBeChecked();

  await traveller.uncheck();
  await expect(traveller).not.toBeChecked();

  await traveller.check();
  await expect(traveller).toBeChecked();
});

test('old flow search modal back + room selection gate', async ({ page }) => {
  test.setTimeout(120000);
  await openOldFlowAmendModal(page);
  await selectAmendmentOptions(page);

  await page.getByRole('button', { name: /Continue to Travellers/i }).click();
  await expect(page.getByRole('dialog', { name: 'Travellers' })).toBeVisible();
  await page.getByRole('button', { name: /Continue to Search/i }).click();
  await expect(page.getByText('Search Parameters')).toBeVisible();

  await page.getByRole('button', { name: /Back/i }).click();
  await expect(page.getByRole('dialog', { name: 'Travellers' })).toBeVisible();
  await page.getByRole('button', { name: /Continue to Search/i }).click();
  await expect(page.getByText('Search Parameters')).toBeVisible();

  await page.getByRole('button', { name: /Search Availability/i }).click();
  await expect(page.getByText('Searching available hotels...')).toBeVisible({ timeout: 5000 });
  await expect(page.getByText('Searching available hotels...')).toBeHidden({ timeout: 20000 });
  await expect(page.getByRole('button', { name: 'Add to Cart', exact: true })).toHaveCount(0);

  const hiltonCard = page.getByRole('button', { name: /Hilton Hawaiian Village/ }).first();
  await expect(hiltonCard).toBeVisible({ timeout: 15000 });
  await hiltonCard.click();
  await expect(page.getByRole('button', { name: 'Add to Cart', exact: true }).first()).toBeVisible({ timeout: 15000 });
});

test('old flow search modal input edits', async ({ page }) => {
  test.setTimeout(120000);
  await goToSearchModal(page);

  const destination = page.getByRole('textbox', { name: 'Destination' });
  const checkIn = page.getByRole('textbox', { name: 'Check-in Date' });
  const checkOut = page.getByRole('textbox', { name: 'Check-out Date' });

  await destination.fill('Maui, Hawaii');
  await checkIn.fill('2024-06-10');
  await checkOut.fill('2024-06-15');

  await expect(destination).toHaveValue('Maui, Hawaii');
  await expect(checkIn).toHaveValue('2024-06-10');
  await expect(checkOut).toHaveValue('2024-06-15');
});

test('old flow search results back + cancel', async ({ page }) => {
  test.setTimeout(120000);
  await goToSearchResults(page);

  await page.getByRole('button', { name: 'Back to Search' }).click();
  await expect(page.getByText('Search Parameters')).toBeVisible();

  await page.getByRole('button', { name: /Search Availability/i }).click();
  await expect(page.getByText('Found 8 available hotels')).toBeVisible({ timeout: 15000 });

  await page.getByRole('button', { name: 'Cancel amendment' }).click();
  await expect(page.getByText('Hawaii Family Vacation', { exact: true })).toBeVisible();
  await expect(page.getByText('Found 8 available hotels')).toHaveCount(0);
});

test('old flow cart back + cancel', async ({ page }) => {
  test.setTimeout(120000);
  await goToCartPage(page);

  await page.getByRole('button', { name: 'Back to Results' }).click();
  await expect(page.getByText('Found 8 available hotels')).toBeVisible({ timeout: 15000 });

  await page.getByRole('button', { name: 'Cancel amendment' }).click();
  await expect(page.getByText('Hawaii Family Vacation', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: /Proceed to Travellers/i })).toHaveCount(0);
});

test('old flow travellers back + cancel', async ({ page }) => {
  test.setTimeout(120000);
  await goToTravellersPage(page);

  await page.getByRole('button', { name: 'Back to Cart' }).click();
  await expect(page.getByRole('button', { name: /Proceed to Travellers/i })).toBeVisible({ timeout: 10000 });

  await page.getByRole('button', { name: /Proceed to Travellers/i }).click();
  await expect(page.getByRole('button', { name: /Go to Payment/i })).toBeVisible({ timeout: 10000 });

  await page.getByRole('button', { name: 'Cancel amendment' }).click();
  await expect(page.getByText('Hawaii Family Vacation', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: /Go to Payment/i })).toHaveCount(0);
});

test('old flow payment back + cancel', async ({ page }) => {
  test.setTimeout(150000);
  await goToPaymentPage(page);

  await page.getByRole('button', { name: 'Back to Travellers' }).click();
  await expect(page.getByRole('button', { name: /Go to Payment/i })).toBeVisible({ timeout: 10000 });

  await goToPaymentPage(page);
  await page.getByRole('button', { name: 'Cancel amendment' }).click();
  await expect(page.getByText('Hawaii Family Vacation', { exact: true })).toBeVisible();
});

test('old flow payment form input coverage', async ({ page }) => {
  test.setTimeout(150000);
  await goToPaymentPage(page);

  await page.getByRole('textbox', { name: 'Card Number' }).fill('4111 1111 1111 1111');
  await page.getByRole('textbox', { name: 'Expiry Date' }).fill('12/28');
  await page.getByRole('textbox', { name: 'CVV' }).fill('123');
  await page.getByRole('textbox', { name: 'Cardholder Name' }).fill('Taylor Smith');

  await expect(page.getByRole('textbox', { name: 'Card Number' })).toHaveValue('4111 1111 1111 1111');
  await expect(page.getByRole('textbox', { name: 'Expiry Date' })).toHaveValue('12/28');
  await expect(page.getByRole('textbox', { name: 'CVV' })).toHaveValue('123');
  await expect(page.getByRole('textbox', { name: 'Cardholder Name' })).toHaveValue('Taylor Smith');
});

test('old flow data integrity across cart and payment', async ({ page }) => {
  test.setTimeout(150000);
  await goToSearchResults(page);

  const royalCard = page.getByRole('button', { name: /Royal Hawaiian Resort/ }).first();
  await royalCard.scrollIntoViewIfNeeded();
  await royalCard.click();
  await expect(page.getByText('Available rooms')).toBeVisible({ timeout: 15000 });
  await page.getByRole('button', { name: 'Add to Cart', exact: true }).first().click();

  await expect(page.getByText('New Hotel Selection')).toBeVisible();
  await expect(page.getByText('$289')).toBeVisible();
  await page.getByRole('button', { name: /Proceed to Travellers/i }).click();
  await page.getByRole('button', { name: /Go to Payment/i }).scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: /Go to Payment/i }).click({ force: true });
  await expect(page.getByText('Payment Details')).toBeVisible({ timeout: 20000 });

  await expect(page.getByText('Payment Summary')).toBeVisible();
  await expect(page.getByText('Hotel booking')).toBeVisible();
  await expect(page.getByText('$289')).toBeVisible();
});

test('old flow accessibility labels exist', async ({ page }) => {
  test.setTimeout(60000);
  await openOldFlowWindow(page);

  await expect(page.getByText('Interactive Demo', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'More options' }).first()).toBeVisible();

  await openOldFlowAmendModal(page);
  const amendDialog = page.getByRole('dialog', { name: 'Amend Hotel' });
  await expect(amendDialog.getByRole('button', { name: /Close/i })).toBeVisible();
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
  await expect(page.getByRole('dialog', { name: 'Travellers' })).toBeVisible();

  await page.getByRole('button', { name: /Continue to Search/i }).click();
  await expect(page.getByText('Search Parameters')).toBeVisible();

  await page.getByRole('button', { name: /Search Availability/i }).click();
  await expect(page.getByText('Searching available hotels...')).toBeVisible({ timeout: 5000 });
  await expect(page.getByText('Searching available hotels...')).toBeHidden({ timeout: 20000 });
  const hiltonCard = page.getByRole('button', { name: /Hilton Hawaiian Village/ }).first();
  await expect(hiltonCard).toBeVisible({ timeout: 15000 });
  await hiltonCard.click();
  await expect(page.getByText('Available rooms')).toBeVisible({ timeout: 15000 });
  await expect(page.getByRole('button', { name: 'Add to Cart', exact: true }).first()).toBeVisible({ timeout: 15000 });
  await page.getByRole('button', { name: 'Add to Cart', exact: true }).first().click();

  await expect(page.getByRole('button', { name: /Proceed to Travellers/i })).toBeVisible({ timeout: 10000 });
  await page.getByRole('button', { name: /Proceed to Travellers/i }).click();

  await expect(page.getByRole('button', { name: /Go to Payment/i })).toBeVisible({ timeout: 10000 });
  await page.getByRole('button', { name: /Go to Payment/i }).scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: /Go to Payment/i }).click({ force: true });

  await expect(page.getByText('Loading payment form...')).toBeVisible({ timeout: 5000 });
  await expect(page.getByText('Loading payment form...')).toBeHidden({ timeout: 20000 });
  await expect(page.getByText('Payment Details')).toBeVisible({ timeout: 20000 });
  await page.getByText('Payment Summary').scrollIntoViewIfNeeded();
  await expect(page.getByRole('button', { name: /Confirm Payment/i })).toBeVisible({ timeout: 15000 });
  await page.getByRole('button', { name: /Confirm Payment/i }).click({ force: true });

  await expect(page.getByText('Booking updated')).toBeVisible({ timeout: 20000 });
});

test('old flow actions menu toggles', async ({ page }) => {
  test.setTimeout(30000);
  await openOldFlowWindow(page);

  const actionsMenu = page.getByRole('button', { name: 'More options' }).first();
  await actionsMenu.click();
  await expect(page.getByText('🐢 Amend (Old Flow)')).toBeVisible();

  await actionsMenu.click();
  await expect(page.getByText('🐢 Amend (Old Flow)')).toHaveCount(0);
});

test('old flow tabs navigation', async ({ page }) => {
  test.setTimeout(60000);
  await openOldFlowWindow(page);

  const documentsTab = page.getByRole('link', { name: /documents/i });
  await documentsTab.click();
  await expect(documentsTab).toHaveAttribute('aria-current', 'page');

  const paymentsTab = page.getByRole('link', { name: /payments/i });
  await paymentsTab.click();
  await expect(paymentsTab).toHaveAttribute('aria-current', 'page');

  const notesTab = page.getByRole('link', { name: /notes/i });
  await notesTab.click();
  await expect(notesTab).toHaveAttribute('aria-current', 'page');

  const historyTab = page.getByRole('link', { name: /history/i });
  await historyTab.click();
  await expect(historyTab).toHaveAttribute('aria-current', 'page');

  const itineraryTab = page.getByRole('link', { name: /itinerary/i });
  await itineraryTab.click();
  await expect(itineraryTab).toHaveAttribute('aria-current', 'page');
  await expect(page.getByText('Hawaii Family Vacation', { exact: true })).toBeVisible();
});

test('old flow tabs keyboard navigation', async ({ page }) => {
  test.setTimeout(60000);
  await openOldFlowWindow(page);

  const documentsTab = page.getByRole('link', { name: /documents/i });
  await documentsTab.focus();
  await page.keyboard.press('Enter');
  await expect(documentsTab).toHaveAttribute('aria-current', 'page');

  const paymentsTab = page.getByRole('link', { name: /payments/i });
  await paymentsTab.focus();
  await page.keyboard.press('Enter');
  await expect(paymentsTab).toHaveAttribute('aria-current', 'page');
});

test('old flow accessibility scan', async ({ page }) => {
  test.setTimeout(60000);
  await openOldFlowWindow(page);

  const results = await new AxeBuilder({ page })
    .include('[aria-label="Amendments demo window"]')
    .withTags(['wcag2a', 'wcag2aa', 'best-practice'])
    .exclude('iframe')
    .analyze();

  expect(results.violations).toEqual([]);
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
  const amendDialog = page.getByRole('dialog', { name: 'Amend Hotel' });

  await amendDialog.getByRole('button', { name: /Close/i }).click();
  await expect(amendDialog).toHaveCount(0);
});

test('old flow search modal close icon', async ({ page }) => {
  test.setTimeout(80000);
  await openOldFlowAmendModal(page);
  await selectAmendmentOptions(page);

  await page.getByRole('button', { name: /Continue to Travellers/i }).click();
  await expect(page.getByRole('dialog', { name: 'Travellers' })).toBeVisible();
  await page.getByRole('button', { name: /Continue to Search/i }).click();
  await expect(page.getByText('Search Parameters')).toBeVisible();

  const searchDialog = page.getByRole('dialog', { name: 'Search Parameters' });
  await searchDialog.getByRole('button', { name: /Close/i }).click();
  await expect(searchDialog).toHaveCount(0);
});

test('old flow header close exits window', async ({ page }) => {
  test.setTimeout(40000);
  await openOldFlowWindow(page);

  await page.getByRole('button', { name: 'Close Amendments' }).click();
  await expect(page.getByRole('heading', { name: 'Streamlining Amendments' })).toHaveCount(0);
});

test('old flow visual snapshot travellers modal', async ({ page }) => {
  test.setTimeout(120000);
  await openOldFlowAmendModal(page);
  await selectAmendmentOptions(page);

  await page.getByRole('button', { name: /Continue to Travellers/i }).click();
  await expect(page.getByRole('dialog', { name: 'Travellers' })).toBeVisible();

  const travellersModal = page.getByRole('dialog', { name: 'Travellers' });
  await expect(travellersModal).toHaveScreenshot('old-flow-travellers-modal.png', {
    animations: 'disabled'
  });
});

test('old flow visual snapshot search parameters modal', async ({ page }) => {
  test.setTimeout(120000);
  await goToSearchModal(page);

  const searchModal = page.getByRole('dialog', { name: 'Search Parameters' });
  await expect(searchModal).toHaveScreenshot('old-flow-search-parameters.png', {
    animations: 'disabled'
  });
});

test('old flow visual snapshot cart page', async ({ page }) => {
  test.setTimeout(120000);
  await goToCartPage(page);

  const cartContent = page.getByText('New Hotel Selection').locator('..').locator('..');
  await expect(cartContent).toHaveScreenshot('old-flow-cart.png', {
    animations: 'disabled'
  });
});

test('old flow visual snapshot travellers page', async ({ page }) => {
  test.setTimeout(120000);
  await goToTravellersPage(page);

  const travellersContent = page.getByText('Joel Hickey (Adult)').locator('..').locator('..').locator('..');
  await expect(travellersContent).toHaveScreenshot('old-flow-travellers.png', {
    animations: 'disabled'
  });
});

test('old flow visual snapshot payment page', async ({ page }) => {
  test.setTimeout(150000);
  await goToPaymentPage(page);

  const paymentContent = page.getByText('Payment Details').locator('..').locator('..');
  await expect(paymentContent).toHaveScreenshot('old-flow-payment.png', {
    animations: 'disabled'
  });
});

test('new flow step 1 renders details sections', async ({ page }) => {
  await openNewFlow(page);

  await expect(page.getByText('Amendment Fee:')).toBeVisible();
  await expect(page.getByText('Travellers')).toBeVisible();
  await expect(page.getByText('Search Parameters')).toBeVisible();
  await expect(page.getByRole('button', { name: /Cancel/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Search Hotels/i })).toBeVisible();
});

test('new flow step 1 default travellers checked', async ({ page }) => {
  await openNewFlow(page);

  await expect(page.getByLabel('Joel Hickey')).toBeChecked();
});

test('new flow step 1 cancel returns to itinerary', async ({ page }) => {
  await openNewFlow(page);

  await page.getByRole('button', { name: /Cancel/i }).click();
  await expect(page.getByText('Search Parameters')).toHaveCount(0);
  await expect(page.getByText('Hawaii Family Vacation', { exact: true })).toBeVisible();
});

test('new flow step 1 to step 2 shows loading state', async ({ page }) => {
  test.setTimeout(60000);
  await openNewFlow(page);

  await page.getByRole('button', { name: /Search Hotels/i }).click();
  await expect(page.getByText('Searching available hotels...')).toBeVisible({ timeout: 5000 });
  await expect(page.getByText('Searching available hotels...')).toBeHidden({ timeout: 20000 });
  await expect(page.getByText('Found 8 available hotels')).toBeVisible();
});

test('new flow step 2 can toggle and select other hotels', async ({ page }) => {
  test.setTimeout(60000);
  await goToNewFlowStep2(page);

  const resultsSection = page.getByText('Found 8 available hotels').locator('..');
  const hiltonCard = resultsSection.getByText('Hilton Hawaiian Village', { exact: true }).first();
  await hiltonCard.scrollIntoViewIfNeeded();
  await hiltonCard.click({ force: true });
  await expect(resultsSection.getByRole('button', { name: 'Add to Cart', exact: true }).first()).toBeVisible();

  const royalCard = resultsSection.getByText('Royal Hawaiian Resort', { exact: true }).first();
  await royalCard.scrollIntoViewIfNeeded();
  await royalCard.click({ force: true });
  await expect(resultsSection.getByRole('button', { name: 'Add to Cart', exact: true }).first()).toBeVisible();
});

test('new flow step 2 to step 3 shows loading state', async ({ page }) => {
  test.setTimeout(60000);
  await goToNewFlowStep2(page);

  const resultsSection = page.getByText('Found 8 available hotels').locator('..');
  const royalCard = resultsSection.getByText('Royal Hawaiian Resort', { exact: true }).first();
  await royalCard.scrollIntoViewIfNeeded();
  await royalCard.click({ force: true });
  const addToCartButton = resultsSection.getByRole('button', { name: 'Add to Cart', exact: true }).first();
  await expect(addToCartButton).toBeVisible({ timeout: 15000 });
  await addToCartButton.click();
  await expect(page.getByText('Preparing checkout...')).toBeVisible({ timeout: 5000 });
  await expect(page.getByText('Preparing checkout...')).toBeHidden({ timeout: 10000 });
  await expect(page.getByText('Booking Summary')).toBeVisible();
});

test('new flow step 2 back and cancel navigation', async ({ page }) => {
  test.setTimeout(60000);
  await goToNewFlowStep2(page);

  await page.getByRole('button', { name: 'Back to Details' }).click();
  await expect(page.getByText('Search Parameters')).toBeVisible();

  await page.getByRole('button', { name: /Search Hotels/i }).click();
  await expect(page.getByText('Searching available hotels...')).toBeVisible({ timeout: 5000 });
  await expect(page.getByText('Searching available hotels...')).toBeHidden({ timeout: 20000 });
  await expect(page.getByText('Found 8 available hotels')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Cancel amendment' })).toBeVisible();

  await page.getByRole('button', { name: 'Cancel amendment' }).click();
  await expect(page.getByText('Hawaii Family Vacation', { exact: true })).toBeVisible();
  await expect(page.getByText('Search Parameters')).toHaveCount(0);
});

test('new flow checkout summary shows default totals', async ({ page }) => {
  test.setTimeout(60000);
  await goToNewFlowStep3(page);

  const summaryCard = page.getByText('Booking Summary').locator('..');

  await expect(page.getByText('Booking Summary')).toBeVisible();
  await expect(page.getByText('Payment Details')).toBeVisible();
  await expect(summaryCard.getByText('$289 × 5 nights × 2 rooms')).toBeVisible();
  const defaultSummaryText = await summaryCard.textContent();
  expect(defaultSummaryText).toMatch(/Total\s+\$?3[,\s]?282/);
});

test('new flow checkout reflects selected hotel pricing', async ({ page }) => {
  test.setTimeout(60000);
  await goToNewFlowStep2(page);

  const resultsSection = page.getByText('Found 8 available hotels').locator('..');
  const hiltonCard = resultsSection.getByRole('button', { name: /Hilton Hawaiian Village/ }).first();
  await hiltonCard.scrollIntoViewIfNeeded();
  await hiltonCard.click({ force: true });
  await expect(hiltonCard.getByText('Available rooms')).toBeVisible({ timeout: 15000 });
  const deluxeRow = hiltonCard.getByText('Deluxe Room').locator('..');
  await deluxeRow.getByRole('button', { name: 'Add to Cart', exact: true }).click();
  await expect(page.getByText('Preparing checkout...')).toBeVisible({ timeout: 5000 });
  await expect(page.getByText('Preparing checkout...')).toBeHidden({ timeout: 10000 });

  const summaryCard = page.getByText('Booking Summary').locator('..');

  await expect(summaryCard.getByText('$325 × 5 nights × 2 rooms')).toBeVisible();
  const selectedSummaryText = await summaryCard.textContent();
  expect(selectedSummaryText).toMatch(/Total\s+\$?3[,\s]?685/);
});

test('new flow checkout back and cancel navigation', async ({ page }) => {
  test.setTimeout(60000);
  await goToNewFlowStep3(page);

  await page.getByRole('button', { name: 'Back to Select Hotel' }).click();
  await expect(page.getByText('Found 8 available hotels')).toBeVisible();

  const resultsSection = page.getByText('Found 8 available hotels').locator('..');
  const royalCard = resultsSection.getByText('Royal Hawaiian Resort', { exact: true }).first();
  await royalCard.scrollIntoViewIfNeeded();
  await royalCard.click({ force: true });
  const addToCartButton = resultsSection.getByRole('button', { name: 'Add to Cart', exact: true }).first();
  await expect(addToCartButton).toBeVisible({ timeout: 15000 });
  await addToCartButton.click();
  await expect(page.getByText('Preparing checkout...')).toBeVisible({ timeout: 5000 });
  await expect(page.getByText('Preparing checkout...')).toBeHidden({ timeout: 10000 });
  await expect(page.getByRole('button', { name: 'Cancel amendment' })).toBeVisible();

  await page.getByRole('button', { name: 'Cancel amendment' }).click();
  await expect(page.getByText('Hawaii Family Vacation', { exact: true })).toBeVisible();
  await expect(page.getByText('Booking Summary')).toHaveCount(0);
});

test('new flow completion shows success toast', async ({ page }) => {
  test.setTimeout(90000);
  await goToNewFlowStep3(page);

  await page.getByRole('button', { name: /Confirm & Pay/i }).click();
  await expect(page.getByText('Processing payment...')).toBeVisible({ timeout: 5000 });
  await expect(page.getByText('Processing payment...')).toBeHidden({ timeout: 10000 });
  await expect(page.getByText('Booking updated')).toBeVisible({ timeout: 10000 });
  await expect(page.getByText('Search Parameters')).toHaveCount(0);
});

test('new flow visual snapshot step 1', async ({ page, browserName }) => {
  test.setTimeout(60000);
  if (browserName !== 'chromium') {
    test.skip();
  }

  await openNewFlow(page);
  await expect(page.getByText('Search Parameters')).toBeVisible();

  const demoWindow = page.getByRole('region', { name: 'Amendments demo window' });
  await expect(demoWindow).toHaveScreenshot('new-flow-step-1.png', {
    animations: 'disabled'
  });
});

test('new flow visual snapshot step 2', async ({ page, browserName }) => {
  test.setTimeout(60000);
  if (browserName !== 'chromium') {
    test.skip();
  }

  await goToNewFlowStep2(page);
  const royalCard = page.getByRole('button', { name: /Royal Hawaiian Resort/ }).first();
  await expect(royalCard).toBeVisible();

  const demoWindow = page.getByRole('region', { name: 'Amendments demo window' });
  await expect(demoWindow).toHaveScreenshot('new-flow-step-2.png', {
    animations: 'disabled'
  });
});

test('new flow visual snapshot step 3', async ({ page, browserName }) => {
  test.setTimeout(60000);
  if (browserName !== 'chromium') {
    test.skip();
  }

  await goToNewFlowStep3(page);
  await expect(page.getByText('Payment Details')).toBeVisible();

  const demoWindow = page.getByRole('region', { name: 'Amendments demo window' });
  await expect(demoWindow).toHaveScreenshot('new-flow-step-3.png', {
    animations: 'disabled'
  });
});

test('new flow travellers checkbox toggles', async ({ page }) => {
  test.setTimeout(60000);
  await openNewFlow(page);

  const traveller = page.getByLabel('Joel Hickey');
  await expect(traveller).toBeChecked();
  await traveller.uncheck();
  await expect(traveller).not.toBeChecked();
  await traveller.check();
  await expect(traveller).toBeChecked();
});

test('new flow search parameters input edits', async ({ page }) => {
  test.setTimeout(60000);
  await openNewFlow(page);

  const destination = page.getByRole('textbox', { name: 'Destination' });
  const checkIn = page.getByRole('textbox', { name: 'Check-in Date' });
  const checkOut = page.getByRole('textbox', { name: 'Check-out Date' });
  const rooms = page.getByRole('combobox', { name: 'Rooms' });

  await destination.fill('Maui, Hawaii');
  await checkIn.fill('2024-06-10');
  await checkOut.fill('2024-06-15');
  await rooms.selectOption('3');

  await expect(destination).toHaveValue('Maui, Hawaii');
  await expect(checkIn).toHaveValue('2024-06-10');
  await expect(checkOut).toHaveValue('2024-06-15');
  await expect(rooms).toHaveValue('3');
});

test('new flow payment form input coverage', async ({ page }) => {
  test.setTimeout(120000);
  await goToNewFlowStep3(page);

  await page.getByRole('textbox', { name: 'Card Number' }).fill('4111 1111 1111 1111');
  await page.getByRole('textbox', { name: 'Expiry Date' }).fill('12/28');
  await page.getByRole('textbox', { name: 'CVV' }).fill('123');
  await page.getByRole('textbox', { name: 'Name' }).fill('Taylor Smith');

  await expect(page.getByRole('textbox', { name: 'Card Number' })).toHaveValue('4111 1111 1111 1111');
  await expect(page.getByRole('textbox', { name: 'Expiry Date' })).toHaveValue('12/28');
  await expect(page.getByRole('textbox', { name: 'CVV' })).toHaveValue('123');
  await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue('Taylor Smith');
});

test('new flow accessibility labels exist', async ({ page }) => {
  test.setTimeout(60000);
  await openNewFlow(page);

  await expect(page.getByText('Search Parameters')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Destination' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Check-in Date' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Check-out Date' })).toBeVisible();
});

test('new flow responsive search results actions', async ({ page }) => {
  test.setTimeout(120000);
  await page.setViewportSize({ width: 375, height: 667 });
  await goToNewFlowStep2(page);

  const resultsSection = page.getByText('Found 8 available hotels').locator('..');
  const royalCard = resultsSection.getByText('Royal Hawaiian Resort', { exact: true }).first();
  await royalCard.click({ force: true });
  await expect(resultsSection.getByRole('button', { name: 'Add to Cart', exact: true }).first()).toBeVisible();
});

test('new flow accessibility scan', async ({ page }) => {
  test.setTimeout(60000);
  await openNewFlow(page);

  const results = await new AxeBuilder({ page })
    .include('[aria-label="Amendments demo window"]')
    .withTags(['wcag2a', 'wcag2aa', 'best-practice'])
    .exclude('iframe')
    .analyze();

  expect(results.violations).toEqual([]);
});

test('dream flow amendment task can start', async ({ page }) => {
  test.setTimeout(60000);
  await openDreamFlow(page);
});

test('dream flow close exits the flow', async ({ page }) => {
  test.setTimeout(60000);
  await openDreamFlow(page);

  await page.getByRole('button', { name: /Close dream flow/i }).click();
  await expect(page.getByRole('textbox', { name: 'Describe the change' })).toHaveCount(0);
});

test('dream flow hotel selection updates selected state', async ({ page }) => {
  test.setTimeout(120000);
  await openDreamFlow(page);

  await page.getByRole('button', { name: 'Hotels' }).click();
  const hiltonRow = page.getByText('Hilton Hawaiian Village').first().locator('..').locator('..');
  await hiltonRow.getByRole('button', { name: 'Select' }).click();
  await expect(hiltonRow.getByRole('button', { name: 'Selected' })).toBeVisible();
  await expect(page.getByText('Payment method')).toHaveCount(0);
});

test('dream flow date change confirm closes flow', async ({ page }) => {
  test.setTimeout(120000);
  await openDreamFlow(page);

  await expect(page.getByText('MAY - JUL 2024')).toBeVisible();
  const mayColumn = page.getByText('MAY', { exact: true }).first().locator('..');
  await mayColumn.getByText('21', { exact: true }).first().click();

  const confirmButton = page.getByRole('button', { name: 'Confirm' });
  await expect(confirmButton).toBeVisible();
  await confirmButton.click();
  await expect(page.getByText('Processing…')).toBeVisible();

  await expect(page.getByRole('textbox', { name: 'Describe the change' })).toHaveCount(0, { timeout: 10000 });
});

test('dream flow confirm change adds history entry', async ({ page }) => {
  test.setTimeout(120000);
  await openDreamFlow(page);

  await expect(page.getByText('MAY - JUL 2024')).toBeVisible();
  const mayColumn = page.getByText('MAY', { exact: true }).first().locator('..');
  await mayColumn.getByText('21', { exact: true }).first().click();

  const confirmButton = page.getByRole('button', { name: 'Confirm' });
  await expect(confirmButton).toBeVisible();
  await confirmButton.click();
  await expect(page.getByRole('textbox', { name: 'Describe the change' })).toHaveCount(0, { timeout: 10000 });

  await page.getByRole('button', { name: 'Amendment history' }).click();
  await expect(page.getByText('Date change')).toBeVisible();
});

test('dream flow itinerary updates only after confirm', async ({ page }) => {
  test.setTimeout(120000);
  await openDreamFlow(page);

  await expect(page.getByText(/Royal Hawaiian Resort · Standard Room · May 15–20, 2024/)).toBeVisible();
  const mayColumn = page.getByText('MAY', { exact: true }).first().locator('..');
  await mayColumn.getByText('21', { exact: true }).first().click();

  await expect(page.getByText(/Royal Hawaiian Resort · Standard Room · May 15–20, 2024/)).toBeVisible();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByText('Booking updated')).toBeVisible();
  const itineraryText = await page.getByText(/Royal Hawaiian Resort · Standard Room ·/).first().textContent();
  expect(itineraryText).not.toContain('May 15–20, 2024');
  expect(itineraryText).toMatch(/2024/);
});

test('dream flow history undo shows inline availability check', async ({ page }) => {
  test.setTimeout(120000);
  await openDreamFlow(page);

  const mayColumn = page.getByText('MAY', { exact: true }).first().locator('..');
  await mayColumn.getByText('21', { exact: true }).first().click();

  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByRole('textbox', { name: 'Describe the change' })).toHaveCount(0, { timeout: 10000 });

  await page.getByRole('button', { name: 'Amendment history' }).click();
  const dateChangeRow = page.getByText(/Date change ·/).locator('..');
  await dateChangeRow.getByRole('button', { name: 'Undo' }).click();
  await expect(dateChangeRow.getByText('Checking availability…')).toBeVisible();
  await expect(dateChangeRow.getByText('Checking availability…')).toBeHidden();
  await expect(dateChangeRow.getByRole('button', { name: 'Undo' })).toBeVisible();
});

test('dream flow scenario hides AI suggestion', async ({ page }) => {
  test.setTimeout(120000);
  await openDreamFlow(page);

  await page.getByRole('combobox', { name: 'Test scenario' }).selectOption('ai_no_suggestion');
  await page.getByRole('textbox', { name: 'Describe the change' }).click();
  await expect(page.getByRole('button', { name: 'Rooms' })).toBeVisible({ timeout: 20000 });
  await expect(page.getByText('AI suggestion', { exact: true })).toHaveCount(0);
});

test('dream flow scenario shows alternate AI suggestion', async ({ page }) => {
  test.setTimeout(120000);
  await openDreamFlow(page);

  await page.getByRole('combobox', { name: 'Test scenario' }).selectOption('ai_alt_suggestion');
  await page.getByRole('textbox', { name: 'Describe the change' }).click();
  await expect(page.getByText('Moana Surfrider · Deluxe Room')).toBeVisible({ timeout: 20000 });
  await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.getByText('🏨 Moana Surfrider')).toBeVisible();
});

test('dream flow scenario shows empty results state', async ({ page }) => {
  test.setTimeout(120000);
  await openDreamFlow(page);

  await page.getByRole('combobox', { name: 'Test scenario' }).selectOption('empty_results');
  await page.getByRole('textbox', { name: 'Describe the change' }).click();
  await expect(page.getByRole('button', { name: 'Hotels' })).toBeVisible({ timeout: 20000 });
  await page.getByRole('button', { name: 'Hotels' }).click();
  await expect(page.getByText('No matching hotels yet. Try different dates or room preferences.')).toBeVisible();
});

test('dream flow scenario availability issue keeps flow open', async ({ page }) => {
  test.setTimeout(120000);
  await openDreamFlow(page);

  await page.getByRole('combobox', { name: 'Test scenario' }).selectOption('availability_issue');
  await page.getByRole('textbox', { name: 'Describe the change' }).click();
  const mayColumn = page.getByText('MAY', { exact: true }).first().locator('..');
  await mayColumn.getByText('21', { exact: true }).first().click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByText('No availability for the requested change.')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Describe the change' })).toBeVisible();
});

test('dream flow scenario payment failure shows error', async ({ page }) => {
  test.setTimeout(120000);
  await openDreamFlow(page);

  await page.getByRole('combobox', { name: 'Test scenario' }).selectOption('payment_failure');
  await page.getByRole('textbox', { name: 'Describe the change' }).click();
  await page.getByRole('button', { name: 'Hotels' }).click();
  const moanaRow = page.getByText(/Moana Surfrider · \$350 per night/).locator('..').locator('..');
  await expect(moanaRow.getByRole('button', { name: 'Select' })).toBeEnabled();
  await moanaRow.getByRole('button', { name: 'Select' }).click();
  await expect(page.getByText('Confirm change')).toBeVisible();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByText('Payment failed. Please try again.')).toBeVisible();
});

test('dream flow scenario AI timeout stays searching', async ({ page }) => {
  test.setTimeout(120000);
  await openDreamFlow(page);

  await page.getByRole('combobox', { name: 'Test scenario' }).selectOption('ai_timeout');
  await page.getByRole('textbox', { name: 'Describe the change' }).click();
  await expect(page.getByText('AI drafting request…')).toBeVisible({ timeout: 20000 });
  await expect(page.getByText('AI suggestion', { exact: true })).toHaveCount(0);
});

test('dream flow scenario input long prefill', async ({ page }) => {
  test.setTimeout(120000);
  await openDreamFlow(page);

  await page.getByRole('combobox', { name: 'Test scenario' }).selectOption('input_long');
  const dreamInput = page.getByRole('textbox', { name: 'Describe the change' });
  const inputValue = await dreamInput.inputValue();
  expect(inputValue.length).toBeGreaterThan(140);
});

test('dream flow scenario input special chars prefill', async ({ page }) => {
  test.setTimeout(120000);
  await openDreamFlow(page);

  await page.getByRole('combobox', { name: 'Test scenario' }).selectOption('input_special');
  const dreamInput = page.getByRole('textbox', { name: 'Describe the change' });
  const inputValue = await dreamInput.inputValue();
  expect(inputValue).toContain('#1234');
  expect(inputValue).toContain('@ gate B');
});

test('dream flow scenario input empty clears prompt', async ({ page }) => {
  test.setTimeout(120000);
  await openDreamFlow(page);

  await page.getByRole('combobox', { name: 'Test scenario' }).selectOption('input_empty');
  const dreamInput = page.getByRole('textbox', { name: 'Describe the change' });
  await expect(dreamInput).toHaveValue('');
  await expect(page.getByRole('button', { name: 'Confirm' })).toHaveCount(0);
});

test('dream flow payment confirm shows success and undo resets', async ({ page }) => {
  test.setTimeout(120000);
  await openDreamFlow(page);
  await page.getByRole('combobox', { name: 'Test scenario' }).selectOption('payment_flow');
  await page.getByRole('textbox', { name: 'Describe the change' }).click();

  await page.getByRole('button', { name: 'Hotels' }).click();
  const moanaRow = page.getByText(/Moana Surfrider · \$350 per night/).locator('..').locator('..');
  await expect(moanaRow.getByRole('button', { name: 'Select' })).toBeEnabled();
  await moanaRow.getByRole('button', { name: 'Select' }).click();
  await expect(page.getByText('Confirm change')).toBeVisible();

  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByText('Change confirmed. The itinerary and receipt are updated instantly.')).toBeVisible();

  await page.getByRole('button', { name: 'Undo change' }).click();
  await expect(page.getByText('Change confirmed. The itinerary and receipt are updated instantly.')).toHaveCount(0);
  await expect(page.getByRole('textbox', { name: 'Describe the change' })).toBeVisible();
});

test('dream flow done closes the panel', async ({ page }) => {
  test.setTimeout(120000);
  await openDreamFlow(page);
  await page.getByRole('combobox', { name: 'Test scenario' }).selectOption('payment_flow');
  await page.getByRole('textbox', { name: 'Describe the change' }).click();

  await page.getByRole('button', { name: 'Hotels' }).click();
  const moanaRow = page.getByText(/Moana Surfrider · \$350 per night/).locator('..').locator('..');
  await expect(moanaRow.getByRole('button', { name: 'Select' })).toBeEnabled();
  await moanaRow.getByRole('button', { name: 'Select' }).click();
  await expect(page.getByText('Confirm change')).toBeVisible();

  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByText('Change confirmed. The itinerary and receipt are updated instantly.')).toBeVisible();
  await page.getByRole('button', { name: 'Done' }).click();
  await expect(page.getByRole('textbox', { name: 'Describe the change' })).toHaveCount(0);
});

test('dream flow history booking created undo is disabled', async ({ page }) => {
  test.setTimeout(120000);
  await openDreamFlow(page);

  await page.getByRole('button', { name: 'Amendment history' }).click();
  const bookingRow = page.getByText(/Booking created ·/).locator('..');
  await expect(bookingRow.getByRole('button', { name: 'Undo' })).toBeDisabled();
});

test('dream flow keyboard navigation triggers actions', async ({ page }) => {
  test.setTimeout(120000);
  await openDreamFlow(page);

  const hotelsToggle = page.getByRole('button', { name: 'Hotels' });
  await hotelsToggle.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByText('Hilton Hawaiian Village')).toBeVisible();

  const roomsToggle = page.getByRole('button', { name: 'Rooms' });
  await roomsToggle.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByText(/Standard Room · \$289 per night/)).toBeVisible();

  const closeButton = page.getByRole('button', { name: /Close dream flow/i });
  await closeButton.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('textbox', { name: 'Describe the change' })).toHaveCount(0);
});

test('dream flow AI suggestion apply opens room options', async ({ page }) => {
  test.setTimeout(120000);
  await openDreamResults(page);

  await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.getByRole('button', { name: 'Rooms' })).toBeVisible();
  await expect(page.getByText(/Standard Room · \$289 per night/)).toBeVisible();
});

test('dream flow room selection updates summary and enables confirm', async ({ page }) => {
  test.setTimeout(120000);
  await openDreamResults(page);

  await page.getByRole('button', { name: 'Apply' }).click();
  await page.getByRole('button', { name: 'Rooms' }).click();
  const deluxeRoomRow = page.getByText(/Deluxe Room · \$325 per night/).locator('..').locator('..');
  await expect(deluxeRoomRow.getByRole('button', { name: 'Select' })).toBeEnabled();
  await deluxeRoomRow.getByRole('button', { name: 'Select' }).click();

  await expect(deluxeRoomRow.getByRole('button', { name: 'Selected' })).toBeVisible();
  await expect(page.getByText('🛏 Deluxe Room')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Confirm' })).toBeVisible();
});

test('dream flow hotel selection shows confirm action', async ({ page }) => {
  test.setTimeout(120000);
  await openDreamResults(page);

  await page.getByRole('button', { name: 'Hotels' }).click();
  const moanaRow = page.getByText(/Moana Surfrider · \$350 per night/).locator('..').locator('..');
  await expect(moanaRow.getByRole('button', { name: 'Select' })).toBeEnabled();
  await moanaRow.getByRole('button', { name: 'Select' }).click();
  await expect(page.getByRole('button', { name: 'Confirm' })).toBeVisible();
});

test('dream flow confirm shows success toast', async ({ page }) => {
  test.setTimeout(120000);
  await openDreamResults(page);

  await page.getByRole('button', { name: 'Hotels' }).click();
  const moanaRow = page.getByText(/Moana Surfrider · \$350 per night/).locator('..').locator('..');
  await expect(moanaRow.getByRole('button', { name: 'Select' })).toBeEnabled();
  await moanaRow.getByRole('button', { name: 'Select' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();

  await expect(page.getByText('Booking updated')).toBeVisible();
});
