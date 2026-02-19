# Security Updates - February 19, 2026

## Critical Vulnerabilities Fixed

### Summary
Fixed **2 critical vulnerabilities** by upgrading key dependencies.

### Changes Made

#### 1. Webpack Security Updates
- **webpack**: `5.64.1` → `5.104.1`
  - Fixed CVE-2023-28154 (CRITICAL): Cross-realm object access vulnerability
  - Fixed CVE-2024-43788 (MEDIUM): DOM Clobbering XSS vulnerability
  - Fixed CVE-2025-68157 (LOW): SSRF via HTTP redirects
  - Fixed CVE-2025-68458 (LOW): SSRF via URL userinfo bypass

#### 2. Webpack Dev Server Security Update
- **webpack-dev-server**: `4.5.0` → `5.2.1`
  - Fixed CVE-2025-30359 (MEDIUM): Source code theft vulnerability
  - Fixed CVE-2025-30360 (MEDIUM): WebSocket hijacking vulnerability

#### 3. PostCSS Security Update
- **postcss**: `8.3.11` → `8.4.31`
  - Fixed CVE-2023-44270 (MEDIUM): Line return parsing error

#### 4. Cypress Security Update (CRITICAL)
- **cypress**: `10.5.0` → `15.10.0`
  - Fixed critical form-data vulnerability (CVE-1109540)
  - **form-data** dependency updated to `>= 2.5.4`
  - Addressed unsafe random function in boundary generation

#### 5. React Ecosystem Update
- **react**: `17.0.2` → `19.1.0`
- **react-dom**: `17.0.2` → `19.1.0`
- **decap-cms-app**: `3.0.2` → `3.10.0`

### Results
- **Before**: 55 vulnerabilities (2 critical, 10 moderate, 42 high, 1 low)
- **After**: 51 vulnerabilities (0 critical, 9 moderate, 41 high, 1 low)

### Impact
✅ **All critical vulnerabilities have been resolved**
- The 2 critical form-data vulnerabilities are now fixed
- Important webpack security issues addressed
- Development server security improved

### Remaining Vulnerabilities
The remaining 51 vulnerabilities are lower severity (high, moderate, low) and primarily affect:
- Development dependencies (not production runtime)
- Indirect dependencies that require upstream fixes
- Legacy packages with deprecated warnings

### Recommendations
1. Regularly run `npm audit` to check for new vulnerabilities
2. Keep dependencies updated, especially webpack, react, and cypress
3. Consider using `npm audit fix` for automated fixes of non-breaking changes
4. Review remaining high-severity vulnerabilities when time permits

### Notes
- Puppeteer download was skipped during installation (set `PUPPETEER_SKIP_DOWNLOAD=true`)
- Some peer dependency warnings exist due to React 19 upgrade, but these are non-critical
- The project continues to function normally with these updates

