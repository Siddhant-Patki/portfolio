import { test, expect } from '@playwright/test';

test.describe('Projects section', () => {
  test.beforeEach(async ({ page }) => {
    // Mock the API so tests don't depend on backend
    await page.route('**/api/projects', (route) => {
      void route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 'test-project',
            title: 'Test Project',
            tagline: 'A tagline',
            description: 'A description of the test project.',
            problem: 'The problem',
            solution: 'The solution',
            impact: 'The impact',
            tech: ['React', 'TypeScript'],
            links: { github: 'https://github.com' },
            featured: true,
            sort_order: 1,
          },
        ]),
      });
    });

    await page.goto('/');
    await page.getByTestId('navbar').getByRole('link', { name: 'Projects' }).click();
    await page.getByTestId('projects-section').waitFor({ state: 'visible' });
  });

  test('project cards are rendered', async ({ page }) => {
    await expect(page.getByTestId('project-card').first()).toBeVisible();
  });

  async function openModal(page: import('@playwright/test').Page): Promise<void> {
    await page.getByTestId('project-card').first().waitFor({ state: 'visible' });
    const btn = page.getByTestId('project-card').first().getByRole('button');
    await page.evaluate(() => window.scrollBy(0, 400));
    await page.waitForTimeout(300);
    await btn.click({ force: true });
    await page.getByTestId('project-modal').waitFor({ state: 'visible' });
  }

  test('clicking "View case study" opens the modal', async ({ page }) => {
    await openModal(page);
    await expect(page.getByTestId('project-modal')).toBeVisible();
    await expect(page.getByRole('dialog')).toBeVisible();
  });

  test('modal closes with the close button', async ({ page }) => {
    await openModal(page);
    await page.getByRole('button', { name: /close/i }).click();
    await expect(page.getByTestId('project-modal')).toBeHidden();
  });

  test('modal closes with Escape key', async ({ page }) => {
    await openModal(page);
    await page.keyboard.press('Escape');
    await expect(page.getByTestId('project-modal')).toBeHidden();
  });
});
