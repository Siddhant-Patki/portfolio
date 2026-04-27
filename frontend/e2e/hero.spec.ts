import { test, expect } from '@playwright/test';

test.describe('Hero section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders heading and tagline', async ({ page }) => {
    await expect(page.getByTestId('hero-section')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('CTA button scrolls to contact section', async ({ page }) => {
    const cta = page.getByRole('link', { name: /get in touch/i }).first();
    await expect(cta).toBeVisible();
    await cta.click();
    await expect(page.getByTestId('contact-section')).toBeInViewport({ ratio: 0.2 });
  });

  test('skip-to-content link is present', async ({ page }) => {
    const skip = page.getByRole('link', { name: /skip to main content/i });
    await expect(skip).toBeAttached();
  });
});
