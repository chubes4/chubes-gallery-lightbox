#!/bin/bash

# Simple Gallery Lightbox - Production Build Script
# Creates a clean ZIP file for WordPress plugin distribution

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get plugin info
PLUGIN_FILE="simple-gallery-lightbox.php"
PLUGIN_DIR="simple-gallery-lightbox"

# Extract version from plugin header
if [ ! -f "$PLUGIN_FILE" ]; then
    echo -e "${RED}Error: $PLUGIN_FILE not found${NC}"
    exit 1
fi

VERSION=$(grep "Version:" $PLUGIN_FILE | head -1 | awk '{print $3}' | tr -d ' ')

if [ -z "$VERSION" ]; then
    echo -e "${RED}Error: Could not extract version from $PLUGIN_FILE${NC}"
    exit 1
fi

echo -e "${YELLOW}Building Simple Gallery Lightbox v$VERSION${NC}"

# Create build directory
BUILD_DIR="build"
DIST_DIR="$BUILD_DIR/$PLUGIN_DIR"
ZIP_FILE="$BUILD_DIR/${PLUGIN_DIR}-${VERSION}.zip"

echo -e "${YELLOW}Cleaning previous build...${NC}"
rm -rf "$BUILD_DIR"
mkdir -p "$DIST_DIR"

echo -e "${YELLOW}Copying plugin files...${NC}"

# Copy essential plugin files
cp "$PLUGIN_FILE" "$DIST_DIR/"
cp "README.md" "$DIST_DIR/"

# Copy assets
cp -r "assets" "$DIST_DIR/"

# Validate plugin structure
echo -e "${YELLOW}Validating plugin structure...${NC}"

if [ ! -f "$DIST_DIR/$PLUGIN_FILE" ]; then
    echo -e "${RED}Error: Main plugin file missing${NC}"
    exit 1
fi

if [ ! -d "$DIST_DIR/assets" ]; then
    echo -e "${RED}Error: Assets directory missing${NC}"
    exit 1
fi

if [ ! -f "$DIST_DIR/assets/css/lightbox.css" ]; then
    echo -e "${RED}Error: CSS file missing${NC}"
    exit 1
fi

if [ ! -f "$DIST_DIR/assets/js/lightbox.js" ]; then
    echo -e "${RED}Error: JavaScript file missing${NC}"
    exit 1
fi

echo -e "${YELLOW}Creating production ZIP file...${NC}"
cd "$BUILD_DIR"
zip -r "${PLUGIN_DIR}-${VERSION}.zip" "$PLUGIN_DIR/" -q
cd ..

# Verify ZIP was created
if [ ! -f "$ZIP_FILE" ]; then
    echo -e "${RED}Error: Failed to create ZIP file${NC}"
    exit 1
fi

# Get file size
ZIP_SIZE=$(ls -lh "$ZIP_FILE" | awk '{print $5}')

echo -e "${GREEN}✓ Build completed successfully!${NC}"
echo -e "${GREEN}✓ Plugin: Simple Gallery Lightbox v$VERSION${NC}"
echo -e "${GREEN}✓ File: $ZIP_FILE ($ZIP_SIZE)${NC}"
echo -e "${GREEN}✓ Ready for WordPress deployment${NC}"