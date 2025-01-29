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
        Schema::create('backers', function (Blueprint $table) {
            $table->id('backer_id');
            $table->unsignedBigInteger('user_id')->nullable()->index(); // Связь с пользователем (если есть)
            $table->string('old_backer', 255)->nullable()->unique();

            $table->string('name'); // Название фонда
            $table->json('managers')->nullable(); // Список менеджеров
            $table->json('users')->nullable(); // Список пользователей
            $table->json('readonlys')->nullable(); // Список readonly-пользователей

            //todo зазор для лого

            $table->string('siteLink')->nullable();
            $table->string("discipline")->nullable();
            $table->string('discordHouse')->nullable();
            $table->string('discordRepresentative')->nullable();

            $table->string('rollbackStart')->nullable();
            $table->string('rollbackEnd')->nullable();
            $table->boolean('rollbackIncrease')->nullable();

            $table->string('rakeback')->nullable();

            $table->integer('numberCoach')->nullable();
            $table->integer('numberPlayer')->nullable();

            $table->string('contractStart')->nullable();
            $table->string('contractEnd')->nullable();

            $table->string('approverdAgeStart')->nullable();
            $table->string('approverdAgeEnd')->nullable();

            $table->mediumText('fundDescr')->nullable();

            $table->string('country')->nullable();

            $table->string("approved")->nullable();

            $table->string('email')->nullable()->index();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('backers');
    }
};
