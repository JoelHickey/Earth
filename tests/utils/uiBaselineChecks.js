export const registerAmendmentsBaselineTests = ({ test, expect, openOldFlowWindow }) => {
  test('amendments flow meets baseline UI principles', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    await openOldFlowWindow(page);

    const demoWindow = page.getByRole('region', { name: 'Amendments demo window' });
    await expect(demoWindow).toBeVisible();

    const scorecard = {
      'User in Control': { pass: 0, total: 0 },
      Directness: { pass: 0, total: 0 },
      Consistency: { pass: 0, total: 0 },
      Forgiveness: { pass: 0, total: 0 },
      Feedback: { pass: 0, total: 0 },
      Aesthetics: { pass: 0, total: 0 },
      Simplicity: { pass: 0, total: 0 }
    };
    const failures = [];

    const check = async (principle, label, assertion) => {
      scorecard[principle].total += 1;
      try {
        await assertion();
        scorecard[principle].pass += 1;
      } catch (error) {
        failures.push(`${principle}: ${label}\n${error?.message || error}`);
      }
    };

    await test.step('User in Control: no auto-advance or forced modal', async () => {
      await page.waitForTimeout(300);
      await check('User in Control', 'Case study stays visible', async () => {
        await expect(page.getByRole('heading', { name: 'Streamlining amendments' })).toBeVisible();
      });
      await check('User in Control', 'No forced modal open', async () => {
        await expect(page.getByRole('heading', { name: 'Amend Hotel' })).toHaveCount(0);
      });
    });

    await test.step('Directness: actions menu immediately opens', async () => {
      const actionsMenu = demoWindow.getByRole('button', { name: 'More options' }).first();
      await actionsMenu.scrollIntoViewIfNeeded();
      await actionsMenu.click();
      await check('Directness', 'Actions menu opens on click', async () => {
        await expect(page.getByText('🐢 Amend (Old Flow)')).toBeVisible();
      });
    });

    await test.step('Feedback + Simplicity: continue stays gated until required inputs', async () => {
      const oldFlowOption = page.getByText('🐢 Amend (Old Flow)');
      await expect(oldFlowOption).toBeVisible({ timeout: 3000 });
      await oldFlowOption.click();
      await expect(page.getByRole('heading', { name: 'Amend Hotel' })).toBeVisible({ timeout: 5000 });
      const continueToTravellers = page.getByRole('button', { name: /Continue to Travellers/i });
      await check('Feedback', 'Continue disabled before required input', async () => {
        await expect(continueToTravellers).toBeDisabled();
      });
      await check('Simplicity', 'Gate remains until required inputs', async () => {
        await expect(continueToTravellers).toBeDisabled();
      });

      await page.getByRole('combobox', { name: 'Reason for Amendment' }).selectOption('downgrade');
      await page.getByRole('combobox', { name: 'Type of Amendment' }).selectOption('pricing_adjustment');
      await check('Feedback', 'Continue enabled after required input', async () => {
        await expect(continueToTravellers).toBeEnabled();
      });
    });

    await test.step('Consistency: primary buttons share sizing', async () => {
      const continueToTravellers = page.getByRole('button', { name: /Continue to Travellers/i });
      const cancelButton = page.getByRole('button', { name: 'Cancel' });
      const continueBox = await continueToTravellers.boundingBox();
      const cancelBox = await cancelButton.boundingBox();

      await check('Consistency', 'Primary buttons share size', async () => {
        expect(continueBox).not.toBeNull();
        expect(cancelBox).not.toBeNull();
        expect(Math.abs(continueBox.height - cancelBox.height)).toBeLessThanOrEqual(4);
      });
    });

    await test.step('Forgiveness: cancel exits modal without losing context', async () => {
      await page.getByRole('button', { name: 'Cancel' }).click();
      await check('Forgiveness', 'Cancel closes modal', async () => {
        await expect(page.getByRole('heading', { name: 'Amend Hotel' })).toHaveCount(0);
      });
      await check('Forgiveness', 'Case study remains visible', async () => {
        await expect(page.getByRole('heading', { name: 'Streamlining amendments' })).toBeVisible();
      });
    });

    await test.step('Directness: old flow actions respond immediately', async () => {
      const actionsMenu = demoWindow.getByRole('button', { name: 'More options' }).first();
      await actionsMenu.scrollIntoViewIfNeeded();
      await actionsMenu.click();

      const oldFlowOption = page.getByText('🐢 Amend (Old Flow)');
      await check('Directness', 'Old flow option is visible', async () => {
        await expect(oldFlowOption).toBeVisible();
      });
      await oldFlowOption.click();
      await check('Directness', 'Amend modal opens', async () => {
        await expect(page.getByRole('heading', { name: 'Amend Hotel' })).toBeVisible({ timeout: 5000 });
      });
      await check('User in Control', 'Amend modal stays until action', async () => {
        await page.waitForTimeout(200);
        await expect(page.getByRole('heading', { name: 'Amend Hotel' })).toBeVisible();
      });
      await check('Simplicity', 'Only two amendment selectors appear', async () => {
        await expect(page.getByRole('combobox', { name: 'Reason for Amendment' })).toBeVisible();
        await expect(page.getByRole('combobox', { name: 'Type of Amendment' })).toBeVisible();
      });
      await check('Feedback', 'Continue disabled before required input', async () => {
        await expect(page.getByRole('button', { name: /Continue to Travellers/i })).toBeDisabled();
      });
      await check('Forgiveness', 'Cancel button is available', async () => {
        await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
      });
      await check('Consistency', 'Continue and Cancel buttons share size (amend modal)', async () => {
        const continueBox = await page.getByRole('button', { name: /Continue to Travellers/i }).boundingBox();
        const cancelBox = await page.getByRole('button', { name: 'Cancel' }).boundingBox();
        expect(continueBox).not.toBeNull();
        expect(cancelBox).not.toBeNull();
        expect(Math.abs(continueBox.height - cancelBox.height)).toBeLessThanOrEqual(2);
      });

      await page.getByRole('combobox', { name: 'Reason for Amendment' }).selectOption('downgrade');
      await page.getByRole('combobox', { name: 'Type of Amendment' }).selectOption('pricing_adjustment');
      await check('Feedback', 'Continue enabled after required input', async () => {
        await expect(page.getByRole('button', { name: /Continue to Travellers/i })).toBeEnabled();
      });

      const continueToTravellers = page.getByRole('button', { name: /Continue to Travellers/i });
      await continueToTravellers.click();
      const travellersDialog = page.getByRole('dialog', { name: 'Travellers' });
      await check('Directness', 'Travellers modal opens', async () => {
        await expect(travellersDialog).toBeVisible();
      });
      await check('User in Control', 'Travellers modal stays until action', async () => {
        await page.waitForTimeout(200);
        await expect(travellersDialog).toBeVisible();
      });
      await check('Simplicity', 'Travellers list is concise', async () => {
        await expect(page.getByRole('checkbox')).toHaveCount(4);
      });
      await check('Forgiveness', 'Back button is available (travellers)', async () => {
        await expect(page.getByRole('button', { name: /Back/i })).toBeVisible();
      });
      await check('Consistency', 'Back and Continue share size (travellers)', async () => {
        const backBox = await page.getByRole('button', { name: /Back/i }).boundingBox();
        const continueBox = await page.getByRole('button', { name: /Continue to Search/i }).boundingBox();
        expect(backBox).not.toBeNull();
        expect(continueBox).not.toBeNull();
        expect(Math.abs(backBox.height - continueBox.height)).toBeLessThanOrEqual(2);
      });

      const continueToSearch = page.getByRole('button', { name: /Continue to Search/i });
      await continueToSearch.click();
      await check('Directness', 'Search parameters open', async () => {
        await expect(page.getByText('Search Parameters')).toBeVisible();
      });
      await check('User in Control', 'Search parameters stay until action', async () => {
        await page.waitForTimeout(200);
        await expect(page.getByText('Search Parameters')).toBeVisible();
      });
      await check('Simplicity', 'Search form has core fields', async () => {
        await expect(page.getByLabel('Destination')).toBeVisible();
        await expect(page.getByLabel('Check-in Date')).toBeVisible();
        await expect(page.getByLabel('Check-out Date')).toBeVisible();
      });
      await check('Forgiveness', 'Back button is available (search)', async () => {
        await expect(page.getByRole('button', { name: /Back/i })).toBeVisible();
      });
      await check('Consistency', 'Back and Search Availability share size (search)', async () => {
        const backBox = await page.getByRole('button', { name: /Back/i }).boundingBox();
        const searchBox = await page.getByRole('button', { name: /Search Availability/i }).boundingBox();
        expect(backBox).not.toBeNull();
        expect(searchBox).not.toBeNull();
        expect(Math.abs(backBox.height - searchBox.height)).toBeLessThanOrEqual(2);
      });

      const searchAvailability = page.getByRole('button', { name: /Search Availability/i });
      await searchAvailability.click();
      await check('Directness', 'Search results appear', async () => {
        await expect(page.getByText('Searching available hotels...')).toBeVisible({ timeout: 5000 });
        await expect(page.getByText('Searching available hotels...')).toBeHidden({ timeout: 20000 });
        await expect(page.getByText('Found 8 available hotels')).toBeVisible({ timeout: 15000 });
      });
      await check('User in Control', 'Search results stay until action', async () => {
        await page.waitForTimeout(200);
        await expect(page.getByText('Found 8 available hotels')).toBeVisible();
      });
      await check('Feedback', 'Add to Cart hidden before room select', async () => {
        await expect(page.getByRole('button', { name: /Add to Cart/i })).toHaveCount(0);
      });
      await check('Simplicity', 'Results CTA bar has two buttons', async () => {
        await expect(page.getByRole('button', { name: /Back to Search/i })).toBeVisible();
        await expect(page.getByRole('button', { name: /Cancel amendment/i })).toBeVisible();
      });
      await check('Forgiveness', 'Back to Search is available (results)', async () => {
        await expect(page.getByRole('button', { name: /Back to Search/i })).toBeVisible();
      });
      await check('Consistency', 'Results CTA buttons share size', async () => {
        const backBox = await page.getByRole('button', { name: /Back to Search/i }).boundingBox();
        const cancelBox = await page.getByRole('button', { name: /Cancel amendment/i }).boundingBox();
        expect(backBox).not.toBeNull();
        expect(cancelBox).not.toBeNull();
        expect(Math.abs(backBox.height - cancelBox.height)).toBeLessThanOrEqual(2);
      });
      await check('Aesthetics', 'Search results match visual baseline', async () => {
        const resultsContainer = page.getByText('Found 8 available hotels').locator('..');
        await expect(resultsContainer).toHaveScreenshot('old-flow-search-results.png', { animations: 'disabled' });
      });

    });

    await test.step('Aesthetics: demo window matches visual baseline', async () => {
      await check('Aesthetics', 'Visual snapshot matches baseline', async () => {
        await expect(demoWindow).toHaveScreenshot('amendments-baseline-window.png', {
          animations: 'disabled'
        });
      });
    });

    const summary = Object.entries(scorecard)
      .map(([principle, { pass, total }]) => {
        const score = total === 0 ? 0 : Math.round((pass / total) * 10);
        return `${principle}: ${score}/10`;
      })
      .join(' | ');
    console.log(`[UI Baseline Score] ${testInfo.title} -> ${summary}`);

    if (failures.length) {
      throw new Error(`UI baseline failures:\n${failures.join('\n\n')}`);
    }
  });
};

export const registerCvBaselineTests = ({ test, expect, openCvWindow }) => {
  test('cv flow meets baseline UI principles', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    const cvWindow = await openCvWindow(page);

    const scorecard = {
      'User in Control': { pass: 0, total: 0 },
      Directness: { pass: 0, total: 0 },
      Consistency: { pass: 0, total: 0 },
      Forgiveness: { pass: 0, total: 0 },
      Feedback: { pass: 0, total: 0 },
      Aesthetics: { pass: 0, total: 0 },
      Simplicity: { pass: 0, total: 0 }
    };
    const failures = [];

    const check = async (principle, label, assertion) => {
      scorecard[principle].total += 1;
      try {
        await assertion();
        scorecard[principle].pass += 1;
      } catch (error) {
        failures.push(`${principle}: ${label}\n${error?.message || error}`);
      }
    };

    await test.step('User in Control: window stays open until user closes', async () => {
      await page.waitForTimeout(300);
      await check('User in Control', 'Window stays visible', async () => {
        await expect(cvWindow).toBeVisible();
      });
      await check('User in Control', 'Primary heading is visible', async () => {
        await expect(page.getByRole('heading', { name: 'Joel Hickey' })).toBeVisible();
      });
    });

    await test.step('Directness: dragging the header moves the window', async () => {
      const header = page.getByLabel('Curriculum Vitae header');
      const before = await cvWindow.boundingBox();
      const headerBox = await header.boundingBox();
      await check('Directness', 'Header is draggable', async () => {
        expect(before).not.toBeNull();
        expect(headerBox).not.toBeNull();
      });

      await page.mouse.move(headerBox.x + headerBox.width / 2, headerBox.y + headerBox.height / 2);
      await page.mouse.down();
      await page.mouse.move(
        headerBox.x + headerBox.width / 2 + 80,
        headerBox.y + headerBox.height / 2 + 40
      );
      await page.mouse.up();

      const after = await cvWindow.boundingBox();
      await check('Directness', 'Window position updates after drag', async () => {
        expect(after).not.toBeNull();
        expect(after.x).not.toBe(before.x);
        expect(after.y).not.toBe(before.y);
      });
    });

    await test.step('Feedback: close action responds immediately', async () => {
      await page.getByRole('button', { name: 'Close Curriculum Vitae' }).click();
      await check('Feedback', 'Window hides after close', async () => {
        await expect(cvWindow).toBeHidden();
      });
    });

    await test.step('Forgiveness: user can reopen after close', async () => {
      await page.getByText('Curriculum Vitae', { exact: true }).click();
      await check('Forgiveness', 'Window can reopen after close', async () => {
        await expect(page.getByLabel('Curriculum Vitae window')).toBeVisible();
      });
    });

    await test.step('Consistency: focus outline appears on close button', async () => {
      const closeButton = page.getByRole('button', { name: 'Close Curriculum Vitae' });
      await closeButton.focus();
      const outlineStyle = await closeButton.evaluate((el) => getComputedStyle(el).outlineStyle);
      const outlineWidth = await closeButton.evaluate((el) => parseFloat(getComputedStyle(el).outlineWidth));
      await check('Consistency', 'Focus outline is visible', async () => {
        expect(outlineStyle).not.toBe('none');
        expect(outlineWidth).toBeGreaterThan(0);
      });
    });

    await test.step('Aesthetics: CV window matches visual baseline', async () => {
      await check('Aesthetics', 'Visual snapshot matches baseline', async () => {
        await expect(page.getByLabel('Curriculum Vitae window')).toHaveScreenshot('cv-baseline-window.png');
      });
    });

    await test.step('Simplicity: only essential header controls', async () => {
      const header = page.getByLabel('Curriculum Vitae header');
      await check('Simplicity', 'Header has a single close control', async () => {
        await expect(header.getByRole('button')).toHaveCount(1);
      });
    });

    const summary = Object.entries(scorecard)
      .map(([principle, { pass, total }]) => {
        const score = total === 0 ? 0 : Math.round((pass / total) * 10);
        return `${principle}: ${score}/10`;
      })
      .join(' | ');
    console.log(`[UI Baseline Score] ${testInfo.title} -> ${summary}`);

    if (failures.length) {
      throw new Error(`UI baseline failures:\n${failures.join('\n\n')}`);
    }
  });
};
