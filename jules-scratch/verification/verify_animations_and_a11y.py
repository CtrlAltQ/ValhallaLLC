from playwright.sync_api import sync_playwright, expect
import os

def run_verification(playwright):
    # Create the verification directory if it doesn't exist
    os.makedirs("jules-scratch/verification", exist_ok=True)

    browser = playwright.chromium.launch(headless=True)
    # Set a mobile viewport
    context = browser.new_context(viewport={'width': 375, 'height': 667})
    page = context.new_page()

    try:
        # 1. Go to the homepage.
        page.goto("http://localhost:3000")

        # 2. Verify Hero Animation
        hero_subtitle = page.locator(".hero__subtitle")
        expect(hero_subtitle).to_be_visible(timeout=10000)
        page.screenshot(path="jules-scratch/verification/final_screenshot.png")
        print("Successfully captured hero animation screenshot.")

        # 3. Verify Artist Cards Animation
        artist_section = page.locator("#artists")
        artist_section.scroll_into_view_if_needed()
        first_card = page.locator(".artist-card").first
        expect(first_card).to_be_visible(timeout=5000)
        page.wait_for_timeout(500)
        print("Successfully verified artist card animations.")

        # 4. Verify aria-expanded toggle
        nav_toggle = page.locator("#navToggle")
        # Scroll the toggle into view before clicking
        nav_toggle.scroll_into_view_if_needed()
        expect(nav_toggle).to_be_visible()
        expect(nav_toggle).to_have_attribute("aria-expanded", "false")
        nav_toggle.click()
        expect(nav_toggle).to_have_attribute("aria-expanded", "true")
        print("Successfully verified aria-expanded toggle.")

        # 5. Verify lazy-loading
        first_artist_image = page.locator(".artist-card__img").first
        expect(first_artist_image).to_have_attribute("loading", "lazy")
        print("Successfully verified lazy-loading attribute.")

        print("\nVerification successful!")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)
