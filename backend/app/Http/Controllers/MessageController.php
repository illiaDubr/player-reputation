<?php

namespace App\Http\Controllers;

use App\Models\Player;
use App\Models\ReputationRecord;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'players' => 'array',
            'players.*.player_id' => 'required|string|max:255',
            'players.*.first_name' => 'nullable|string',
            'players.*.last_name' => 'nullable|string',
            'players.*.middle_name' => 'nullable|string',
            'players.*.email' => 'nullable|string',
            'players.*.phonenumber' => 'nullable|string',
            'players.*.sent_at' => 'nullable|date',
            // все остальные поля игроков по надобности

            'reputation_records' => 'array',
            'reputation_records.*.player_id' => 'nullable|string',
            'reputation_records.*.backer_id' => 'nullable|integer',
            'reputation_records.*.fund_name' => 'nullable|string',
            'reputation_records.*.comment' => 'nullable|string',
            'reputation_records.*.damage' => 'nullable|string',
            'reputation_records.*.makeUp' => 'nullable|string',
            'reputation_records.*.source' => 'nullable|string',
            'reputation_records.*.sent_at' => 'nullable|date',
        ]);

        // Сохраняем игроков
        foreach ($validated['players'] ?? [] as $playerData) {
            Player::updateOrCreate(
                ['player_id' => $playerData['player_id']],
                $playerData
            );
        }

        // Сохраняем записи о репутации
        foreach ($validated['reputation_records'] ?? [] as $recordData) {
            ReputationRecord::create($recordData);
        }

        return response()->json(['status' => 'ok']);
    }
}
