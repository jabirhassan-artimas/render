#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Cache configuration and routes for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations (be careful in production, but often needed on first deploy)
# php artisan migrate --force

# Start PHP-FPM in the background
php-fpm -D

# Start Nginx in the foreground
nginx -g "daemon off;"
