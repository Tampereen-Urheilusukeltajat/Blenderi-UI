import { test, expect } from '@playwright/test';

test('navigation works', async ({ page }) => {
  await page.goto('http://localhost:3000/logbook');

  // Click text=Omat tiedot
  await page.locator('text=Omat tiedot').click();
  await expect(page).toHaveURL('http://localhost:3000/user');

  // Click text=Käyttäjän hallinta
  await page.locator('text=Käyttäjän hallinta').click();
  await expect(page).toHaveURL('http://localhost:3000/management');

  // Click text=Laskutus
  await page.locator('text=Laskutus').click();
  await expect(page).toHaveURL('http://localhost:3000/billing');
});

test('navbar has logout button', async ({ page }) => {
  await page.goto('http://localhost:3000/logbook');
  // Click text=Kirjaudu ulos
  await page.locator('button', { hasText: 'Kirjaudu ulos' }).click();
});

test('/ does not have navbar', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  expect(await page.locator('.nav').count()).toEqual(0);
});

test('/register does not have navbar', async ({ page }) => {
  await page.goto('http://localhost:3000/register');
  expect(await page.locator('.nav').count()).toEqual(0);
});
