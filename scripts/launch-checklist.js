#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Valhalla Tattoo Website - Launch Checklist');
console.log('==============================================\n');

let checklistResults = {
  passed: 0,
  failed: 0,
  warnings: 0,
  items: [],
  timestamp: new Date().toISOString()
};

function checkItem(name, status, message = '', critical = false) {
  const icon = status === 'pass' ? '✅' : status === 'fail' ? '❌' : '⚠️';
  const criticalFlag = critical ? ' [CRITICAL]' : '';
  console.log(`${icon} ${name}${criticalFlag}${message ? ': ' + message : ''}`);
  
  checklistResults.items.push({ name, status, message, critical });
  if (status === 'pass') checklistResults.passed++;
  else if (status === 'fail') checklistResults.failed++;
  else if (status === 'warn') checklistResults.warnings++;
}

// Content and Functionality Checks
function checkContentAndFunctionality() {
  console.log('📄 Content and Functionality');
  console.log('-----------------------------');
  
  // Check homepage
  if (fs.existsSync('index.html')) {
    checkItem('Homepage exists', 'pass', '', true);
    
    const indexContent = fs.readFileSync('index.html', 'utf8');
    
    // Check essential content
    if (indexContent.includes('Valhalla Tattoo')) {
      checkItem('Studio name present', 'pass');
    } else {
      checkItem('Studio name missing', 'fail', 'Add studio name to homepage', true);
    }
    
    // Check contact information
    if (indexContent.includes('931-451-5313') || indexContent.includes('contact')) {
      checkItem('Contact information present', 'pass');
    } else {
      checkItem('Contact information missing', 'fail', 'Add phone number and contact info', true);
    }
    
    // Check address
    if (indexContent.includes('Spring Hill') || indexContent.includes('404 Mclemore')) {
      checkItem('Studio address present', 'pass');
    } else {
      checkItem('Studio address missing', 'warn', 'Consider adding studio address');
    }
    
  } else {
    checkItem('Homepage missing', 'fail', 'Create index.html', true);
  }
  
  // Check portfolio pages
  const portfolioDir = 'portfolio';
  if (fs.existsSync(portfolioDir)) {
    const portfolioFiles = fs.readdirSync(portfolioDir).filter(f => f.endsWith('.html'));
    
    if (portfolioFiles.length >= 3) {
      checkItem(`Portfolio pages exist (${portfolioFiles.length} artists)`, 'pass');
    } else if (portfolioFiles.length > 0) {
      checkItem(`Limited portfolio pages (${portfolioFiles.length} artists)`, 'warn', 'Consider adding more artist portfolios');
    } else {
      checkItem('No portfolio pages found', 'fail', 'Create artist portfolio pages', true);
    }
  } else {
    checkItem('Portfolio directory missing', 'fail', 'Create portfolio directory and pages', true);
  }
  
  // Check images
  const imagesDir = 'images';
  if (fs.existsSync(imagesDir)) {
    checkItem('Images directory exists', 'pass');
    
    // Check portfolio images
    const portfolioImagesDir = path.join(imagesDir, 'portfolio');
    if (fs.existsSync(portfolioImagesDir)) {
      checkItem('Portfolio images directory exists', 'pass');
    } else {
      checkItem('Portfolio images directory missing', 'warn', 'Add portfolio images');
    }
    
    // Check studio images
    const studioImagesDir = path.join(imagesDir, 'studio');
    if (fs.existsSync(studioImagesDir)) {
      checkItem('Studio images directory exists', 'pass');
    } else {
      checkItem('Studio images directory missing', 'warn', 'Add studio photos');
    }
  } else {
    checkItem('Images directory missing', 'fail', 'Create images directory', true);
  }
  
  console.log('');
}

// Technical Implementation Checks
function checkTechnicalImplementation() {
  console.log('⚡ Technical Implementation');
  console.log('---------------------------');
  
  // Check CSS
  const mainCSS = 'assets/css/main.css';
  if (fs.existsSync(mainCSS)) {
    checkItem('Main CSS file exists', 'pass', '', true);
    
    const cssContent = fs.readFileSync(mainCSS, 'utf8');
    if (cssContent.includes('@media')) {
      checkItem('Responsive design implemented', 'pass');
    } else {
      checkItem('Responsive design missing', 'fail', 'Add mobile responsiveness', true);
    }
  } else {
    checkItem('Main CSS file missing', 'fail', 'Create main.css', true);
  }
  
  // Check JavaScript
  const mainJS = 'js/main.js';
  if (fs.existsSync(mainJS)) {
    checkItem('Main JavaScript file exists', 'pass', '', true);
  } else {
    checkItem('Main JavaScript file missing', 'fail', 'Create main.js', true);
  }
  
  // Check Service Worker
  if (fs.existsSync('sw.js')) {
    checkItem('Service Worker exists', 'pass');
  } else {
    checkItem('Service Worker missing', 'warn', 'Add for better performance');
  }
  
  // Check Web App Manifest
  if (fs.existsSync('manifest.json')) {
    checkItem('Web App Manifest exists', 'pass');
    
    try {
      const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
      if (manifest.name && manifest.short_name) {
        checkItem('Manifest has required fields', 'pass');
      } else {
        checkItem('Manifest missing required fields', 'warn');
      }
    } catch (error) {
      checkItem('Manifest JSON invalid', 'fail', 'Fix manifest.json syntax');
    }
  } else {
    checkItem('Web App Manifest missing', 'warn', 'Add for PWA features');
  }
  
  console.log('');
}

// Forms and Contact Checks
function checkFormsAndContact() {
  console.log('📝 Forms and Contact');
  console.log('--------------------');
  
  // Check contact form
  if (fs.existsSync('index.html')) {
    const indexContent = fs.readFileSync('index.html', 'utf8');
    
    if (indexContent.includes('<form')) {
      checkItem('Contact form present', 'pass', '', true);
      
      // Check form action
      if (indexContent.includes('formspree.io') || indexContent.includes('netlify')) {
        checkItem('Form backend configured', 'pass', '', true);
      } else {
        checkItem('Form backend not configured', 'fail', 'Configure Formspree or Netlify Forms', true);
      }
      
      // Check required fields
      const hasName = indexContent.includes('name="name"');
      const hasEmail = indexContent.includes('name="email"');
      const hasMessage = indexContent.includes('name="message"');
      
      if (hasName && hasEmail && hasMessage) {
        checkItem('Form has required fields', 'pass');
      } else {
        checkItem('Form missing required fields', 'fail', 'Add name, email, message fields', true);
      }
      
    } else {
      checkItem('Contact form missing', 'fail', 'Add contact form to homepage', true);
    }
  }
  
  // Check thank you page
  if (fs.existsSync('thank-you.html')) {
    checkItem('Thank you page exists', 'pass');
  } else {
    checkItem('Thank you page missing', 'warn', 'Create thank-you.html for form confirmations');
  }
  
  // Check form JavaScript
  const contactFormJS = 'components/forms/contact-form.js';
  if (fs.existsSync(contactFormJS)) {
    checkItem('Contact form JavaScript exists', 'pass');
  } else {
    checkItem('Contact form JavaScript missing', 'warn', 'Add form validation and handling');
  }
  
  console.log('');
}

// SEO and Analytics Checks
function checkSEOAndAnalytics() {
  console.log('🔍 SEO and Analytics');
  console.log('---------------------');
  
  // Check meta tags
  if (fs.existsSync('index.html')) {
    const indexContent = fs.readFileSync('index.html', 'utf8');
    
    if (indexContent.includes('<title>')) {
      checkItem('Page title present', 'pass');
    } else {
      checkItem('Page title missing', 'fail', 'Add page title', true);
    }
    
    if (indexContent.includes('name="description"')) {
      checkItem('Meta description present', 'pass');
    } else {
      checkItem('Meta description missing', 'fail', 'Add meta description', true);
    }
    
    if (indexContent.includes('name="viewport"')) {
      checkItem('Viewport meta tag present', 'pass');
    } else {
      checkItem('Viewport meta tag missing', 'fail', 'Add viewport meta tag', true);
    }
    
    // Check structured data
    if (indexContent.includes('application/ld+json')) {
      checkItem('Structured data present', 'pass');
    } else {
      checkItem('Structured data missing', 'warn', 'Add LocalBusiness schema');
    }
  }
  
  // Check robots.txt
  if (fs.existsSync('robots.txt')) {
    checkItem('robots.txt exists', 'pass');
  } else {
    checkItem('robots.txt missing', 'warn', 'Create robots.txt');
  }
  
  // Check sitemap
  if (fs.existsSync('sitemap.xml')) {
    checkItem('sitemap.xml exists', 'pass');
  } else {
    checkItem('sitemap.xml missing', 'warn', 'Create XML sitemap');
  }
  
  // Check analytics
  const analyticsJS = 'js/modules/analytics.js';
  if (fs.existsSync(analyticsJS)) {
    checkItem('Analytics module exists', 'pass');
    
    const analyticsContent = fs.readFileSync(analyticsJS, 'utf8');
    if (analyticsContent.includes('gtag') || analyticsContent.includes('GA_MEASUREMENT_ID')) {
      checkItem('Google Analytics configured', 'pass');
    } else {
      checkItem('Google Analytics not configured', 'warn', 'Add GA tracking ID');
    }
  } else {
    checkItem('Analytics module missing', 'warn', 'Add analytics tracking');
  }
  
  console.log('');
}

// Social Media Integration Checks
function checkSocialMediaIntegration() {
  console.log('📱 Social Media Integration');
  console.log('---------------------------');
  
  // Check Instagram integration
  const instagramJS = 'components/social/instagram-feed.js';
  if (fs.existsSync(instagramJS)) {
    checkItem('Instagram component exists', 'pass');
  } else {
    checkItem('Instagram component missing', 'warn', 'Add Instagram feed integration');
  }
  
  // Check social links
  const socialLinksJS = 'components/social/social-links.js';
  if (fs.existsSync(socialLinksJS)) {
    checkItem('Social links component exists', 'pass');
  } else {
    checkItem('Social links component missing', 'warn', 'Add social media links');
  }
  
  // Check for social media links in HTML
  if (fs.existsSync('index.html')) {
    const indexContent = fs.readFileSync('index.html', 'utf8');
    
    if (indexContent.includes('instagram') || indexContent.includes('facebook')) {
      checkItem('Social media links present', 'pass');
    } else {
      checkItem('Social media links missing', 'warn', 'Add social media links');
    }
  }
  
  console.log('');
}

// Performance and Accessibility Checks
function checkPerformanceAndAccessibility() {
  console.log('⚡ Performance and Accessibility');
  console.log('--------------------------------');
  
  // Check image optimization
  const imagesDir = 'images';
  if (fs.existsSync(imagesDir)) {
    const images = fs.readdirSync(imagesDir, { recursive: true });
    const webpImages = images.filter(img => img.endsWith('.webp'));
    
    if (webpImages.length > 0) {
      checkItem('WebP images present', 'pass');
    } else {
      checkItem('No WebP images found', 'warn', 'Convert images to WebP for better performance');
    }
    
    // Check for large images
    let hasLargeImages = false;
    images.forEach(img => {
      const imgPath = path.join(imagesDir, img);
      if (fs.existsSync(imgPath) && fs.statSync(imgPath).isFile()) {
        const size = fs.statSync(imgPath).size / (1024 * 1024); // MB
        if (size > 2) {
          hasLargeImages = true;
        }
      }
    });
    
    if (!hasLargeImages) {
      checkItem('Image sizes optimized', 'pass');
    } else {
      checkItem('Large images detected', 'warn', 'Optimize image sizes');
    }
  }
  
  // Check accessibility
  if (fs.existsSync('index.html')) {
    const indexContent = fs.readFileSync('index.html', 'utf8');
    
    // Check for alt attributes
    const imgTags = indexContent.match(/<img[^>]*>/g) || [];
    const imgsWithAlt = imgTags.filter(img => img.includes('alt=')).length;
    
    if (imgTags.length === 0 || imgsWithAlt === imgTags.length) {
      checkItem('Images have alt attributes', 'pass');
    } else {
      checkItem('Some images missing alt attributes', 'warn', 'Add alt text to all images');
    }
    
    // Check for semantic HTML
    const semanticTags = ['<header>', '<nav>', '<main>', '<section>', '<footer>'];
    const presentTags = semanticTags.filter(tag => indexContent.includes(tag));
    
    if (presentTags.length >= 3) {
      checkItem('Semantic HTML structure', 'pass');
    } else {
      checkItem('Limited semantic HTML', 'warn', 'Use more semantic HTML elements');
    }
  }
  
  console.log('');
}

// Security and Privacy Checks
function checkSecurityAndPrivacy() {
  console.log('🔒 Security and Privacy');
  console.log('-----------------------');
  
  // Check HTTPS configuration (would be done on server)
  checkItem('HTTPS configuration', 'warn', 'Ensure SSL certificate is configured on hosting', true);
  
  // Check privacy policy
  if (fs.existsSync('privacy-policy.html')) {
    checkItem('Privacy policy exists', 'pass');
  } else {
    checkItem('Privacy policy missing', 'warn', 'Create privacy policy page');
  }
  
  // Check consent banner
  const consentBanner = 'components/analytics/consent-banner.js';
  if (fs.existsSync(consentBanner)) {
    checkItem('Consent banner component exists', 'pass');
  } else {
    checkItem('Consent banner missing', 'warn', 'Add cookie consent banner');
  }
  
  // Check for sensitive data exposure
  const configFiles = ['js/config/app.js', 'js/config/analytics.js'];
  let hasSensitiveData = false;
  
  configFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('password') || content.includes('secret') || content.includes('private_key')) {
        hasSensitiveData = true;
      }
    }
  });
  
  if (!hasSensitiveData) {
    checkItem('No sensitive data in client code', 'pass');
  } else {
    checkItem('Sensitive data detected in client code', 'fail', 'Remove sensitive data from client-side code', true);
  }
  
  console.log('');
}

// Deployment Readiness Checks
function checkDeploymentReadiness() {
  console.log('🚀 Deployment Readiness');
  console.log('------------------------');
  
  // Check deployment configuration
  const deploymentFiles = ['netlify.toml', 'vercel.json', '.github/workflows'];
  let hasDeploymentConfig = false;
  
  deploymentFiles.forEach(file => {
    if (fs.existsSync(file)) {
      hasDeploymentConfig = true;
      checkItem(`Deployment config found: ${file}`, 'pass');
    }
  });
  
  if (!hasDeploymentConfig) {
    checkItem('No deployment configuration found', 'warn', 'Configure hosting platform');
  }
  
  // Check environment variables
  if (fs.existsSync('.env.example')) {
    checkItem('Environment variables template exists', 'pass');
  } else {
    checkItem('Environment variables template missing', 'warn', 'Create .env.example');
  }
  
  // Check build process
  if (fs.existsSync('package.json')) {
    checkItem('package.json exists', 'pass');
    
    const packageContent = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    if (packageContent.scripts && packageContent.scripts.build) {
      checkItem('Build script configured', 'pass');
    } else {
      checkItem('Build script missing', 'warn', 'Add build script to package.json');
    }
  } else {
    checkItem('package.json missing', 'warn', 'Create package.json for dependencies');
  }
  
  console.log('');
}

// Generate final report
function generateLaunchReport() {
  console.log('📊 Launch Readiness Report');
  console.log('===========================');
  
  const criticalIssues = checklistResults.items.filter(item => item.status === 'fail' && item.critical);
  const nonCriticalIssues = checklistResults.items.filter(item => item.status === 'fail' && !item.critical);
  const warnings = checklistResults.items.filter(item => item.status === 'warn');
  
  console.log(`✅ Passed: ${checklistResults.passed}`);
  console.log(`❌ Failed: ${checklistResults.failed}`);
  console.log(`⚠️  Warnings: ${checklistResults.warnings}`);
  console.log(`📝 Total Items: ${checklistResults.items.length}`);
  
  const passRate = Math.round((checklistResults.passed / checklistResults.items.length) * 100);
  console.log(`🎯 Pass Rate: ${passRate}%`);
  
  // Launch readiness assessment
  console.log('\n🚀 Launch Readiness Assessment:');
  
  if (criticalIssues.length === 0) {
    if (nonCriticalIssues.length === 0 && warnings.length <= 5) {
      console.log('🟢 READY FOR LAUNCH - All critical requirements met!');
    } else if (warnings.length <= 10) {
      console.log('🟡 READY WITH RECOMMENDATIONS - Consider addressing warnings');
    } else {
      console.log('🟡 READY BUT NEEDS IMPROVEMENT - Many recommendations to address');
    }
  } else {
    console.log('🔴 NOT READY FOR LAUNCH - Critical issues must be fixed');
  }
  
  // Critical issues
  if (criticalIssues.length > 0) {
    console.log('\n🚨 Critical Issues (Must Fix Before Launch):');
    criticalIssues.forEach((issue, i) => {
      console.log(`   ${i + 1}. ${issue.name}${issue.message ? ': ' + issue.message : ''}`);
    });
  }
  
  // Top recommendations
  if (warnings.length > 0) {
    console.log('\n💡 Top Recommendations:');
    warnings.slice(0, 10).forEach((warning, i) => {
      console.log(`   ${i + 1}. ${warning.name}${warning.message ? ': ' + warning.message : ''}`);
    });
    
    if (warnings.length > 10) {
      console.log(`   ... and ${warnings.length - 10} more recommendations`);
    }
  }
  
  // Next steps
  console.log('\n📋 Next Steps:');
  console.log('1. Fix all critical issues listed above');
  console.log('2. Test the website thoroughly on different devices');
  console.log('3. Configure hosting and domain settings');
  console.log('4. Set up monitoring and analytics');
  console.log('5. Perform final testing with real form submissions');
  console.log('6. Launch and monitor for issues');
  
  // Save detailed report
  const reportPath = path.join(__dirname, '../launch-checklist-results.json');
  fs.writeFileSync(reportPath, JSON.stringify(checklistResults, null, 2));
  console.log(`\n📄 Detailed report saved to: ${reportPath}`);
  
  return criticalIssues.length === 0;
}

// Run all checks
async function runLaunchChecklist() {
  try {
    checkContentAndFunctionality();
    checkTechnicalImplementation();
    checkFormsAndContact();
    checkSEOAndAnalytics();
    checkSocialMediaIntegration();
    checkPerformanceAndAccessibility();
    checkSecurityAndPrivacy();
    checkDeploymentReadiness();
    
    const readyForLaunch = generateLaunchReport();
    
    if (readyForLaunch) {
      console.log('\n🎉 Congratulations! Your website is ready for launch!');
      process.exit(0);
    } else {
      console.log('\n⚠️  Please address the critical issues before launching.');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Launch checklist failed:', error);
    process.exit(1);
  }
}

// Run launch checklist
runLaunchChecklist();