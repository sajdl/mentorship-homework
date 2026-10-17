import { test, expect } from '@playwright/test';
import { FlightsPage } from '../pages/FlightsPage.js';

test('should open the flights search page', async ({ page }) => {
  const flightsPage = new FlightsPage(page);

  await flightsPage.goto();

  await expect(page).toHaveURL(/phptravels\.net\/flights/);
});