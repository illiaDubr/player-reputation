<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User; // убедитесь, что путь к модели User верный

class AdminAndBackerSeeder extends Seeder
{
    public function run()
    {
        $password = env('SEED_ADMIN_PASSWORD');
        if (empty($password)) {
            throw new \RuntimeException('Set SEED_ADMIN_PASSWORD in backend/.env before running this seeder.');
        }

        // Создаём/обновляем Админа
        User::updateOrCreate(
            ['email' => 'admin@example.com'], // критерий поиска
            [
                'name' => 'Главный Админ',
                'password' => bcrypt($password), // обязательно хэш
                'role' => 'admin',
            ]
        );

        // Создаём/обновляем Бэкера
        User::updateOrCreate(
            ['email' => 'backer@example.com'],
            [
                'name' => 'Test Backer',
                'password' => bcrypt($password),
                'role' => 'backer',
            ]
        );
    }
}
