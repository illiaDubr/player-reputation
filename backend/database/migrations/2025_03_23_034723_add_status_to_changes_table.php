<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('changes', function (Blueprint $table) {
            $table->enum('status', ['unread','read','under_discussion'])->default('unread')->after('user_id');
        });
    }

    public function down()
    {
        Schema::table('changes', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};
