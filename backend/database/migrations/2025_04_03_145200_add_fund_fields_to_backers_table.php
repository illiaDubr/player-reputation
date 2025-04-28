<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('backers', function (Blueprint $table) {

            // Описание фонда (текст на 3–4 абзаца)

            // ФИО главного контактного лица
            $table->string('contact_name')->nullable()->after('description');

            // Discord для связи
            $table->string('discord')->nullable()->after('contact_name');

            // Email для сброса пароля
            // Если email уже есть — не дублируйте. Иначе:
            $table->string('email')->unique()->nullable()->after('discord');

            // Если нужен пароль (для какого-то отдельного входа),
            // добавляем:
            // $table->string('password')->nullable()->after('email');
        });
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
