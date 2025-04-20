<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Player;
use App\Models\ReputationRecord;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class DiscordImportController extends Controller
{
    public function import(Request $request)
    {
        $data = $request->all();

        DB::beginTransaction();
        try {
            // Обработка игроков
            foreach ($data['players'] ?? [] as $playerData) {
                // Генерация player_id если не указан
                if (empty($playerData['player_id'])) {
                    $playerData['player_id'] = Str::uuid()->toString();
                }

                // Создаём или обновляем игрока
                Player::updateOrCreate(
                    ['player_id' => $playerData['player_id']],
                    $playerData
                );
            }

            // Обработка записей репутации
            foreach ($data['reputation_records'] ?? [] as $recordData) {
                // Проверяем player_id
                if (!empty($recordData['player_id'])) {
                    ReputationRecord::create($recordData);
                }
            }

            DB::commit();
            return response()->json(['status' => 'ok'], 201);

        } catch (\Throwable $e) {
            logger()->error('Discord import error', [
                'message' => $e->getMessage(),
                'trace'   => $e->getTraceAsString(),
                'data'    => $request->all()
            ]);

            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
