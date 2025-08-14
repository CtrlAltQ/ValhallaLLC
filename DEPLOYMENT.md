# Deployment Guide

This guide covers deploying the Valhalla Tattoo website to production hosting platforms.

## Quick Start

### Option 1: Netlify (Recommended)

1. **Connect Repository**
   - Go to [Netlify](https://netlify.com) and sign up/login
   - Click "New site from Git"
   - Connect your GitHub repository
   - Select the repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.` (root)
   - Node version: `18`

3. **Set Environment Variables**
   Go to Site Settings > Environment Variables and add:
   ```
   INSTAGRAM_ACCESS_TOKEN=your_instagram_token
   FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
   MAILERLITE_API_KEY=your_mailerlite_key
   GA_TRACKING_ID=your_google_analytics_id
   NODE_ENV=production
   ```

4. **Custom Domain Setup**
   - Go to Site Settings > Domain Management
   - Add your custom domain (e.g., valhallatattoo.com)
   - Configure DNS records as instructed
   - SSL certificate will be automatically provisioned

### Option 2: Vercel

1. **Connect Repository**
   - Go to [Vercel](https://vercel.com) and sign up/login
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `.` (root)

3. **Set Environment Variables**
   In project settings, add the same environment variables as above.

4. **Custom Domain**
   - Go to Project Settings > Domains
   - Add your custom domain
   - Configure DNS as instructed

## Environment Variables

### Required for Production

| Variable | Description | Example |
|----------|-------------|---------|
| `FORMSPREE_ENDPOINT` | Contact form submission endpoint | `https://formspree.io/f/abc123` |
| `GA_TRACKING_ID` | Google Analytics tracking ID | `G-XXXXXXXXXX` |

### Optional but Recommended

| Variable | Description | Example |
|----------|-------------|---------|
| `INSTAGRAM_ACCESS_TOKEN` | Instagram Graph API token | `IGQVJXa1b2c3d4e5f6g7h8i9j0` |
| `MAILERLITE_API_KEY` | MailerLite API key for newsletter | `abc123def456ghi789` |

### Development Only

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |

## DNS Configuration

### For Custom Domain (valhallatattoo.com)

#### Netlify DNS Records
```
Type    Name    Value
A       @       75.2.60.5
CNAME   www     your-site-name.netlify.app
```

#### Vercel DNS Records
```
Type    Name    Value
A       @       76.76.19.61
CNAME   www     cname.vercel-dns.com
```

## SSL Certificate

Both Netlify and Vercel provide automatic SSL certificates via Let's Encrypt. No manual configuration required.

## Performance Optimization

The build process automatically:
- Minifies CSS and JavaScript files
- Optimizes images for web delivery
- Generates service worker for caching
- Creates optimized asset headers

## Monitoring and Analytics

### Google Analytics Setup
1. Create a Google Analytics 4 property
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Add it to environment variables as `GA_TRACKING_ID`

### Error Monitoring
The site includes basic error logging. For advanced monitoring, consider:
- Sentry for error tracking
- LogRocket for session replay
- Hotjar for user behavior analytics

## Deployment Automation

### GitHub Actions
The repository includes automated deployment via GitHub Actions:
- Runs tests on every push
- Deploys to production on main branch
- Generates performance reports

### Manual Deployment

#### Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

#### Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

## Rollback Strategy

### Netlify
- Go to Site Overview > Production Deploys
- Click on a previous successful deploy
- Click "Publish deploy"

### Vercel
- Go to Project > Deployments
- Click on a previous deployment
- Click "Promote to Production"

## Security Headers

Both platforms are configured with security headers:
- Content Security Policy (CSP)
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

## Cache Configuration

Static assets are cached for 1 year:
- CSS files: `max-age=31536000`
- JavaScript files: `max-age=31536000`
- Images: `max-age=31536000`
- Service Worker: `no-cache`

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check Node.js version (should be 18+)
   - Verify all dependencies are installed
   - Check environment variables are set

2. **Forms Not Working**
   - Verify `FORMSPREE_ENDPOINT` is correct
   - Check Formspree dashboard for submissions
   - Ensure form action URL matches endpoint

3. **Instagram Feed Empty**
   - Verify `INSTAGRAM_ACCESS_TOKEN` is valid
   - Check token hasn't expired
   - Ensure Instagram account is business/creator

4. **Analytics Not Tracking**
   - Verify `GA_TRACKING_ID` format (G-XXXXXXXXXX)
   - Check Google Analytics dashboard
   - Ensure consent banner is working

### Support Contacts

- **Hosting Issues**: Contact Netlify/Vercel support
- **Domain Issues**: Contact your domain registrar
- **Code Issues**: Check GitHub repository issues
- **API Issues**: Contact respective service providers

## Performance Targets

The site should achieve:
- Lighthouse Performance Score: 90+
- First Contentful Paint: < 2s
- Largest Contentful Paint: < 3s
- Cumulative Layout Shift: < 0.1
- Time to Interactive: < 4s

Run performance audits regularly:
```bash
npm run test:performance
```