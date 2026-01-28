import { test, expect } from '../fixtures/pageFixture';
import { users } from '../data/testData';

test.describe('Login Tests', () => {
  
  test.beforeEach(async ({ pageManager }) => {
    await pageManager.loginPage.navigate();
  });

  test('should login successfully with valid credentials', async ({ pageManager }) => {
    // Login with standard user
    await pageManager.loginPage.login(users.standard.username, users.standard.password);
    
    // Verify we're on the inventory page
    await pageManager.inventoryPage.verifyPageLoaded();
  });

  test('should show error with locked out user', async ({ pageManager }) => {
    // Try to login with locked user
    await pageManager.loginPage.login(users.locked.username, users.locked.password);
    
    // Verify error message
    await pageManager.loginPage.verifyErrorMessage('Epic sadface: Sorry, this user has been locked out');
  });

  test('should show error with invalid credentials', async ({ pageManager }) => {
    // Try invalid credentials
    await pageManager.loginPage.login('invalid_user', 'wrong_password');
    
    // Verify error message
    await pageManager.loginPage.verifyErrorMessage('Epic sadface: Username and password do not match');
  });

  test('should show error when username is empty', async ({ pageManager }) => {
    // Try to login without username
    await pageManager.loginPage.login('', users.standard.password);
    
    // Verify error message
    await pageManager.loginPage.verifyErrorMessage('Epic sadface: Username is required');
  });

  test('should show error when password is empty', async ({ pageManager }) => {
    // Try to login without password
    await pageManager.loginPage.login(users.standard.username, '');
    
    // Verify error message
    await pageManager.loginPage.verifyErrorMessage('Epic sadface: Password is required');
  });
});
