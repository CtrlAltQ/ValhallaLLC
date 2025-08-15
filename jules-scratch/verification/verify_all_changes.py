from playwright.sync_api import sync_playwright, expect
import os
import time

def run_verification(playwright):
    # Create the verification directory if it doesn't exist
    os.makedirs("jules-scratch/verification", exist_ok=True)

    browser = playwright.chromium.launch(headless=True)
    # Set a mobile viewport to ensure the nav toggle is visible
    context = browser.new_context(viewport={'width': 375, 'height': 812}) # iPhone X
    page = context.new_page()

    try:
        # 1. Go to the homepage.
        page.goto("http://localhost:3000", timeout=60000)

        # Give the page a moment to load everything, including the consent banner
        page.wait_for_load_state('networkidle')

        # 2. Handle Consent Banner
        consent_button = page.locator("#consent-accept")
        expect(consent_button).to_be_visible(timeout=5000)
        consent_button.click()
        print("Successfully accepted consent banner.")

        # 3. Verify Hero Animation
        hero_subtitle = page.locator(".hero__subtitle")
        # Wait for the element to become visible as a sign the animation has run
        expect(hero_subtitle).to_be_visible(timeout=5000)
        print("Successfully verified hero animation.")

        # Take a screenshot of the initial view
        page.screenshot(path="jules-scratch/verification/final_screenshot.png")
        print("Successfully captured final screenshot.")

        # 4. Verify Artist Cards Animation
        artist_section = page.locator("#artists")
        artist_section.scroll_into_view_if_needed()

        first_card = page.locator(".artist-card").first
        expect(first_card).to_be_visible(timeout=5000)
        print("Successfully verified artist cards reveal animation.")

        # 5. Verify aria-expanded toggle
        nav_toggle = page.locator("#navToggle")
        nav_toggle.scroll_into_view_if_needed()
        expect(nav_toggle).to_be_visible()
        expect(nav_toggle).to_have_attribute("aria-expanded", "false")
        nav_toggle.click()
        expect(nav_toggle).to_have_attribute("aria-expanded", "true")
        print("Successfully verified aria-expanded toggle.")

        # 6. Verify lazy-loading
        first_artist_image = page.locator(".artist-card__img").first
        expect(first_artist_image).to_have_attribute("loading", "lazy")
        print("Successfully verified lazy-loading attribute.")

        print("\nVerification script completed successfully!")

    except Exception as e:
        print(f"An error occurred during verification: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)
