import { test, expect } from '@playwright/test';
import { FlightsPage } from '../pages/FlightsPage.js';

test('should select departure and destination airports', async ({ page }) => {
  const flightsPage = new FlightsPage(page);

  await flightsPage.goto();

  await flightsPage.selectOrigin(
    'belgrade',
    'Belgrade Nikola Tesla Airport'
  );

  await expect(flightsPage.originTrigger).toContainText('BEG - Nikola Tesla');

  await flightsPage.selectDestination(
    'vienna',
    'Vienna International Airport'
  );

  await expect(flightsPage.destinationTrigger).toContainText('VIE - Vienna Intl');
});