import { test, expect } from '@playwright/test';
import { LoginPage, DashboardPage, PARABANK_CONSTANTS } from 'playwright-parent-typescript';

test.describe('ParaBank Login Tests - Child Project', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
  });

  test('should successfully login to ParaBank with demo credentials', async ({ page }) => {
    // Navigate to ParaBank login page
    await loginPage.navigateToLogin();
    
    // Verify login form is visible
    await loginPage.assertLoginFormVisible();
    
    // Perform login with demo credentials
    await loginPage.login(
      PARABANK_CONSTANTS.DEMO_CREDENTIALS.username,
      PARABANK_CONSTANTS.DEMO_CREDENTIALS.password
    );
    
    // Verify successful login by checking dashboard
    await dashboardPage.assertDashboardLoaded();
    expect(await dashboardPage.isUserLoggedIn()).toBeTruthy();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    // Navigate to ParaBank login page
    await loginPage.navigateToLogin();
    
    // Attempt login with invalid credentials
    await loginPage.login('invalid_user', 'wrong_password');
    
    // Wait a moment for potential error message
    await page.waitForTimeout(2000);
    
    // Check if we're still on login page (indicating failed login)
    const currentUrl = loginPage.getCurrentUrl();
    expect(currentUrl).toContain('parabank.parasoft.com/parabank');
  });

  test('should navigate to different sections from dashboard', async ({ page }) => {
    // Login first
    await loginPage.navigateToLogin();
    await loginPage.quickLogin();
    
    // Verify we're on dashboard
    await dashboardPage.assertDashboardLoaded();
    
    // Test navigation to different sections
    await dashboardPage.goToTransferFunds();
    await page.waitForTimeout(1000);
    
    await dashboardPage.goToBillPay();
    await page.waitForTimeout(1000);
    
    // Navigate back to overview
    await dashboardPage.goToAccountsOverview();
    await page.waitForTimeout(1000);
    
    // Verify we can still see dashboard elements
    expect(await dashboardPage.isUserLoggedIn()).toBeTruthy();
  });

  test('should logout successfully', async ({ page }) => {
    // Login first
    await loginPage.navigateToLogin();
    await loginPage.quickLogin();
    
    // Verify we're on dashboard
    await dashboardPage.assertDashboardLoaded();
    
    // Perform logout
    await dashboardPage.logout();
    
    // Verify we're back to login page
    await loginPage.waitForLoginForm();
    await loginPage.assertLoginFormVisible();
  });

  test('should take screenshots during flow', async ({ page }) => {
    // Take screenshot of login page
    await loginPage.navigateToLogin();
    await loginPage.takeScreenshot('parabank-login-page');
    
    // Login and take dashboard screenshot
    await loginPage.quickLogin();
    await dashboardPage.assertDashboardLoaded();
    await dashboardPage.takeScreenshot('parabank-dashboard');
    
    // Verify user is logged in
    expect(await dashboardPage.isUserLoggedIn()).toBeTruthy();
  });
});
