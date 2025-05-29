<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        DB::statement("ALTER TABLE reports MODIFY COLUMN status ENUM('pending','resolved','rejected','unread','read','under_discussion') DEFAULT 'unread'");
    }

    public function down()
    {
        DB::statement("ALTER TABLE reports MODIFY COLUMN status ENUM('pending','resolved','rejected') DEFAULT 'pending'");
    }
};