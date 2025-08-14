# Valhalla Tattoo Website

A premium, interactive website for Valhalla Tattoo studio in Spring Hill, TN featuring smooth animations, artist portfolios, and modern web technologies.

🌐 **Live Site**: [Coming Soon](https://valhallatattoo.com) <!-- Replace with actual URL when site is deployed -->
📧 **Contact**: inkedbyvalhalla@gmail.com
📱 **Instagram**: [@valhallatattoollc](https://www.instagram.com/valhallatattoollc/)
📘 **Facebook**: [Valhalla Tattoo LLC](https://www.facebook.com/Valhallatattoollc)

## Features

- 🎨 **Premium Visual Design** - Cinematic hero sections with parallax scrolling
- ⚡ **Smooth Animations** - GSAP-powered micro-interactions and scroll triggers
- 📱 **Mobile-First Responsive** - Optimized for all devices and screen sizes
- 🖼️ **Interactive Portfolio** - Artist galleries with lightbox viewing
- 📧 **Contact Forms** - Integrated with Formspree for easy submissions
- 🔍 **SEO Optimized** - Structured data and meta tags for search visibility
- 🚀 **Performance Focused** - Lazy loading, WebP images, and optimized assets

## Project Structure

```
├── assets/
│   └── css/
│       ├── main.css          # Main stylesheet entry point
│       ├── variables.css     # CSS custom properties
│       ├── base.css          # Reset and base styles
│       ├── layout.css        # Grid and layout utilities
│       ├── components.css    # Reusable UI components
│       ├── animations.css    # Animation classes and keyframes
│       └── utilities.css     # Utility classes
├── js/
│   ├── main.js              # Application entry point
│   ├── modules/             # Feature modules
│   │   ├── homepage.js      # Homepage interactions
│   │   ├── portfolio.js     # Portfolio system
│   │   ├── contact.js       # Contact forms
│   │   └── animations.js    # Animation system
│   ├── data/                # Data structures
│   │   ├── artists.js       # Artist profiles
│   │   ├── content.js       # Site content
│   │   └── animations.js    # Animation configs
│   ├── utils/               # Utility functions
│   │   └── gsap-loader.js   # GSAP dynamic loading
│   └── config/              # Configuration
│       └── app.js           # App settings
├── components/              # Existing components
├── images/                  # Image assets
├── portfolio/               # Portfolio pages
└── index.html              # Main HTML template
```

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Animations**: GSAP (GreenSock) with ScrollTrigger
- **Forms**: Formspree integration
- **Styling**: CSS Custom Properties, CSS Grid, Flexbox
- **Performance**: Intersection Observer API, lazy loading
- **SEO**: Structured data, semantic HTML, meta tags

## Development

### Prerequisites

- Node.js (for development server)
- Modern web browser with ES6+ support

### Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000 in your browser

### Development Workflow

The project follows a modular architecture where each feature is implemented as a separate module:

1. **Homepage Module** - Hero animations, navigation, artist grid
2. **Portfolio Module** - Gallery system, lightbox, artist data
3. **Contact Module** - Form handling, validation, submissions
4. **Animation Module** - GSAP integration, scroll triggers, micro-interactions

## Implementation Status

✅ **Task 1: Project Structure & Animation Framework**
- Directory structure created
- GSAP integration setup
- JavaScript module architecture defined
- CSS architecture with custom properties
- Animation system foundation

🔄 **Next Tasks:**
- Premium visual design system
- Cinematic homepage with hero section
- Interactive portfolio system
- Contact form integration

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Goals

- Lighthouse Performance Score: 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

## Contributing

This project follows the spec-driven development methodology. See `.kiro/specs/website-enhancement/` for detailed requirements, design, and implementation tasks.

## License

MIT License - see LICENSE file for details.