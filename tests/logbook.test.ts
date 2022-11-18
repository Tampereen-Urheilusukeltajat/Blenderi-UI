import { test, expect } from '@playwright/test';

test.describe('Test logbook', () => {
  test('Renders logbook', async ({ page }) => {
    await page.goto('/logbook');
    await expect(page.locator('#logBook')).toBeVisible();
  });
});
