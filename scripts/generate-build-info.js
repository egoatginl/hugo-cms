const fs = require('fs');
const { execSync } = require('child_process');

try {
  const buildInfo = {
    buildTime: new Date().toISOString(),
    commitHash: execSync('git rev-parse HEAD').toString().trim(),
    commitShort: execSync('git rev-parse --short HEAD').toString().trim(),
    branch: execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
  };

  // Write to Hugo data directory so it's accessible in templates
  fs.writeFileSync(
    'site/data/buildInfo.json',
    JSON.stringify(buildInfo, null, 2)
  );

  console.log('✓ Build info generated:', buildInfo);
} catch (error) {
  console.error('Error generating build info:', error.message);
  // Create a fallback buildInfo if git is not available
  const fallbackInfo = {
    buildTime: new Date().toISOString(),
    commitHash: 'unknown',
    commitShort: 'unknown',
    branch: 'unknown'
  };

  fs.writeFileSync(
    'site/data/buildInfo.json',
    JSON.stringify(fallbackInfo, null, 2)
  );

  console.log('✓ Build info generated (fallback mode):', fallbackInfo);
}

