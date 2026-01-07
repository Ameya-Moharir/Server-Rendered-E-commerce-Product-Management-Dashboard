#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 E-commerce Dashboard Setup Verification\n');

const checks = [];

// Check 1: Node.js version
try {
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  if (majorVersion >= 18) {
    checks.push({ name: 'Node.js version', status: '✅', details: nodeVersion });
  } else {
    checks.push({ name: 'Node.js version', status: '❌', details: `${nodeVersion} (need 18+)` });
  }
} catch (error) {
  checks.push({ name: 'Node.js version', status: '❌', details: 'Cannot detect' });
}

// Check 2: package.json exists
if (fs.existsSync(path.join(__dirname, '..', 'package.json'))) {
  checks.push({ name: 'package.json', status: '✅', details: 'Found' });
} else {
  checks.push({ name: 'package.json', status: '❌', details: 'Missing' });
}

// Check 3: node_modules exists
if (fs.existsSync(path.join(__dirname, '..', 'node_modules'))) {
  checks.push({ name: 'Dependencies installed', status: '✅', details: 'node_modules exists' });
} else {
  checks.push({ name: 'Dependencies installed', status: '❌', details: 'Run: npm install' });
}

// Check 4: .env.local exists
if (fs.existsSync(path.join(__dirname, '..', '.env.local'))) {
  checks.push({ name: 'Environment variables', status: '✅', details: '.env.local found' });
  
  // Check if MongoDB URI is set
  const envContent = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8');
  if (envContent.includes('MONGODB_URI=mongodb')) {
    checks.push({ name: 'MongoDB URI configured', status: '✅', details: 'Set in .env.local' });
  } else {
    checks.push({ name: 'MongoDB URI configured', status: '⚠️', details: 'Check .env.local' });
  }
} else {
  checks.push({ name: 'Environment variables', status: '❌', details: 'Copy .env.example to .env.local' });
}

// Check 5: Required directories
const requiredDirs = ['src/app', 'src/components', 'src/lib', 'public'];
let allDirsExist = true;
requiredDirs.forEach(dir => {
  if (!fs.existsSync(path.join(__dirname, '..', dir))) {
    allDirsExist = false;
  }
});

if (allDirsExist) {
  checks.push({ name: 'Project structure', status: '✅', details: 'All required directories exist' });
} else {
  checks.push({ name: 'Project structure', status: '❌', details: 'Missing directories' });
}

// Check 6: TypeScript config
if (fs.existsSync(path.join(__dirname, '..', 'tsconfig.json'))) {
  checks.push({ name: 'TypeScript config', status: '✅', details: 'tsconfig.json found' });
} else {
  checks.push({ name: 'TypeScript config', status: '❌', details: 'tsconfig.json missing' });
}

// Check 7: Next.js config
if (fs.existsSync(path.join(__dirname, '..', 'next.config.js'))) {
  checks.push({ name: 'Next.js config', status: '✅', details: 'next.config.js found' });
} else {
  checks.push({ name: 'Next.js config', status: '❌', details: 'next.config.js missing' });
}

// Display results
console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║                    VERIFICATION RESULTS                      ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

checks.forEach(check => {
  console.log(`${check.status} ${check.name}`);
  console.log(`   └─ ${check.details}\n`);
});

// Summary
const passed = checks.filter(c => c.status === '✅').length;
const failed = checks.filter(c => c.status === '❌').length;
const warnings = checks.filter(c => c.status === '⚠️').length;

console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║                         SUMMARY                              ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`⚠️  Warnings: ${warnings}\n`);

if (failed === 0 && warnings === 0) {
  console.log('🎉 All checks passed! You\'re ready to start development.\n');
  console.log('Next steps:');
  console.log('1. Make sure MongoDB is running');
  console.log('2. Run: npm run seed');
  console.log('3. Run: npm run dev');
  console.log('4. Open: http://localhost:3000\n');
} else if (failed === 0) {
  console.log('⚠️  Setup is mostly complete, but please review warnings.\n');
  console.log('You can proceed with:');
  console.log('1. npm run seed');
  console.log('2. npm run dev\n');
} else {
  console.log('❌ Please fix the failed checks before proceeding.\n');
  console.log('Common fixes:');
  if (checks.find(c => c.name === 'Dependencies installed' && c.status === '❌')) {
    console.log('- Run: npm install');
  }
  if (checks.find(c => c.name === 'Environment variables' && c.status === '❌')) {
    console.log('- Run: cp .env.example .env.local');
    console.log('- Edit .env.local with your MongoDB connection string');
  }
  console.log('');
}

process.exit(failed > 0 ? 1 : 0);
