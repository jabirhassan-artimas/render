#!/bin/bash
set -e

# If APP_KEY is missing, try to generate it temporarily to avoid a crash
if [ -z "$APP_KEY" ]; then
    echo "WARNING: APP_KEY is missing. Generating a temporary one..."
    php artisan key:generate --force
fi

# Run storage link
php artisan storage:link --force || true

# Optimization for production
echo "Running optimization..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start PHP-FPM
php-fpm -D

# Start Nginx
echo "Starting Nginx..."
nginx -g "daemon off;"
