# Valhalla Tattoo Website - Client Guide

Welcome to your new premium tattoo studio website! This guide will help you manage content, add images, write blog posts, and configure integrations.

## 📁 Quick File Overview

```
valhalla-tattoo-website/
├── 📸 images/                    # Your photos and graphics
│   ├── gallery/                 # Artist profile photos
│   ├── portfolio/               # Tattoo portfolio images
│   └── studio/                  # Studio photos
├── 📝 js/data/                  # Content you can edit
│   ├── artists.js               # Artist profiles and bios
│   ├── content.js               # Website text content
│   └── blog-posts.js            # Blog posts and news
├── ⚙️  js/config/               # Settings and API keys
│   ├── social.js                # Instagram/Facebook settings
│   └── forms.js                 # Contact form settings
└── 🎨 assets/css/               # Styling (advanced users)
```

## 🖼️ Adding Images

### Adding Artist Portfolio Images

1. **Prepare your images:**
   - Use JPG or PNG format
   - Recommended size: 1000-2000px wide
   - Keep file sizes under 2MB for fast loading

2. **Upload images:**
   ```
   📁 images/portfolio/[artist-name]/
   ├── tattoo-1.jpg
   ├── tattoo-2.jpg
   └── tattoo-3.jpg
   ```

3. **Update the artist data:**
   Open `js/data/artists.js` and add your images:
   ```javascript
   portfolio: [
     {
       filename: 'tattoo-1.jpg',
       title: 'Traditional Rose Sleeve',
       style: 'Traditional',
       placement: 'Arm'
     },
     // Add more images here
   ]
   ```

### Adding Artist Profile Photos

1. **Add photo to:** `images/gallery/[artist-name].jpg`
2. **Size:** 400x400px square, under 500KB
3. **The website automatically displays these photos**

### Adding Studio Photos

1. **Add photos to:** `images/studio/`
2. **Update:** `js/data/content.js` to reference new studio photos

## ✍️ Managing Blog Content

### Adding Blog Posts

Edit `js/data/blog-posts.js`:

```javascript
export const blogPosts = [
  {
    id: 1,
    title: "New Artist Spotlight: Sarah's Watercolor Magic",
    date: "2024-01-15",
    category: "Artist Spotlight",
    excerpt: "Meet our newest artist specializing in stunning watercolor tattoos...",
    content: `
      <p>We're excited to introduce Sarah, our newest team member...</p>
      <p>Her unique style combines traditional techniques with modern flair...</p>
    `,
    image: "blog/sarah-spotlight.jpg",
    author: "Valhalla Team"
  }
  // Add more posts here
]
```

### Blog Categories
- "Studio News"
- "Artist Spotlight" 
- "Tattoo Care"
- "Events"
- "Style Guide"

## 👥 Managing Artist Profiles

Edit `js/data/artists.js` to add or update artists:

```javascript
export const artists = [
  {
    // Basic Info
    id: 'sarah',
    name: 'Sarah Johnson',
    specialty: 'Watercolor & Illustrative',
    experience: '7+ Years Experience',
    
    // Bio
    bio: 'Sarah brings a unique artistic vision to tattoo artistry...',
    
    // Social Media
    socialMedia: {
      instagram: '@sarah_tattoos',
      facebook: 'sarah.valhalla.tattoo'
    },
    
    // Portfolio Images
    portfolio: [
      {
        filename: 'watercolor-butterfly.jpg',
        title: 'Watercolor Butterfly',
        style: 'Watercolor',
        placement: 'Shoulder'
      }
    ]
  }
]
```

## 📧 Setting Up Contact Forms

### Option 1: Formspree (Recommended - Free)

1. **Sign up:** https://formspree.io
2. **Create a form** and get your form ID
3. **Update:** `js/config/forms.js`:
   ```javascript
   export const formConfig = {
     provider: 'formspree',
     actionUrl: 'https://formspree.io/f/YOUR_FORM_ID',
     emailRouting: {
       general: 'info@valhallatattoo.com',
       pagan: 'pagan@valhallatattoo.com'
     }
   }
   ```

### Option 2: Netlify Forms (If hosting on Netlify)

1. **Update:** `js/config/forms.js`:
   ```javascript
   export const formConfig = {
     provider: 'netlify',
     actionUrl: '/thank-you',
     emailRouting: {
       general: 'info@valhallatattoo.com'
     }
   }
   ```

## 📱 Setting Up Social Media

### Instagram Integration

1. **Get Instagram credentials:**
   - Go to: https://developers.facebook.com/apps/
   - Create a Facebook App
   - Add Instagram Graph API
   - Get your Access Token and User ID

2. **Update:** `js/config/social.js`:
   ```javascript
   export const socialConfig = {
     instagram: {
       accessToken: 'YOUR_ACCESS_TOKEN_HERE',
       userId: 'YOUR_USER_ID_HERE',
       // ... other settings stay the same
     }
   }
   ```

### Social Media Links

Update your social media links in `js/data/content.js`:
```javascript
export const studioInfo = {
  socialMedia: {
    instagram: 'https://instagram.com/valhallatattoo',
    facebook: 'https://facebook.com/valhallatattoo',
    tiktok: 'https://tiktok.com/@valhallatattoo'
  }
}
```

## 📰 Setting Up Newsletter

### Option 1: Mailerlite (Recommended)

1. **Sign up:** https://mailerlite.com
2. **Get your API key** from settings
3. **Update:** `js/config/forms.js`:
   ```javascript
   export const newsletterConfig = {
     provider: 'mailerlite',
     apiKey: 'YOUR_API_KEY',
     groupId: 'YOUR_GROUP_ID'
   }
   ```

### Option 2: ConvertKit

1. **Sign up:** https://convertkit.com
2. **Get your API key and form ID**
3. **Update:** `js/config/forms.js`:
   ```javascript
   export const newsletterConfig = {
     provider: 'convertkit',
     apiKey: 'YOUR_API_KEY',
     formId: 'YOUR_FORM_ID'
   }
   ```

## 🚀 Publishing Your Website

### Option 1: Netlify (Recommended - Free)

1. **Sign up:** https://netlify.com
2. **Connect your code** (GitHub, GitLab, or drag & drop)
3. **Deploy:** Automatic builds and SSL certificates
4. **Custom domain:** Add your domain in Netlify settings

### Option 2: Vercel

1. **Sign up:** https://vercel.com
2. **Import project** from Git or upload files
3. **Deploy:** Automatic with custom domain support

### Option 3: Traditional Hosting

1. **Upload all files** to your web hosting via FTP
2. **Point domain** to the hosting directory
3. **Ensure SSL certificate** is installed

## 🔧 Basic Customization

### Changing Colors

Edit `assets/css/variables.css`:
```css
:root {
  --color-accent: #d4af37;        /* Gold accent color */
  --color-background: #1a1a1a;    /* Dark background */
  --color-text-primary: #ffffff;   /* Main text color */
}
```

### Changing Studio Information

Edit `js/data/content.js`:
```javascript
export const studioInfo = {
  name: 'Valhalla Tattoo',
  address: '404 Mclemore Ave. Suite 4, Spring Hill, TN 37174',
  phone: '931-451-5313',
  hours: 'Tuesday - Saturday: 12:00 PM - 8:00 PM'
}
```

## 📊 Analytics Setup (Optional)

### Google Analytics

1. **Create account:** https://analytics.google.com
2. **Get tracking ID** (starts with G- or GA-)
3. **Update:** `js/config/analytics.js`:
   ```javascript
   export const analyticsConfig = {
     measurementId: 'G-XXXXXXXXXX',
     enabled: true
   }
   ```

## 🆘 Common Issues & Solutions

### Images Not Loading
- Check file paths are correct
- Ensure images are under 2MB
- Use JPG/PNG format only

### Contact Form Not Working
- Verify Formspree form ID is correct
- Check spam folder for test emails
- Ensure internet connection is stable

### Instagram Feed Empty
- Check your Access Token is valid
- Ensure Instagram account is Business/Creator
- Verify User ID is correct

### Website Loading Slow
- Compress images before uploading
- Check internet connection
- Clear browser cache

## 📞 Need Help?

If you run into issues:
1. **Check this guide** for common solutions
2. **Test in a different browser** (Chrome, Firefox, Safari)
3. **Check browser console** for error messages (F12 key)
4. **Contact your developer** for advanced customizations

---

**Remember:** Always backup your files before making changes! Keep copies of your original images and content.

Your website is built with modern, professional code that's designed to grow with your business. The modular structure makes it easy to add new features in the future.