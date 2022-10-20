import { test, expect } from '@playwright/test';

test.describe('Test logbook', () => {
  test('navigation works', async ({ page }) => {
    await page.goto('/logbook');
    await expect(page.locator('#logBook')).toBeVisible();

    // Click text=Käyttäjän hallinta
    await page.locator('text=Käyttäjän hallinta').click();
    await expect(page).toHaveURL('/management');
    await expect(page.locator('#logBook')).not.toBeVisible();

    await page.goto('/logbook');
    await expect(page.locator('#logBook')).toBeVisible();
  });
});
