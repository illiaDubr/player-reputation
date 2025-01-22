<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        // Пример: создадим 2 пользователей, и к каждому привяжем по одному Player и Backer

        // 1) Создадим user
        $user1 = \App\Models\User::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => bcrypt('password123'),
        ]);

        // 2) Создадим player, привязанный к user1
        \DB::table('players')->insert([
            'user_id'           => $user1->id,
            'first_name'        => 'John',
            'last_name'         => 'Doe',
            'nickPS'            => 'Johny',
            'nickGG'            => 'JD_GG',
            'telegram'          => '@john_doe',
            'created_by'        => $user1->id,
            'created_at'        => now(),
            'updated_at'        => now(),
        ]);


        // 3) Аналогично создадим user2 + backer:
        $user2 = \App\Models\User::create([
            'name' => 'Alice Smith',
            'email' => 'alice@example.com',
            'password' => bcrypt('password123'),
        ]);

        \DB::table('backers')->insert([
            'user_id' => $user2->id,
            'first_name' => 'Alice',
            'last_name'  => 'Smith',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // при желании — репутационные записи:
        \DB::table('reputation_records')->insert([
            'player_id' => 1, // ссылка на нашего player с id = 1
            'backer_id' => 1, // ссылка на backer с id = 1
            'comment'   => 'Отличный игрок',
            'source'    => 'Admin panel',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

}
