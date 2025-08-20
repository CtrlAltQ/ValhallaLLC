/**
 * Portfolio Page JavaScript
 * Handles individual artist portfolio pages without ES6 modules
 * Compatible with <script src=""> loading
 */

// Artist data (copied from artists.js but without ES6 export)
window.ValhallaTattooArtists = {
  pagan: {
    id: 'pagan',
    slug: 'pagan',
    name: 'Pagan',
    specialty: 'Traditional & Neo-Traditional',
    experience: '10+ years',
    bio: 'Specializing in bold traditional and neo-traditional tattoos with vibrant colors and timeless designs.',
    extendedBio: 'Pagan brings over a decade of experience to traditional and neo-traditional tattooing, with a deep respect for the classic American tattoo tradition while incorporating modern techniques and color palettes. Known for bold line work, vibrant colors, and designs that will look just as good in 20 years as they do today.',
    socialMedia: {
      instagram: '@valhallatattoollc',
      facebook: 'Valhallatattoollc'
    },
    portfolio: [
      {
        id: 1,
        filename: '20250729_145017.jpg',
        title: 'Custom Traditional Design',
        style: 'Traditional',
        placement: '',
        sessionTime: '',
        description: 'Custom traditional tattoo design with bold lines',
        tags: ['traditional', 'custom']
      },
      {
        id: 2,
        filename: 'IMG_3111.jpg',
        title: 'Black and Grey Work',
        style: 'Black & Grey',
        placement: '',
        sessionTime: '',
        description: 'Detailed black and grey tattoo',
        tags: ['black-grey', 'detailed']
      },
      {
        id: 3,
        filename: 'IMG_3129.jpg',
        title: 'Fine Line Art',
        style: 'Fine Line',
        placement: '',
        sessionTime: '',
        description: 'Intricate fine line tattoo work',
        tags: ['fine-line', 'detailed']
      },
      {
        id: 4,
        filename: 'image0(1).jpeg',
        title: 'Traditional Piece',
        style: 'Traditional',
        placement: '',
        sessionTime: '',
        description: 'Bold traditional tattoo with vibrant colors',
        tags: ['traditional', 'color']
      },
      {
        id: 5,
        filename: 'image0(3).jpeg',
        title: 'Norse-Inspired Design',
        style: 'Norse/Viking',
        placement: '',
        sessionTime: '',
        description: 'Norse-inspired tattoo with traditional elements',
        tags: ['norse', 'viking', 'traditional']
      },
      {
        id: 6,
        filename: 'image1(2).jpeg',
        title: 'Detailed Black Work',
        style: 'Black & Grey',
        placement: '',
        sessionTime: '',
        description: 'Detailed black and grey composition',
        tags: ['black-grey', 'detailed']
      },
      {
        id: 7,
        filename: 'image1.jpeg',
        title: 'Fine Line Portrait',
        style: 'Fine Line',
        placement: '',
        sessionTime: '',
        description: 'Delicate fine line portrait work',
        tags: ['fine-line', 'portrait']
      }
    ]
  },
  
  jimmy: {
    id: 'jimmy',
    slug: 'jimmy',
    name: 'Jimmy',
    specialty: 'Realism & Black & Grey',
    experience: '8+ years',
    bio: 'Master of photorealistic tattoos and intricate black and grey work that brings images to life on skin.',
    extendedBio: 'Jimmy has spent over 8 years perfecting the art of realistic tattooing, specializing in portraits, nature scenes, and detailed black and grey compositions. His meticulous attention to detail and understanding of light, shadow, and skin texture allows him to create tattoos that look like photographs.',
    socialMedia: {
      instagram: '@valhallatattoollc',
      facebook: 'Valhallatattoollc'
    },
    portfolio: [
      {
        id: 1,
        filename: 'FB_IMG_1754792182200.jpg',
        title: 'Detailed Realism Work',
        style: 'Realism',
        placement: '',
        sessionTime: '',
        description: 'Intricate realistic tattoo showcasing fine detail work',
        tags: ['realism', 'black and grey', 'portrait']
      },
      {
        id: 2,
        filename: 'FB_IMG_1754792184630.jpg',
        title: 'Black & Grey Portrait',
        style: 'Black & Grey',
        placement: '',
        sessionTime: '',
        description: 'Stunning black and grey portrait work',
        tags: ['portrait', 'black and grey', 'realism']
      },
      {
        id: 3,
        filename: 'FB_IMG_1754792186833.jpg',
        title: 'Realistic Animal Portrait',
        style: 'Realism',
        placement: '',
        sessionTime: '',
        description: 'Lifelike animal portrait with incredible detail',
        tags: ['animal', 'realism', 'black and grey']
      },
      {
        id: 4,
        filename: 'FB_IMG_1754792189094.jpg',
        title: 'Detailed Character Work',
        style: 'Realism',
        placement: '',
        sessionTime: '',
        description: 'Complex character tattoo with fine shading',
        tags: ['character', 'realism', 'detailed']
      }
    ]
  },

  micah: {
    id: 'micah',
    slug: 'micah',
    name: 'Micah',
    specialty: 'Fine Line & Geometric',
    experience: '6+ years',
    bio: 'Creating delicate fine line work and precise geometric designs with mathematical precision and artistic flair.',
    extendedBio: 'Micah specializes in the delicate art of fine line tattooing and geometric designs, bringing mathematical precision to organic forms. With 6+ years of experience, Micah has developed a signature style that combines minimalist aesthetics with complex geometric patterns.',
    socialMedia: {
      instagram: '@valhallatattoollc',
      facebook: 'Valhallatattoollc'
    },
    portfolio: [
      {
        id: 1,
        filename: 'MIkah_creation_F51EDE92-0E39-4170-B60F-C9A4571A860D.jpeg',
        title: 'Fine Line Creation',
        style: 'Fine Line',
        placement: '',
        sessionTime: '',
        description: 'Delicate fine line work showcasing precision and artistic detail',
        tags: ['fine line', 'detailed', 'artistic']
      },
      {
        id: 2,
        filename: 'Micah_creation_263C33BD-0726-46E3-8FE0-E7BD0C494296.jpeg',
        title: 'Geometric Design',
        style: 'Geometric',
        placement: '',
        sessionTime: '',
        description: 'Precise geometric patterns with mathematical accuracy',
        tags: ['geometric', 'precision', 'mathematical']
      },
      {
        id: 3,
        filename: 'Micah_creation_3101BC6C-B9BD-4C12-AEF6-9B1667A9C184.jpeg',
        title: 'Artistic Composition',
        style: 'Fine Line',
        placement: '',
        sessionTime: '',
        description: 'Artistic fine line composition with flowing elements',
        tags: ['fine line', 'artistic', 'flowing']
      },
      {
        id: 4,
        filename: 'Micah_creation_4C1CC18F-1D13-4E87-8BCF-23C95B16FC2A.jpeg',
        title: 'Detailed Line Work',
        style: 'Fine Line',
        placement: '',
        sessionTime: '',
        description: 'Intricate fine line work with careful attention to detail',
        tags: ['fine line', 'intricate', 'detailed']
      },
      {
        id: 5,
        filename: 'Micah_creation_51D6B834-A69A-4429-BD20-FDFF80B50B83.jpeg',
        title: 'Geometric Pattern',
        style: 'Geometric',
        placement: '',
        sessionTime: '',
        description: 'Complex geometric pattern with perfect symmetry',
        tags: ['geometric', 'pattern', 'symmetry']
      },
      {
        id: 6,
        filename: 'Micah_creation_7332848750778413037.jpeg',
        title: 'Fine Line Art',
        style: 'Fine Line',
        placement: '',
        sessionTime: '',
        description: 'Beautiful fine line artwork with organic flow',
        tags: ['fine line', 'artwork', 'organic']
      },
      {
        id: 7,
        filename: 'Micah_creation_7332848750782917803.jpeg',
        title: 'Minimalist Design',
        style: 'Fine Line',
        placement: 'Ankle',
        sessionTime: '',
        description: 'Elegant minimalist design with clean lines',
        tags: ['fine line', 'minimalist', 'elegant']
      },
      {
        id: 8,
        filename: 'Micah_creation_7332848750783349603.jpeg',
        title: 'Geometric Composition',
        style: 'Geometric',
        placement: 'Thigh',
        sessionTime: '',
        description: 'Sophisticated geometric composition with precise execution',
        tags: ['geometric', 'sophisticated', 'precise']
      },
      {
        id: 9,
        filename: 'Micah_creation_7332848750784236948.jpeg',
        title: 'Artistic Line Work',
        style: 'Fine Line',
        placement: 'Ribcage',
        sessionTime: '',
        description: 'Artistic fine line work with beautiful composition',
        tags: ['fine line', 'artistic', 'composition']
      },
      {
        id: 10,
        filename: 'Micah_creation_CCAB9748-CB96-4E28-B528-D89253D97CB4.jpeg',
        title: 'Detailed Creation',
        style: 'Fine Line',
        placement: '',
        sessionTime: '',
        description: 'Meticulously detailed creation with fine line precision',
        tags: ['fine line', 'detailed', 'meticulous']
      },
      {
        id: 11,
        filename: 'Mikah_creation_7332848750783349603 2.jpeg',
        title: 'Geometric Art',
        style: 'Geometric',
        placement: '',
        sessionTime: '',
        description: 'Geometric art piece with mathematical precision',
        tags: ['geometric', 'art', 'mathematical']
      },
      {
        id: 12,
        filename: 'Mikah_creation_D59A6904-6065-4078-A0AE-B8889D4DB6DD.jpeg',
        title: 'Fine Line Masterpiece',
        style: 'Fine Line',
        placement: '',
        sessionTime: '',
        description: 'Fine line masterpiece showcasing artistic expertise',
        tags: ['fine line', 'masterpiece', 'artistic']
      }
    ]
  },

  sarah: {
    id: 'sarah',
    slug: 'sarah',
    name: 'Sarah',
    specialty: 'Watercolor & Illustrative',
    experience: '7+ years',
    bio: 'Creating vibrant watercolor tattoos and illustrative designs that blur the line between art and skin.',
    extendedBio: 'Sarah brings a unique artistic perspective to tattooing with her background in fine arts and illustration. Specializing in watercolor techniques and illustrative styles, she creates tattoos that look like paintings on skin.',
    socialMedia: {
      instagram: '@valhallatattoollc',
      facebook: 'Valhallatattoollc'
    },
    portfolio: []
  },

  kason: {
    id: 'kason',
    slug: 'kason',
    name: 'Kason',
    specialty: 'Japanese & Oriental',
    experience: '9+ years',
    bio: 'Master of traditional Japanese tattooing techniques and oriental design aesthetics.',
    extendedBio: 'Kason has dedicated over 9 years to studying and perfecting traditional Japanese tattooing techniques, including the art of tebori (hand-poking) and machine work. His deep respect for Japanese culture and artistic traditions shows in every piece.',
    socialMedia: {
      instagram: '@valhallatattoollc',
      facebook: 'Valhallatattoollc'
    },
    portfolio: [
      {
        id: 1,
        filename: 'japanese-dragon.jpg',
        title: 'Traditional Dragon',
        style: 'Japanese',
        placement: '',
        sessionTime: '',
        description: 'Traditional Japanese dragon with wind bars and cloud motifs',
        tags: ['japanese', 'dragon', 'traditional']
      },
      {
        id: 2,
        filename: 'koi-sleeve.jpg',
        title: 'Koi Fish Sleeve',
        style: 'Japanese',
        placement: '',
        sessionTime: '',
        description: 'Full sleeve featuring koi fish, cherry blossoms, and water elements',
        tags: ['japanese', 'koi', 'sleeve']
      }
    ]
  },

  heather: {
    id: 'heather',
    slug: 'heather',
    name: 'Heather',
    specialty: '',
    experience: '',
    bio: 'Heather is the heart of Valhalla Tattoo, serving as our Shop Manager while pursuing her passion as a tattoo apprentice.',
    extendedBio: 'Heather is the heart of Valhalla Tattoo, serving as our Shop Manager while pursuing her passion as a tattoo apprentice. As Shop Manager, Heather ensures everything runs smoothly, from scheduling appointments to maintaining our high standards of cleanliness and professionalism. Her organizational skills and attention to detail keep the studio operating at its best. Currently training as an apprentice, Heather is learning the art of tattooing under the guidance of our experienced artists. Her dedication to both management and artistry makes her an invaluable part of the Valhalla team.',
    socialMedia: {
      instagram: '@valhallatattoollc',
      facebook: 'Valhallatattoollc'
    },
    portfolio: []
  }
};

// Portfolio Page Manager
window.PortfolioPageManager = {
  currentArtist: null,
  
  // Initialize the portfolio page
  init: function() {
    // Get artist slug from URL
    const urlPath = window.location.pathname;
    const artistSlug = urlPath.split('/').pop().replace('.html', '');
    
    this.currentArtist = window.ValhallaTattooArtists[artistSlug];
    
    if (this.currentArtist) {
      this.loadArtistData();
      this.setupPortfolioGallery();
      this.setupContactForm();
    } else {
      console.error('Artist not found:', artistSlug);
    }
  },

  // Load artist data into the page
  loadArtistData: function() {
    const artist = this.currentArtist;
    
    // Update page title if element exists
    const titleElement = document.querySelector('.artist-hero-title');
    if (titleElement) {
      titleElement.textContent = artist.name + "'s Portfolio";
    }
    
    // Update artist bio
    const bioElement = document.querySelector('.artist-bio');
    if (bioElement) {
      bioElement.textContent = artist.extendedBio || artist.bio;
    }
    
    // Update specialty
    const specialtyElement = document.querySelector('.artist-specialty');
    if (specialtyElement) {
      specialtyElement.textContent = artist.specialty;
    }
    
    // Update experience
    const experienceElement = document.querySelector('.artist-experience');
    if (experienceElement) {
      experienceElement.textContent = artist.experience;
    }

    // Update social media links
    this.updateSocialLinks();
  },

  // Update social media links
  updateSocialLinks: function() {
    const artist = this.currentArtist;
    
    const instagramLink = document.querySelector('.social-instagram');
    if (instagramLink && artist.socialMedia.instagram) {
      instagramLink.href = 'https://instagram.com/' + artist.socialMedia.instagram.replace('@', '');
    }
    
    const facebookLink = document.querySelector('.social-facebook');
    if (facebookLink && artist.socialMedia.facebook) {
      facebookLink.href = 'https://facebook.com/' + artist.socialMedia.facebook;
    }
  },

  // Setup portfolio gallery
  setupPortfolioGallery: function() {
    const galleryContainer = document.querySelector('.portfolio-gallery');
    if (!galleryContainer) return;
    
    const artist = this.currentArtist;
    let galleryHTML = '';
    
    artist.portfolio.forEach(image => {
      const imageSrc = `../images/portfolio/${artist.slug}/${image.filename}`;
      galleryHTML += `
        <div class="portfolio-item" data-style="${image.style}">
          <img src="${imageSrc}" alt="${image.title}" class="portfolio-img" loading="lazy">
          <div class="portfolio-overlay">
            <div class="portfolio-info">
              <h4>${image.title}</h4>
              <p class="portfolio-style">${image.style}</p>
              <p class="portfolio-placement">${image.placement}</p>
              <p class="portfolio-time">${image.sessionTime}</p>
              <p class="portfolio-description">${image.description}</p>
            </div>
          </div>
        </div>
      `;
    });
    
    galleryContainer.innerHTML = galleryHTML;
    
    // Setup lightbox/modal functionality
    this.setupLightbox();
  },

  // Setup lightbox functionality
  setupLightbox: function() {
    const portfolioItems = document.querySelectorAll('.portfolio-item img');
    
    portfolioItems.forEach(img => {
      img.addEventListener('click', function() {
        // Simple lightbox implementation
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
          <div class="lightbox-content">
            <img src="${this.src}" alt="${this.alt}" class="lightbox-img">
            <button class="lightbox-close">&times;</button>
          </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Close lightbox
        lightbox.querySelector('.lightbox-close').addEventListener('click', function() {
          document.body.removeChild(lightbox);
          document.body.style.overflow = '';
        });
        
        lightbox.addEventListener('click', function(e) {
          if (e.target === lightbox) {
            document.body.removeChild(lightbox);
            document.body.style.overflow = '';
          }
        });
      });
    });
  },

  // Setup contact form with artist pre-selected
  setupContactForm: function() {
    const artistSelect = document.querySelector('#contact-artist');
    if (artistSelect && this.currentArtist) {
      artistSelect.value = this.currentArtist.slug;
    }
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  if (window.PortfolioPageManager) {
    window.PortfolioPageManager.init();
  }
});

// Simple CSS for lightbox (can be moved to main.css)
const lightboxCSS = `
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.lightbox-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
}

.lightbox-img {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
}

.lightbox-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.lightbox-close:hover {
  opacity: 0.7;
}
`;

// Inject CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = lightboxCSS;
document.head.appendChild(styleSheet);
