<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('route_counters', function (Blueprint $table) {




        });
    }

    public function down()
    {
        Schema::table('route_counters', function (Blueprint $table) {
            $table->dropUnique(['route', 'fund_name']);
            $table->dropColumn('fund_name');
        });
    }
};
