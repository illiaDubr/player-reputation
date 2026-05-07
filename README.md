# Player's Reputation

Проект построен по принципам Feature-Sliced Design (FSD) для достижения масштабируемости, читаемости и переиспользуемости кода.

**Player's Reputation** — это веб-приложение, предназначенное для сообщества игроков в покер.  
Оно служит хабом для отслеживания репутации игроков, предоставляя бэкерам (спонсорам) и администраторам инструменты для проверки, добавления и управления данными об игроках.

## ✨ Ключевые возможности

* **Аутентификация и авторизация:** Надёжная регистрация и вход для пользователей с использованием Laravel Sanctum.
* **Ролевая модель:** Разграничение доступа для различных типов пользователей (бэкер, администратор).
* **Поиск игроков:** Мощная система поиска с базовыми и расширенными фильтрами.
* **Управление записями:** Возможность для верифицированных бэкеров добавлять и редактировать записи об игроках.
* **Процесс верификации бэкеров:** Бэкеры проходят процедуру проверки для получения полного доступа к платформе.
* **Административная панель:** Инструменты для администраторов по управлению заявками на верификацию и другими системными задачами.
* **Интеграция с Discord:** Бот для автоматизации процессов в Discord-сообществе, включая обработку истории сообщений и арбитраж.
* **Информационный портал:** Главная страница с общей информацией о проекте и формой обратной связи.
* **Real-time обновления:** Использование Laravel Reverb для WebSocket соединений.

## 🏗️ Архитектура проекта

Проект состоит из трех основных компонентов:

### Backend (Laravel)
- **Путь:** `backend/`
- **Описание:** REST API сервер на Laravel 11, обрабатывающий бизнес-логику, аутентификацию, базу данных и интеграции.

### Frontend (React)
- **Путь:** `frontend/`
- **Описание:** Клиентское веб-приложение на React 18 с Vite, предоставляющее пользовательский интерфейс.

### Discord Bot (Node.js)
- **Путь:** `discord-bot/`
- **Описание:** Автономный бот на Node.js для взаимодействия с Discord API, обработки сообщений и интеграции с OpenAI.

## 🛠️ Технологический стек

### Backend
* **Фреймворк:** Laravel 11
* **Язык:** PHP 8.2+
* **База данных:** MySQL 8.2
* **Аутентификация:** Laravel Sanctum
* **API документация:** L5-Swagger
* **WebSocket:** Laravel Reverb
* **Тестирование:** Pest PHP
* **Интеграции:** OpenAI API, Discord API

### Frontend
* **Основа:** React 18
* **Сборщик:** Vite
* **Язык:** JavaScript (ESNext)
* **Стилизация:** Sass (SCSS) с CSS Modules
* **Управление состоянием:** MobX
* **Роутинг:** React Router DOM v7
* **Работа с API:** Axios
* **Управление формами:** React Hook Form
* **Валидация схем:** Yup
* **Анимации:** GSAP, React-spring
* **UI Компоненты:** Storybook для изолированной разработки и тестирования компонентов
* **Тестирование:** Vitest

### Discord Bot
* **Фреймворк:** Discord.js 14
* **Язык:** Node.js
* **Интеграции:** OpenAI API, Axios для HTTP запросов

### Инфраструктура
* **Контейнеризация:** Docker & Docker Compose
* **Веб-сервер:** Nginx
* **База данных:** MySQL (в Docker)
* **Очереди:** Laravel Queues

## 🚀 Начало работы

### Требования
* Docker & Docker Compose
* Node.js (версия >=22.0.0) — для локальной разработки без Docker
* PHP 8.2+ — для локальной разработки без Docker
* Composer — для управления PHP зависимостями
* NPM или Yarn — для управления JS зависимостями

### Установка и запуск с Docker (рекомендуется)

1. **Клонируйте репозиторий:**
   ```bash
   git clone https://github.com/illiaDubr/PrDev.git
   cd PrDev
   ```

2. **Запустите сервисы:**
   ```bash
   docker-compose up --build
   ```

3. **Приложение будет доступно по адресу:**
   - Frontend: http://localhost:8055
   - Backend API: http://localhost:8055/api
   - WebSocket (Reverb): ws://localhost:6001

### Локальная разработка (без Docker)

#### Backend
1. Перейдите в директорию backend:
   ```bash
   cd backend
   ```

2. Установите PHP зависимости:
   ```bash
   composer install
   ```

3. Настройте окружение:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. Настройте базу данных в `.env` (используйте локальный MySQL или SQLite).

5. Запустите миграции:
   ```bash
   php artisan migrate
   ```

6. Запустите сервер:
   ```bash
   php artisan serve
   ```

#### Frontend
1. Перейдите в директорию frontend:
   ```bash
   cd frontend
   ```

2. Установите зависимости:
   ```bash
   npm install
   ```

3. Настройка окружения:
   Создайте файл `.env` и добавьте:
   ```
   VITE_API_URL=http://localhost:8000
   ```

4. Запуск в режиме разработки:
   ```bash
   npm run dev
   ```

#### Discord Bot
1. Перейдите в директорию discord-bot:
   ```bash
   cd discord-bot
   ```

2. Установите зависимости:
   ```bash
   npm install
   ```

3. Настройте `.env` с Discord токеном и OpenAI API ключом.

4. Запустите бота:
   ```bash
   node index.js
   ```

## 📖 API Документация

API документация генерируется автоматически с помощью L5-Swagger.

- **Доступ:** `/api/documentation` (после запуска backend)
- **Генерация:** `php artisan l5-swagger:generate`

## 🧪 Тестирование

### Backend
```bash
cd backend
./vendor/bin/pest
```

### Frontend
```bash
cd frontend
npm run test
```

## 📁 Структура проекта

```
PrDev/
├── backend/                 # Laravel API сервер
│   ├── app/                 # Приложение Laravel
│   ├── config/              # Конфигурации
│   ├── database/            # Миграции, сиды, фабрики
│   ├── public/              # Публичные файлы
│   ├── resources/           # Представления, assets
│   ├── routes/              # Маршруты API
│   ├── storage/             # Логи, кэш
│   ├── tests/               # Тесты (Pest)
│   ├── composer.json        # PHP зависимости
│   └── Dockerfile           # Docker для backend
├── frontend/                # React клиент
│   ├── src/
│   │   ├── app/             # Основное приложение
│   │   ├── features/        # Фичи (FSD)
│   │   ├── pages/           # Страницы
│   │   ├── shared/          # Общие компоненты
│   │   └── widgets/         # Виджеты
│   ├── public/              # Статические файлы
│   ├── package.json         # JS зависимости
│   └── Dockerfile           # Docker для frontend
├── discord-bot/             # Discord бот
│   ├── index.js             # Основной файл бота
│   ├── package.json         # Зависимости
│   └── Dockerfile           # Docker для бота
├── docker-compose.yml       # Docker Compose конфиг
├── nginx.conf               # Nginx конфигурация
└── README.md                # Этот файл
```

## 🚀 Развертывание

1. Соберите production версии:
   ```bash
   cd frontend && npm run build:prod
   cd ../backend && php artisan config:cache && php artisan route:cache
   ```

2. Используйте Docker Compose для продакшена с соответствующими переменными окружения.

## 🤝 Контрибьютинг

1. Форкните репозиторий
2. Создайте feature branch (`git checkout -b feature/AmazingFeature`)
3. Зафиксируйте изменения (`git commit -m 'Add some AmazingFeature'`)
4. Запушьте в branch (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект лицензирован под MIT License.

## 📞 Контакты

Для вопросов и предложений обращайтесь к разработчикам проекта.

**Собрать билд Storybook:**
```bash
npm run build-storybook
```

---

## 📁 Структура проекта

Проект организован по принципам **Feature-Sliced Design (FSD)**, что обеспечивает высокую модульность, переиспользуемость и масштабируемость кода.

- `src/app`: Основные файлы приложения — инициализация, роутинг, провайдеры, глобальные стили.
- `src/pages`: Компоненты страниц, разделённые по ролям и назначениям (например, `admin`, `platform`, `portal`).
- `src/widgets`: Крупные переиспользуемые блоки интерфейса (например, Header, Footer, Layouts и другие).
- `src/features`: Функциональные модули, реализующие конкретные возможности (аутентификация, поиск, управление ролями и прочее).
- `src/shared`: Общие ресурсы — компоненты, утилиты, API, UI-элементы, используемые во всех слоях приложения.

---
