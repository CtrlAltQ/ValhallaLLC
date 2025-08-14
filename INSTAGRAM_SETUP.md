# Instagram Graph API Setup Guide

This guide explains how to set up Instagram Graph API integration for the Valhalla Tattoo website.

## Prerequisites

1. **Facebook Developer Account**: You need a Facebook Developer account to access Instagram Graph API
2. **Instagram Business Account**: The Instagram account must be converted to a Business account
3. **Facebook Page**: The Instagram Business account must be connected to a Facebook Page

## Step 1: Create Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "Create App" and select "Business" as the app type
3. Fill in the app details:
   - App Name: "Valhalla Tattoo Website"
   - Contact Email: Your business email
   - Business Account: Select or create a business account

## Step 2: Add Instagram Graph API

1. In your Facebook App dashboard, click "Add Product"
2. Find "Instagram Graph API" and click "Set Up"
3. This will add Instagram Graph API to your app

## Step 3: Generate Access Token

### Option A: Using Graph API Explorer (Temporary Token)
1. Go to [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select your app from the dropdown
3. Click "Generate Access Token"
4. Select the following permissions:
   - `instagram_graph_user_profile`
   - `instagram_graph_user_media`
5. Copy the generated access token (valid for 1 hour)

### Option B: Long-lived Access Token (Recommended)
1. First get a short-lived token using Option A
2. Exchange it for a long-lived token using this API call:
```
GET https://graph.facebook.com/v18.0/oauth/access_token?
  grant_type=fb_exchange_token&
  client_id={app-id}&
  client_secret={app-secret}&
  fb_exchange_token={short-lived-token}
```

## Step 4: Get Instagram User ID

1. Use the Graph API Explorer or make an API call:
```
GET https://graph.facebook.com/v18.0/me/accounts?access_token={access-token}
```
2. Find your Facebook Page ID from the response
3. Get the Instagram Business Account ID:
```
GET https://graph.facebook.com/v18.0/{page-id}?fields=instagram_business_account&access_token={access-token}
```

## Step 5: Configure the Website

### Method 1: Environment Variables (Recommended for Production)
Set these environment variables:
```bash
INSTAGRAM_ACCESS_TOKEN=your_long_lived_access_token
INSTAGRAM_USER_ID=your_instagram_business_account_id
```

### Method 2: Direct Configuration (Development Only)
Edit `js/config/social.js` and update:
```javascript
export const socialConfig = {
  instagram: {
    accessToken: 'your_access_token_here',
    userId: 'your_user_id_here',
    // ... other config
  }
};
```

### Method 3: Runtime Configuration
Call the configuration function in your app:
```javascript
import { setInstagramCredentials } from './js/config/social.js';

// Set credentials at runtime
setInstagramCredentials('your_access_token', 'your_user_id');
```

## Step 6: Test the Integration

1. Open your website's developer console
2. Check for Instagram API logs
3. Verify that posts are being fetched
4. Test the fallback content when API is unavailable

## API Limitations

- **Rate Limits**: 200 calls per hour per user
- **Token Expiry**: Long-lived tokens expire after 60 days
- **Permissions**: Requires Instagram Business account
- **Content**: Only shows content from the connected Instagram account

## Troubleshooting

### Common Issues

1. **Invalid Access Token**
   - Check if token has expired
   - Verify app permissions
   - Regenerate token if needed

2. **Invalid User ID**
   - Ensure Instagram account is Business account
   - Verify account is connected to Facebook Page
   - Check if User ID is correct

3. **Rate Limiting**
   - Implement proper caching (already included)
   - Reduce API call frequency
   - Use fallback content during rate limits

4. **CORS Issues**
   - Instagram Graph API supports CORS
   - Ensure requests are made from correct domain
   - Check app domain settings in Facebook Developer Console

### Testing Commands

Test API access with curl:
```bash
# Test user profile
curl "https://graph.instagram.com/v18.0/{user-id}?fields=id,username&access_token={access-token}"

# Test media fetch
curl "https://graph.instagram.com/v18.0/{user-id}/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token={access-token}"
```

## Security Best Practices

1. **Never commit access tokens to version control**
2. **Use environment variables in production**
3. **Implement proper error handling**
4. **Set up token refresh automation**
5. **Monitor API usage and limits**
6. **Use HTTPS for all API calls**

## Fallback Strategy

The website includes a robust fallback system:
- **Cached Content**: Uses previously fetched posts when API is unavailable
- **Manual Content**: Shows curated fallback images and captions
- **Graceful Degradation**: Website functions normally without Instagram content
- **User Feedback**: Clear messaging when social content is unavailable

## Maintenance

- **Token Renewal**: Long-lived tokens need renewal every 60 days
- **Content Review**: Regularly review fallback content
- **Performance Monitoring**: Monitor API response times and error rates
- **Cache Management**: Clear cache when needed for fresh content

For additional help, refer to the [Instagram Graph API Documentation](https://developers.facebook.com/docs/instagram-api/).