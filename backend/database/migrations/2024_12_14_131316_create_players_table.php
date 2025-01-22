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
        Schema::create('players', function (Blueprint $table) {
            $table->string('player_id')->primary();
            $table->unsignedBigInteger('user_id')->nullable();
            // Внешние ключи
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('set null');



            $table->string('old_id')->nullable()->unique();

            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('middle_name')->nullable();
            $table->string('email')->nullable();
            $table->string('phonenumber')->nullable();
            //Мейн румы
            $table->string(column: 'Ggpokerok')->nullable();
            $table->string(column: 'Ggnetwork')->nullable();
            $table->string(column: 'Pokerstars_com')->nullable();
            $table->string(column: 'Pokersters_es')->nullable();
            $table->string(column: 'Winamax_fr')->nullable();
            $table->string(column: 'Winamax_es')->nullable();
            //тоже важные румы но не основные

            $table->string(column: 'nickPS')->nullable();
            $table->string(column: 'nickGG')->nullable();
            $table->string(column: 'nickRedStar')->nullable();
            $table->string(column: 'nickTigerGaming')->nullable();
            $table->string(column: 'nickPartyPoker')->nullable();
            $table->string(column: 'nickPokerstars')->nullable();
            $table->string(column: 'nick888poker')->nullable();
            $table->string(column: 'nickWPNpoker')->nullable();
            $table->string(column: 'nickStretchpoker')->nullable();
            $table->string(column: 'nickCoinpoker')->nullable();
            $table->string(column: 'nickchikoPoker')->nullable();
            $table->string(column: 'nickiPoker')->nullable();
            $table->string(column: 'Skrill')->nullable();
            $table->string(column: 'Neteller')->nullable();
            $table->string(column: 'GipsyTeam')->nullable();
            $table->string(column: 'Luxon')->nullable();
            $table->string('telegram')->nullable();
            $table->string('discord')->nullable();
            $table->string('skype')->nullable();

            $table->boolean('kyc_status')->default(false);
            $table->timestamp('kyc_verified_at')->nullable();
            $table->string('backer_tag')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps(); // created_at, updated_at


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('players');
    }
};
