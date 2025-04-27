<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('route_counters', function (Blueprint $table) {
            // Удаляем уникальный индекс по колонке route
            $table->dropUnique(['route']);

            // Создаём новый составной уникальный индекс по (route, fund_name)
            $table->unique(['route', 'fund_name']);
        });
    }

    public function down()
    {
        Schema::table('route_counters', function (Blueprint $table) {
            // Удаляем составной индекс
            $table->dropUnique(['route', 'fund_name']);

            // Восстанавливаем старый уникальный индекс только на route
            $table->unique(['route']);
        });
    }
};
