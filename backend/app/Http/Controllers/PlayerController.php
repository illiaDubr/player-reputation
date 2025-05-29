<?php

namespace App\Http\Controllers;

use App\Models\Player;
use App\Models\ReputationRecord;
use App\Models\RouteCounter;
use App\Models\Change;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PlayerController extends Controller
{
    /* -----------------------------------------------------------------
     |  1. Обновление самого игрока
     |-----------------------------------------------------------------*/
    public function update(Request $request, $playerId)
    {
        $validated = $request->validate([
            'name'  => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|max:255',
            // добавляйте свои поля …
        ]);

        $player = Player::findOrFail($playerId);
        $player->update($validated);

        return response()->json([
            'message' => 'Player updated successfully',
            'player'  => $player,
        ]);
    }
    public function updateBackerTag(Request $request, $playerId)
    {
        // Находим игрока
        $player = Player::where('player_id', $playerId)->firstOrFail();

        // Валидируем входные данные
        $data = $request->validate([
            'backer_tag' => 'required|string|max:255',
        ]);

        // Обновляем backer_tag
        $player->backer_tag = $data['backer_tag'];
        $player->save();

        return response()->json([
            'success' => true,
            'message' => 'Backer tag updated successfully',
            'player'  => $player,
        ]);
    }

    /* -----------------------------------------------------------------
     |  2. Обновление записи репутации + backer_tag + лог изменений
     |-----------------------------------------------------------------*/
    public function updateReputation(Request $request, $playerId, $recordId)
    {
        $reputation = ReputationRecord::where('player_id', $playerId)
            ->where('id', $recordId)
            ->firstOrFail();

        $oldData = $reputation->toArray();

        $validated = $request->validate([
            'player_id'      => 'sometimes|required|string',
            'backer_id'      => 'sometimes|required|integer',
            'old_player_id'  => 'sometimes|nullable|integer',
            'old_backer_id'  => 'sometimes|nullable|integer',
            'fund_name'      => 'sometimes|nullable|string|max:255',
            'comment'        => 'sometimes|nullable|string',
            'damage'         => 'sometimes|nullable|numeric',
            'makeUp'         => 'sometimes|nullable|numeric',
            'source'         => 'sometimes|nullable|string|max:255',
            'backer_tag'     => 'sometimes|nullable|string|max:255',
        ]);

        /* Обновляем репутацию */
        $reputation->update($validated);

        /* Пришёл backer_tag → обновляем игрока */
        if (isset($validated['backer_tag'])) {
            Player::where('player_id', $playerId)
                ->update(['backer_tag' => $validated['backer_tag']]);
        }

        $newData = $reputation->fresh()->toArray();

        /* Добавляем backer_tag в лог */
        $player = Player::where('player_id', $playerId)->first();
        $oldData['backer_tag'] = $player?->backer_tag;
        $newData['backer_tag'] = $player?->backer_tag;

        Change::create([
            'model_type' => ReputationRecord::class,
            'model_id'   => $recordId,
            'old_data'   => $oldData,   // cast «array» в модели Change
            'new_data'   => $newData,
            'user_id'    => auth()->id(),
        ]);

        return response()->json([
            'message'          => 'Reputation record updated successfully',
            'reputationRecord' => $reputation,
        ]);
    }

    /* -----------------------------------------------------------------
     |  3. Поиск игроков + счётчик по фондам
     |-----------------------------------------------------------------*/
    public function search(Request $request)
    {


        /* --- счётчик для конкретного фонда --- */
        $fund = auth()->user()?->fund_name ?? auth()->user()?->backer?->fund_name ?? null;
        // или возьмите из запроса
        RouteCounter::updateOrCreate(
            ['route' => 'search-players', 'fund_name' => $fund],
            ['count' => DB::raw('count + 1')]
        );

        $results = $this->filterPlayers($request)
            ->with('reputationRecords')
            ->orderBy('created_at', 'desc')
            ->get();

        if ($results->isEmpty()) {
            return response()->json(['message' => 'User not found'], 200);
        }

        /* Трансформируем данные */
        $formatted = $results->map(function ($player) {
            $data = $player->toArray();

            if ($player->reputationRecords->isNotEmpty()) {
                $rec = $player->reputationRecords->first();
                $data['fund_name']              = $rec->fund_name;
                $data['comment']                = $rec->comment;
                $data['damage']                 = $rec->damage;
                $data['source']                 = $rec->source;
                $data['created_at_reputation']  = $rec->created_at?->toISOString();
                $data['updated_at_reputation']  = $rec->updated_at?->toISOString();
            }

            return $data;
        });

        return response()->json($formatted);
    }

    /* -----------------------------------------------------------------
     |  4. Внутренний фильтр
     |-----------------------------------------------------------------*/
    private function filterPlayers(Request $request)
    {
        $query = Player::query();

        // Универсальный поиск
        if ($request->filled('universal')) {
            $terms = explode(' ', trim($request->universal));
            $nicknameFields = [
                'PS','GG','RedStar','TigerGaming','PartyPoker','Pokerstars',
                '888poker','WPNpoker','Stretchpoker','Coinpoker',
                'chikoPoker','nickiPoker'
            ];

            $query->where(function ($outer) use ($terms, $nicknameFields) {
                foreach ($terms as $term) {
                    $outer->where(function ($sub) use ($term, $terms, $nicknameFields) {

                        // Исключаем first_name при одном слове
                        if (count($terms) > 1) {
                            $sub->orWhere('first_name', $term);
                        }

                        $sub->orWhere('last_name', $term)
                            ->orWhere('middle_name', $term)
                            ->orWhere('discord', $term)
                            ->orWhere('phonenumber', $term)

                            // email: ищем по полной строке и по username части (до @)
                            ->orWhere('email', $term)
                            ->orWhereRaw("SUBSTRING_INDEX(email, '@', 1) = ?", [$term]);

                        foreach ($nicknameFields as $field) {
                            $sub->orWhere($field, $term);
                        }
                    });
                }
            });

            // Фильтрация по фонду, если передан
            if ($request->filled('fund_name')) {
                $fund = $request->fund_name;

                $query->whereHas('reputationRecords', function ($q) use ($fund) {
                    $q->where('fund_name', $fund);
                });
            }

            return $query;
        }

        // Обычные фильтры
        if ($request->filled('discord') || $request->filled('email')) {
            return $query
                ->when($request->filled('discord'), fn ($q) =>
                $q->where('discord', $request->discord))
                ->when($request->filled('email'), fn ($q) =>
                $q->where('email', $request->email));
        }

        return $query
            ->when($request->filled('first_name'), fn ($q) =>
            $q->where('first_name', $request->first_name))
            ->when($request->filled('last_name'), function ($q) use ($request) {
                $name = $request->last_name;
                $q->where(function ($sub) use ($name) {
                    $sub->where('last_name', $name)
                        ->orWhere('first_name', $name);
                });
            })
            ->when($request->filled('middle_name'), fn ($q) =>
            $q->where('middle_name', $request->middle_name))
            ->when($request->filled('phonenumber'), fn ($q) =>
            $q->where('phonenumber', $request->phonenumber))
            ->when($request->filled('nickname'), function ($q) use ($request) {
                $nick = $request->nickname;
                $fields = [
                    'PS','GG','RedStar','TigerGaming','PartyPoker','Pokerstars',
                    '888poker','WPNpoker','Stretchpoker','Coinpoker',
                    'chikoPoker','nickiPoker'
                ];
                $q->where(function ($sub) use ($fields, $nick) {
                    foreach ($fields as $field) {
                        $sub->orWhere($field, $nick);
                    }
                });
            })
            ->when($request->filled('fund_name'), function ($q) use ($request) {
                $fund = $request->fund_name;
                $q->whereHas('reputationRecords', fn ($r) =>
                $r->where('fund_name', $fund));
            });
    }




}
