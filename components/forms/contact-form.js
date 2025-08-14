/**
 * Contact Form Component
 * Handles form validation, submission, and user interactions
 */

import { formConfig, getFormAction, getEmailRouting, getProviderConfig } from '../../js/config/forms.js';
import accessibilityManager from '../../js/utils/accessibility.js';

class ContactForm {
  constructor(formElement) {
    this.form = formElement;
    this.fields = {};
    this.errors = {};
    this.isSubmitting = false;
    
    this.init();
  }

  init() {
    this.setupFields();
    this.setupEventListeners();
    this.setupHoneypot();
  }

  setupFields() {
    // Get all form fields
    this.fields = {
      name: this.form.querySelector('#contact-name'),
      email: this.form.querySelector('#contact-email'),
      phone: this.form.querySelector('#contact-phone'),
      artist: this.form.querySelector('#contact-artist'),
      tattooType: this.form.querySelector('#contact-tattoo-type'),
      placement: this.form.querySelector('#contact-placement'),
      size: this.form.querySelector('#contact-size'),
      budget: this.form.querySelector('#contact-budget'),
      message: this.form.querySelector('#contact-message'),
      referenceImages: this.form.querySelector('#contact-reference'),
      honeypot: this.form.querySelector('#contact-honeypot')
    };
  }

  setupEventListeners() {
    // Form submission
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Real-time validation
    Object.entries(this.fields).forEach(([fieldName, field]) => {
      if (field && fieldName !== 'honeypot') {
        field.addEventListener('blur', () => this.validateField(fieldName));
        field.addEventListener('input', () => this.clearFieldError(fieldName));
        
        // Mobile-specific enhancements
        this.enhanceFieldForMobile(field, fieldName);
      }
    });

    // File upload handling
    if (this.fields.referenceImages) {
      this.fields.referenceImages.addEventListener('change', (e) => this.handleFileUpload(e));
      this.setupMobileFileUpload();
    }

    // Mobile form optimizations
    this.setupMobileFormOptimizations();
  }

  /**
   * Enhance individual fields for mobile experience
   */
  enhanceFieldForMobile(field, fieldName) {
    // Prevent zoom on iOS by ensuring font size is at least 16px
    const computedStyle = getComputedStyle(field);
    const fontSize = parseInt(computedStyle.fontSize);
    if (fontSize < 16) {
      field.style.fontSize = '16px';
    }

    // Add appropriate input modes for better mobile keyboards
    switch (fieldName) {
      case 'email':
        field.setAttribute('inputmode', 'email');
        field.setAttribute('autocomplete', 'email');
        break;
      case 'phone':
        field.setAttribute('inputmode', 'tel');
        field.setAttribute('autocomplete', 'tel');
        break;
      case 'name':
        field.setAttribute('autocomplete', 'name');
        break;
    }

    // Add touch-friendly focus handling
    field.addEventListener('focus', () => {
      // Scroll field into view on mobile to avoid keyboard overlap
      if (window.innerWidth <= 768) {
        setTimeout(() => {
          field.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
          });
        }, 300); // Delay to allow keyboard to appear
      }
    });

    // Enhanced validation feedback for mobile
    field.addEventListener('input', () => {
      if (field.value.trim()) {
        field.classList.add('has-content');
      } else {
        field.classList.remove('has-content');
      }
    });
  }

  /**
   * Setup mobile-specific file upload enhancements
   */
  setupMobileFileUpload() {
    const fileInput = this.fields.referenceImages;
    if (!fileInput) return;

    // Create mobile-friendly file upload interface
    const uploadContainer = fileInput.parentNode;
    uploadContainer.classList.add('mobile-file-upload');

    // Add camera capture option for mobile devices
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
      fileInput.setAttribute('capture', 'environment');
      
      // Create camera button for direct photo capture
      const cameraButton = document.createElement('button');
      cameraButton.type = 'button';
      cameraButton.className = 'camera-capture-btn';
      cameraButton.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 15.2l3.2-2.7a.8.8 0 0 1 1 1.2l-4 3.4a.8.8 0 0 1-1 0l-4-3.4a.8.8 0 0 1 1-1.2L12 15.2zM12 8.8L8.8 11.5a.8.8 0 0 1-1-1.2l4-3.4a.8.8 0 0 1 1 0l4 3.4a.8.8 0 0 1-1 1.2L12 8.8z"/>
        </svg>
        Take Photo
      `;
      
      cameraButton.addEventListener('click', () => {
        fileInput.click();
      });
      
      uploadContainer.appendChild(cameraButton);
    }

    // Add drag and drop for mobile browsers that support it
    this.setupMobileDragDrop(uploadContainer, fileInput);
  }

  /**
   * Setup mobile drag and drop functionality
   */
  setupMobileDragDrop(container, fileInput) {
    let dragCounter = 0;

    const handleDragEnter = (e) => {
      e.preventDefault();
      dragCounter++;
      container.classList.add('drag-over');
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      dragCounter--;
      if (dragCounter === 0) {
        container.classList.remove('drag-over');
      }
    };

    const handleDragOver = (e) => {
      e.preventDefault();
    };

    const handleDrop = (e) => {
      e.preventDefault();
      dragCounter = 0;
      container.classList.remove('drag-over');
      
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        // Create a new FileList and assign to input
        const dt = new DataTransfer();
        Array.from(files).forEach(file => dt.items.add(file));
        fileInput.files = dt.files;
        
        // Trigger change event
        fileInput.dispatchEvent(new Event('change', { bubbles: true }));
      }
    };

    container.addEventListener('dragenter', handleDragEnter);
    container.addEventListener('dragleave', handleDragLeave);
    container.addEventListener('dragover', handleDragOver);
    container.addEventListener('drop', handleDrop);
  }

  /**
   * Setup general mobile form optimizations
   */
  setupMobileFormOptimizations() {
    // Add mobile-specific classes
    if (window.innerWidth <= 768) {
      this.form.classList.add('mobile-form');
    }

    // Handle orientation changes
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        // Recalculate form layout after orientation change
        this.form.classList.toggle('landscape', window.innerWidth > window.innerHeight);
      }, 100);
    });

    // Optimize form submission for mobile
    this.form.addEventListener('submit', () => {
      // Hide keyboard on mobile after submission
      if (document.activeElement && document.activeElement.blur) {
        document.activeElement.blur();
      }
    });

    // Add touch-friendly form navigation
    this.setupFormNavigation();
  }

  /**
   * Setup touch-friendly form navigation
   */
  setupFormNavigation() {
    const formFields = Array.from(this.form.querySelectorAll('input, textarea, select')).filter(
      field => field.type !== 'hidden' && !field.disabled
    );

    formFields.forEach((field, index) => {
      // Add next/previous navigation for mobile
      field.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && field.tagName !== 'TEXTAREA') {
          e.preventDefault();
          const nextField = formFields[index + 1];
          if (nextField) {
            nextField.focus();
          } else {
            // Focus submit button if it's the last field
            const submitBtn = this.form.querySelector('.form-submit');
            if (submitBtn) {
              submitBtn.focus();
            }
          }
        }
      });

      // Add visual feedback for touch interactions
      field.addEventListener('touchstart', () => {
        field.classList.add('touch-active');
      });

      field.addEventListener('touchend', () => {
        setTimeout(() => {
          field.classList.remove('touch-active');
        }, 150);
      });
    });
  }

  setupHoneypot() {
    // Hide honeypot field from users but keep it accessible to bots
    if (this.fields.honeypot) {
      this.fields.honeypot.style.position = 'absolute';
      this.fields.honeypot.style.left = '-9999px';
      this.fields.honeypot.style.opacity = '0';
      this.fields.honeypot.setAttribute('tabindex', '-1');
      this.fields.honeypot.setAttribute('autocomplete', 'off');
    }
  }

  validateField(fieldName) {
    const field = this.fields[fieldName];
    if (!field) return true;

    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch (fieldName) {
      case 'name':
        if (!value) {
          isValid = false;
          errorMessage = 'Name is required';
        } else if (value.length < 2) {
          isValid = false;
          errorMessage = 'Name must be at least 2 characters';
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          isValid = false;
          errorMessage = 'Email is required';
        } else if (!emailRegex.test(value)) {
          isValid = false;
          errorMessage = 'Please enter a valid email address';
        }
        break;

      case 'phone':
        if (value) {
          const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
          const cleanPhone = value.replace(/[\s\-\(\)\.]/g, '');
          if (!phoneRegex.test(cleanPhone)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
          }
        }
        break;

      case 'message':
        if (!value) {
          isValid = false;
          errorMessage = 'Message is required';
        } else if (value.length < 10) {
          isValid = false;
          errorMessage = 'Message must be at least 10 characters';
        }
        break;
    }

    if (isValid) {
      this.clearFieldError(fieldName);
    } else {
      this.showFieldError(fieldName, errorMessage);
    }

    return isValid;
  }

  showFieldError(fieldName, message) {
    const field = this.fields[fieldName];
    if (!field) return;

    // Add error class to field
    field.classList.add('form-error');
    field.setAttribute('aria-invalid', 'true');
    
    // Remove success class if present
    field.classList.remove('form-success');

    // Show error message
    let errorElement = field.parentNode.querySelector('.form-error-message');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'form-error-message';
      errorElement.setAttribute('role', 'alert');
      errorElement.setAttribute('aria-live', 'polite');
      
      // Create unique ID for error message
      const errorId = `${fieldName}-error-${Date.now()}`;
      errorElement.id = errorId;
      field.setAttribute('aria-describedby', errorId);
      
      field.parentNode.appendChild(errorElement);
    }
    
    errorElement.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
      ${message}
    `;

    this.errors[fieldName] = message;
    
    // Announce error to screen readers
    accessibilityManager.announceError(`${field.labels?.[0]?.textContent || fieldName}: ${message}`);
  }

  clearFieldError(fieldName) {
    const field = this.fields[fieldName];
    if (!field) return;

    // Remove error class and attributes
    field.classList.remove('form-error');
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
    
    // Add success class if field has value and is valid
    if (field.value.trim() && this.validateField(fieldName)) {
      field.classList.add('form-success');
      field.setAttribute('aria-invalid', 'false');
    }

    // Remove error message
    const errorElement = field.parentNode.querySelector('.form-error-message');
    if (errorElement) {
      errorElement.remove();
    }

    delete this.errors[fieldName];
  }

  handleFileUpload(event) {
    const files = event.target.files;
    const maxFiles = 5;
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    // Validate file count
    if (files.length > maxFiles) {
      this.showFieldError('referenceImages', `Maximum ${maxFiles} files allowed`);
      event.target.value = '';
      return;
    }

    // Validate each file
    for (let file of files) {
      if (!allowedTypes.includes(file.type)) {
        this.showFieldError('referenceImages', 'Only JPEG, PNG, and WebP images are allowed');
        event.target.value = '';
        return;
      }

      if (file.size > maxSize) {
        this.showFieldError('referenceImages', 'Each file must be less than 10MB');
        event.target.value = '';
        return;
      }
    }

    this.clearFieldError('referenceImages');
    this.updateFileUploadDisplay(files);
  }

  updateFileUploadDisplay(files) {
    const fileList = this.form.querySelector('.file-upload-list');
    if (!fileList) return;

    fileList.innerHTML = '';
    
    Array.from(files).forEach((file, index) => {
      const fileItem = document.createElement('div');
      fileItem.className = 'file-upload-item';
      fileItem.innerHTML = `
        <span class="file-name">${file.name}</span>
        <span class="file-size">${this.formatFileSize(file.size)}</span>
        <button type="button" class="file-remove" data-index="${index}" aria-label="Remove ${file.name}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      `;
      fileList.appendChild(fileItem);
    });

    // Add remove file functionality
    fileList.addEventListener('click', (e) => {
      if (e.target.closest('.file-remove')) {
        const index = parseInt(e.target.closest('.file-remove').dataset.index);
        this.removeFile(index);
      }
    });
  }

  removeFile(index) {
    const fileInput = this.fields.referenceImages;
    const dt = new DataTransfer();
    
    Array.from(fileInput.files).forEach((file, i) => {
      if (i !== index) {
        dt.items.add(file);
      }
    });
    
    fileInput.files = dt.files;
    this.updateFileUploadDisplay(fileInput.files);
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  validateForm() {
    let isValid = true;
    const requiredFields = ['name', 'email', 'message'];

    // Check honeypot
    if (this.fields.honeypot && this.fields.honeypot.value) {
      return false; // Bot detected
    }

    // Validate required fields
    requiredFields.forEach(fieldName => {
      if (!this.validateField(fieldName)) {
        isValid = false;
      }
    });

    // Validate optional fields that have values
    Object.keys(this.fields).forEach(fieldName => {
      if (!requiredFields.includes(fieldName) && 
          fieldName !== 'honeypot' && 
          this.fields[fieldName] && 
          this.fields[fieldName].value.trim()) {
        if (!this.validateField(fieldName)) {
          isValid = false;
        }
      }
    });

    return isValid;
  }

  async handleSubmit(event) {
    event.preventDefault();

    if (this.isSubmitting) return;

    // Validate form
    if (!this.validateForm()) {
      this.showFormMessage('Please correct the errors above.', 'error');
      if (formConfig.ui.scrollToFormOnError) {
        this.scrollToFirstError();
      }
      return;
    }

    this.isSubmitting = true;
    this.showLoadingState();

    try {
      const formData = new FormData(this.form);
      
      // Remove honeypot from submission
      formData.delete('honeypot');

      // Add email routing information
      const artistSlug = formData.get('artist');
      const routingEmail = getEmailRouting(artistSlug);
      formData.append('_replyto', routingEmail);
      
      // Add additional metadata
      formData.append('_subject', this.generateEmailSubject(formData));
      formData.append('_source', 'Valhalla Tattoo Website');
      formData.append('_timestamp', new Date().toISOString());

      // Handle different form providers
      if (formConfig.provider === 'netlify') {
        await this.handleNetlifySubmission(formData);
      } else {
        await this.handleFormspreeSubmission(formData);
      }

    } catch (error) {
      console.error('Form submission error:', error);
      this.showErrorState();
    } finally {
      this.isSubmitting = false;
    }
  }

  async handleFormspreeSubmission(formData) {
    const config = getProviderConfig();
    const response = await fetch(getFormAction(), {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      // Check if we should redirect or show success message
      if (config.successRedirect) {
        window.location.href = config.successRedirect;
      } else {
        this.showSuccessState();
        this.resetForm();
      }
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Form submission failed');
    }
  }

  async handleNetlifySubmission(formData) {
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    });

    if (response.ok) {
      const config = getProviderConfig();
      if (config.successRedirect) {
        window.location.href = config.successRedirect;
      } else {
        this.showSuccessState();
        this.resetForm();
      }
    } else {
      throw new Error('Netlify form submission failed');
    }
  }

  generateEmailSubject(formData) {
    const name = formData.get('name') || 'Unknown';
    const artist = formData.get('artist') || 'Any Artist';
    const tattooType = formData.get('tattoo_type') || 'Custom';
    
    return `New Tattoo Consultation: ${name} - ${tattooType} (${artist})`;
  }

  scrollToFirstError() {
    const firstError = this.form.querySelector('.form-error');
    if (firstError) {
      const headerOffset = 100;
      const elementPosition = firstError.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      if (formConfig.ui.focusFirstErrorField) {
        setTimeout(() => firstError.focus(), 300);
      }
    }
  }

  showLoadingState() {
    const submitButton = this.form.querySelector('.form-submit');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.setAttribute('aria-busy', 'true');
      submitButton.innerHTML = `
        <svg class="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/>
          <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"/>
        </svg>
        Sending...
      `;
    }
    
    // Announce loading state
    accessibilityManager.announce('Sending your message, please wait...');
  }

  showSuccessState() {
    const config = getProviderConfig();
    this.showFormMessage(config.successMessage, 'success');
    
    const submitButton = this.form.querySelector('.form-submit');
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
      submitButton.innerHTML = 'Send Message';
    }
    
    // Announce success
    accessibilityManager.announce(config.successMessage);
  }

  showErrorState() {
    const config = getProviderConfig();
    this.showFormMessage(config.errorMessage, 'error');
    
    const submitButton = this.form.querySelector('.form-submit');
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
      submitButton.innerHTML = 'Send Message';
    }
    
    // Announce error
    accessibilityManager.announceError(config.errorMessage);
  }

  showFormMessage(message, type) {
    let messageElement = this.form.querySelector('.form-message');
    if (!messageElement) {
      messageElement = document.createElement('div');
      messageElement.className = 'form-message';
      this.form.insertBefore(messageElement, this.form.firstChild);
    }

    messageElement.className = `form-message form-message--${type}`;
    messageElement.innerHTML = `
      <div class="form-message__content">
        ${type === 'success' ? 
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>' :
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>'
        }
        <span>${message}</span>
      </div>
    `;

    // Auto-hide success messages if configured
    if (type === 'success' && formConfig.ui.autoHideSuccessMessage) {
      setTimeout(() => {
        if (messageElement.parentNode) {
          messageElement.remove();
        }
      }, formConfig.ui.successMessageTimeout);
    }

    // Scroll to message
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  resetForm() {
    this.form.reset();
    
    // Clear all field states
    Object.keys(this.fields).forEach(fieldName => {
      this.clearFieldError(fieldName);
      if (this.fields[fieldName]) {
        this.fields[fieldName].classList.remove('form-success', 'form-error');
      }
    });

    // Clear file upload display
    const fileList = this.form.querySelector('.file-upload-list');
    if (fileList) {
      fileList.innerHTML = '';
    }
  }

  // Method to pre-select artist (called from artist cards)
  selectArtist(artistName) {
    if (this.fields.artist) {
      this.fields.artist.value = artistName;
      this.fields.artist.dispatchEvent(new Event('change'));
    }
  }
}

// Auto-initialize contact forms
document.addEventListener('DOMContentLoaded', () => {
  const contactForms = document.querySelectorAll('.contact-form');
  contactForms.forEach(form => {
    new ContactForm(form);
  });
});

// Export for use in other modules
export default ContactForm;