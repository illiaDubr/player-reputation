<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('backers', function (Blueprint $table) {
            $table->string('fund_for_search')->nullable()->after('user_id');
        });
    }

    public function down()
    {
        Schema::table('backers', function (Blueprint $table) {
            $table->dropColumn('fund_for_search');
        });
    }

};
