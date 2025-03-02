import { test, expect } from '@playwright/test';

test.describe('Homepage API Tests', () => {

    test('should load the homepage', async ({ page }) => {
        await page.goto('http://localhost:3000');
        await expect(page).toHaveTitle("Elegance Jewelry");
    });

    test('should display correct Hero section content', async ({ page }) => {
        await page.goto('http://localhost:3000');

        // Check Hero heading
        const heroHeading = await page.locator('#hero-details h1');
        await expect(heroHeading).toHaveText("Discover Your Dream Jewelry");

        // Check Hero description
        const heroDescription = await page.locator('#hero-details p');
        await expect(heroDescription).toContainText("With a wide range of quality and affordable jewelry");

        // Check if the "Explore Products" button exists
        const exploreButton = await page.locator('button:has-text("Explore Products")');
        await expect(exploreButton).toBeVisible();
    });

    // test('should display correct Benefits section content', async ({ page }) => {
    //     await page.goto('http://localhost:3000');

    //     // Check Benefits heading
    //     const benefitsHeading = await page.locator('h2');
    //     await expect(benefitsHeading).toHaveText("Why Choose Us?");

    //     // Check presence of three benefits
    //     const benefitCards = await page.locator('#benefits .detail');
    //     await expect(benefitCards).toHaveCount(3);

    //     // Expected Benefit Titles
    //     const benefitTitles = [
    //         "Secure & Fast Delivery",
    //         "Affordable Luxury",
    //         "Premium Craftsmanship"
    //     ];

    //     // Expected Benefit Descriptions (Matching Exactly)
    //     const expectedDescriptions = [
    //         "Receive your jewelry quickly and securely. We ensure safe packaging and fast shipping right to your doorstep.",
    //         "Get exquisite jewelry at unbeatable prices. No hidden charges—just pure elegance within your budget.",
    //         "Our jewelry is crafted with precision and care, using only the finest materials for timeless beauty."
    //     ];

    //     for (let i = 0; i < benefitTitles.length; i++) {
    //         await expect(benefitCards.nth(i).locator('h3')).toHaveText(benefitTitles[i]);
    //         await expect(benefitCards.nth(i).locator('p')).toHaveText(expectedDescriptions[i]);
    //     }
    // });
});