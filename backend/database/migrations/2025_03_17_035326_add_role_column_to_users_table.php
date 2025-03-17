<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        DB::statement("
        UPDATE `users`
        SET `role` = 'user'
        WHERE `role` NOT IN ('user','admin','superadmin','backer')
           OR `role` IS NULL
           OR `role` = ''
    ");

        DB::statement("
        ALTER TABLE `users`
        MODIFY COLUMN `role` 
        ENUM('user','admin','superadmin','backer')
        NOT NULL DEFAULT 'user'
    ");
    }

    public function down()
    {
        // Возвращаем старый набор, если нужно
        DB::statement("
        ALTER TABLE `users`
        MODIFY COLUMN `role` 
        ENUM('user','admin','superadmin')
        NOT NULL DEFAULT 'user'
    ");
    }
};
