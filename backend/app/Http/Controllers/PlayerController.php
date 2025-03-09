<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\Request;

class PlayerController extends Controller
{


    public function update(Request $request, $playerId)
    {
        // Пример валидации – добавьте или измените поля, исходя из структуры модели Player.
        $validated = $request->validate([
            'name'     => 'sometimes|required|string|max:255',
            'email'    => 'sometimes|required|email|max:255',
            // Дополнительные поля можно добавить здесь:
            // 'field_name' => 'sometimes|nullable|тип_данных',
        ]);

        try {
            $player = Player::findOrFail($playerId);
            $player->update($validated);

            return response()->json([
                'message' => 'Player updated successfully',
                'player'  => $player,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update player',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Обновление записи репутации (например, комментария) для игрока.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $playerId
     * @param int $recordId
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateReputation(Request $request, $playerId, $recordId)
    {
        // Валидация полей для обновления записи репутации.
        $validated = $request->validate([
            'player_id'      => 'sometimes|required|integer',
            'backer_id'      => 'sometimes|required|integer',
            'old_player_id'  => 'sometimes|nullable|integer',
            'old_backer_id'  => 'sometimes|nullable|integer',
            'fund_name'      => 'sometimes|nullable|string|max:255',
            'comment'        => 'sometimes|nullable|string',
            'damage'         => 'sometimes|nullable|numeric',
            'makeUp'         => 'sometimes|nullable|numeric',
            'source'         => 'sometimes|nullable|string|max:255',
            // Если нужны другие поля — добавьте их сюда.
        ]);

        try {
            // Проверяем, существует ли игрок.
            $player = Player::findOrFail($playerId);

            // Находим конкретную запись репутации, привязанную к данному игроку.
            $reputationRecord = ReputationRecord::where('player_id', $player->player_id)
                ->where('id', $recordId)
                ->firstOrFail();

            $reputationRecord->update($validated);

            return response()->json([
                'message'          => 'Reputation record updated successfully',
                'reputationRecord' => $reputationRecord,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update reputation record',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function search(Request $request)
    {
        // Получаем данные с фильтрацией
        $results = $this->filterPlayers($request)
            ->with('reputationRecords')
            ->orderBy('created_at', 'desc') // Сортировка по дате создания (можно заменить на updated_at)
            ->paginate(15);
        // Проверяем, есть ли данные
        if ($results->isEmpty()) {
            return response()->json(['message' => 'User not found'], 200);
        }

        // Трансформируем данные в нужный формат
        $formattedResults = $results->map(function ($player) {
            $playerData = $player->toArray();

            // Берем первую запись из reputation_records и добавляем её ключи на верхний уровень
            if ($player->reputationRecords->isNotEmpty()) {
                $record = $player->reputationRecords->first(); // Если нужно использовать только первую запись
                $playerData['fund_name'] = $record->fund_name;
                $playerData['comment'] = $record->comment;
                $playerData['damage'] = $record->damage;
                $playerData['source'] = $record->source;
                $playerData['created_at_reputation'] = $record->created_at->toISOString();
                $playerData['updated_at_reputation'] = $record->updated_at->toISOString();
            }

            return $playerData;
        });

        // Возвращаем данные
        return response()->json($formattedResults);
    }

    private function filterPlayers(Request $request)
    {
        $query = Player::query();

        // Если указан discord или email, ищем только по этим параметрам
        if ($request->filled('discord') || $request->filled('email')) {
            return $query
                ->when($request->filled('discord'), function ($query) use ($request) {
                    return $query->where('skype', 'like', '%' . $request->input('discord') . '%');
                })
                ->when($request->filled('email'), function ($query) use ($request) {
                    return $query->where('email', 'like', '%' . $request->input('email') . '%');
                });
        }

        // Если discord и email не указаны, фильтруем по остальным параметрам
        return $query
            ->when($request->filled('first_name'), function ($query) use ($request) {
                return $query->where('first_name', 'like', '%' . $request->input('first_name') . '%');
            })
            ->when($request->filled('last_name'), function ($query) use ($request) {
                return $query->where('last_name', 'like', '%' . $request->input('last_name') . '%');
            })
            ->when($request->filled('middle_name'), function ($query) use ($request) {
                return $query->where('middle_name', 'like', '%' . $request->input('middle_name') . '%');
            })
            ->when($request->filled('phonenumber'), function ($query) use ($request) {
                return $query->where('phonenumber', 'like', '%' . $request->input('phonenumber') . '%');
            })
            ->when($request->filled('nickname'), function ($query) use ($request) {
                return $query->where(function ($q) use ($request) {
                    $nickname = $request->input('nickname');
                    $q->orWhere('PS', 'like', '%' . $nickname . '%')
                        ->orWhere('GG', 'like', '%' . $nickname . '%')
                        ->orWhere('RedStar', 'like', '%' . $nickname . '%')
                        ->orWhere('TigerGaming', 'like', '%' . $nickname . '%')
                        ->orWhere('PartyPoker', 'like', '%' . $nickname . '%')
                        ->orWhere('Pokerstars', 'like', '%' . $nickname . '%')
                        ->orWhere('888poker', 'like', '%' . $nickname . '%')
                        ->orWhere('WPNpoker', 'like', '%' . $nickname . '%')
                        ->orWhere('Stretchpoker', 'like', '%' . $nickname . '%')
                        ->orWhere('Coinpoker', 'like', '%' . $nickname . '%')
                        ->orWhere('chikoPoker', 'like', '%' . $nickname . '%')
                        ->orWhere('nickiPoker', 'like', '%' . $nickname . '%');
                });
            });
    }
}
