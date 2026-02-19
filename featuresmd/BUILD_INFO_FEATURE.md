# Build Information Feature

This feature adds build time and commit information to the footer of every page, making it easy to verify which version is currently deployed.

## How It Works

1. **Build Info Generator Script**: `scripts/generate-build-info.js`
   - Runs automatically before every build (via `prebuild` script)
   - Captures build timestamp, Git commit hash, and branch name
   - Writes information to `site/data/buildInfo.json`

2. **Hugo Template Integration**: `site/layouts/partials/footer.html`
   - Reads the build info from Hugo's data directory
   - Displays formatted build time and commit hash in the footer
   - Includes a link to view the commit on GitHub

3. **Build Process**: `package.json`
   - The `prebuild` script now runs the build info generator
   - Build info is generated fresh with every deployment

## What You'll See

At the bottom of every page, you'll see something like:

```
Build: 2026-02-19 21:40 UTC | Commit: 2a85949
```

The commit hash is clickable and links to the GitHub commit page.

## Local Development

When you run `npm run build` locally, the build info will be generated automatically. If Git is not available, it will use fallback values.

## Netlify Deployment

On Netlify, the build info will be generated during the build process, ensuring you always know which version is deployed. If a deployment fails and rolls back to an older version, you can easily verify by checking the build time and commit hash displayed on the page.

## Files Modified

- `package.json` - Added build info generation to prebuild script
- `site/layouts/partials/footer.html` - Added build info display
- `scripts/generate-build-info.js` - New script to generate build info
- `.gitignore` - Added `site/data/buildInfo.json` (generated at build time)

## Customization

To change the displayed information or format, edit:
- **Display format**: `site/layouts/partials/footer.html`
- **Generated data**: `scripts/generate-build-info.js`
- **GitHub URL**: Update the URL in `footer.html` if you fork the repository

