/**
 * PWA Icon Generator Utility
 * Generates placeholder icons for PWA manifest
 */

class IconGenerator {
  constructor() {
    this.baseColor = '#d4af37'; // Valhalla gold
    this.backgroundColor = '#1a1a1a'; // Dark background
  }

  /**
   * Generate a placeholder icon as SVG data URL
   */
  generateIcon(size, text = 'VT') {
    const svg = `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${this.baseColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:#b8941f;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="${this.backgroundColor}"/>
        <rect x="${size * 0.1}" y="${size * 0.1}" width="${size * 0.8}" height="${size * 0.8}" rx="${size * 0.15}" fill="url(#grad)"/>
        <text x="50%" y="50%" text-anchor="middle" dy="0.35em" 
              font-family="Arial, sans-serif" 
              font-weight="bold" 
              font-size="${size * 0.3}" 
              fill="${this.backgroundColor}">${text}</text>
      </svg>
    `;
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }

  /**
   * Generate all required PWA icons
   */
  generateAllIcons() {
    const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
    const icons = {};
    
    sizes.forEach(size => {
      icons[`icon-${size}x${size}`] = this.generateIcon(size);
    });
    
    // Generate shortcut icons
    icons['portfolio-96x96'] = this.generateIcon(96, 'P');
    icons['contact-96x96'] = this.generateIcon(96, 'C');
    icons['booking-96x96'] = this.generateIcon(96, 'B');
    
    return icons;
  }

  /**
   * Create icon files (for development/testing)
   */
  async createIconFiles() {
    const icons = this.generateAllIcons();
    
    // In a real implementation, you would save these as actual PNG files
    // For now, we'll just log the data URLs
    console.log('Generated PWA Icons:', icons);
    
    // Store in localStorage for demo purposes
    localStorage.setItem('pwa-icons', JSON.stringify(icons));
    
    return icons;
  }

  /**
   * Get icon data URL
   */
  getIcon(name) {
    const icons = JSON.parse(localStorage.getItem('pwa-icons') || '{}');
    return icons[name] || this.generateIcon(192);
  }
}

// Auto-generate icons on load
const iconGenerator = new IconGenerator();
iconGenerator.createIconFiles();

export default iconGenerator;