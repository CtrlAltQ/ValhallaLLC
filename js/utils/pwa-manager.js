/**
 * Progressive Web App Manager
 * Handles PWA installation, offline functionality, and mobile app-like features
 */

class PWAManager {
  constructor() {
    this.deferredPrompt = null;
    this.isInstalled = false;
    this.isStandalone = false;
    this.installButton = null;
    this.updateAvailable = false;
    
    this.init();
  }

  init() {
    this.detectInstallation();
    this.setupInstallPrompt();
    this.setupServiceWorkerUpdates();
    this.setupAppBadge();
    this.setupShareAPI();
    this.createInstallPrompt();
    this.setupOfflineIndicator();
    this.setupAppShortcuts();
  }

  /**
   * Detect if app is installed or running in standalone mode
   */
  detectInstallation() {
    // Check if running in standalone mode
    this.isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                      window.navigator.standalone === true;
    
    // Check if app is installed (various methods)
    this.isInstalled = this.isStandalone ||
                      document.referrer.includes('android-app://') ||
                      window.matchMedia('(display-mode: minimal-ui)').matches;
    
    if (this.isInstalled) {
      document.body.classList.add('pwa-installed');
      this.trackInstallation();
    }
  }

  /**
   * Setup install prompt handling
   */
  setupInstallPrompt() {
    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('PWA install prompt available');
      
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      
      // Store the event for later use
      this.deferredPrompt = e;
      
      // Show custom install button
      this.showInstallButton();
      
      // Track that install prompt is available
      this.trackInstallPromptAvailable();
    });

    // Listen for app installation
    window.addEventListener('appinstalled', (e) => {
      console.log('PWA was installed');
      this.isInstalled = true;
      this.deferredPrompt = null;
      
      // Hide install button
      this.hideInstallButton();
      
      // Track successful installation
      this.trackInstallation();
      
      // Show thank you message
      this.showInstallThankYou();
    });
  }

  /**
   * Create custom install prompt UI
   */
  createInstallPrompt() {
    // Create install banner
    const installBanner = document.createElement('div');
    installBanner.className = 'pwa-install-banner';
    installBanner.innerHTML = `
      <div class="pwa-install-content">
        <div class="pwa-install-icon">
          <img src="/images/logo.jpg" alt="Valhalla Tattoo" width="48" height="48">
        </div>
        <div class="pwa-install-text">
          <h3>Install Valhalla Tattoo</h3>
          <p>Get quick access to our portfolio and booking system</p>
        </div>
        <div class="pwa-install-actions">
          <button class="pwa-install-btn btn btn-primary">Install</button>
          <button class="pwa-install-close" aria-label="Close install prompt">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
      </div>
    `;
    
    // Add to page
    document.body.appendChild(installBanner);
    
    // Setup event listeners
    const installBtn = installBanner.querySelector('.pwa-install-btn');
    const closeBtn = installBanner.querySelector('.pwa-install-close');
    
    installBtn.addEventListener('click', () => this.promptInstall());
    closeBtn.addEventListener('click', () => this.dismissInstallPrompt());
    
    this.installBanner = installBanner;
  }

  /**
   * Show install button/banner
   */
  showInstallButton() {
    if (this.installBanner && !this.isInstalled) {
      this.installBanner.classList.add('visible');
      
      // Auto-hide after 10 seconds if not interacted with
      setTimeout(() => {
        if (this.installBanner.classList.contains('visible')) {
          this.installBanner.classList.add('auto-hide');
        }
      }, 10000);
    }
  }

  /**
   * Hide install button/banner
   */
  hideInstallButton() {
    if (this.installBanner) {
      this.installBanner.classList.remove('visible');
    }
  }

  /**
   * Prompt user to install the app
   */
  async promptInstall() {
    if (!this.deferredPrompt) {
      console.log('No install prompt available');
      return;
    }

    try {
      // Show the install prompt
      this.deferredPrompt.prompt();
      
      // Wait for the user to respond
      const { outcome } = await this.deferredPrompt.userChoice;
      
      console.log(`User response to install prompt: ${outcome}`);
      
      // Track user choice
      this.trackInstallChoice(outcome);
      
      // Clear the deferred prompt
      this.deferredPrompt = null;
      
      if (outcome === 'accepted') {
        this.hideInstallButton();
      }
      
    } catch (error) {
      console.error('Error showing install prompt:', error);
    }
  }

  /**
   * Dismiss install prompt
   */
  dismissInstallPrompt() {
    this.hideInstallButton();
    
    // Don't show again for this session
    sessionStorage.setItem('pwa-install-dismissed', 'true');
    
    // Track dismissal
    this.trackInstallDismissal();
  }

  /**
   * Setup service worker update handling
   */
  setupServiceWorkerUpdates() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        // New service worker has taken control
        this.showUpdateAvailable();
      });
      
      // Listen for update found
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
          this.updateAvailable = true;
          this.showUpdatePrompt();
        }
      });
    }
  }

  /**
   * Show update available notification
   */
  showUpdateAvailable() {
    const updateBanner = document.createElement('div');
    updateBanner.className = 'pwa-update-banner';
    updateBanner.innerHTML = `
      <div class="pwa-update-content">
        <div class="pwa-update-text">
          <h4>Update Available</h4>
          <p>A new version of the app is available</p>
        </div>
        <div class="pwa-update-actions">
          <button class="pwa-update-btn btn btn-primary">Update</button>
          <button class="pwa-update-close" aria-label="Close update notification">×</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(updateBanner);
    
    // Setup event listeners
    const updateBtn = updateBanner.querySelector('.pwa-update-btn');
    const closeBtn = updateBanner.querySelector('.pwa-update-close');
    
    updateBtn.addEventListener('click', () => {
      window.location.reload();
    });
    
    closeBtn.addEventListener('click', () => {
      updateBanner.remove();
    });
    
    // Show banner
    setTimeout(() => {
      updateBanner.classList.add('visible');
    }, 100);
  }

  /**
   * Show update prompt
   */
  showUpdatePrompt() {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Valhalla Tattoo Update', {
        body: 'A new version is available. Refresh to update.',
        icon: '/images/icons/icon-192x192.png',
        badge: '/images/icons/icon-96x96.png',
        tag: 'app-update',
        requireInteraction: true,
        actions: [
          {
            action: 'update',
            title: 'Update Now'
          },
          {
            action: 'dismiss',
            title: 'Later'
          }
        ]
      });
    }
  }

  /**
   * Setup app badge for notifications
   */
  setupAppBadge() {
    if ('setAppBadge' in navigator) {
      // Example: Set badge when there are new portfolio items or messages
      this.setBadge = (count) => {
        if (count > 0) {
          navigator.setAppBadge(count);
        } else {
          navigator.clearAppBadge();
        }
      };
    }
  }

  /**
   * Setup Web Share API
   */
  setupShareAPI() {
    if ('share' in navigator) {
      // Add share buttons to portfolio items and pages
      const shareButtons = document.querySelectorAll('.share-btn');
      
      shareButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
          e.preventDefault();
          
          const url = button.dataset.url || window.location.href;
          const title = button.dataset.title || document.title;
          const text = button.dataset.text || 'Check out this amazing tattoo work from Valhalla Tattoo!';
          
          try {
            await navigator.share({
              title: title,
              text: text,
              url: url
            });
            
            this.trackShare('native', url);
          } catch (error) {
            console.log('Error sharing:', error);
            // Fallback to clipboard
            this.fallbackShare(url, title);
          }
        });
      });
    } else {
      // Fallback for browsers without Web Share API
      this.setupFallbackShare();
    }
  }

  /**
   * Fallback share functionality
   */
  setupFallbackShare() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        const url = button.dataset.url || window.location.href;
        const title = button.dataset.title || document.title;
        
        this.fallbackShare(url, title);
      });
    });
  }

  /**
   * Fallback share using clipboard
   */
  async fallbackShare(url, title) {
    try {
      await navigator.clipboard.writeText(url);
      
      // Show success message
      this.showShareSuccess('Link copied to clipboard!');
      this.trackShare('clipboard', url);
      
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      
      // Final fallback - show share dialog
      this.showShareDialog(url, title);
    }
  }

  /**
   * Show share success message
   */
  showShareSuccess(message) {
    const toast = document.createElement('div');
    toast.className = 'share-toast';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('visible');
    }, 100);
    
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /**
   * Show share dialog with social media options
   */
  showShareDialog(url, title) {
    const dialog = document.createElement('div');
    dialog.className = 'share-dialog';
    dialog.innerHTML = `
      <div class="share-dialog-content">
        <h3>Share this page</h3>
        <div class="share-options">
          <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}" target="_blank" class="share-option facebook">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </a>
          <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}" target="_blank" class="share-option twitter">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
            Twitter
          </a>
          <button class="share-option copy-link" data-url="${url}">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
            </svg>
            Copy Link
          </button>
        </div>
        <button class="share-dialog-close">Close</button>
      </div>
    `;
    
    document.body.appendChild(dialog);
    
    // Setup event listeners
    const copyBtn = dialog.querySelector('.copy-link');
    const closeBtn = dialog.querySelector('.share-dialog-close');
    
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(url);
        this.showShareSuccess('Link copied!');
        dialog.remove();
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    });
    
    closeBtn.addEventListener('click', () => {
      dialog.remove();
    });
    
    // Close on backdrop click
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) {
        dialog.remove();
      }
    });
    
    // Show dialog
    setTimeout(() => {
      dialog.classList.add('visible');
    }, 100);
  }

  /**
   * Setup offline indicator
   */
  setupOfflineIndicator() {
    const createOfflineIndicator = () => {
      const indicator = document.createElement('div');
      indicator.className = 'offline-indicator';
      indicator.innerHTML = `
        <div class="offline-content">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.64 7c-.45-.34-4.93-4-11.64-4-1.5 0-2.89.19-4.15.48L18.18 13.8 23.64 7zm-6.6 8.22L3.27 1.44 2 2.72l2.05 2.06C1.91 5.76.59 6.82.36 7l11.63 14.49.01.01.01-.01L16.17 16l1.42 1.42 1.41-1.42z"/>
          </svg>
          <span>You're offline</span>
        </div>
      `;
      document.body.appendChild(indicator);
      return indicator;
    };
    
    let offlineIndicator = null;
    
    // Show offline indicator
    const showOffline = () => {
      if (!offlineIndicator) {
        offlineIndicator = createOfflineIndicator();
      }
      offlineIndicator.classList.add('visible');
    };
    
    // Hide offline indicator
    const hideOffline = () => {
      if (offlineIndicator) {
        offlineIndicator.classList.remove('visible');
      }
    };
    
    // Listen for online/offline events
    window.addEventListener('offline', showOffline);
    window.addEventListener('online', hideOffline);
    
    // Check initial state
    if (!navigator.onLine) {
      showOffline();
    }
  }

  /**
   * Setup app shortcuts handling
   */
  setupAppShortcuts() {
    // Handle shortcut navigation
    const urlParams = new URLSearchParams(window.location.search);
    const shortcut = urlParams.get('shortcut');
    
    if (shortcut) {
      this.trackShortcutUsage(shortcut);
      
      // Handle specific shortcut actions
      switch (shortcut) {
        case 'portfolio':
          // Scroll to portfolio section or navigate
          const portfolioSection = document.querySelector('#portfolio');
          if (portfolioSection) {
            portfolioSection.scrollIntoView({ behavior: 'smooth' });
          }
          break;
          
        case 'contact':
          // Focus on contact form
          const contactForm = document.querySelector('.contact-form');
          if (contactForm) {
            contactForm.scrollIntoView({ behavior: 'smooth' });
            const firstInput = contactForm.querySelector('input, textarea');
            if (firstInput) {
              setTimeout(() => firstInput.focus(), 500);
            }
          }
          break;
          
        case 'booking':
          // Pre-select consultation type
          const consultationOption = document.querySelector('[value="consultation"]');
          if (consultationOption) {
            consultationOption.selected = true;
          }
          break;
      }
    }
  }

  /**
   * Show install thank you message
   */
  showInstallThankYou() {
    const thankYou = document.createElement('div');
    thankYou.className = 'pwa-thank-you';
    thankYou.innerHTML = `
      <div class="pwa-thank-you-content">
        <h3>Thanks for installing!</h3>
        <p>You can now access Valhalla Tattoo directly from your home screen.</p>
        <button class="pwa-thank-you-close btn btn-primary">Got it</button>
      </div>
    `;
    
    document.body.appendChild(thankYou);
    
    const closeBtn = thankYou.querySelector('.pwa-thank-you-close');
    closeBtn.addEventListener('click', () => {
      thankYou.remove();
    });
    
    setTimeout(() => {
      thankYou.classList.add('visible');
    }, 100);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (thankYou.parentNode) {
        thankYou.remove();
      }
    }, 5000);
  }

  /**
   * Analytics tracking methods
   */
  trackInstallPromptAvailable() {
    if (window.ValhallaTattoo && window.ValhallaTattoo.getAnalytics) {
      window.ValhallaTattoo.getAnalytics().trackEvent('pwa_install_prompt_available');
    }
  }

  trackInstallChoice(outcome) {
    if (window.ValhallaTattoo && window.ValhallaTattoo.getAnalytics) {
      window.ValhallaTattoo.getAnalytics().trackEvent('pwa_install_choice', {
        outcome: outcome
      });
    }
  }

  trackInstallation() {
    if (window.ValhallaTattoo && window.ValhallaTattoo.getAnalytics) {
      window.ValhallaTattoo.getAnalytics().trackEvent('pwa_installed');
    }
  }

  trackInstallDismissal() {
    if (window.ValhallaTattoo && window.ValhallaTattoo.getAnalytics) {
      window.ValhallaTattoo.getAnalytics().trackEvent('pwa_install_dismissed');
    }
  }

  trackShare(method, url) {
    if (window.ValhallaTattoo && window.ValhallaTattoo.getAnalytics) {
      window.ValhallaTattoo.getAnalytics().trackEvent('content_shared', {
        method: method,
        url: url
      });
    }
  }

  trackShortcutUsage(shortcut) {
    if (window.ValhallaTattoo && window.ValhallaTattoo.getAnalytics) {
      window.ValhallaTattoo.getAnalytics().trackEvent('pwa_shortcut_used', {
        shortcut: shortcut
      });
    }
  }

  /**
   * Get PWA status for debugging
   */
  getStatus() {
    return {
      isInstalled: this.isInstalled,
      isStandalone: this.isStandalone,
      hasInstallPrompt: !!this.deferredPrompt,
      updateAvailable: this.updateAvailable,
      supportsShare: 'share' in navigator,
      supportsAppBadge: 'setAppBadge' in navigator,
      isOnline: navigator.onLine
    };
  }
}

// Auto-initialize
const pwaManager = new PWAManager();

// Export for global access
window.PWAManager = pwaManager;

export default pwaManager;