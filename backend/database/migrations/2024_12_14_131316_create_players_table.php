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
            $table->string( 'Ggpokerok')->nullable();
            $table->string( 'Ggnetwork')->nullable();
            $table->string( 'Pokerstars_com')->nullable();
            $table->string( 'Pokerstars_es')->nullable();
            $table->string( 'Winamax_fr')->nullable();
            $table->string( 'Winamax_es')->nullable();
            //тоже важные румы но не основные

            $table->string( 'PS')->nullable();
            $table->string( 'GG')->nullable();
            $table->string( 'RedStar')->nullable();
            $table->string( 'TigerGaming')->nullable();
            $table->string( 'PartyPoker')->nullable();
            $table->string( 'Pokerstars')->nullable();
            $table->string( '888poker')->nullable();
            $table->string( 'WPNpoker')->nullable();
            $table->string( 'Stretchpoker')->nullable();
            $table->string( 'Coinpoker')->nullable();
            $table->string( 'chikoPoker')->nullable();
            $table->string( 'nickiPoker')->nullable();
            $table->string( 'Skrill')->nullable();
            $table->string( 'Neteller')->nullable();
            $table->string( 'GipsyTeam')->nullable();
            $table->string( 'Luxon')->nullable();
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
