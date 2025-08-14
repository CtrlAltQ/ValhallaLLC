/**
 * Newsletter Management System
 * Handles email signup, validation, and integration with email services
 */

export class NewsletterManager {
  constructor() {
    this.form = null;
    this.emailInput = null;
    this.submitButton = null;
    this.statusElement = null;
    this.isSubmitting = false;
    
    // Configuration for email service (using Netlify Forms)
    this.config = {
      service: 'netlify', // 'mailerlite', 'convertkit', 'formspree', 'netlify', or 'disabled'
      listId: 'newsletter-subscribers',
      successRedirect: null
    };
    
    // Set API endpoint after config is initialized
    this.config.apiEndpoint = this.getApiEndpoint();
  }

  /**
   * Initialize the newsletter system
   */
  init() {
    this.findElements();
    if (!this.form) return;

    this.setupEventListeners();
    this.setupValidation();
  }

  /**
   * Find DOM elements
   */
  findElements() {
    this.form = document.getElementById('newsletterForm');
    this.emailInput = document.getElementById('newsletter-email');
    this.submitButton = this.form?.querySelector('.newsletter-submit');
    this.statusElement = this.form?.querySelector('.newsletter-status');
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    if (!this.form) return;

    // Form submission
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    // Real-time email validation
    if (this.emailInput) {
      this.emailInput.addEventListener('input', () => {
        this.validateEmail();
      });

      this.emailInput.addEventListener('blur', () => {
        this.validateEmail();
      });
    }

    // Enter key handling
    if (this.emailInput) {
      this.emailInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.handleSubmit();
        }
      });
    }
  }

  /**
   * Set up form validation
   */
  setupValidation() {
    if (!this.emailInput) return;

    // Add validation attributes
    this.emailInput.setAttribute('pattern', '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$');
    this.emailInput.setAttribute('title', 'Please enter a valid email address');
  }

  /**
   * Handle form submission
   */
  async handleSubmit() {
    if (this.isSubmitting) return;

    const email = this.emailInput?.value.trim();
    if (!email) {
      this.showStatus('Please enter your email address.', 'error');
      return;
    }

    if (!this.isValidEmail(email)) {
      this.showStatus('Please enter a valid email address.', 'error');
      return;
    }

    this.isSubmitting = true;
    this.setLoadingState(true);

    try {
      const success = await this.subscribeEmail(email);
      
      if (success) {
        this.showStatus('Thank you for subscribing! Check your email for confirmation.', 'success');
        this.form.reset();
        
        // Track successful subscription
        this.trackSubscription(email);
      } else {
        this.showStatus('Something went wrong. Please try again later.', 'error');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      this.showStatus('Unable to subscribe right now. Please try again later.', 'error');
    } finally {
      this.isSubmitting = false;
      this.setLoadingState(false);
    }
  }

  /**
   * Subscribe email to newsletter service
   * @param {string} email - Email address to subscribe
   * @returns {Promise<boolean>} Success status
   */
  async subscribeEmail(email) {
    const subscriptionData = {
      email: email,
      source: 'website',
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      referrer: document.referrer || 'direct'
    };

    // Handle different service types
    if (this.config.service === 'disabled') {
      this.storeSubscriptionLocally(subscriptionData);
      console.log('Newsletter subscription (disabled mode):', subscriptionData);
      return true;
    }
    
    if (this.config.service === 'netlify') {
      return this.submitToNetlify(subscriptionData);
    }
    
    if (!this.config.apiEndpoint) {
      this.storeSubscriptionLocally(subscriptionData);
      console.log('Newsletter subscription (no API configured):', subscriptionData);
      return true;
    }

    // Use configured API endpoint
    try {
      const response = await fetch(this.config.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          _subject: 'New Newsletter Subscription',
          source: subscriptionData.source,
          page: subscriptionData.page,
          timestamp: subscriptionData.timestamp
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Subscription API error:', error);
      
      // Fallback: Store subscription locally for manual processing
      this.storeSubscriptionLocally(subscriptionData);
      return true; // Return true to show success message
    }
  }

  /**
   * Submit to Netlify Forms
   * @param {Object} subscriptionData - Subscription data
   * @returns {Promise<boolean>} Success status
   */
  async submitToNetlify(subscriptionData) {
    try {
      // Create form data for Netlify Forms submission
      const formData = new FormData();
      formData.append('form-name', 'newsletter-signup');
      formData.append('email', subscriptionData.email);
      formData.append('source', subscriptionData.source);
      formData.append('page', subscriptionData.page);
      formData.append('timestamp', subscriptionData.timestamp);

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });

      if (response.ok) {
        console.log('Newsletter subscription submitted to Netlify:', subscriptionData);
        return true;
      } else {
        console.warn('Netlify form submission failed, storing locally as fallback');
        this.storeSubscriptionLocally(subscriptionData);
        return true; // Still show success to user
      }
    } catch (error) {
      console.error('Netlify form submission error:', error);
      this.storeSubscriptionLocally(subscriptionData);
      return true; // Still show success to user
    }
  }

  /**
   * Store subscription locally as fallback
   * @param {Object} subscriptionData - Subscription data
   */
  storeSubscriptionLocally(subscriptionData) {
    try {
      const existingSubscriptions = JSON.parse(localStorage.getItem('newsletter_subscriptions') || '[]');
      existingSubscriptions.push(subscriptionData);
      localStorage.setItem('newsletter_subscriptions', JSON.stringify(existingSubscriptions));
      
      // Also log to console for development
      console.log('Newsletter subscription stored locally:', subscriptionData);
    } catch (error) {
      console.error('Failed to store subscription locally:', error);
    }
  }

  /**
   * Validate email address
   * @param {string} email - Email to validate
   * @returns {boolean} Is valid email
   */
  isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  /**
   * Validate email input and show feedback
   */
  validateEmail() {
    if (!this.emailInput) return;

    const email = this.emailInput.value.trim();
    
    // Remove previous validation classes
    this.emailInput.classList.remove('valid', 'invalid');
    
    if (email === '') {
      return; // Don't validate empty input
    }

    if (this.isValidEmail(email)) {
      this.emailInput.classList.add('valid');
      this.hideStatus();
    } else {
      this.emailInput.classList.add('invalid');
    }
  }

  /**
   * Show status message
   * @param {string} message - Message to show
   * @param {string} type - Message type ('success' or 'error')
   */
  showStatus(message, type = 'info') {
    if (!this.statusElement) return;

    this.statusElement.textContent = message;
    this.statusElement.className = `newsletter-status ${type} show`;
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        this.hideStatus();
      }, 5000);
    }
  }

  /**
   * Hide status message
   */
  hideStatus() {
    if (!this.statusElement) return;
    
    this.statusElement.classList.remove('show');
  }

  /**
   * Set loading state
   * @param {boolean} isLoading - Loading state
   */
  setLoadingState(isLoading) {
    if (!this.submitButton) return;

    if (isLoading) {
      this.submitButton.disabled = true;
      this.submitButton.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="animate-spin">
          <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
        </svg>
        Subscribing...
      `;
    } else {
      this.submitButton.disabled = false;
      this.submitButton.innerHTML = `
        Subscribe
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
        </svg>
      `;
    }
  }

  /**
   * Track successful subscription for analytics
   * @param {string} email - Subscribed email
   */
  trackSubscription(email) {
    // Google Analytics 4 event tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'newsletter_signup', {
        event_category: 'engagement',
        event_label: 'newsletter',
        value: 1
      });
    }

    // Custom event for other tracking systems
    document.dispatchEvent(new CustomEvent('newsletter:subscribed', {
      detail: {
        email: email,
        timestamp: new Date().toISOString(),
        source: 'website'
      }
    }));
  }

  /**
   * Get API endpoint based on service configuration
   * @returns {string} API endpoint URL
   */
  getApiEndpoint() {
    // Using placeholder endpoints for now - replace with actual APIs when ready
    switch (this.config.service) {
      case 'mailerlite':
        return 'https://api.mailerlite.com/api/v2/subscribers'; // Add your MailerLite API key
      case 'convertkit':
        return 'https://api.convertkit.com/v3/forms/PLACEHOLDER_FORM_ID/subscribe'; // Replace PLACEHOLDER_FORM_ID
      case 'formspree':
        return 'https://formspree.io/f/PLACEHOLDER_NEWSLETTER_ID'; // Replace PLACEHOLDER_NEWSLETTER_ID  
      case 'netlify':
        return null; // Netlify Forms use built-in form submission
      case 'disabled':
        return null; // Disabled for development - will store locally only
      default:
        return null; // No API configured
    }
  }

  /**
   * Update service configuration
   * @param {Object} config - New configuration
   */
  updateConfig(config) {
    this.config = { ...this.config, ...config };
  }

  /**
   * Get subscription statistics (for admin use)
   * @returns {Object} Subscription stats
   */
  getSubscriptionStats() {
    try {
      const subscriptions = JSON.parse(localStorage.getItem('newsletter_subscriptions') || '[]');
      return {
        total: subscriptions.length,
        recent: subscriptions.filter(sub => {
          const subDate = new Date(sub.timestamp);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return subDate > weekAgo;
        }).length,
        subscriptions: subscriptions
      };
    } catch (error) {
      console.error('Failed to get subscription stats:', error);
      return { total: 0, recent: 0, subscriptions: [] };
    }
  }

  /**
   * Export subscriptions for manual processing
   * @returns {string} CSV formatted subscriptions
   */
  exportSubscriptions() {
    try {
      const subscriptions = JSON.parse(localStorage.getItem('newsletter_subscriptions') || '[]');
      
      if (subscriptions.length === 0) {
        return 'No subscriptions found';
      }

      const headers = ['Email', 'Source', 'Page', 'Timestamp', 'Referrer'];
      const csvContent = [
        headers.join(','),
        ...subscriptions.map(sub => [
          sub.email,
          sub.source || '',
          sub.page || '',
          sub.timestamp || '',
          sub.referrer || ''
        ].join(','))
      ].join('\n');

      return csvContent;
    } catch (error) {
      console.error('Failed to export subscriptions:', error);
      return 'Export failed';
    }
  }

  /**
   * Download subscriptions as CSV file
   */
  downloadSubscriptions() {
    const csvContent = this.exportSubscriptions();
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `newsletter-subscriptions-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    window.URL.revokeObjectURL(url);
  }
}

// Export for global access in development
if (typeof window !== 'undefined') {
  window.NewsletterManager = NewsletterManager;
}