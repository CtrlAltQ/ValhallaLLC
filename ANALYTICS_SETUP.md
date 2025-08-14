# Google Analytics 4 Setup Guide

This guide explains how to set up Google Analytics 4 (GA4) for the Valhalla Tattoo website with privacy-compliant tracking.

## Prerequisites

1. Google Analytics account
2. Google Tag Manager account (optional but recommended)
3. Access to website hosting/deployment

## Step 1: Create Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Admin" in the bottom left
3. Click "Create Property"
4. Enter property details:
   - Property name: "Valhalla Tattoo Website"
   - Reporting time zone: "United States - Central Time"
   - Currency: "US Dollar"
5. Select "Web" as the platform
6. Enter website URL: `https://valhallatattoo.com`
7. Copy the **Measurement ID** (format: G-XXXXXXXXXX)

## Step 2: Configure Analytics Settings

### Update Configuration File

Edit `js/config/analytics.js` and replace the measurement ID:

```javascript
export const analyticsConfig = {
    // Replace with your actual GA4 Measurement ID
    measurementId: 'G-YOUR-MEASUREMENT-ID',
    
    // Set to false in production
    debugMode: false,
    
    // ... rest of configuration
};
```

### Environment-Specific Setup

For development:
- Keep `debugMode: true` for localhost
- Use a separate GA4 property for testing if desired

For production:
- Set `debugMode: false`
- Use the main GA4 property

## Step 3: Privacy Compliance Setup

The analytics system includes GDPR-compliant consent management:

### Consent Banner Features
- ✅ Automatic consent banner display
- ✅ Granular consent options
- ✅ Consent storage in localStorage
- ✅ Analytics only loads after consent
- ✅ Respect for "Do Not Track" headers

### Privacy Settings
The system automatically:
- Anonymizes IP addresses
- Respects user consent preferences
- Provides opt-out mechanisms
- Stores minimal necessary data

## Step 4: Event Tracking Configuration

The system automatically tracks:

### Standard Events
- **Page Views**: Automatic on all pages
- **Scroll Depth**: 25%, 50%, 75%, 90%, 100%
- **Form Submissions**: Contact forms, newsletter signups
- **File Downloads**: PDF downloads, images
- **External Links**: Social media, external websites

### Custom Events
- **Portfolio Interactions**: Image views, lightbox opens
- **Artist Selection**: Contact form artist selection
- **Social Media Clicks**: Instagram, Facebook links
- **Newsletter Signups**: Email subscription tracking
- **Contact Conversions**: Lead generation tracking

### Performance Tracking
- **Core Web Vitals**: LCP, FID, CLS
- **Page Load Times**: Full page load performance
- **Custom Metrics**: Animation performance, image loading

## Step 5: Enhanced Ecommerce (Future)

When the booking system is implemented, the analytics will support:
- Booking funnel tracking
- Conversion value tracking
- Artist performance metrics
- Revenue attribution

## Step 6: Custom Dimensions Setup

In Google Analytics, set up these custom dimensions:

1. **Artist Selected** (custom_dimension_1)
   - Scope: Event
   - Description: "Selected artist for consultation"

2. **User Type** (custom_dimension_2)
   - Scope: User
   - Description: "New vs returning visitor type"

3. **Page Section** (custom_dimension_3)
   - Scope: Event
   - Description: "Section of page where interaction occurred"

## Step 7: Goals and Conversions

Set up these conversion goals in GA4:

### Primary Conversions
1. **Contact Form Submission**
   - Event: `generate_lead`
   - Value: $1 (estimated lead value)

2. **Newsletter Signup**
   - Event: `newsletter_signup`
   - Value: $0.50 (estimated subscriber value)

### Secondary Conversions
1. **Portfolio Engagement**
   - Event: `portfolio_interaction`
   - Engagement threshold: 3+ interactions

2. **Social Media Follow**
   - Event: `social_click`
   - Platform-specific tracking

## Step 8: Reporting and Dashboards

### Key Metrics to Monitor
- **Lead Generation**: Contact form conversions
- **Artist Performance**: Portfolio interaction by artist
- **User Engagement**: Session duration, pages per session
- **Traffic Sources**: Organic, social, direct, referral
- **Mobile vs Desktop**: Device-specific performance

### Custom Reports
Create custom reports for:
- Artist portfolio performance
- Contact form conversion funnel
- Social media traffic analysis
- Local SEO performance

## Step 9: Testing and Validation

### Pre-Launch Testing
1. **Debug Mode**: Enable debug mode for testing
2. **Real-time Reports**: Verify events in GA4 real-time view
3. **Consent Testing**: Test consent banner functionality
4. **Cross-browser Testing**: Verify tracking across browsers

### Validation Checklist
- [ ] Page views tracking correctly
- [ ] Form submissions recording
- [ ] Consent banner functioning
- [ ] Custom events firing
- [ ] Performance metrics collecting
- [ ] Privacy compliance verified

## Step 10: Maintenance and Monitoring

### Regular Tasks
- Monitor data quality weekly
- Review conversion rates monthly
- Update tracking for new features
- Audit privacy compliance quarterly

### Performance Optimization
- Monitor page load impact
- Optimize tracking code performance
- Review and clean up unused events
- Update consent management as needed

## Troubleshooting

### Common Issues

**Analytics not loading:**
- Check measurement ID is correct
- Verify consent has been granted
- Check browser console for errors

**Events not tracking:**
- Enable debug mode to see events
- Check event parameters are valid
- Verify GA4 real-time reports

**Consent banner not showing:**
- Clear localStorage and cookies
- Check if consent was previously given
- Verify banner CSS is loading

### Debug Commands

Enable debug mode in browser console:
```javascript
// Enable analytics debug mode
window.ValhallaTattoo.getAnalytics().enableDebugMode();

// Check consent status
window.ValhallaTattoo.getAnalytics().getConsentStatus();

// Manually track test event
window.ValhallaTattoo.getAnalytics().trackEvent('test_event', {
    test_parameter: 'test_value'
});
```

## Security and Privacy Notes

- All tracking respects user privacy preferences
- IP addresses are automatically anonymized
- No personally identifiable information is collected
- Consent is required before any tracking begins
- Users can withdraw consent at any time
- Data retention follows Google Analytics policies

## Support and Resources

- [Google Analytics 4 Documentation](https://support.google.com/analytics/answer/10089681)
- [GA4 Event Tracking Guide](https://support.google.com/analytics/answer/9322688)
- [GDPR Compliance for Analytics](https://support.google.com/analytics/answer/9019185)
- [Consent Mode Implementation](https://developers.google.com/tag-platform/security/consent-mode)

---

**Note**: Replace `G-XXXXXXXXXX` with your actual Google Analytics 4 Measurement ID before deploying to production.