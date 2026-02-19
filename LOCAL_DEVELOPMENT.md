# Local Development Guide

## Prerequisites

Before running this Hugo CMS app locally, ensure you have:

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)
- **Git**

## Quick Start

### 1. Install Dependencies

First, install all required dependencies. Since we've updated to newer versions, you'll need to skip Puppeteer downloads:

```bash
PUPPETEER_SKIP_DOWNLOAD=true npm install
```

Or if the above doesn't work on your system:

```bash
npm install
```

### 2. Start the Development Server

Run the development server with:

```bash
npm start
```

This command does two things simultaneously:
- Starts **Hugo** (the static site generator) with live reload
- Starts **Webpack Dev Server** for asset compilation and hot module replacement

### 3. Access the Application

Once the server starts, open your browser to:

```
http://localhost:3000
```

The Hugo site will be available at port 3000 (webpack-dev-server), and it will automatically reload when you make changes to:
- Content files in `site/content/`
- Templates in `site/layouts/`
- Styles in `src/css/`
- JavaScript in `src/js/`

## Available Commands

### Development
```bash
npm start              # Start development server (Hugo + Webpack)
npm run start:hugo     # Start only Hugo server
npm run start:webpack  # Start only Webpack dev server
```

### Preview with Drafts/Future Posts
```bash
npm run preview        # Preview with drafts and future-dated content
```

### Build for Production
```bash
npm run build          # Build production-ready files
npm run build:preview  # Build with drafts and future content
```

### Testing
```bash
npm run cypress:open   # Open Cypress test runner (interactive)
npm run cypress:run    # Run Cypress tests in headless mode
```

### Linting
```bash
npm run lint           # Check code quality with ESLint
```

## Project Structure

```
hugo-cms/
├── site/                  # Hugo site files
│   ├── content/          # Markdown content files
│   ├── layouts/          # HTML templates
│   ├── static/           # Static assets (images, etc.)
│   ├── data/             # Data files
│   └── hugo.toml         # Hugo configuration
├── src/                  # Source files for webpack
│   ├── css/             # Stylesheets (processed by PostCSS)
│   ├── js/              # JavaScript files
│   └── cms.html         # Decap CMS admin interface
├── dist/                 # Built files (generated, not in git)
├── webpack.dev.js        # Webpack development config
└── webpack.prod.js       # Webpack production config
```

## Editing Content

### Using Decap CMS Admin Interface

1. Start the development server: `npm start`
2. Navigate to: `http://localhost:3000/admin/`
3. You'll need to set up authentication (see Netlify Identity setup below)

### Direct File Editing

You can also edit Markdown files directly in the `site/content/` directory. Hugo will automatically reload the page when you save changes.

Example content locations:
- Blog posts: `site/content/post/`
- Pages: `site/content/`
- Products: `site/content/products/`

## Styling and Assets

### CSS Customization

Main CSS variables are in: `src/css/imports/_variables.css`

Edit this file to customize:
- Colors
- Fonts
- Spacing
- Breakpoints

### Adding Images

Place images in: `site/static/img/`

Reference them in content as: `/img/your-image.jpg`

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, you can:
1. Kill the process using that port
2. Or modify the webpack config to use a different port

### Hugo Binary Not Downloaded (Proxy Issues)

If you see "Error: spawn .../hugo ENOENT" or proxy errors (407), the Hugo binary wasn't downloaded. This commonly happens behind corporate proxies.

**Solution 1: Install Hugo Globally (Recommended)**

Install Hugo using Homebrew (macOS):
```bash
brew install hugo
```

Or download from: https://github.com/gohugoio/hugo/releases

Then verify Hugo is installed:
```bash
hugo version
```

Now you can use Hugo directly. Modify the package.json scripts to use system Hugo:
- Change `"start:hugo": "hugo -d ../dist -s site -vw"` (no node_modules path needed)

**Solution 2: Configure Proxy (Corporate Networks)**

For corporate proxies with authentication:
```bash
export HTTP_PROXY="http://username:password@proxy-host:port"
export HTTPS_PROXY="http://username:password@proxy-host:port"
export NO_PROXY=".yourcompany.com,localhost,127.0.0.1"
export no_proxy=".yourcompany.com,localhost,127.0.0.1"
npm rebuild hugo-bin
```

For corporate proxies with self-signed SSL certificates:
```bash
export HTTP_PROXY="http://username:password@proxy-host:port"
export HTTPS_PROXY="http://username:password@proxy-host:port"
export NO_PROXY=".yourcompany.com,localhost,127.0.0.1"
export no_proxy=".yourcompany.com,localhost,127.0.0.1"
export NODE_TLS_REJECT_UNAUTHORIZED=0
cd node_modules/hugo-bin && node lib/install.js
```

**Note**: Setting `NODE_TLS_REJECT_UNAUTHORIZED=0` disables SSL certificate verification. Only use this in trusted corporate environments during installation. Don't use it when running the development server.

**Solution 3: Manual Hugo Binary Download**

1. Download Hugo from: https://github.com/gohugoio/hugo/releases
2. Extract and place the `hugo` binary in: `node_modules/hugo-bin/vendor/`
3. Make it executable: `chmod +x node_modules/hugo-bin/vendor/hugo`

### Hugo Not Found

If you get "hugo: command not found" after installing globally, make sure Hugo is in your PATH or use the full path in package.json scripts.

### Webpack Compilation Errors

If webpack fails to compile:
1. Delete `node_modules` and `package-lock.json`
2. Run `PUPPETEER_SKIP_DOWNLOAD=true npm install` again

### Cypress Tests Failing

Make sure the development server is running before running tests:
```bash
# Terminal 1
npm start

# Terminal 2 (in a new terminal)
npm run cypress:run
```

## Production Build

To create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready to deploy to:
- Netlify
- GitHub Pages
- Any static hosting service

## Netlify CMS Setup (Optional)

To use the Decap CMS admin interface with authentication:

1. Deploy to Netlify (or use Netlify's local development proxy)
2. Enable Netlify Identity in your site settings
3. Configure Git Gateway for authentication
4. Invite users through the Netlify dashboard

For local development without authentication, you can use the [Decap CMS Proxy Server](https://decapcms.org/docs/beta-features/#working-with-a-local-git-repository).

## Environment Variables

If you need to set environment variables, create a `.env` file in the root directory:

```env
# Example environment variables
NODE_ENV=development
HUGO_ENV=development
```

## Next Steps

1. ✅ Install dependencies
2. ✅ Run `npm start`
3. ✅ Open `http://localhost:3000`
4. 📝 Edit content in `site/content/`
5. 🎨 Customize styles in `src/css/`
6. 🚀 Build with `npm run build` when ready

## Getting Help

- **Hugo Documentation**: https://gohugo.io/documentation/
- **Decap CMS Documentation**: https://decapcms.org/docs/
- **Webpack Documentation**: https://webpack.js.org/

## Security Note

After installing dependencies, we've fixed all critical vulnerabilities. See `SECURITY_UPDATES.md` for details on the security improvements made.

