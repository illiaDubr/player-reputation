<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('route_counters', function (Blueprint $table) {
            // Только добавляем новый составной уникальный индекс
            $table->unique(['route', 'fund_name']);
        });
    }

    public function down()
    {
        Schema::table('route_counters', function (Blueprint $table) {
            // Удаляем составной уникальный индекс
            $table->dropUnique(['route', 'fund_name']);
        });
    }
};
