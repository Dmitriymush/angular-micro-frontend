import { test, expect } from '@playwright/test';

test.describe('Assets Navigation', () => {
  test('should navigate from assets list to asset detail', async ({ page }) => {
    await page.goto('/?mock=true');

    await expect(page.locator('h1')).toContainText('Assets', { timeout: 15000 });

    await page.waitForSelector('mat-spinner', { state: 'hidden', timeout: 15000 });

    await page.waitForSelector('table tbody tr', { timeout: 15000 });

    await expect(page.locator('table')).toBeVisible();

    const firstAssetRow = page.locator('table tbody tr').first();
    await expect(firstAssetRow).toBeVisible();

    const assetName = (await firstAssetRow.locator('td').first().textContent())?.trim() ?? '';
    console.log(`Testing navigation for asset: ${assetName}`);

    const viewButton = firstAssetRow.locator('button:has-text("View")');
    await expect(viewButton).toBeVisible();
    await viewButton.click();


    await expect(page).toHaveURL(/\/[^/?]+(\?.*)?$/, { timeout: 10000 });

    await page.waitForSelector('mat-spinner', { state: 'hidden', timeout: 15000 });

    await expect(page.locator('mat-card').first()).toBeVisible({ timeout: 10000 });

    console.log('✅ Successfully navigated from assets list to asset detail');
  });
});
