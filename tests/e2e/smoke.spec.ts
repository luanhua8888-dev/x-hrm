import { expect, test } from '@playwright/test';

test('loads the login page', async ({ page }) => {
  await page.goto('/login', { waitUntil: 'domcontentloaded', timeout: 15_000 });
  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
});
