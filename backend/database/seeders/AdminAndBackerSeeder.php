<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User; // убедитесь, что путь к модели User верный

class AdminAndBackerSeeder extends Seeder
{
    public function run()
    {
        // Создаём/обновляем Админа
        User::updateOrCreate(
            ['email' => 'admin@example.com'], // критерий поиска
            [
                'name' => 'Главный Админ',
                'password' => bcrypt('change-me-locally'), // обязательно хэш
                'role' => 'admin',
            ]
        );

        // Создаём/обновляем Бэкера
        User::updateOrCreate(
            ['email' => 'backer@example.com'],
            [
                'name' => 'Test Backer',
                'password' => bcrypt('backer123'),
                'role' => 'backer',
            ]
        );
    }
}
