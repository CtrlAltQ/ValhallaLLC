/**
 * Accessibility Utilities
 * Provides comprehensive accessibility features and enhancements
 */

class AccessibilityManager {
  constructor() {
    this.focusableElements = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ');
    
    this.trapStack = [];
    this.announcements = [];
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    this.init();
  }

  init() {
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupScreenReaderSupport();
    this.setupMotionPreferences();
    this.setupSkipLinks();
    this.enhanceExistingElements();
  }

  /**
   * Setup global keyboard navigation
   */
  setupKeyboardNavigation() {
    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Skip to main content (Alt + M)
      if (e.altKey && e.key === 'm') {
        e.preventDefault();
        this.skipToMain();
      }
      
      // Skip to navigation (Alt + N)
      if (e.altKey && e.key === 'n') {
        e.preventDefault();
        this.skipToNavigation();
      }
      
      // Escape key handling for modals/overlays
      if (e.key === 'Escape') {
        this.handleEscapeKey();
      }
      
      // Tab trapping for modals
      if (e.key === 'Tab' && this.trapStack.length > 0) {
        this.handleTabTrapping(e);
      }
    });

    // Enhance button keyboard interactions
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'BUTTON' && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        e.target.click();
      }
    });
  }

  /**
   * Setup focus management system
   */
  setupFocusManagement() {
    // Track focus for better visibility
    document.addEventListener('focusin', (e) => {
      this.handleFocusIn(e.target);
    });

    document.addEventListener('focusout', (e) => {
      this.handleFocusOut(e.target);
    });

    // Mouse users shouldn't see focus outlines
    document.addEventListener('mousedown', () => {
      document.body.classList.add('using-mouse');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.remove('using-mouse');
      }
    });
  }

  /**
   * Setup screen reader support
   */
  setupScreenReaderSupport() {
    // Create live region for announcements
    this.liveRegion = document.createElement('div');
    this.liveRegion.setAttribute('aria-live', 'polite');
    this.liveRegion.setAttribute('aria-atomic', 'true');
    this.liveRegion.className = 'sr-only';
    this.liveRegion.id = 'live-region';
    document.body.appendChild(this.liveRegion);

    // Create assertive live region for urgent announcements
    this.assertiveLiveRegion = document.createElement('div');
    this.assertiveLiveRegion.setAttribute('aria-live', 'assertive');
    this.assertiveLiveRegion.setAttribute('aria-atomic', 'true');
    this.assertiveLiveRegion.className = 'sr-only';
    this.assertiveLiveRegion.id = 'assertive-live-region';
    document.body.appendChild(this.assertiveLiveRegion);
  }

  /**
   * Setup motion preferences
   */
  setupMotionPreferences() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleMotionPreference = (mq) => {
      this.reducedMotion = mq.matches;
      document.body.classList.toggle('reduce-motion', this.reducedMotion);
      
      if (this.reducedMotion) {
        this.announce('Animations have been reduced based on your system preferences.');
      }
    };

    handleMotionPreference(mediaQuery);
    mediaQuery.addEventListener('change', handleMotionPreference);
  }

  /**
   * Setup skip links
   */
  setupSkipLinks() {
    // Ensure skip links are properly styled and functional
    const skipLinks = document.querySelectorAll('.skip-link');
    skipLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /**
   * Enhance existing elements with accessibility features
   */
  enhanceExistingElements() {
    // Enhance images without alt text
    this.enhanceImages();
    
    // Enhance form elements
    this.enhanceFormElements();
    
    // Enhance interactive elements
    this.enhanceInteractiveElements();
    
    // Enhance navigation
    this.enhanceNavigation();
  }

  /**
   * Enhance images with proper alt text and loading states
   */
  enhanceImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Add loading state announcement
      if (img.loading === 'lazy' || img.classList.contains('lazy')) {
        img.addEventListener('load', () => {
          if (img.alt) {
            this.announce(`Image loaded: ${img.alt}`);
          }
        });
      }

      // Ensure decorative images are properly marked
      if (!img.alt && img.getAttribute('alt') !== '') {
        img.setAttribute('aria-hidden', 'true');
        img.setAttribute('alt', '');
      }
    });
  }

  /**
   * Enhance form elements with better accessibility
   */
  enhanceFormElements() {
    // Enhance form inputs
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      // Add required field indicators
      if (input.required && !input.getAttribute('aria-required')) {
        input.setAttribute('aria-required', 'true');
      }

      // Add invalid state handling
      input.addEventListener('invalid', () => {
        input.setAttribute('aria-invalid', 'true');
        const errorMessage = input.validationMessage;
        if (errorMessage) {
          this.announceError(`${input.labels?.[0]?.textContent || 'Field'}: ${errorMessage}`);
        }
      });

      input.addEventListener('input', () => {
        if (input.validity.valid) {
          input.removeAttribute('aria-invalid');
        }
      });
    });

    // Enhance form submission feedback
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', () => {
        this.announce('Form submitted. Please wait for confirmation.');
      });
    });
  }

  /**
   * Enhance interactive elements
   */
  enhanceInteractiveElements() {
    // Enhance buttons without proper labels
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      if (!button.textContent.trim() && !button.getAttribute('aria-label') && !button.getAttribute('aria-labelledby')) {
        console.warn('Button without accessible label found:', button);
      }
    });

    // Enhance links
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      // Add external link indicators
      if (link.hostname && link.hostname !== window.location.hostname) {
        if (!link.getAttribute('aria-label')) {
          const linkText = link.textContent.trim();
          link.setAttribute('aria-label', `${linkText} (opens in new window)`);
        }
        
        // Add visual indicator for screen readers
        if (!link.querySelector('.sr-only')) {
          const srText = document.createElement('span');
          srText.className = 'sr-only';
          srText.textContent = ' (external link)';
          link.appendChild(srText);
        }
      }
    });
  }

  /**
   * Enhance navigation accessibility
   */
  enhanceNavigation() {
    // Enhance main navigation
    const mainNav = document.querySelector('[role="navigation"], nav');
    if (mainNav && !mainNav.getAttribute('aria-label')) {
      mainNav.setAttribute('aria-label', 'Main navigation');
    }

    // Enhance mobile menu toggle
    const navToggle = document.querySelector('.main-nav__toggle, .nav-toggle');
    if (navToggle) {
      const menu = document.querySelector('.main-nav__menu, .nav-menu');
      if (menu) {
        navToggle.setAttribute('aria-controls', menu.id || 'main-menu');
        if (!menu.id) {
          menu.id = 'main-menu';
        }
        
        // Update aria-expanded based on menu state
        const updateMenuState = () => {
          const isExpanded = menu.classList.contains('active') || menu.classList.contains('open');
          navToggle.setAttribute('aria-expanded', isExpanded.toString());
        };
        
        // Initial state
        updateMenuState();
        
        // Listen for menu state changes
        const observer = new MutationObserver(updateMenuState);
        observer.observe(menu, { attributes: true, attributeFilter: ['class'] });
      }
    }
  }

  /**
   * Focus trap management for modals and overlays
   */
  trapFocus(container) {
    const focusableElements = container.querySelectorAll(this.focusableElements);
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const trapData = {
      container,
      firstFocusable,
      lastFocusable,
      previousFocus: document.activeElement
    };

    this.trapStack.push(trapData);

    // Focus the first element
    if (firstFocusable) {
      firstFocusable.focus();
    }

    return trapData;
  }

  /**
   * Release focus trap
   */
  releaseFocusTrap() {
    const trapData = this.trapStack.pop();
    if (trapData && trapData.previousFocus) {
      trapData.previousFocus.focus();
    }
    return trapData;
  }

  /**
   * Handle tab trapping within modals
   */
  handleTabTrapping(e) {
    const currentTrap = this.trapStack[this.trapStack.length - 1];
    if (!currentTrap) return;

    const { firstFocusable, lastFocusable } = currentTrap;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable?.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable?.focus();
      }
    }
  }

  /**
   * Handle escape key for closing modals
   */
  handleEscapeKey() {
    // Close lightbox if open
    const lightbox = document.querySelector('.lightbox-overlay.active');
    if (lightbox) {
      const closeButton = lightbox.querySelector('.lightbox-close');
      if (closeButton) {
        closeButton.click();
      }
      return;
    }

    // Close mobile menu if open
    const mobileMenu = document.querySelector('.main-nav__menu.active, .nav-menu.open');
    if (mobileMenu) {
      const toggleButton = document.querySelector('.main-nav__toggle, .nav-toggle');
      if (toggleButton) {
        toggleButton.click();
      }
      return;
    }

    // Close any other modal or overlay
    const modal = document.querySelector('[role="dialog"][aria-hidden="false"], .modal.active');
    if (modal) {
      const closeButton = modal.querySelector('[data-dismiss], .close, .modal-close');
      if (closeButton) {
        closeButton.click();
      }
    }
  }

  /**
   * Skip to main content
   */
  skipToMain() {
    const main = document.querySelector('main, #main, [role="main"]');
    if (main) {
      main.focus();
      main.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.announce('Skipped to main content');
    }
  }

  /**
   * Skip to navigation
   */
  skipToNavigation() {
    const nav = document.querySelector('nav, [role="navigation"]');
    if (nav) {
      const firstLink = nav.querySelector('a, button');
      if (firstLink) {
        firstLink.focus();
        nav.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.announce('Skipped to navigation');
      }
    }
  }

  /**
   * Handle focus in events
   */
  handleFocusIn(element) {
    // Add focus class for styling
    element.classList.add('focused');
    
    // Announce focus changes for screen readers when helpful
    if (element.tagName === 'BUTTON' && element.getAttribute('aria-label')) {
      // Don't announce every button focus as it can be verbose
    }
  }

  /**
   * Handle focus out events
   */
  handleFocusOut(element) {
    // Remove focus class
    element.classList.remove('focused');
  }

  /**
   * Announce message to screen readers
   */
  announce(message, priority = 'polite') {
    const region = priority === 'assertive' ? this.assertiveLiveRegion : this.liveRegion;
    
    // Clear previous message
    region.textContent = '';
    
    // Add new message after a brief delay to ensure it's announced
    setTimeout(() => {
      region.textContent = message;
    }, 100);

    // Clear message after announcement
    setTimeout(() => {
      region.textContent = '';
    }, 5000);
  }

  /**
   * Announce error messages
   */
  announceError(message) {
    this.announce(message, 'assertive');
  }

  /**
   * Get all focusable elements within a container
   */
  getFocusableElements(container = document) {
    return container.querySelectorAll(this.focusableElements);
  }

  /**
   * Check if element is visible and focusable
   */
  isFocusable(element) {
    if (!element || element.disabled || element.getAttribute('aria-hidden') === 'true') {
      return false;
    }

    const style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
  }

  /**
   * Enhance element with ARIA attributes
   */
  enhanceElement(element, options = {}) {
    const {
      role,
      label,
      labelledBy,
      describedBy,
      expanded,
      controls,
      hidden
    } = options;

    if (role) element.setAttribute('role', role);
    if (label) element.setAttribute('aria-label', label);
    if (labelledBy) element.setAttribute('aria-labelledby', labelledBy);
    if (describedBy) element.setAttribute('aria-describedby', describedBy);
    if (expanded !== undefined) element.setAttribute('aria-expanded', expanded.toString());
    if (controls) element.setAttribute('aria-controls', controls);
    if (hidden !== undefined) element.setAttribute('aria-hidden', hidden.toString());
  }

  /**
   * Create accessible loading state
   */
  createLoadingState(container, message = 'Loading...') {
    const loadingElement = document.createElement('div');
    loadingElement.className = 'loading-state';
    loadingElement.setAttribute('role', 'status');
    loadingElement.setAttribute('aria-live', 'polite');
    loadingElement.innerHTML = `
      <span class="sr-only">${message}</span>
      <div class="loading-spinner" aria-hidden="true"></div>
    `;
    
    container.appendChild(loadingElement);
    return loadingElement;
  }

  /**
   * Remove loading state
   */
  removeLoadingState(container) {
    const loadingElement = container.querySelector('.loading-state');
    if (loadingElement) {
      loadingElement.remove();
    }
  }

  /**
   * Create accessible error state
   */
  createErrorState(container, message, actionButton = null) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-state';
    errorElement.setAttribute('role', 'alert');
    errorElement.innerHTML = `
      <div class="error-content">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        <span>${message}</span>
        ${actionButton ? actionButton.outerHTML : ''}
      </div>
    `;
    
    container.appendChild(errorElement);
    this.announceError(message);
    return errorElement;
  }

  /**
   * Destroy accessibility manager
   */
  destroy() {
    // Remove live regions
    if (this.liveRegion) {
      this.liveRegion.remove();
    }
    if (this.assertiveLiveRegion) {
      this.assertiveLiveRegion.remove();
    }

    // Clear focus traps
    this.trapStack = [];
  }
}

// Create global instance
const accessibilityManager = new AccessibilityManager();

export default accessibilityManager;