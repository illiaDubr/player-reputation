<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\Request;

class PlayerAddController extends Controller
{
    /**
     * Handle the storage of player data.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Валидация входных данных
        $validated = $request->validate([
            'user_id' => 'nullable|integer',
            'old_id' => 'nullable|integer',
            'first_name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phonenumber' => 'nullable|string|max:20',
            'Ggpokerok' => 'nullable|string|max:255',
            'Ggnetwork' => 'nullable|string|max:255',
            'Pokerstars_com' => 'nullable|string|max:255',
            'Pokerstars_es' => 'nullable|string|max:255',
            'Winamax_fr' => 'nullable|string|max:255',
            'Winamax_es' => 'nullable|string|max:255',
            'PS' => 'nullable|string|max:255',
            'GG' => 'nullable|string|max:255',
            'RedStar' => 'nullable|string|max:255',
            'TigerGaming' => 'nullable|string|max:255',
            'PartyPoker' => 'nullable|string|max:255',
            'Pokerstars' => 'nullable|string|max:255',
            '888poker' => 'nullable|string|max:255',
            'WPNpoker' => 'nullable|string|max:255',
            'Stretchpoker' => 'nullable|string|max:255',
            'Coinpoker' => 'nullable|string|max:255',
            'chikoPoker' => 'nullable|string|max:255',
            'nickiPoker' => 'nullable|string|max:255',
            'Skrill' => 'nullable|string|max:255',
            'Neteller' => 'nullable|string|max:255',
            'GipsyTeam' => 'nullable|string|max:255',
            'Luxon' => 'nullable|string|max:255',
            'telegram' => 'nullable|string|max:255',
            'discord' => 'nullable|string|max:255',
            'skype' => 'nullable|string|max:255',
            'kyc_status' => 'required|boolean',
            'kyc_verified_at' => 'nullable|date',
            'backer_tag' => 'nullable|string|max:255',
            'created_by' => 'required|integer',
        ]);

        // Автоматическая генерация player_id на основе количества записей
        $validated['player_id'] = Player::count() + 1;

        try {
            $player = Player::create($validated);

            return response()->json([
                'message' => 'Player created successfully',
                'player' => $player,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create player',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
