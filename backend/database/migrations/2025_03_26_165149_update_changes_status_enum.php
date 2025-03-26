<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        // Добавляем нужные значения в ENUM. Например, подправим 'aproved' на 'approved'
        // и добавим 'under_discussion'
        DB::statement("
            ALTER TABLE changes
            MODIFY COLUMN status 
            ENUM('unread','read','approved','under_discussion')
            NOT NULL DEFAULT 'unread'
        ");
    }

    public function down()
    {
        // Возвращаемся к исходному набору, если откатываем
        DB::statement("
            ALTER TABLE changes
            MODIFY COLUMN status 
            ENUM('unread','read','aproved')
            NOT NULL DEFAULT 'unread'
        ");
    }
};
