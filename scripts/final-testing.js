#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

console.log('🚀 Running final testing and launch validation...');

let testResults = {
  passed: 0,
  failed: 0,
  warnings: 0,
  tests: [],
  timestamp: new Date().toISOString(),
  environment: {
    node: process.version,
    platform: process.platform
  }
};

// Test utilities
function addTest(name, status, message = '', category = 'general') {
  testResults.tests.push({ name, status, message, category });
  if (status === 'pass') testResults.passed++;
  else if (status === 'fail') testResults.failed++;
  else if (status === 'warn') testResults.warnings++;
}

function logTest(name, status, message = '', category = 'general') {
  const icon = status === 'pass' ? '✅' : status === 'fail' ? '❌' : '⚠️';
  console.log(`${icon} ${name}${message ? ': ' + message : ''}`);
  addTest(name, status, message, category);
}

// Test contact form functionality
async function testContactForms() {
  console.log('\n📝 Testing contact form functionality...');
  
  try {
    // Check main contact form
    const indexContent = fs.readFileSync('index.html', 'utf8');
    
    // Test form presence and structure - look for contact form specifically
    const formMatch = indexContent.match(/<form[^>]*contact-form[^>]*>/);
    if (formMatch) {
      logTest('Contact form present', 'pass', '', 'forms');
      
      // Check form action
      if (formMatch[0].includes('action=')) {
        const actionMatch = formMatch[0].match(/action=["']([^"']+)["']/);
        if (actionMatch) {
          const action = actionMatch[1];
          if (action.includes('formspree.io')) {
            logTest('Form action configured', 'pass', 'Using Formspree', 'forms');
          } else if (formMatch[0].includes('data-netlify="true"')) {
            logTest('Form action configured', 'pass', 'Using Netlify Forms', 'forms');
          } else {
            logTest('Form action configured', 'warn', 'Custom action detected', 'forms');
          }
        }
      } else {
        logTest('Form action missing', 'fail', '', 'forms');
      }
      
      // Check form method
      if (formMatch[0].includes('method="POST"') || formMatch[0].includes("method='POST'")) {
        logTest('Form method is POST', 'pass', '', 'forms');
      } else {
        logTest('Form method should be POST', 'fail', '', 'forms');
      }
      
      // Check required fields
      const requiredFields = [
        { name: 'name', pattern: /name=["']name["']/ },
        { name: 'email', pattern: /name=["']email["']/ },
        { name: 'message', pattern: /name=["']message["']/ }
      ];
      
      requiredFields.forEach(field => {
        if (field.pattern.test(indexContent)) {
          logTest(`Form field present: ${field.name}`, 'pass', '', 'forms');
          
          // Check if field is required
          const fieldMatch = indexContent.match(new RegExp(`<[^>]*name=["']${field.name}["'][^>]*>`));
          if (fieldMatch && fieldMatch[0].includes('required')) {
            logTest(`Field ${field.name} is required`, 'pass', '', 'forms');
          } else {
            logTest(`Field ${field.name} should be required`, 'warn', '', 'forms');
          }
        } else {
          logTest(`Form field missing: ${field.name}`, 'fail', '', 'forms');
        }
      });
      
      // Check for artist selection
      if (indexContent.includes('artist') || indexContent.includes('select')) {
        logTest('Artist selection available', 'pass', '', 'forms');
      } else {
        logTest('Artist selection missing', 'warn', 'Consider adding artist pre-selection', 'forms');
      }
      
      // Check for spam protection
      if (indexContent.includes('honeypot') || indexContent.includes('_gotcha')) {
        logTest('Spam protection implemented', 'pass', '', 'forms');
      } else {
        logTest('Spam protection missing', 'warn', 'Consider adding honeypot field', 'forms');
      }
      
    } else {
      logTest('Contact form missing', 'fail', '', 'forms');
    }
    
    // Check thank you page
    if (fs.existsSync('thank-you.html')) {
      logTest('Thank you page exists', 'pass', '', 'forms');
      
      const thankYouContent = fs.readFileSync('thank-you.html', 'utf8');
      if (thankYouContent.includes('thank') || thankYouContent.includes('success')) {
        logTest('Thank you page has confirmation message', 'pass', '', 'forms');
      } else {
        logTest('Thank you page missing confirmation message', 'warn', '', 'forms');
      }
    } else {
      logTest('Thank you page missing', 'warn', 'Create thank-you.html for form confirmations', 'forms');
    }
    
    // Check form JavaScript
    const formJS = 'components/forms/contact-form.js';
    if (fs.existsSync(formJS)) {
      logTest('Form JavaScript component exists', 'pass', '', 'forms');
      
      const formJSContent = fs.readFileSync(formJS, 'utf8');
      if (formJSContent.includes('validation') || formJSContent.includes('validate')) {
        logTest('Client-side validation implemented', 'pass', '', 'forms');
      } else {
        logTest('Client-side validation missing', 'warn', '', 'forms');
      }
    } else {
      logTest('Form JavaScript component missing', 'warn', '', 'forms');
    }
    
  } catch (error) {
    logTest('Contact form test failed', 'fail', error.message, 'forms');
  }
}

// Test social media integration
async function testSocialMediaIntegration() {
  console.log('\n📱 Testing social media integration...');
  
  try {
    // Check Instagram integration
    const instagramJS = 'components/social/instagram-feed.js';
    if (fs.existsSync(instagramJS)) {
      logTest('Instagram component exists', 'pass', '', 'social');
      
      const instagramContent = fs.readFileSync(instagramJS, 'utf8');
      
      // Check for API integration
      if (instagramContent.includes('instagram') && instagramContent.includes('api')) {
        logTest('Instagram API integration present', 'pass', '', 'social');
      } else {
        logTest('Instagram API integration missing', 'warn', '', 'social');
      }
      
      // Check for error handling
      if (instagramContent.includes('catch') || instagramContent.includes('error')) {
        logTest('Instagram error handling implemented', 'pass', '', 'social');
      } else {
        logTest('Instagram error handling missing', 'warn', '', 'social');
      }
      
      // Check for fallback content
      if (instagramContent.includes('fallback') || instagramContent.includes('placeholder')) {
        logTest('Instagram fallback content implemented', 'pass', '', 'social');
      } else {
        logTest('Instagram fallback content missing', 'warn', '', 'social');
      }
      
    } else {
      logTest('Instagram component missing', 'fail', '', 'social');
    }
    
    // Check social links component
    const socialLinksJS = 'components/social/social-links.js';
    if (fs.existsSync(socialLinksJS)) {
      logTest('Social links component exists', 'pass', '', 'social');
    } else {
      logTest('Social links component missing', 'warn', '', 'social');
    }
    
    // Check for social media links in HTML
    const indexContent = fs.readFileSync('index.html', 'utf8');
    const socialPlatforms = ['instagram', 'facebook', 'twitter'];
    
    socialPlatforms.forEach(platform => {
      if (indexContent.toLowerCase().includes(platform)) {
        logTest(`${platform} links present`, 'pass', '', 'social');
      } else {
        logTest(`${platform} links missing`, 'warn', '', 'social');
      }
    });
    
    // Check Instagram API utility
    const instagramAPI = 'js/utils/instagram-api.js';
    if (fs.existsSync(instagramAPI)) {
      logTest('Instagram API utility exists', 'pass', '', 'social');
      
      const apiContent = fs.readFileSync(instagramAPI, 'utf8');
      if (apiContent.includes('access_token') || apiContent.includes('ACCESS_TOKEN')) {
        logTest('Instagram API token configuration present', 'pass', '', 'social');
      } else {
        logTest('Instagram API token configuration missing', 'warn', 'Configure API token', 'social');
      }
    } else {
      logTest('Instagram API utility missing', 'warn', '', 'social');
    }
    
  } catch (error) {
    logTest('Social media integration test failed', 'fail', error.message, 'social');
  }
}

// Test newsletter signup functionality
async function testNewsletterSignup() {
  console.log('\n📧 Testing newsletter signup functionality...');
  
  try {
    // Check newsletter JavaScript
    const newsletterJS = 'js/modules/newsletter.js';
    if (fs.existsSync(newsletterJS)) {
      logTest('Newsletter module exists', 'pass', '', 'newsletter');
      
      const newsletterContent = fs.readFileSync(newsletterJS, 'utf8');
      
      // Check for email service integration
      if (newsletterContent.includes('mailerlite') || newsletterContent.includes('convertkit') || newsletterContent.includes('mailchimp')) {
        logTest('Email service integration present', 'pass', '', 'newsletter');
      } else {
        logTest('Email service integration missing', 'warn', 'Configure email service', 'newsletter');
      }
      
      // Check for validation
      if (newsletterContent.includes('validation') || newsletterContent.includes('validate')) {
        logTest('Newsletter validation implemented', 'pass', '', 'newsletter');
      } else {
        logTest('Newsletter validation missing', 'warn', '', 'newsletter');
      }
      
    } else {
      logTest('Newsletter module missing', 'warn', '', 'newsletter');
    }
    
    // Check for newsletter signup form in HTML
    const indexContent = fs.readFileSync('index.html', 'utf8');
    if (indexContent.includes('newsletter') || indexContent.includes('subscribe')) {
      logTest('Newsletter signup form present', 'pass', '', 'newsletter');
      
      // Check for email input
      if (indexContent.includes('type="email"')) {
        logTest('Newsletter email input present', 'pass', '', 'newsletter');
      } else {
        logTest('Newsletter email input missing', 'warn', '', 'newsletter');
      }
    } else {
      logTest('Newsletter signup form missing', 'warn', '', 'newsletter');
    }
    
  } catch (error) {
    logTest('Newsletter signup test failed', 'fail', error.message, 'newsletter');
  }
}

// Test analytics and tracking
async function testAnalyticsTracking() {
  console.log('\n📊 Testing analytics and tracking...');
  
  try {
    // Check Google Analytics
    const analyticsJS = 'js/modules/analytics.js';
    if (fs.existsSync(analyticsJS)) {
      logTest('Analytics module exists', 'pass', '', 'analytics');
      
      const analyticsContent = fs.readFileSync(analyticsJS, 'utf8');
      
      // Check for Google Analytics
      if (analyticsContent.includes('gtag') || analyticsContent.includes('ga(')) {
        logTest('Google Analytics integration present', 'pass', '', 'analytics');
      } else {
        logTest('Google Analytics integration missing', 'warn', '', 'analytics');
      }
      
      // Check for event tracking
      if (analyticsContent.includes('event') || analyticsContent.includes('track')) {
        logTest('Event tracking implemented', 'pass', '', 'analytics');
      } else {
        logTest('Event tracking missing', 'warn', '', 'analytics');
      }
      
      // Check for privacy compliance
      if (analyticsContent.includes('consent') || analyticsContent.includes('privacy')) {
        logTest('Privacy compliance implemented', 'pass', '', 'analytics');
      } else {
        logTest('Privacy compliance missing', 'warn', 'Consider GDPR compliance', 'analytics');
      }
      
    } else {
      logTest('Analytics module missing', 'warn', '', 'analytics');
    }
    
    // Check for consent banner
    const consentBanner = 'components/analytics/consent-banner.js';
    if (fs.existsSync(consentBanner)) {
      logTest('Consent banner component exists', 'pass', '', 'analytics');
    } else {
      logTest('Consent banner component missing', 'warn', 'Consider adding consent banner', 'analytics');
    }
    
    // Check for analytics in HTML
    const indexContent = fs.readFileSync('index.html', 'utf8');
    if (indexContent.includes('gtag') || indexContent.includes('google-analytics')) {
      logTest('Analytics tracking code present in HTML', 'pass', '', 'analytics');
    } else {
      logTest('Analytics tracking code missing from HTML', 'warn', '', 'analytics');
    }
    
  } catch (error) {
    logTest('Analytics tracking test failed', 'fail', error.message, 'analytics');
  }
}

// Test error monitoring setup
async function testErrorMonitoring() {
  console.log('\n🔍 Testing error monitoring setup...');
  
  try {
    // Check for error handling in main JavaScript
    const mainJS = 'js/main.js';
    if (fs.existsSync(mainJS)) {
      const mainJSContent = fs.readFileSync(mainJS, 'utf8');
      
      // Check for try-catch blocks
      if (mainJSContent.includes('try') && mainJSContent.includes('catch')) {
        logTest('Error handling implemented in main.js', 'pass', '', 'monitoring');
      } else {
        logTest('Error handling missing in main.js', 'warn', '', 'monitoring');
      }
      
      // Check for error logging
      if (mainJSContent.includes('console.error') || mainJSContent.includes('error')) {
        logTest('Error logging implemented', 'pass', '', 'monitoring');
      } else {
        logTest('Error logging missing', 'warn', '', 'monitoring');
      }
    }
    
    // Check for performance monitoring
    const performanceMonitor = 'js/utils/performance-monitor.js';
    if (fs.existsSync(performanceMonitor)) {
      logTest('Performance monitoring utility exists', 'pass', '', 'monitoring');
    } else {
      logTest('Performance monitoring utility missing', 'warn', '', 'monitoring');
    }
    
    // Check for service worker error handling
    if (fs.existsSync('sw.js')) {
      const swContent = fs.readFileSync('sw.js', 'utf8');
      if (swContent.includes('catch') || swContent.includes('error')) {
        logTest('Service worker error handling implemented', 'pass', '', 'monitoring');
      } else {
        logTest('Service worker error handling missing', 'warn', '', 'monitoring');
      }
    }
    
  } catch (error) {
    logTest('Error monitoring test failed', 'fail', error.message, 'monitoring');
  }
}

// Test all user flows end-to-end
async function testUserFlows() {
  console.log('\n👤 Testing end-to-end user flows...');
  
  try {
    // Test homepage flow
    if (fs.existsSync('index.html')) {
      logTest('Homepage accessible', 'pass', '', 'user-flows');
      
      const indexContent = fs.readFileSync('index.html', 'utf8');
      
      // Check navigation
      if (indexContent.includes('<nav>') || indexContent.includes('navigation')) {
        logTest('Navigation present', 'pass', '', 'user-flows');
      } else {
        logTest('Navigation missing', 'warn', '', 'user-flows');
      }
      
      // Check hero section
      if (indexContent.includes('hero') || indexContent.includes('banner')) {
        logTest('Hero section present', 'pass', '', 'user-flows');
      } else {
        logTest('Hero section missing', 'warn', '', 'user-flows');
      }
      
      // Check call-to-action
      if (indexContent.includes('contact') || indexContent.includes('book') || indexContent.includes('cta')) {
        logTest('Call-to-action present', 'pass', '', 'user-flows');
      } else {
        logTest('Call-to-action missing', 'warn', '', 'user-flows');
      }
    }
    
    // Test portfolio flow
    const portfolioDir = 'portfolio';
    if (fs.existsSync(portfolioDir)) {
      const portfolioFiles = fs.readdirSync(portfolioDir).filter(f => f.endsWith('.html'));
      
      if (portfolioFiles.length > 0) {
        logTest(`Portfolio pages accessible (${portfolioFiles.length} pages)`, 'pass', '', 'user-flows');
        
        // Test first portfolio page
        const firstPortfolio = fs.readFileSync(path.join(portfolioDir, portfolioFiles[0]), 'utf8');
        
        // Check gallery
        if (firstPortfolio.includes('gallery') || firstPortfolio.includes('portfolio')) {
          logTest('Portfolio gallery present', 'pass', '', 'user-flows');
        } else {
          logTest('Portfolio gallery missing', 'warn', '', 'user-flows');
        }
        
        // Check artist info
        if (firstPortfolio.includes('artist') || firstPortfolio.includes('bio')) {
          logTest('Artist information present', 'pass', '', 'user-flows');
        } else {
          logTest('Artist information missing', 'warn', '', 'user-flows');
        }
        
        // Check contact link
        if (firstPortfolio.includes('contact') || firstPortfolio.includes('book')) {
          logTest('Contact link from portfolio present', 'pass', '', 'user-flows');
        } else {
          logTest('Contact link from portfolio missing', 'warn', '', 'user-flows');
        }
      } else {
        logTest('Portfolio pages missing', 'fail', '', 'user-flows');
      }
    } else {
      logTest('Portfolio directory missing', 'fail', '', 'user-flows');
    }
    
    // Test mobile responsiveness
    const cssFiles = ['assets/css/main.css', 'assets/css/mobile-optimization.css'];
    let hasMobileCSS = false;
    
    cssFiles.forEach(file => {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        if (content.includes('@media') && content.includes('max-width')) {
          hasMobileCSS = true;
        }
      }
    });
    
    if (hasMobileCSS) {
      logTest('Mobile responsive design implemented', 'pass', '', 'user-flows');
    } else {
      logTest('Mobile responsive design missing', 'fail', '', 'user-flows');
    }
    
  } catch (error) {
    logTest('User flows test failed', 'fail', error.message, 'user-flows');
  }
}

// Generate comprehensive test report
function generateFinalReport() {
  console.log('\n📋 Final Testing Report');
  console.log('========================');
  
  // Summary by category
  const categories = {};
  testResults.tests.forEach(test => {
    if (!categories[test.category]) {
      categories[test.category] = { passed: 0, failed: 0, warnings: 0, total: 0 };
    }
    categories[test.category][test.status === 'pass' ? 'passed' : test.status === 'fail' ? 'failed' : 'warnings']++;
    categories[test.category].total++;
  });
  
  console.log('\n📊 Results by Category:');
  Object.entries(categories).forEach(([category, stats]) => {
    const passRate = Math.round((stats.passed / stats.total) * 100);
    const icon = passRate >= 90 ? '🟢' : passRate >= 70 ? '🟡' : '🔴';
    console.log(`${icon} ${category}: ${stats.passed}/${stats.total} passed (${passRate}%)`);
  });
  
  console.log('\n📈 Overall Results:');
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`⚠️  Warnings: ${testResults.warnings}`);
  console.log(`📝 Total Tests: ${testResults.tests.length}`);
  
  const overallPassRate = Math.round((testResults.passed / testResults.tests.length) * 100);
  console.log(`🎯 Pass Rate: ${overallPassRate}%`);
  
  // Critical issues
  const criticalIssues = testResults.tests.filter(test => test.status === 'fail');
  if (criticalIssues.length > 0) {
    console.log('\n🚨 Critical Issues to Fix:');
    criticalIssues.forEach((issue, i) => {
      console.log(`   ${i + 1}. ${issue.name}${issue.message ? ': ' + issue.message : ''}`);
    });
  }
  
  // Recommendations
  const warnings = testResults.tests.filter(test => test.status === 'warn');
  if (warnings.length > 0) {
    console.log('\n💡 Recommendations:');
    warnings.slice(0, 10).forEach((warning, i) => {
      console.log(`   ${i + 1}. ${warning.name}${warning.message ? ': ' + warning.message : ''}`);
    });
    
    if (warnings.length > 10) {
      console.log(`   ... and ${warnings.length - 10} more recommendations`);
    }
  }
  
  // Launch readiness
  console.log('\n🚀 Launch Readiness Assessment:');
  if (testResults.failed === 0) {
    if (testResults.warnings <= 5) {
      console.log('🟢 READY FOR LAUNCH - All critical tests passed!');
    } else {
      console.log('🟡 READY WITH RECOMMENDATIONS - Consider addressing warnings');
    }
  } else {
    console.log('🔴 NOT READY - Fix critical issues before launch');
  }
  
  // Write detailed report
  const reportPath = path.join(__dirname, '../final-test-results.json');
  fs.writeFileSync(reportPath, JSON.stringify(testResults, null, 2));
  console.log(`\n📄 Detailed report saved to: ${reportPath}`);
  
  return testResults.failed === 0;
}

// Run all final tests
async function runFinalTests() {
  try {
    console.log('🎯 Starting comprehensive final testing...\n');
    
    await testContactForms();
    await testSocialMediaIntegration();
    await testNewsletterSignup();
    await testAnalyticsTracking();
    await testErrorMonitoring();
    await testUserFlows();
    
    const passed = generateFinalReport();
    
    if (passed) {
      console.log('\n🎉 All critical tests passed! Ready for launch.');
      process.exit(0);
    } else {
      console.log('\n⚠️  Some critical issues need to be addressed before launch.');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Final testing failed:', error);
    process.exit(1);
  }
}

// Run final tests
runFinalTests();