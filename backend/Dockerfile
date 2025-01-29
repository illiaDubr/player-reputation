FROM php:8.2-fpm

# Установка необходимых пакетов
RUN apt-get update && apt-get install -y \
    libzip-dev zip unzip git && \
    docker-php-ext-install pdo pdo_mysql

# Установка Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Создание рабочей директории
WORKDIR /var/www

# Копирование файлов проекта
COPY . .

# Установка зависимостей
RUN composer install --no-dev --optimize-autoloader --prefer-dist --no-interaction

# Установка прав доступа
RUN chown -R www-data:www-data /var/www && chmod -R 775 /var/www

# Expose порт для PHP-FPM
EXPOSE 9000

# Команда для запуска
CMD ["php-fpm"]
