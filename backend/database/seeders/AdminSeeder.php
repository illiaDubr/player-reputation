<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User; // Или ваш namespace, если модель лежит в другом месте

class AdminSeeder extends Seeder
{
    public function run()
    {
        // Пример: если хотите «админа» с email=admin@example.com и паролем password
        // Используем updateOrCreate, чтобы при повторном запуске просто обновить запись
        User::updateOrCreate(
            [ 'email' => 'admin@example.com' ],   // По какому атрибуту ищем
            [
                'name' => 'Главный Админ',        // Любое имя
                'password' => bcrypt('password'), // Пароль обязательно хэшируем
                'role' => 'admin',               // Или 'superadmin'
            ]
        );
    }
}
