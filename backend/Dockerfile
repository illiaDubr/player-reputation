FROM php:8.2-fpm

# Установка необходимых пакетов и зависимостей
RUN apt-get update && apt-get install -y \
    libzip-dev zip unzip git && \
    docker-php-ext-install pdo pdo_mysql

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
