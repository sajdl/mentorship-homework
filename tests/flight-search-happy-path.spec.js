import { test, expect } from '@playwright/test';
import { FlightsPage } from '../pages/FlightsPage.js';
import flightData from '../test-data/flightData.json' with { type: 'json' };
import { generateRandomFutureDate } from '../utils/dateUtils.js';

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

  const departureDate = generateRandomFutureDate();

  await flightsPage.selectDepartureDate(departureDate);

  const expectedDate = departureDate.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  });

  await expect(flightsPage.departureDateInput)
    .toHaveValue(expectedDate);

  await expect(flightsPage.oneWayButton)
    .toHaveAttribute('aria-pressed', 'true');

  await flightsPage.selectPassengers(flightData.passengers.adults);

  await expect(
    page.getByText('2 Passengers', { exact: true })
  ).toBeVisible();
});