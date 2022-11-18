import { test, expect } from '@playwright/test';

test.describe('Test navbar', () => {
  test('navigation works', async ({ page }) => {
    await page.goto('/logbook');

    // Click text=Omat tiedot
    await page.locator('text=Omat pullot').click();
    await expect(page).toHaveURL('/diving-cylinder-set');
  });

  test('navbar has logout button', async ({ page }) => {
    await page.goto('/logbook');
    // Click text=Kirjaudu ulos
    await page.locator('button', { hasText: 'Kirjaudu ulos' }).click();
  });

  test('/ does not have navbar', async ({ page }) => {
    await page.goto('/');
    expect(await page.locator('.nav').isVisible()).toBe(false);
  });

  test('/register does not have navbar', async ({ page }) => {
    await page.goto('/register');
    expect(await page.locator('.nav').isVisible()).toBe(false);
  });
});
