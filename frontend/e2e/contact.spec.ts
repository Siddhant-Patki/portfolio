import { test, expect } from '@playwright/test';

test.describe('Contact form', () => {
  test.beforeEach(async ({ page }) => {
    // Mock the contact API — no real emails in tests
    await page.route('**/api/contact', (route) => {
      void route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.goto('/');
    await page.getByTestId('navbar').getByRole('link', { name: 'Contact' }).click();
    await page.getByTestId('contact-section').waitFor({ state: 'visible' });
  });

  test('contact section and form are visible', async ({ page }) => {
    await expect(page.getByTestId('contact-section')).toBeVisible();
    await expect(page.getByTestId('contact-form')).toBeVisible();
  });

  test('shows validation errors when submitting empty form', async ({ page }) => {
    await page.getByRole('button', { name: /send message/i }).click();
    await expect(page.getByText(/name is required/i)).toBeVisible();
  });

  test('shows email validation error for bad email', async ({ page }) => {
    await page.getByLabel(/name/i).fill('Test User');
    await page.getByRole('textbox', { name: 'Email' }).fill('not-an-email');
    await page.getByRole('textbox', { name: 'Email' }).blur();
    await expect(page.getByText(/valid email/i)).toBeVisible();
  });

  test('successfully submits valid form and shows success state', async ({ page }) => {
    await page.getByLabel(/name/i).fill('Test User');
    await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
    await page
      .getByLabel(/message/i)
      .fill('This is a test message long enough to pass validation.');
    await page.getByRole('button', { name: /send message/i }).click();
    await expect(page.getByTestId('form-success')).toBeVisible();
  });
});
