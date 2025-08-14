#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Optimizing build for production...');

// Minify CSS files (basic minification)
function minifyCSS(cssContent) {
  return cssContent
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/;\s*}/g, '}') // Remove unnecessary semicolons
    .replace(/\s*{\s*/g, '{') // Clean up braces
    .replace(/;\s*/g, ';') // Clean up semicolons
    .trim();
}

// Minify JavaScript files (basic minification)
function minifyJS(jsContent) {
  return jsContent
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
    // Remove line comments but preserve URLs like http:// or https://
    .replace(/(?<!:)\/\/.*$/gm, '')
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/;\s*}/g, '}') // Clean up
    .trim();
}

// Process CSS files
const cssDir = path.join(__dirname, '../assets/css');
if (fs.existsSync(cssDir)) {
  const cssFiles = fs.readdirSync(cssDir).filter(file => file.endsWith('.css'));
  
  cssFiles.forEach(file => {
    const filePath = path.join(cssDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const minified = minifyCSS(content);
    
    // Only write if significantly smaller
    if (minified.length < content.length * 0.9) {
      fs.writeFileSync(filePath, minified);
      console.log(`📦 Minified CSS: ${file} (${Math.round((1 - minified.length / content.length) * 100)}% smaller)`);
    }
  });
}

// Process JavaScript files
const jsDir = path.join(__dirname, '../js');
function processJSDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      processJSDirectory(itemPath);
    } else if (item.endsWith('.js') && !item.includes('.min.')) {
      const content = fs.readFileSync(itemPath, 'utf8');
      const minified = minifyJS(content);
      
      // Only write if significantly smaller
      if (minified.length < content.length * 0.9) {
        fs.writeFileSync(itemPath, minified);
        console.log(`📦 Minified JS: ${path.relative(jsDir, itemPath)} (${Math.round((1 - minified.length / content.length) * 100)}% smaller)`);
      }
    }
  });
}

processJSDirectory(jsDir);

// Generate build info
const buildInfo = {
  timestamp: new Date().toISOString(),
  version: require('../package.json').version,
  nodeVersion: process.version,
  environment: process.env.NODE_ENV || 'production'
};

fs.writeFileSync(
  path.join(__dirname, '../build-info.json'),
  JSON.stringify(buildInfo, null, 2)
);

console.log('✅ Build optimization completed');
console.log(`📅 Build timestamp: ${buildInfo.timestamp}`);
console.log(`🏷️  Version: ${buildInfo.version}`);