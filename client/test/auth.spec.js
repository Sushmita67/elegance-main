import { test, expect } from '@playwright/test';

test.describe('Authentication Tests', () => {

  test("should display all input fields and Create button", async ({ page }) => {
    // Navigate to the registration page
    await page.goto("http://localhost:3000/register");

    // Check if all input fields are visible
    await expect(page.locator('input[name="firstname"]')).toBeVisible();
    await expect(page.locator('input[name="lastname"]')).toBeVisible();
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="userPassword"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible(); // Confirm Password

    // Check if the Create button is visible
    await expect(page.locator('button', { hasText: "CREATE" })).toBeVisible();
  });

  test("should display all input fields and Login button", async ({ page }) => {
    // Navigate to the login page
    await page.goto("http://localhost:3000/login");
  
    // Check if the email input field is visible
    await expect(page.locator('input[name="email"]')).toBeVisible();
  
    // Check if the password input field is visible
    await expect(page.locator('input[name="password"]')).toBeVisible();
  
    // // Check if the Login button is visible
    // await expect(page.locator('button', { hasText: "LOGIN" })).toBeVisible();
  });
  // test("should show validation errors for empty fields", async ({ page }) => {
  //   await page.goto("http://localhost:3000/register");

  //   await page.click('button[type="submit"]'); // Click without entering data

  //   // Check if validation messages are shown
  //   await expect(page.locator('p:has-text("Please enter your first name")')).toBeVisible();
  //   await expect(page.locator('p:has-text("Please enter your last name")')).toBeVisible();
  //   await expect(page.locator('p:has-text("Please enter your username")')).toBeVisible();
  //   await expect(page.locator('p:has-text("Please include an email")')).toBeVisible();
  //   await expect(page.locator('p:has-text("Please enter your password")')).toBeVisible();
  //   await expect(page.locator('p:has-text("Passwords should match")')).toBeVisible();
  // });

  // test("should show validation error for invalid email", async ({ page }) => {
  //   await page.goto("http://localhost:3000/register");

  //   await page.fill('input[name="email"]', "invalid-email"); // Enter invalid email
  //   await page.click('button[type="submit"]');

  //   // Check if email validation message appears
  //   await expect(page.locator('p:has-text("Please include a valid email")')).toBeVisible();
  // });

  // test("should show validation error when passwords do not match", async ({ page }) => {
  //   await page.fill('input[name="userPassword"]', "password123");
  //   await page.fill('input[name="password"]', "differentPassword"); // Mismatched passwords
  //   await page.click('button[type="submit"]');

  //   // Check if password mismatch error appears
  //   await expect(page.locator('p:has-text("Passwords should match")')).toBeVisible();
  // });
    
    // test('should allow user to register', async ({ page }) => {
    //     await page.goto('http://localhost:3000/register');
        
    //     await page.fill('input[name="firstname"]', 'John');
    //     await page.fill('input[name="lastname"]', 'Doe');
    //     await page.fill('input[name="username"]', 'johndoe123');
    //     await page.fill('input[name="email"]', 'johndoe@example.com');
    //     await page.fill('input[name="userPassword"]', 'password123');
    //     await page.fill('input[name="confirm-password"]', 'password123');
        
    //     await page.click('button[type="submit"]');
        
    //     await expect(page).toHaveURL('http://localhost:3000/login');
    // });
    
    // test('should allow user to login', async ({ page }) => {
    //     await page.goto('http://localhost:3000/login');
        
    //     await page.fill('input[name="email"]', 'johndoe@example.com');
    //     await page.fill('input[name="password"]', 'password123');
        
    //     await page.click('button[type="submit"]');
        
    //     await expect(page).toHaveURL('http://localhost:3000/user-profile');
    // });
    
    // test('should show error on invalid login', async ({ page }) => {
    //     await page.goto('http://localhost:3000/login');
        
    //     await page.fill('input[name="email"]', 'wronguser@example.com');
    //     await page.fill('input[name="password"]', 'wrongpassword');
        
    //     await page.click('button[type="submit"]');
        
    //     await expect(page.locator('p')).toHaveText('Invalid credentials');
    // });
});
