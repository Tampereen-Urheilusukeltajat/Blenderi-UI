// @ts-check
import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('localhost:3000/management')
})
test('Page has Table-element', async ({page}) => {
  expect(page.locator('table'));
});
