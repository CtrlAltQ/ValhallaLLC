#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

console.log('🧪 Running comprehensive test suite...');

let testResults = {
  passed: 0,
  failed: 0,
  warnings: 0,
  tests: []
};

// Test utilities
function addTest(name, status, message = '') {
  testResults.tests.push({ name, status, message });
  if (status === 'pass') testResults.passed++;
  else if (status === 'fail') testResults.failed++;
  else if (status === 'warn') testResults.warnings++;
}

function logTest(name, status, message = '') {
  const icon = status === 'pass' ? '✅' : status === 'fail' ? '❌' : '⚠️';
  console.log(`${icon} ${name}${message ? ': ' + message : ''}`);
  addTest(name, status, message);
}

// File structure tests
function testFileStructure() {
  console.log('\n📁 Testing file structure...');
  
  const requiredFiles = [
    'index.html',
    'manifest.json',
    'sw.js',
    'robots.txt',
    'sitemap.xml',
    'assets/css/main.css',
    'js/main.js',
    'js/config/app.js'
  ];
  
  requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
      logTest(`File exists: ${file}`, 'pass');
    } else {
      logTest(`File missing: ${file}`, 'fail');
    }
  });
}

// HTML validation tests
function testHTMLStructure() {
  console.log('\n🏗️  Testing HTML structure...');
  
  try {
    const indexContent = fs.readFileSync('index.html', 'utf8');
    
    // Check for required meta tags
    const requiredMeta = [
      { pattern: /charset=["']utf-8["']/i, name: 'charset' },
      { pattern: /<meta name="viewport"/, name: 'viewport' },
      { pattern: /<meta name="description"/, name: 'description' },
      { pattern: /<title>/, name: 'title' }
    ];
    
    requiredMeta.forEach(meta => {
      if (meta.pattern.test(indexContent)) {
        logTest(`Meta tag present: ${meta.name}`, 'pass');
      } else {
        logTest(`Meta tag missing: ${meta.name}`, 'fail');
      }
    });
    
    // Check for semantic HTML
    const semanticTags = ['<header>', '<nav>', '<main>', '<section>', '<footer>'];
    semanticTags.forEach(tag => {
      if (indexContent.includes(tag)) {
        logTest(`Semantic tag present: ${tag}`, 'pass');
      } else {
        logTest(`Semantic tag missing: ${tag}`, 'warn');
      }
    });
    
    // Check for accessibility attributes
    if (indexContent.includes('alt=')) {
      logTest('Images have alt attributes', 'pass');
    } else {
      logTest('Images missing alt attributes', 'warn');
    }
    
  } catch (error) {
    logTest('HTML structure test', 'fail', error.message);
  }
}

// CSS validation tests
function testCSSStructure() {
  console.log('\n🎨 Testing CSS structure...');
  
  try {
    const mainCSS = fs.readFileSync('assets/css/main.css', 'utf8');
    
    // Check for CSS custom properties
    if (mainCSS.includes('--')) {
      logTest('CSS custom properties used', 'pass');
    } else {
      logTest('CSS custom properties missing', 'warn');
    }
    
    // Check for responsive design
    if (mainCSS.includes('@media')) {
      logTest('Responsive design implemented', 'pass');
    } else {
      logTest('Responsive design missing', 'fail');
    }
    
    // Check for animations
    if (mainCSS.includes('@keyframes') || mainCSS.includes('transition')) {
      logTest('CSS animations present', 'pass');
    } else {
      logTest('CSS animations missing', 'warn');
    }
    
  } catch (error) {
    logTest('CSS structure test', 'fail', error.message);
  }
}

// JavaScript validation tests
function testJavaScriptStructure() {
  console.log('\n⚡ Testing JavaScript structure...');
  
  try {
    const mainJS = fs.readFileSync('js/main.js', 'utf8');
    
    // Check for modern JavaScript
    if (mainJS.includes('const ') || mainJS.includes('let ')) {
      logTest('Modern JavaScript syntax used', 'pass');
    } else {
      logTest('Modern JavaScript syntax missing', 'warn');
    }
    
    // Check for error handling
    if (mainJS.includes('try') && mainJS.includes('catch')) {
      logTest('Error handling implemented', 'pass');
    } else {
      logTest('Error handling missing', 'warn');
    }
    
    // Check for async/await or promises
    if (mainJS.includes('async') || mainJS.includes('Promise')) {
      logTest('Async JavaScript patterns used', 'pass');
    } else {
      logTest('Async JavaScript patterns missing', 'warn');
    }
    
  } catch (error) {
    logTest('JavaScript structure test', 'fail', error.message);
  }
}

// Service Worker tests
function testServiceWorker() {
  console.log('\n🔧 Testing Service Worker...');
  
  try {
    const swContent = fs.readFileSync('sw.js', 'utf8');
    
    if (swContent.includes('install')) {
      logTest('Service Worker install event', 'pass');
    } else {
      logTest('Service Worker install event missing', 'fail');
    }
    
    if (swContent.includes('fetch')) {
      logTest('Service Worker fetch event', 'pass');
    } else {
      logTest('Service Worker fetch event missing', 'fail');
    }
    
    if (swContent.includes('cache')) {
      logTest('Service Worker caching implemented', 'pass');
    } else {
      logTest('Service Worker caching missing', 'warn');
    }
    
  } catch (error) {
    logTest('Service Worker test', 'fail', error.message);
  }
}

// Manifest tests
function testManifest() {
  console.log('\n📱 Testing Web App Manifest...');
  
  try {
    const manifestContent = fs.readFileSync('manifest.json', 'utf8');
    const manifest = JSON.parse(manifestContent);
    
    const requiredFields = ['name', 'short_name', 'start_url', 'display', 'theme_color'];
    requiredFields.forEach(field => {
      if (manifest[field]) {
        logTest(`Manifest field present: ${field}`, 'pass');
      } else {
        logTest(`Manifest field missing: ${field}`, 'fail');
      }
    });
    
    if (manifest.icons && manifest.icons.length > 0) {
      logTest('Manifest icons present', 'pass');
    } else {
      logTest('Manifest icons missing', 'warn');
    }
    
  } catch (error) {
    logTest('Manifest test', 'fail', error.message);
  }
}

// SEO tests
function testSEO() {
  console.log('\n🔍 Testing SEO optimization...');
  
  try {
    // Check robots.txt
    if (fs.existsSync('robots.txt')) {
      logTest('robots.txt exists', 'pass');
    } else {
      logTest('robots.txt missing', 'warn');
    }
    
    // Check sitemap.xml
    if (fs.existsSync('sitemap.xml')) {
      logTest('sitemap.xml exists', 'pass');
    } else {
      logTest('sitemap.xml missing', 'warn');
    }
    
    // Check for structured data
    const indexContent = fs.readFileSync('index.html', 'utf8');
    if (indexContent.includes('application/ld+json')) {
      logTest('Structured data present', 'pass');
    } else {
      logTest('Structured data missing', 'warn');
    }
    
  } catch (error) {
    logTest('SEO test', 'fail', error.message);
  }
}

// Performance tests
function testPerformance() {
  console.log('\n⚡ Testing performance optimization...');
  
  // Check for image optimization
  const imageDir = 'images';
  if (fs.existsSync(imageDir)) {
    const images = fs.readdirSync(imageDir, { recursive: true });
    const webpImages = images.filter(img => img.endsWith('.webp'));
    
    if (webpImages.length > 0) {
      logTest('WebP images present', 'pass');
    } else {
      logTest('WebP images missing', 'warn', 'Consider converting images to WebP format');
    }
  }
  
  // Check for minification
  try {
    const cssContent = fs.readFileSync('assets/css/main.css', 'utf8');
    const isMinified = !cssContent.includes('\n  ') && cssContent.length < 50000;
    
    if (isMinified) {
      logTest('CSS appears minified', 'pass');
    } else {
      logTest('CSS not minified', 'warn', 'Run build process to minify');
    }
  } catch (error) {
    logTest('CSS minification check', 'warn', 'Could not check minification');
  }
}

// Run all tests
async function runAllTests() {
  testFileStructure();
  testHTMLStructure();
  testCSSStructure();
  testJavaScriptStructure();
  testServiceWorker();
  testManifest();
  testSEO();
  testPerformance();
  
  // Generate test report
  console.log('\n📊 Test Results Summary:');
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`⚠️  Warnings: ${testResults.warnings}`);
  console.log(`📝 Total Tests: ${testResults.tests.length}`);
  
  // Write detailed report
  const reportPath = path.join(__dirname, '../test-results.json');
  fs.writeFileSync(reportPath, JSON.stringify(testResults, null, 2));
  console.log(`📄 Detailed report saved to: ${reportPath}`);
  
  // Exit with appropriate code
  if (testResults.failed > 0) {
    console.log('\n❌ Some tests failed. Please fix the issues before deployment.');
    process.exit(1);
  } else if (testResults.warnings > 0) {
    console.log('\n⚠️  All critical tests passed, but there are warnings to address.');
    process.exit(0);
  } else {
    console.log('\n🎉 All tests passed! Ready for deployment.');
    process.exit(0);
  }
}

// Run tests
runAllTests().catch(error => {
  console.error('❌ Test runner failed:', error);
  process.exit(1);
});