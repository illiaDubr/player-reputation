<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {

    }

    public function down()
    {
        Schema::table('backers', function (Blueprint $table) {
            $table->dropColumn('logo');
            $table->dropColumn('description');
            $table->dropColumn('contact_name');
            $table->dropColumn('discord');
            $table->dropColumn('email');
            // $table->dropColumn('password'); // если добавляли
        });
    }
};
