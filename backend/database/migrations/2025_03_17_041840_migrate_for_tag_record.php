<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id(); // PK для таблицы reports

            // Связь с players.player_id
            $table->string('player_id');
            $table->foreign('player_id')
                ->references('player_id')
                ->on('players')
                ->onDelete('cascade');

            // Укажите нужный ключ-foreign на таблицу users, если юзер хранится в users.id
            $table->unsignedBigInteger('reporter_id');
            $table->foreign('reporter_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            // «Проблемная» метка (backer_tag)
            $table->string('tag')->nullable();

            // Комментарий, почему метка некорректна
            $table->text('comment')->nullable();

            // Статус репорта (pending, resolved, rejected, etc.)
            $table->enum('status', ['pending','resolved','rejected'])
                ->default('pending');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('reports');
    }
};
