# Child Project - Playwright Tests

This child project uses the Playwright monorepo tarball to run end-to-end tests with GitHub Actions CI/CD.

## Overview

This project demonstrates how to consume a Playwright testing framework distributed as a tarball package. It includes:

- Login page automation tests using shared framework
- Dashboard verification tests  
- Screenshot capture functionality
- HTML report generation
- **GitHub Actions CI/CD integration**

## Setup Instructions

1. **Install dependencies from the tarball:**
   ```cmd
   cd c:\Users\johnw\AIProject\Framework\ChildProject
   npm install
   ```

2. **Install Playwright browsers:**
   ```cmd
   npm run install:browsers
   ```
   
   Or just Chromium:
   ```cmd
   npm run install:chromium
   ```

## Running Tests

### Local Execution
```cmd
# Run all tests
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests with UI mode
npm run test:ui

# Debug tests
npm run test:debug
```

### CI/CD Execution
```cmd
# Setup for CI environment (installs deps + browsers)
npm run ci:setup

# Run tests with CI reporters (HTML + JUnit)
npm run ci:test
```

## GitHub Actions CI/CD

### Automatic Triggers
Tests run automatically on:
- Push to `main` or `develop` branches
- Pull requests to `main` branch  
- Manual workflow dispatch
- Release tags (`v*`)

### Multi-Platform Testing
- **Linux**: Ubuntu latest
- **Windows**: Windows latest
- **macOS**: macOS latest (matrix workflow)

### Viewing Results
1. Go to your GitHub repository
2. Click **Actions** tab
3. Select a workflow run
4. Download artifacts:
   - `playwright-report` - HTML test reports
   - `test-results` - JUnit XML results
   - `screenshots` - Failure screenshots

## Project Structure

```
ChildProject/
├── .vscode/
│   └── settings.json           # VS Code terminal settings (cmd only)
├── tests/
│   └── parabank-login.spec.ts # Test file using the framework
├── package.json               # Dependencies including the tarball
├── playwright.config.ts       # Playwright configuration
├── tsconfig.json             # TypeScript configuration
├── playwright-parent-typescript-1.0.0.tgz  # Framework tarball
└── README.md                 # This file
```

## Dependencies

- **playwright-parent-typescript**: The shared framework from the monorepo tarball
- **@playwright/test**: Playwright test runner (comes with the framework)
- **TypeScript**: For TypeScript support
- **@types/node**: Node.js TypeScript definitions

## Features

The child project imports and uses:
- Page Object Models (LoginPage, DashboardPage, BasePage)
- Shared constants (PARABANK_CONSTANTS)
- Test utilities and configurations

All tests are executed using the framework provided by the tarball, ensuring consistency across projects.

## GitHub Actions Workflows

- **`.github/workflows/playwright.yml`** - Main Linux tests
- **`.github/workflows/playwright-windows.yml`** - Windows tests
- **`.github/workflows/playwright-matrix.yml`** - Multi-platform tests
- **`.github/workflows/release.yml`** - Release management

## Notes

- **No Docker or Jenkins required** - Everything runs on GitHub Actions
- **No direct Playwright dependency** - All comes from the tarball
- **Cross-platform testing** - Linux, Windows, macOS support
- **Artifact management** - Reports and screenshots automatically saved
- **Release automation** - Framework releases on Git tags
