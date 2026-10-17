import { test, expect } from '@playwright/test';
import { FlightsPage } from '../pages/FlightsPage.js';

test('should select departure airport', async ({ page }) => {
  const flightsPage = new FlightsPage(page);

  await flightsPage.goto();

  await flightsPage.selectOrigin(
    'belgrade',
    'Belgrade Nikola Tesla Airport'
  );

  await expect(flightsPage.originTrigger).toContainText('BEG - Nikola Tesla');
});