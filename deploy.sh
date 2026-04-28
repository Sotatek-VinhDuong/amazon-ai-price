#!/bin/bash

# Configuration
PROJECT_NAME="amazon-ai-price"
PROJECT_DIR=$(pwd)
BUILD_DIR="$PROJECT_DIR/dist"
NGINX_CONF="$PROJECT_DIR/nginx.conf"
WEB_ROOT="/var/www/$PROJECT_NAME"
NGINX_SITES_AVAILABLE="/etc/nginx/sites-available/$PROJECT_NAME"
NGINX_SITES_ENABLED="/etc/nginx/sites-enabled/$PROJECT_NAME"

echo "🚀 Starting deployment for $PROJECT_NAME..."

# 1. Build project
echo "📦 Building project..."
npm install
npm run build

if [ ! -d "$BUILD_DIR" ]; then
    echo "❌ Build failed! Directory $BUILD_DIR not found."
    exit 1
fi

# 2. Prepare web root
echo "📁 Preparing web root at $WEB_ROOT..."
sudo mkdir -p "$WEB_ROOT"
sudo rm -rf "$WEB_ROOT/*"
sudo cp -r "$BUILD_DIR/"* "$WEB_ROOT/"
sudo chown -R www-data:www-data "$WEB_ROOT"

# 3. Configure Nginx
echo "⚙️ Configuring Nginx..."
sudo cp "$NGINX_CONF" "$NGINX_SITES_AVAILABLE"

# Create symbolic link if it doesn't exist
if [ ! -L "$NGINX_SITES_ENABLED" ]; then
    sudo ln -s "$NGINX_SITES_AVAILABLE" "$NGINX_SITES_ENABLED"
fi

# 4. Test and Reload
echo "🔄 Testing Nginx configuration..."
if sudo nginx -t; then
    echo "✅ Nginx config is valid. Reloading..."
    sudo systemctl reload nginx
    echo "🎉 Deployment successful!"
else
    echo "❌ Nginx config test failed. Please check the logs."
    exit 1
fi
