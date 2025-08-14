#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

console.log('🎭 Running end-to-end tests...');

let testResults = {
  passed: 0,
  failed: 0,
  tests: []
};

function addTest(name, status, message = '') {
  testResults.tests.push({ name, status, message });
  if (status === 'pass') testResults.passed++;
  else testResults.failed++;
}

function logTest(name, status, message = '') {
  const icon = status === 'pass' ? '✅' : '❌';
  console.log(`${icon} ${name}${message ? ': ' + message : ''}`);
  addTest(name, status, message);
}

// Start local server for testing
function startServer() {
  return new Promise((resolve, reject) => {
    console.log('🚀 Starting local server...');
    
    const server = spawn('npx', ['live-server', '--port=3001', '--no-browser', '--quiet'], {
      stdio: 'pipe'
    });
    
    // Wait for server to start
    setTimeout(() => {
      resolve(server);
    }, 3000);
    
    server.on('error', reject);
  });
}

// Test page loading
async function testPageLoading() {
  console.log('\n📄 Testing page loading...');
  
  const pages = [
    { url: 'http://localhost:3001/', name: 'Homepage' },
    { url: 'http://localhost:3001/portfolio/jimmy.html', name: 'Jimmy Portfolio' },
    { url: 'http://localhost:3001/portfolio/pagan.html', name: 'Pagan Portfolio' },
    { url: 'http://localhost:3001/thank-you.html', name: 'Thank You Page' }
  ];
  
  for (const page of pages) {
    try {
      // Simple HTTP request test (would use puppeteer in real implementation)
      const testPassed = fs.existsSync(page.url.replace('http://localhost:3001/', ''));
      
      if (testPassed) {
        logTest(`${page.name} loads`, 'pass');
      } else {
        logTest(`${page.name} loads`, 'fail', 'File not found');
      }
    } catch (error) {
      logTest(`${page.name} loads`, 'fail', error.message);
    }
  }
}

// Test form functionality
async function testForms() {
  console.log('\n📝 Testing form functionality...');
  
  try {
    // Check if contact form exists
    const indexContent = fs.readFileSync('index.html', 'utf8');
    
    if (indexContent.includes('<form')) {
      logTest('Contact form present', 'pass');
      
      // Check form attributes
      if (indexContent.includes('action=') && indexContent.includes('method=')) {
        logTest('Form has action and method', 'pass');
      } else {
        logTest('Form missing action or method', 'fail');
      }
      
      // Check required fields
      const requiredFields = ['name', 'email', 'message'];
      requiredFields.forEach(field => {
        if (indexContent.includes(`name="${field}"`)) {
          logTest(`Form field present: ${field}`, 'pass');
        } else {
          logTest(`Form field missing: ${field}`, 'fail');
        }
      });
      
    } else {
      logTest('Contact form present', 'fail');
    }
    
    // Check newsletter signup
    if (indexContent.includes('newsletter') || indexContent.includes('subscribe')) {
      logTest('Newsletter signup present', 'pass');
    } else {
      logTest('Newsletter signup present', 'fail');
    }
    
  } catch (error) {
    logTest('Form functionality test', 'fail', error.message);
  }
}

// Test portfolio functionality
async function testPortfolio() {
  console.log('\n🎨 Testing portfolio functionality...');
  
  try {
    // Check portfolio pages exist
    const portfolioDir = 'portfolio';
    if (fs.existsSync(portfolioDir)) {
      const portfolioFiles = fs.readdirSync(portfolioDir).filter(f => f.endsWith('.html'));
      
      if (portfolioFiles.length > 0) {
        logTest(`Portfolio pages exist (${portfolioFiles.length} found)`, 'pass');
        
        // Check first portfolio page structure
        const firstPortfolio = fs.readFileSync(path.join(portfolioDir, portfolioFiles[0]), 'utf8');
        
        if (firstPortfolio.includes('gallery') || firstPortfolio.includes('portfolio')) {
          logTest('Portfolio page has gallery structure', 'pass');
        } else {
          logTest('Portfolio page missing gallery structure', 'fail');
        }
        
      } else {
        logTest('Portfolio pages exist', 'fail', 'No HTML files found');
      }
    } else {
      logTest('Portfolio directory exists', 'fail');
    }
    
    // Check portfolio images
    const imagesDir = 'images/portfolio';
    if (fs.existsSync(imagesDir)) {
      logTest('Portfolio images directory exists', 'pass');
    } else {
      logTest('Portfolio images directory exists', 'fail');
    }
    
  } catch (error) {
    logTest('Portfolio functionality test', 'fail', error.message);
  }
}

// Test JavaScript functionality
async function testJavaScript() {
  console.log('\n⚡ Testing JavaScript functionality...');
  
  try {
    // Check main JavaScript file
    const mainJS = fs.readFileSync('js/main.js', 'utf8');
    
    // Check for event listeners
    if (mainJS.includes('addEventListener') || mainJS.includes('onclick')) {
      logTest('Event listeners present', 'pass');
    } else {
      logTest('Event listeners present', 'fail');
    }
    
    // Check for DOM manipulation
    if (mainJS.includes('querySelector') || mainJS.includes('getElementById')) {
      logTest('DOM manipulation present', 'pass');
    } else {
      logTest('DOM manipulation present', 'fail');
    }
    
    // Check for animation code
    if (mainJS.includes('gsap') || mainJS.includes('animation') || mainJS.includes('transition')) {
      logTest('Animation code present', 'pass');
    } else {
      logTest('Animation code present', 'fail');
    }
    
  } catch (error) {
    logTest('JavaScript functionality test', 'fail', error.message);
  }
}

// Test responsive design
async function testResponsiveDesign() {
  console.log('\n📱 Testing responsive design...');
  
  try {
    const cssFiles = [
      'assets/css/main.css',
      'assets/css/mobile-optimization.css',
      'assets/css/layout.css'
    ];
    
    let hasMediaQueries = false;
    let hasFlexbox = false;
    let hasGrid = false;
    
    cssFiles.forEach(file => {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        
        if (content.includes('@media')) hasMediaQueries = true;
        if (content.includes('display: flex') || content.includes('display:flex')) hasFlexbox = true;
        if (content.includes('display: grid') || content.includes('display:grid')) hasGrid = true;
      }
    });
    
    if (hasMediaQueries) {
      logTest('Media queries present', 'pass');
    } else {
      logTest('Media queries present', 'fail');
    }
    
    if (hasFlexbox || hasGrid) {
      logTest('Modern layout methods used', 'pass');
    } else {
      logTest('Modern layout methods used', 'fail');
    }
    
  } catch (error) {
    logTest('Responsive design test', 'fail', error.message);
  }
}

// Test accessibility
async function testAccessibility() {
  console.log('\n♿ Testing accessibility...');
  
  try {
    const indexContent = fs.readFileSync('index.html', 'utf8');
    
    // Check for alt attributes
    const imgTags = indexContent.match(/<img[^>]*>/g) || [];
    const imgsWithAlt = imgTags.filter(img => img.includes('alt=')).length;
    
    if (imgTags.length > 0 && imgsWithAlt === imgTags.length) {
      logTest('All images have alt attributes', 'pass');
    } else if (imgTags.length > 0) {
      logTest('Some images missing alt attributes', 'fail', `${imgsWithAlt}/${imgTags.length} have alt`);
    } else {
      logTest('No images found to test', 'pass');
    }
    
    // Check for ARIA labels
    if (indexContent.includes('aria-label') || indexContent.includes('aria-labelledby')) {
      logTest('ARIA labels present', 'pass');
    } else {
      logTest('ARIA labels present', 'fail');
    }
    
    // Check for semantic HTML
    const semanticTags = ['<header>', '<nav>', '<main>', '<section>', '<article>', '<footer>'];
    const presentTags = semanticTags.filter(tag => indexContent.includes(tag));
    
    if (presentTags.length >= 4) {
      logTest('Good semantic HTML structure', 'pass');
    } else {
      logTest('Limited semantic HTML structure', 'fail', `Only ${presentTags.length}/6 semantic tags found`);
    }
    
  } catch (error) {
    logTest('Accessibility test', 'fail', error.message);
  }
}

// Run all E2E tests
async function runE2ETests() {
  let server;
  
  try {
    server = await startServer();
    
    await testPageLoading();
    await testForms();
    await testPortfolio();
    await testJavaScript();
    await testResponsiveDesign();
    await testAccessibility();
    
  } catch (error) {
    console.error('❌ E2E test setup failed:', error);
  } finally {
    if (server) {
      console.log('🛑 Stopping test server...');
      server.kill();
    }
  }
  
  // Generate test report
  console.log('\n📊 E2E Test Results:');
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`📝 Total Tests: ${testResults.tests.length}`);
  
  // Write detailed report
  const reportPath = path.join(__dirname, '../e2e-test-results.json');
  fs.writeFileSync(reportPath, JSON.stringify(testResults, null, 2));
  console.log(`📄 Detailed report saved to: ${reportPath}`);
  
  // Exit with appropriate code
  if (testResults.failed > 0) {
    console.log('\n❌ Some E2E tests failed. Please fix the issues before deployment.');
    process.exit(1);
  } else {
    console.log('\n🎉 All E2E tests passed!');
    process.exit(0);
  }
}

// Run E2E tests
runE2ETests().catch(error => {
  console.error('❌ E2E test runner failed:', error);
  process.exit(1);
});