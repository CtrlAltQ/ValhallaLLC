/**
 * Form Configuration
 * Centralized configuration for form handling and submission
 */

export const formConfig = {
  // Form service provider: 'formspree' or 'netlify'
  provider: 'formspree', // Change to 'netlify' if using Netlify Forms
  
  // Formspree configuration
  formspree: {
    endpoint: 'https://formspree.io/f/xpwzgqpv', // Valhalla Tattoo form endpoint
    successRedirect: '/thank-you.html',
    errorMessage: 'Sorry, there was an error sending your message. Please try again or call us directly at (931) 451-5313.',
    successMessage: 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.'
  },
  
  // Netlify Forms configuration
  netlify: {
    successRedirect: '/thank-you.html',
    errorMessage: 'Sorry, there was an error sending your message. Please try again or call us directly.',
    successMessage: 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.'
  },
  
  // Email routing configuration
  emailRouting: {
    general: 'valhallatattoo931@gmail.com',
    artists: {
      pagan: 'valhallatattoo931@gmail.com',
      jimmy: 'valhallatattoo931@gmail.com',
      micah: 'valhallatattoo931@gmail.com',
      sarah: 'valhallatattoo931@gmail.com',
      kason: 'valhallatattoo931@gmail.com',
      heather: 'valhallatattoo931@gmail.com'
    }
  },
  
  // Validation settings
  validation: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 5,
    allowedFileTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    requiredFields: ['name', 'email', 'message']
  },
  
  // UI settings
  ui: {
    showLoadingSpinner: true,
    autoHideSuccessMessage: true,
    successMessageTimeout: 5000,
    scrollToFormOnError: true,
    focusFirstErrorField: true
  }
};

/**
 * Get the appropriate form action URL based on configuration
 * @param {string} artistSlug - Optional artist slug for routing
 * @returns {string} Form action URL
 */
export function getFormAction(artistSlug = null) {
  if (formConfig.provider === 'netlify') {
    return ''; // Netlify forms use the current page URL
  }
  
  // For Formspree, return the configured endpoint
  return formConfig.formspree.endpoint;
}

/**
 * Get email routing information for form submission
 * @param {string} artistSlug - Artist slug for routing
 * @returns {string} Email address for routing
 */
export function getEmailRouting(artistSlug) {
  if (artistSlug && formConfig.emailRouting.artists[artistSlug]) {
    return formConfig.emailRouting.artists[artistSlug];
  }
  return formConfig.emailRouting.general;
}

/**
 * Get form configuration for specific provider
 * @returns {Object} Provider-specific configuration
 */
export function getProviderConfig() {
  return formConfig[formConfig.provider];
}

/**
 * Setup instructions for different providers
 */
export const setupInstructions = {
  formspree: {
    title: 'Formspree Setup Instructions',
    steps: [
      '1. Go to https://formspree.io and create an account',
      '2. Create a new form and get your form ID',
      '3. Replace "YOUR_FORM_ID" in formConfig.formspree.endpoint with your actual form ID',
      '4. Configure email routing in your Formspree dashboard',
      '5. Set up custom thank you page redirect in Formspree settings'
    ]
  },
  netlify: {
    title: 'Netlify Forms Setup Instructions',
    steps: [
      '1. Deploy your site to Netlify',
      '2. The form will automatically be detected due to data-netlify="true" attribute',
      '3. Configure email notifications in Netlify dashboard under Forms',
      '4. Set up custom success page redirect if needed',
      '5. Configure spam filtering and other form settings in Netlify dashboard'
    ]
  }
};

export default formConfig;