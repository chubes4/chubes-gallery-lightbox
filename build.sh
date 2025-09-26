#!/bin/bash

# Simple Gallery Lightbox - Production Build Script
# Creates clean production ZIP package for WordPress deployment

set -e

PLUGIN_NAME="simple-gallery-lightbox"

echo "Building Simple Gallery Lightbox..."

# Clean previous builds
rm -rf build
mkdir -p build/$PLUGIN_NAME

# Copy files with exclusions
rsync -av --exclude-from=- . build/$PLUGIN_NAME/ << 'EOF'
.git/
build/
.buildignore
build.sh
.DS_Store
EOF

# Validate plugin structure
if [ ! -f "build/$PLUGIN_NAME/$PLUGIN_NAME.php" ]; then
    echo "Error: Main plugin file missing"
    exit 1
fi

if [ ! -d "build/$PLUGIN_NAME/assets" ]; then
    echo "Error: Assets directory missing"
    exit 1
fi

# Create ZIP
cd build
zip -r "$PLUGIN_NAME.zip" "$PLUGIN_NAME/" -q
cd ..

echo "✓ Build complete: build/$PLUGIN_NAME.zip"