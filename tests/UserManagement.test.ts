import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/management');
});
test('Page has Table-element', async ({ page }) => {
  expect(page.locator('table'));
});
