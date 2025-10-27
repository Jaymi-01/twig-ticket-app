# Use an official PHP image with Apache
FROM php:8.2-apache
# Enable Apache mod_rewrite (useful for pretty URLs)
RUN a2enmod rewrite
# Install system dependencies and Composer
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    && rm -rf /var/lib/apt/lists/*
# Copy Composer from the official Composer image
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
# Set working directory inside the container
WORKDIR /var/www/html
# Copy all project files into the container
COPY . .
# Install PHP dependencies (Twig, etc.)
RUN composer install --no-dev --optimize-autoloader || true
# Expose Render’s default port
EXPOSE 10000
# Start Apache (default command)
CMD ["apache2-foreground"]