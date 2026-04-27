import { test, expect } from '@playwright/test';

test.describe('Navbar navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('navbar is visible on load', async ({ page }) => {
    await expect(page.getByTestId('navbar')).toBeVisible();
  });

  test('clicking a nav link scrolls to the section', async ({ page }) => {
    await page.getByTestId('navbar').getByRole('link', { name: 'Projects' }).click();
    await expect(page.getByTestId('projects-section')).toBeInViewport({ ratio: 0.2 });
  });

  test('clicking About scrolls to about section', async ({ page }) => {
    await page.getByTestId('navbar').getByRole('link', { name: 'About' }).click();
    await expect(page.getByTestId('about-section')).toBeInViewport({ ratio: 0.2 });
  });

  test('mobile menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    // Wait for navbar animation to settle before clicking
    await page.waitForTimeout(700);
    const hamburger = page.locator('[aria-label="Open menu"]');
    await hamburger.waitFor({ state: 'attached' });
    await hamburger.dispatchEvent('click');
    await expect(page.getByRole('dialog', { name: /mobile navigation/i })).toBeVisible();
    await page.locator('[aria-label="Close menu"]').dispatchEvent('click');
    await expect(page.getByRole('dialog', { name: /mobile navigation/i })).toBeHidden();
  });
});
