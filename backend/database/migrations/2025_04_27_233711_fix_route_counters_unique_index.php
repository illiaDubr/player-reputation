<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('route_counters', function (Blueprint $table) {
            // Удаляем старый уникальный индекс
            $table->dropUnique('route_counters_route_unique');

            // Создаём новый уникальный индекс по паре (route, fund_name)
            $table->unique(['route', 'fund_name']);
        });
    }

    public function down()
    {
        Schema::table('route_counters', function (Blueprint $table) {
            // Удаляем новый индекс
            $table->dropUnique(['route', 'fund_name']);

            // Восстанавливаем старый уникальный индекс только на route
            $table->unique('route');
        });
    }
};
