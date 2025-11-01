import { test, expect } from '@playwright/test'

test.describe('Login', () => {
  test('should login with valid credentials', async ({ page }) => {
    await page.goto('/login')

    await page.fill('input[type="email"]', 'admin@aiquaa.com')
    await page.fill('input[type="password"]', 'admin123')

    await page.click('button[type="submit"]')

    await expect(page).toHaveURL('/dashboard')
    await expect(page.locator('h1')).toContainText('Dashboard')
  })

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('/login')

    await page.fill('input[type="email"]', 'invalid@example.com')
    await page.fill('input[type="password"]', 'wrongpassword')

    await page.click('button[type="submit"]')

    await expect(page.locator('text=Credenciales inválidas')).toBeVisible()
  })
})
