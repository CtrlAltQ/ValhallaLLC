#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

console.log('⚡ Running performance tests...');

let performanceResults = {
  scores: {},
  metrics: {},
  recommendations: [],
  timestamp: new Date().toISOString()
};

function logResult(category, score, message = '') {
  const icon = score >= 90 ? '🟢' : score >= 70 ? '🟡' : '🔴';
  console.log(`${icon} ${category}: ${score}${message ? ' - ' + message : ''}`);
  performanceResults.scores[category] = score;
}

// File size analysis
function analyzeFileSizes() {
  console.log('\n📊 Analyzing file sizes...');
  
  const fileSizes = {};
  
  // Check CSS files
  const cssDir = 'assets/css';
  if (fs.existsSync(cssDir)) {
    const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));
    let totalCSSSize = 0;
    
    cssFiles.forEach(file => {
      const filePath = path.join(cssDir, file);
      const stats = fs.statSync(filePath);
      const sizeKB = Math.round(stats.size / 1024);
      fileSizes[`CSS: ${file}`] = sizeKB;
      totalCSSSize += sizeKB;
    });
    
    console.log(`📄 Total CSS size: ${totalCSSSize}KB`);
    performanceResults.metrics.totalCSSSize = totalCSSSize;
    
    if (totalCSSSize > 100) {
      performanceResults.recommendations.push('Consider splitting CSS into critical and non-critical parts');
    }
  }
  
  // Check JavaScript files
  const jsDir = 'js';
  if (fs.existsSync(jsDir)) {
    let totalJSSize = 0;
    
    function checkJSDirectory(dir) {
      const items = fs.readdirSync(dir);
      
      items.forEach(item => {
        const itemPath = path.join(dir, item);
        const stats = fs.statSync(itemPath);
        
        if (stats.isDirectory()) {
          checkJSDirectory(itemPath);
        } else if (item.endsWith('.js')) {
          const sizeKB = Math.round(stats.size / 1024);
          fileSizes[`JS: ${path.relative(jsDir, itemPath)}`] = sizeKB;
          totalJSSize += sizeKB;
        }
      });
    }
    
    checkJSDirectory(jsDir);
    
    console.log(`⚡ Total JavaScript size: ${totalJSSize}KB`);
    performanceResults.metrics.totalJSSize = totalJSSize;
    
    if (totalJSSize > 200) {
      performanceResults.recommendations.push('Consider code splitting and lazy loading for JavaScript');
    }
  }
  
  // Check image sizes
  const imagesDir = 'images';
  if (fs.existsSync(imagesDir)) {
    let totalImageSize = 0;
    let imageCount = 0;
    
    function checkImageDirectory(dir) {
      const items = fs.readdirSync(dir);
      
      items.forEach(item => {
        const itemPath = path.join(dir, item);
        const stats = fs.statSync(itemPath);
        
        if (stats.isDirectory()) {
          checkImageDirectory(itemPath);
        } else if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(item)) {
          const sizeMB = Math.round(stats.size / (1024 * 1024) * 100) / 100;
          totalImageSize += sizeMB;
          imageCount++;
          
          if (sizeMB > 1) {
            performanceResults.recommendations.push(`Large image: ${path.relative(imagesDir, itemPath)} (${sizeMB}MB)`);
          }
        }
      });
    }
    
    checkImageDirectory(imagesDir);
    
    console.log(`🖼️  Total images: ${imageCount} files, ${totalImageSize}MB`);
    performanceResults.metrics.totalImageSize = totalImageSize;
    performanceResults.metrics.imageCount = imageCount;
    
    if (totalImageSize > 10) {
      performanceResults.recommendations.push('Consider image optimization and WebP conversion');
    }
  }
  
  // Display largest files
  console.log('\n📈 Largest files:');
  const sortedFiles = Object.entries(fileSizes)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);
    
  sortedFiles.forEach(([file, size]) => {
    const icon = size > 100 ? '🔴' : size > 50 ? '🟡' : '🟢';
    console.log(`${icon} ${file}: ${size}KB`);
  });
}

// Performance scoring
function calculatePerformanceScores() {
  console.log('\n🎯 Calculating performance scores...');
  
  const metrics = performanceResults.metrics;
  
  // CSS Performance Score
  let cssScore = 100;
  if (metrics.totalCSSSize > 150) cssScore = 60;
  else if (metrics.totalCSSSize > 100) cssScore = 80;
  else if (metrics.totalCSSSize > 50) cssScore = 90;
  
  logResult('CSS Performance', cssScore, `${metrics.totalCSSSize}KB total`);
  
  // JavaScript Performance Score
  let jsScore = 100;
  if (metrics.totalJSSize > 300) jsScore = 60;
  else if (metrics.totalJSSize > 200) jsScore = 80;
  else if (metrics.totalJSSize > 100) jsScore = 90;
  
  logResult('JavaScript Performance', jsScore, `${metrics.totalJSSize}KB total`);
  
  // Image Performance Score
  let imageScore = 100;
  if (metrics.totalImageSize > 20) imageScore = 60;
  else if (metrics.totalImageSize > 10) imageScore = 80;
  else if (metrics.totalImageSize > 5) imageScore = 90;
  
  logResult('Image Performance', imageScore, `${metrics.totalImageSize}MB total`);
  
  // Overall Performance Score
  const overallScore = Math.round((cssScore + jsScore + imageScore) / 3);
  logResult('Overall Performance', overallScore);
}

// Check for performance optimizations
function checkOptimizations() {
  console.log('\n🔧 Checking performance optimizations...');
  
  let optimizations = {
    serviceWorker: false,
    lazyLoading: false,
    imageOptimization: false,
    cssMinification: false,
    jsMinification: false,
    gzipCompression: false
  };
  
  // Check Service Worker
  if (fs.existsSync('sw.js')) {
    optimizations.serviceWorker = true;
    console.log('✅ Service Worker implemented');
  } else {
    console.log('❌ Service Worker missing');
    performanceResults.recommendations.push('Implement Service Worker for caching');
  }
  
  // Check for lazy loading
  try {
    const indexContent = fs.readFileSync('index.html', 'utf8');
    if (indexContent.includes('loading="lazy"') || indexContent.includes('IntersectionObserver')) {
      optimizations.lazyLoading = true;
      console.log('✅ Lazy loading implemented');
    } else {
      console.log('❌ Lazy loading missing');
      performanceResults.recommendations.push('Implement lazy loading for images');
    }
  } catch (error) {
    console.log('⚠️  Could not check lazy loading');
  }
  
  // Check for WebP images
  const imagesDir = 'images';
  if (fs.existsSync(imagesDir)) {
    const hasWebP = fs.readdirSync(imagesDir, { recursive: true })
      .some(file => file.endsWith('.webp'));
    
    if (hasWebP) {
      optimizations.imageOptimization = true;
      console.log('✅ WebP images found');
    } else {
      console.log('❌ No WebP images found');
      performanceResults.recommendations.push('Convert images to WebP format');
    }
  }
  
  // Check CSS minification
  try {
    const mainCSS = fs.readFileSync('assets/css/main.css', 'utf8');
    const isMinified = !mainCSS.includes('\n  ') && mainCSS.length > 1000;
    
    if (isMinified) {
      optimizations.cssMinification = true;
      console.log('✅ CSS appears minified');
    } else {
      console.log('❌ CSS not minified');
      performanceResults.recommendations.push('Minify CSS files');
    }
  } catch (error) {
    console.log('⚠️  Could not check CSS minification');
  }
  
  // Check JavaScript minification
  try {
    const mainJS = fs.readFileSync('js/main.js', 'utf8');
    const isMinified = !mainJS.includes('\n  ') && mainJS.length > 1000;
    
    if (isMinified) {
      optimizations.jsMinification = true;
      console.log('✅ JavaScript appears minified');
    } else {
      console.log('❌ JavaScript not minified');
      performanceResults.recommendations.push('Minify JavaScript files');
    }
  } catch (error) {
    console.log('⚠️  Could not check JavaScript minification');
  }
  
  performanceResults.optimizations = optimizations;
}

// Generate performance report
function generateReport() {
  console.log('\n📋 Performance Test Summary:');
  
  const scores = performanceResults.scores;
  const avgScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length;
  
  console.log(`📊 Average Score: ${Math.round(avgScore)}/100`);
  
  if (performanceResults.recommendations.length > 0) {
    console.log('\n💡 Recommendations:');
    performanceResults.recommendations.forEach((rec, i) => {
      console.log(`   ${i + 1}. ${rec}`);
    });
  }
  
  // Write detailed report
  const reportPath = path.join(__dirname, '../performance-test-results.json');
  fs.writeFileSync(reportPath, JSON.stringify(performanceResults, null, 2));
  console.log(`\n📄 Detailed report saved to: ${reportPath}`);
  
  // Performance targets
  console.log('\n🎯 Performance Targets:');
  console.log('   • Overall Score: 90+ (Current: ' + Math.round(avgScore) + ')');
  console.log('   • CSS Size: <100KB (Current: ' + (performanceResults.metrics.totalCSSSize || 0) + 'KB)');
  console.log('   • JS Size: <200KB (Current: ' + (performanceResults.metrics.totalJSSize || 0) + 'KB)');
  console.log('   • Image Size: <10MB (Current: ' + (performanceResults.metrics.totalImageSize || 0) + 'MB)');
  
  return avgScore >= 80;
}

// Run performance tests
async function runPerformanceTests() {
  try {
    analyzeFileSizes();
    calculatePerformanceScores();
    checkOptimizations();
    
    const passed = generateReport();
    
    if (passed) {
      console.log('\n🎉 Performance tests passed!');
      process.exit(0);
    } else {
      console.log('\n⚠️  Performance tests completed with recommendations.');
      process.exit(0);
    }
    
  } catch (error) {
    console.error('❌ Performance test failed:', error);
    process.exit(1);
  }
}

// Run tests
runPerformanceTests();