<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\Request;

class PlayerController extends Controller
{
    public function search(Request $request)
    {
        // Получаем данные с фильтрацией
        $results = $this->filterPlayers($request)->with('reputationRecords')->paginate(15);

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
                $playerData['amount'] = $record->amount;
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
                    $q->orWhere('nickPS', 'like', '%' . $nickname . '%')
                        ->orWhere('nickGG', 'like', '%' . $nickname . '%')
                        ->orWhere('nickRedStar', 'like', '%' . $nickname . '%')
                        ->orWhere('nickTigerGaming', 'like', '%' . $nickname . '%')
                        ->orWhere('nickPartyPoker', 'like', '%' . $nickname . '%')
                        ->orWhere('nickPokerstars', 'like', '%' . $nickname . '%')
                        ->orWhere('nick888poker', 'like', '%' . $nickname . '%')
                        ->orWhere('nickWPNpoker', 'like', '%' . $nickname . '%')
                        ->orWhere('nickStretchpoker', 'like', '%' . $nickname . '%')
                        ->orWhere('nickCoinpoker', 'like', '%' . $nickname . '%')
                        ->orWhere('nickchikoPoker', 'like', '%' . $nickname . '%')
                        ->orWhere('nickiPoker', 'like', '%' . $nickname . '%');
                });
            });
    }
}
