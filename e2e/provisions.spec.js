//@ts-check
import { test, expect } from'@playwright/test';

test('get provisions link', async ({ page }) => {
    await page.goto('https://sos2223-24.appspot.com/provisions-for-the-year-2014');
  
    // Click the get started link.
    await page.getByRole('link', { name: 'Provisiones' }).click();
    await page.getByRole('link', { name: 'Página de Inicio' }).click();

  
    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*provisions-for-the-year-2014/);
  });