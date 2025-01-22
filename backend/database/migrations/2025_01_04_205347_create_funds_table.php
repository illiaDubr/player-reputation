<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFundsTable extends Migration
{
    public function up()
    {
        Schema::create('teams', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('skype')->nullable();
            $table->string('site')->nullable();
            $table->string('discord')->nullable();
            $table->string('owner')->nullable();
            $table->timestamps();
        });

        Schema::create('team_managers', function (Blueprint $table) {
            $table->id();
            $table->string('team_id');
            $table->string('manager_id');
            $table->foreign('team_id')->references('id')->on('teams')->onDelete('cascade');
        });

        Schema::create('team_users', function (Blueprint $table) {
            $table->id();
            $table->string('team_id');
            $table->string('user_id');
            $table->foreign('team_id')->references('id')->on('teams')->onDelete('cascade');
        });

        Schema::create('team_readonlys', function (Blueprint $table) {
            $table->id();
            $table->string('team_id');
            $table->string('readonly_id');
            $table->foreign('team_id')->references('id')->on('teams')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('team_readonlys');
        Schema::dropIfExists('team_users');
        Schema::dropIfExists('team_managers');
        Schema::dropIfExists('teams');
    }
}
