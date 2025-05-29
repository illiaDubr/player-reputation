Проект: Web-приложение на React + Laravel API

Описание

Данный проект представляет собой web-приложение, состоящее из frontend на React и backend на Laravel API. Приложение использует контекстный API для управления состоянием, поддерживает сессионные куки для авторизации и развертывается с использованием Docker на DigitalOcean.

Стек технологий

Frontend:

React (с react-router-dom, react-helmet-async)

SCSS для стилизации

Контекстный API (storeContext.js, store.js)

Backend:

Laravel API

MySQL 8.2 (с учетом чувствительности к регистру: plain=mixed, delimited=exact)

Микросервисная архитектура

Деплой:

Docker (без wait-for-it.sh)



Установка и запуск

1. Клонирование репозитория

git clone <репозиторий>
cd <папка_проекта>

2. Настройка backend (Laravel)

Установка зависимостей:

composer install

Настройка переменных окружения:

cp .env.example .env
php artisan key:generate

Запуск базы данных и миграции:

php artisan migrate --seed

Запуск сервера Laravel:

php artisan serve

3. Настройка frontend (React)

Установка зависимостей:

npm install

Запуск приложения:

npm start

4. Запуск через Docker

Собрать и запустить контейнеры:

docker-compose up -d --build

Остановить контейнеры:

docker-compose down

API и авторизация

Формат обмена данными: JSON

Метод авторизации: Сессионные куки

Основные эндпоинты:

POST /api/login - вход в систему

POST /api/logout - выход

GET /api/user - получение данных пользователя

Дополнительно


API оптимизировано для высокой нагрузки

Используется Route::controller() для группировки маршрутов