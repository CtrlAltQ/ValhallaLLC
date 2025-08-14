/**
 * Contact Module
 * Handles contact forms, validation, and submission
 */

import ContactForm from '../../components/forms/contact-form.js';

export class Contact {
  constructor() {
    this.forms = [];
    this.contactFormInstances = [];
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    
    this.forms = document.querySelectorAll('.contact-form');
    
    this.setupContactForms();
    this.setupArtistPreselection();
    this.setupScrollToContact();
    
    this.initialized = true;
    console.log('Contact module initialized with', this.forms.length, 'forms');
  }

  setupContactForms() {
    this.forms.forEach(form => {
      const contactForm = new ContactForm(form);
      this.contactFormInstances.push(contactForm);
    });
  }

  setupArtistPreselection() {
    // Handle artist preselection from "Book Now" buttons
    const bookButtons = document.querySelectorAll('[data-artist]');
    
    bookButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const artistName = e.currentTarget.dataset.artist;
        if (artistName) {
          this.preselectArtist(artistName);
        }
      });
    });
  }

  setupScrollToContact() {
    // Handle smooth scrolling to contact section
    const scrollToContactButtons = document.querySelectorAll('[data-scroll-to="contact"]');
    
    scrollToContactButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.scrollToContactForm();
      });
    });
  }

  preselectArtist(artistSlug) {
    // Map artist slugs to display names
    const artistMap = {
      'pagan': 'pagan',
      'jimmy': 'jimmy', 
      'micah': 'micah',
      'sarah': 'sarah',
      'kason': 'kason',
      'heather': 'heather'
    };

    const artistValue = artistMap[artistSlug];
    if (artistValue) {
      this.contactFormInstances.forEach(contactForm => {
        contactForm.selectArtist(artistValue);
      });
    }
  }

  scrollToContactForm() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const headerOffset = 80; // Account for fixed header
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Focus on the first form field after scrolling
      setTimeout(() => {
        const firstInput = contactSection.querySelector('.form-input');
        if (firstInput) {
          firstInput.focus();
        }
      }, 500);
    }
  }

  // Public method to get contact form instances
  getContactForms() {
    return this.contactFormInstances;
  }

  // Public method to validate all forms
  validateAllForms() {
    return this.contactFormInstances.every(form => form.validateForm());
  }
}