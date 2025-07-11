FROM php:8.2-apache

# Install dependencies
RUN apt-get update && apt-get install -y \
    git unzip curl libpng-dev libonig-dev libxml2-dev zip libzip-dev \
    libjpeg-dev libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql mbstring zip gd

# Enable Apache rewrite module
RUN a2enmod rewrite

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy project files
COPY . .

# Laravel-specific fixes
RUN cp .env.example .env \
    && mkdir -p storage/logs \
    && touch storage/logs/laravel.log \
    && chmod -R 775 storage bootstrap/cache \
    && composer install --no-dev --optimize-autoloader \
    && php artisan key:generate \
    && php artisan config:cache \
    && php artisan route:cache

# Set permissions (again, to be safe)
RUN chown -R www-data:www-data /var/www/html

# Expose port 80
EXPOSE 80
