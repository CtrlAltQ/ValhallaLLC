# Social Media Components Usage Guide

This guide shows how to use the Instagram feed and social media links components on the Valhalla Tattoo website.

## Instagram Feed Component

### Basic Usage

Add an Instagram feed to any page by including a container with the `data-instagram-feed` attribute:

```html
<!-- Basic Instagram Feed -->
<section class="instagram-section">
  <div class="container">
    <div data-instagram-feed></div>
  </div>
</section>
```

### Advanced Configuration

Configure the Instagram feed using data attributes:

```html
<!-- Customized Instagram Feed -->
<div 
  data-instagram-feed="homepage-feed"
  data-instagram-feed-max-posts="6"
  data-instagram-feed-show-captions="true"
  data-instagram-feed-show-dates="true"
  data-instagram-feed-caption-length="150"
  data-instagram-feed-lazy-load="true"
  data-instagram-feed-animate-on-scroll="true"
  data-instagram-feed-fallback-message="Follow us @valhallatattoo for the latest tattoo inspiration!"
></div>
```

### Configuration Options

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-instagram-feed` | string | auto-generated | Unique ID for the feed |
| `data-instagram-feed-max-posts` | number | 6 | Maximum number of posts to display |
| `data-instagram-feed-show-captions` | boolean | true | Show post captions |
| `data-instagram-feed-show-dates` | boolean | true | Show post dates |
| `data-instagram-feed-caption-length` | number | 100 | Maximum caption length |
| `data-instagram-feed-lazy-load` | boolean | true | Enable lazy loading for images |
| `data-instagram-feed-animate-on-scroll` | boolean | true | Animate posts on scroll |
| `data-instagram-feed-fallback-message` | string | "Follow us on Instagram..." | Message when no posts available |

## Social Media Links Component

### Basic Usage

Add social media links with the `data-social-links` attribute:

```html
<!-- Basic Studio Social Links -->
<div data-social-links></div>
```

### Studio Social Links

```html
<!-- Studio social links with custom styling -->
<div 
  data-social-links="studio-footer"
  data-social-links-type="studio"
  data-social-links-layout="horizontal"
  data-social-links-size="medium"
  data-social-links-style="filled"
  data-social-links-show-labels="true"
  data-social-links-show-follow-text="true"
  data-social-links-platforms='["instagram", "facebook", "tiktok"]'
></div>
```

### Artist Social Links

```html
<!-- Artist-specific social links -->
<div 
  data-social-links="pagan-social"
  data-social-links-type="artist"
  data-social-links-artist-slug="pagan"
  data-social-links-layout="vertical"
  data-social-links-size="small"
  data-social-links-style="outline"
  data-social-links-platforms='["instagram", "facebook"]'
></div>
```

### Configuration Options

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-social-links` | string | auto-generated | Unique ID for the links |
| `data-social-links-type` | string | "studio" | "studio" or "artist" |
| `data-social-links-artist-slug` | string | null | Artist slug (required for artist type) |
| `data-social-links-layout` | string | "horizontal" | "horizontal", "vertical", or "grid" |
| `data-social-links-size` | string | "medium" | "small", "medium", or "large" |
| `data-social-links-style` | string | "filled" | "filled", "outline", or "minimal" |
| `data-social-links-show-labels` | boolean | true | Show platform names |
| `data-social-links-show-follow-text` | boolean | true | Show "Follow us:" text |
| `data-social-links-platforms` | array | ["instagram", "facebook", "tiktok"] | Which platforms to display |

## Complete Page Examples

### Homepage with Instagram Feed

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Valhalla Tattoo</title>
  <link rel="stylesheet" href="/assets/css/main.css">
</head>
<body>
  <!-- Hero Section -->
  <section class="hero">
    <!-- Hero content -->
  </section>

  <!-- Instagram Section -->
  <section class="instagram-section section-padding">
    <div class="container">
      <div class="section-header text-center">
        <h2>Latest Work</h2>
        <p>Check out our recent tattoos and studio updates</p>
      </div>
      
      <!-- Instagram Feed -->
      <div 
        data-instagram-feed="homepage-feed"
        data-instagram-feed-max-posts="6"
        data-instagram-feed-animate-on-scroll="true"
      ></div>
    </div>
  </section>

  <!-- Footer with Social Links -->
  <footer class="main-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-social">
          <div 
            data-social-links="footer-social"
            data-social-links-layout="horizontal"
            data-social-links-style="filled"
            data-social-links-size="large"
          ></div>
        </div>
      </div>
    </div>
  </footer>

  <script type="module" src="/js/main.js"></script>
</body>
</html>
```

### Artist Portfolio Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pagan - Valhalla Tattoo</title>
  <link rel="stylesheet" href="/assets/css/main.css">
</head>
<body>
  <!-- Artist Header -->
  <section class="artist-header">
    <div class="container">
      <div class="artist-info">
        <h1>Pagan</h1>
        <p>Traditional & Neo-Traditional Specialist</p>
        
        <!-- Artist Social Links -->
        <div 
          data-social-links="pagan-header"
          data-social-links-type="artist"
          data-social-links-artist-slug="pagan"
          data-social-links-layout="horizontal"
          data-social-links-style="outline"
          data-social-links-size="medium"
        ></div>
      </div>
    </div>
  </section>

  <!-- Portfolio Gallery -->
  <section class="portfolio-section">
    <!-- Portfolio content -->
  </section>

  <!-- Artist's Recent Instagram Posts -->
  <section class="artist-instagram">
    <div class="container">
      <h2>Recent Work</h2>
      <div 
        data-instagram-feed="pagan-feed"
        data-instagram-feed-max-posts="4"
        data-instagram-feed-show-captions="false"
      ></div>
    </div>
  </section>

  <script type="module" src="/js/main.js"></script>
</body>
</html>
```

## Programmatic Usage

### JavaScript API

You can also create and manage social media components programmatically:

```javascript
// Get the social integration instance
const socialIntegration = window.ValhallaTattoo.getModule('social');

// Add Instagram feed programmatically
const instagramFeed = socialIntegration.addInstagramFeed('#my-container', {
  maxPosts: 8,
  showCaptions: true,
  animateOnScroll: true
}, 'my-custom-feed');

// Add social links programmatically
const socialLinks = socialIntegration.addSocialLinks('#social-container', {
  type: 'artist',
  artistSlug: 'jimmy',
  layout: 'vertical',
  style: 'minimal'
}, 'jimmy-social');

// Refresh Instagram content
await socialIntegration.refreshInstagramContent();

// Get current Instagram posts
const posts = await socialIntegration.getInstagramPosts();

// Set Instagram credentials (if needed)
socialIntegration.setInstagramCredentials('access_token', 'user_id');
```

## Styling Customization

### CSS Custom Properties

You can customize the appearance using CSS custom properties:

```css
:root {
  --instagram-accent-color: #e4405f;
  --social-link-hover-transform: translateY(-3px);
  --instagram-grid-gap: 2rem;
  --social-link-border-radius: 12px;
}
```

### Custom Styles

Override component styles with your own CSS:

```css
/* Custom Instagram feed styling */
.instagram-feed {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 3rem;
  border-radius: 20px;
}

.instagram-post {
  border-radius: 15px;
  overflow: hidden;
}

/* Custom social links styling */
.social-links--custom .social-link {
  background: var(--color-accent);
  color: white;
  border-radius: 50px;
  padding: 1rem 2rem;
}
```

## Events and Analytics

### Custom Events

The components dispatch custom events that you can listen for:

```javascript
// Listen for Instagram content updates
document.addEventListener('valhalla:instagram-updated', (event) => {
  console.log('Instagram content updated:', event.detail.posts);
});

// Listen for social link clicks
document.addEventListener('valhalla:social-click', (event) => {
  console.log('Social link clicked:', event.detail);
  // Send to your analytics service
});
```

### Google Analytics Integration

The components automatically integrate with Google Analytics if available:

```javascript
// Social clicks are automatically tracked as:
gtag('event', 'social_click', {
  social_network: 'instagram', // or 'facebook', 'tiktok'
  social_action: 'click',
  social_target: 'studio' // or artist slug
});
```

## Troubleshooting

### Common Issues

1. **Instagram feed not loading**
   - Check Instagram API credentials in `js/config/social.js`
   - Verify network connectivity
   - Check browser console for error messages

2. **Social links not appearing**
   - Ensure social media URLs are configured in `js/config/social.js`
   - Check that the artist slug matches the configuration

3. **Styling issues**
   - Verify that `assets/css/social.css` is being loaded
   - Check for CSS conflicts with existing styles

### Debug Mode

Enable debug logging by setting:

```javascript
localStorage.setItem('valhalla_debug', 'true');
```

This will show detailed console logs for social media operations.

## Performance Considerations

- Instagram images are lazy-loaded by default
- Content is cached for 1 hour to reduce API calls
- Components use Intersection Observer for efficient scroll animations
- Fallback content is shown when Instagram API is unavailable

## Accessibility Features

- All interactive elements have proper ARIA labels
- Keyboard navigation is fully supported
- Focus indicators are clearly visible
- Screen reader friendly markup
- Respects `prefers-reduced-motion` setting