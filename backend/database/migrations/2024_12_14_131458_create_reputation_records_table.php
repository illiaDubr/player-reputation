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
        Schema::create('reputation_records', function (Blueprint $table) {
            $table->id();
            $table->string('player_id')->nullable(); // Связь с игроком
            $table->unsignedBigInteger('backer_id')->nullable(); // Связь с фондом
            $table->string('old_player_id')->nullable();
            $table->string('old_backer_id')->nullable();
            $table->string('fund_name')->nullable();
            $table->text('comment')->nullable(); // Текст комментария
            $table->text('arbitrage_descr')->nullable(); // Описание арбитража
            $table->string('amount')->nullable(); // Сумма в арбитраже
            $table->string('source')->nullable(); // Источник информации

            $table->timestamps();

            $table->foreign('player_id')->references('player_id')->on('players')->onDelete('cascade');
            $table->foreign('backer_id')->references('backer_id')->on('backers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reputation_records');
    }
};
