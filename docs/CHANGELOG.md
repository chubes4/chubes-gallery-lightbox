# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1] - 2025-12-05

### Improvements
- Optimized asset loading to only enqueue CSS/JS when gallery blocks are present on the page
- Added conditional rendering of lightbox HTML structure
- Improved performance by reducing unnecessary resource loading

## [1.1.0] - 2025-12-05

### Features
- Converted JavaScript implementation from jQuery to vanilla JS for improved performance and zero external dependencies
- Added smooth CSS fade transitions for lightbox open/close animations
- Enhanced image loading to use full-size gallery images when available via link hrefs

### Improvements
- Adjusted lightbox maximum height from 100vh to 90vh for better mobile viewport usage
- Replaced inline display styles with CSS-based visibility controls
- Fixed CSS spacing and formatting issues

### Changes
- Renamed plugin from "Simple Gallery Lightbox" to "Chubes Gallery Lightbox"
- Removed jQuery dependency from script enqueue
- Added production build script for optimized deployments
- Updated build process and added .gitignore for development files

### Compatibility
- Maintained WordPress 5.0+ compatibility
- Improved mobile touch/swipe navigation
- Enhanced keyboard accessibility

## [1.0.0] - 2025-09-26

### Features
- Clean, minimal lightbox for WordPress galleries
- Keyboard navigation (arrow keys, escape)
- Touch/swipe support for mobile devices
- Network activation support for multisite
- jQuery-based with fade transitions
- Works with wp-block-gallery out of the box