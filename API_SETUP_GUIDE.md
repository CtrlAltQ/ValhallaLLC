# API Setup Guide for Valhalla Tattoo Website

This guide will help you set up external services (APIs) for your website. These services add functionality like contact forms, newsletters, and Instagram feeds.

## 🔧 What You Need to Set Up

1. **Contact Forms** (Required) - So people can reach you
2. **Newsletter Signup** (Optional) - Build an email list
3. **Instagram Integration** (Optional) - Show your latest posts
4. **Google Analytics** (Optional) - Track website visitors

---

## 📧 Setting Up Contact Forms

### Option 1: Formspree (Recommended - Free & Easy)

**Step 1:** Go to [formspree.io](https://formspree.io) and create a free account

**Step 2:** Click "New Form" and name it "Valhalla Tattoo Contact"

**Step 3:** Copy your Form ID (looks like: `xpwzgqpv`)

**Step 4:** Open `js/config/CLIENT_CONFIG.js` and update:
```javascript
export const CONTACT_FORM = {
  service: 'formspree',
  formspreeId: 'YOUR_FORM_ID_HERE', // Paste your Form ID here
  // ... rest stays the same
};
```

**Step 5:** Test using the `CLIENT_SETUP_TESTER.html` file

### Option 2: Netlify Forms (If hosting on Netlify)

**Step 1:** Deploy your website to Netlify

**Step 2:** Open `js/config/CLIENT_CONFIG.js` and update:
```javascript
export const CONTACT_FORM = {
  service: 'netlify',
  // ... rest stays the same
};
```

**Step 3:** Go to your Netlify dashboard > Forms to see submissions

---

## 📰 Setting Up Newsletter Signup

### Option 1: Mailerlite (Free up to 1,000 subscribers)

**Step 1:** Sign up at [mailerlite.com](https://mailerlite.com)

**Step 2:** Go to Integrations > Developer API > Generate new token

**Step 3:** Create a Group called "Website Subscribers" and note the Group ID

**Step 4:** Open `js/config/CLIENT_CONFIG.js` and update:
```javascript
export const NEWSLETTER = {
  service: 'mailerlite',
  mailerlite: {
    apiKey: 'YOUR_API_KEY_HERE',
    groupId: 'YOUR_GROUP_ID_HERE'
  }
};
```

### Option 2: ConvertKit (Free up to 300 subscribers)

**Step 1:** Sign up at [convertkit.com](https://convertkit.com)

**Step 2:** Go to Settings > Advanced > API Keys

**Step 3:** Create a Form and note the Form ID

**Step 4:** Open `js/config/CLIENT_CONFIG.js` and update:
```javascript
export const NEWSLETTER = {
  service: 'convertkit',
  convertkit: {
    apiKey: 'YOUR_API_KEY_HERE',
    formId: 'YOUR_FORM_ID_HERE'
  }
};
```

---

## 📸 Setting Up Instagram Integration

**⚠️ Note:** This is more complex and optional. Skip if you just want basic functionality.

### What You Need:
- Facebook Developer Account
- Instagram Business Account
- Basic technical knowledge

### Step-by-Step:

**Step 1:** Convert your Instagram to a Business Account
- Go to Instagram app > Settings > Account > Switch to Professional Account

**Step 2:** Create Facebook Developer App
- Go to [developers.facebook.com](https://developers.facebook.com)
- Create New App > Business
- Add Instagram Graph API product

**Step 3:** Get Your Credentials
- In your Facebook App, go to Instagram Graph API > Tools
- Generate Access Token (long-lived)
- Get your Instagram User ID

**Step 4:** Update Configuration
```javascript
export const INSTAGRAM = {
  status: 'enabled',
  accessToken: 'YOUR_ACCESS_TOKEN_HERE',
  userId: 'YOUR_USER_ID_HERE',
  postsToShow: 6
};
```

**Need Help?** Consider hiring a developer for this part, or leave it disabled.

---

## 📊 Setting Up Google Analytics

**Step 1:** Go to [analytics.google.com](https://analytics.google.com) and create an account

**Step 2:** Create a new Property for your website

**Step 3:** Copy your Measurement ID (starts with G-)

**Step 4:** Open `js/config/CLIENT_CONFIG.js` and update:
```javascript
export const ANALYTICS = {
  status: 'enabled',
  trackingId: 'G-XXXXXXXXXX', // Your Measurement ID here
  anonymizeIP: true,
  respectDoNotTrack: true
};
```

---

## 🧪 Testing Your Setup

1. Open `CLIENT_SETUP_TESTER.html` in your web browser
2. Click "Run All Tests" to check everything
3. Fix any issues shown in red
4. When everything is green, you're ready!

---

## 🚨 Security & Important Notes

### Keep These Files Private:
- `CLIENT_SETUP_TESTER.html` - Delete from live website
- Never share your API keys publicly
- Always use environment variables for production

### Backup Before Changes:
- Always backup your files before editing
- Keep a copy of your original configuration
- Test changes on a development site first

### Get Help:
- Most services have excellent documentation
- YouTube has tutorials for each service
- Consider hiring a developer for complex integrations

---

## 📋 Quick Reference

### File Locations:
- **Main Config:** `js/config/CLIENT_CONFIG.js`
- **Test Page:** `CLIENT_SETUP_TESTER.html`
- **This Guide:** `API_SETUP_GUIDE.md`

### Support Links:
- **Formspree Help:** [help.formspree.io](https://help.formspree.io)
- **Mailerlite Docs:** [developers.mailerlite.com](https://developers.mailerlite.com)
- **Instagram API Docs:** [developers.facebook.com/docs/instagram-graph-api](https://developers.facebook.com/docs/instagram-graph-api)
- **Google Analytics Help:** [support.google.com/analytics](https://support.google.com/analytics)

### Common Issues:
- **Form not working:** Check your Form ID is correct
- **Newsletter not working:** Verify API key and Group/Form ID
- **Instagram not loading:** Check Access Token hasn't expired
- **Analytics not tracking:** Verify Measurement ID format

Remember: You don't need all of these! Start with contact forms and add others as your business grows.

---

*Need personalized help? Consider hiring a web developer for 1-2 hours to set these up for you.*