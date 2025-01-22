<?php

namespace Database\Factories;

use App\Enums\backerTag;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PlayerSData>
 */
class PlayerSDataFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $commonNick = fake()->userName(); // Общий ник для нескольких полей для тестирования

        return [
            'user_id' => \App\Models\User::factory(),
            'name' => fake()->firstName(),
            'surname' => fake()->lastName(),
            'middle_name' => fake()->firstName(), // Или `null`, если это отчество не всегда нужно
            'discord' => fake()->userName() . '#' . fake()->randomNumber(4, true),
            'nickPS' => $commonNick,
            'nickGG' => fake()->userName(),
            'nickRedStar' => fake()->optional(0.8, null)->userName(),
            'nickTigerGaming' => fake()->userName(),
            'nickPartyPoker' => fake()->userName(),
            'nickPokerstars' => fake()->userName(),
            'nick888poker' => $commonNick,
            'nickWPNpoker' => fake()->optional(0.8, null)->userName(),
            'nickStretchpoker' => fake()->userName(),
            'nickCoinpoker' => fake()->userName(),
            'nickchikoPoker' => $commonNick,
            'nickiPoker' => fake()->optional(0.2, null)->userName(),
            'mailSkrill' => fake()->safeEmail(),
            'mailNeteller' => fake()->safeEmail(),
            'mailGipsyTeam' => fake()->safeEmail(),
            'mailLuxon' => fake()->safeEmail(),
            'Email' => fake()->unique()->safeEmail(),
            'telegram' => '@' . fake()->userName(),
            'phonenumber' => fake()->phoneNumber(),
            'AmountOfDamage' => fake()->randomFloat(2, 0, 1000),
            'MakeupAmount' => fake()->randomFloat(2, 0, 1000),
            'fundComment' => fake()->text(200),
            'playerComment' => fake()->text(200),
            'backerTag' => fake()->randomElement(backerTag::cases())->value,
        ];
    }
}
