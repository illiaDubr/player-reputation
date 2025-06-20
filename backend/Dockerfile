FROM php:8.2-fpm

# Установка необходимых пакетов и зависимостей
RUN apt-get update && apt-get install -y \
    libzip-dev \
    libpng-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-install pdo pdo_mysql pcntl gd zip
RUN apt-get update && apt-get install -y default-mysql-client


# Установка Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Создание рабочей директории
WORKDIR /var/www

# Копирование файлов проекта
COPY . .

# Установка зависимостей через Composer
RUN composer install

# Установка прав доступа
RUN chown -R www-data:www-data /var/www

# Expose порт для веб-сервера
EXPOSE 9000