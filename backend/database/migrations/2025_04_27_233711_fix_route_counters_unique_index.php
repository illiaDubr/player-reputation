<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;


return new class extends Migration
{
    public function up()
    {
        Schema::table('route_counters', function (Blueprint $table) {
            // Пытаемся удалить индекс правильно
            $table->dropUnique('route_counters_route_fund_name_unique');

            // Теперь создаём новый индекс
            $table->unique(['route', 'fund_name']);
        });
    }

    public function down()
    {
        Schema::table('route_counters', function (Blueprint $table) {
            $table->dropUnique(['route', 'fund_name']);
        });
    }
};

