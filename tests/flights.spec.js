import { test, expect } from '@playwright/test';
import { FlightsPage } from '../pages/FlightsPage.js';
import flightData from '../test-data/flightData.json' with { type: 'json' };

test('should select departure and destination airports', async ({ page }) => {
  const flightsPage = new FlightsPage(page);

  await flightsPage.goto();
  await flightsPage.acceptConsent();

  await flightsPage.selectOrigin(
    flightData.origin.city,
    flightData.origin.airport
  );

  await expect(flightsPage.originTrigger)
    .toContainText(flightData.origin.expected);

  await flightsPage.selectDestination(
    flightData.destination.city,
    flightData.destination.airport
  );

  await expect(flightsPage.destinationTrigger)
    .toContainText(flightData.destination.expected);
});