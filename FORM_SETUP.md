# Contact Form Setup Guide

This guide explains how to configure the contact form to work with either Formspree or Netlify Forms.

## Quick Setup

1. Choose your form service provider (Formspree or Netlify)
2. Follow the setup instructions below
3. Update the configuration in `js/config/forms.js`
4. Test the form submission

## Option 1: Formspree Setup (Recommended)

Formspree is a form backend service that handles form submissions without requiring a server.

### Steps:

1. **Create Formspree Account**
   - Go to [https://formspree.io](https://formspree.io)
   - Sign up for a free account
   - Create a new form

2. **Get Your Form ID**
   - After creating a form, you'll get a form ID (e.g., `xpzgkqyw`)
   - Your form endpoint will be: `https://formspree.io/f/xpzgkqyw`

3. **Update Configuration**
   - Open `js/config/forms.js`
   - Set `provider: 'formspree'`
   - Replace `YOUR_FORM_ID` with your actual form ID:
   ```javascript
   formspree: {
     endpoint: 'https://formspree.io/f/xpzgkqyw', // Your actual form ID
     // ... rest of config
   }
   ```

4. **Update HTML Form Action**
   - Open `index.html`
   - Find the form element and update the action:
   ```html
   <form class="contact-form" action="https://formspree.io/f/xpzgkqyw" method="POST" novalidate>
   ```

5. **Configure Email Routing (Optional)**
   - In your Formspree dashboard, set up email notifications
   - Configure different email addresses for different artists
   - Set up auto-responders if desired

### Formspree Features:
- ✅ Free tier available (50 submissions/month)
- ✅ Spam protection included
- ✅ File uploads supported
- ✅ Email notifications
- ✅ Custom thank you page redirects
- ✅ Form analytics

## Option 2: Netlify Forms Setup

If you're hosting on Netlify, you can use their built-in form handling.

### Steps:

1. **Deploy to Netlify**
   - Deploy your site to Netlify
   - The form will be automatically detected

2. **Update Configuration**
   - Open `js/config/forms.js`
   - Set `provider: 'netlify'`

3. **Form is Ready**
   - The form already has `data-netlify="true"` attribute
   - Netlify will automatically handle submissions

4. **Configure Notifications**
   - Go to your Netlify dashboard
   - Navigate to Forms section
   - Set up email notifications
   - Configure spam filtering

### Netlify Forms Features:
- ✅ Included with Netlify hosting
- ✅ 100 submissions/month on free tier
- ✅ Built-in spam protection
- ✅ File uploads supported
- ✅ Webhook integrations
- ✅ Form analytics

## Configuration Options

### Email Routing

Update the email addresses in `js/config/forms.js`:

```javascript
emailRouting: {
  general: 'info@valhallatattoo.com',
  artists: {
    pagan: 'pagan@valhallatattoo.com',
    jimmy: 'jimmy@valhallatattoo.com',
    // ... add other artists
  }
}
```

### Validation Settings

Customize form validation:

```javascript
validation: {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  maxFiles: 5,
  allowedFileTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  requiredFields: ['name', 'email', 'message']
}
```

### UI Settings

Customize user interface behavior:

```javascript
ui: {
  showLoadingSpinner: true,
  autoHideSuccessMessage: true,
  successMessageTimeout: 5000,
  scrollToFormOnError: true,
  focusFirstErrorField: true
}
```

## Testing the Form

1. **Test Locally**
   - Fill out the form with test data
   - Submit and check for errors in browser console
   - Verify validation works correctly

2. **Test File Uploads**
   - Try uploading different file types
   - Test file size limits
   - Verify multiple file uploads work

3. **Test Email Routing**
   - Submit forms with different artists selected
   - Verify emails are routed correctly
   - Check spam folders

4. **Test Error Handling**
   - Test with invalid email addresses
   - Test with missing required fields
   - Test with oversized files

## Troubleshooting

### Common Issues:

1. **Form not submitting**
   - Check browser console for errors
   - Verify form action URL is correct
   - Check network tab for failed requests

2. **Emails not received**
   - Check spam folders
   - Verify email addresses in configuration
   - Check form service dashboard for submissions

3. **File uploads failing**
   - Check file size limits
   - Verify file types are allowed
   - Check form service file upload limits

4. **Validation not working**
   - Check JavaScript console for errors
   - Verify form fields have correct IDs
   - Check validation rules in configuration

### Getting Help:

- **Formspree**: Check their [documentation](https://help.formspree.io/) or contact support
- **Netlify**: Check their [forms documentation](https://docs.netlify.com/forms/setup/) or community forum
- **Code Issues**: Check browser console and network tab for error details

## Security Notes

- The honeypot field helps prevent spam submissions
- File uploads are validated on the client side (server-side validation depends on your form service)
- Email addresses are not exposed in the frontend code
- Form submissions are sent over HTTPS

## Next Steps

After setting up the form:

1. Test thoroughly in different browsers
2. Set up email templates/auto-responders
3. Configure form analytics and monitoring
4. Consider adding additional spam protection if needed
5. Set up backup notification methods (Slack, Discord, etc.)