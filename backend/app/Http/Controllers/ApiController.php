<?php

namespace App\Http\Controllers;

use App\Models\Player;
use App\Models\ReputationRecord;
use App\Models\RouteCounter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class ApiController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/search-players",
     *     tags={"Players"},
     *     summary="Поиск игроков с возвратом репутации",
     *     description="Возвращает игроков с метками, комментариями, фондом, суммой ущерба. Логика ответа зависит от количества совпадений: если только по имени/фамилии — ответ с сообщением о неточных совпадениях; при других совпадениях — подробные данные.",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="universal", type="string", example="ivanov"),
     *             @OA\Property(property="first_name", type="string", example="Иван"),
     *             @OA\Property(property="last_name", type="string", example="Иванов"),
     *             @OA\Property(property="middle_name", type="string", example="Петрович"),
     *             @OA\Property(property="discord", type="string", example="ivan#1234"),
     *             @OA\Property(property="email", type="string", example="ivanov@example.com"),
     *             @OA\Property(property="phonenumber", type="string", example="+79991234567"),
     *             @OA\Property(property="PS", type="string", example="ivanov88"),
     *             @OA\Property(property="GG", type="string", example="ivan_pro88")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Список игроков с репутацией или сообщение о неточных совпадениях",
     *         @OA\JsonContent(
     *             oneOf={
     *                 @OA\Schema(
     *                     type="array",
     *                     @OA\Items(
     *                         @OA\Property(property="id", type="integer", example=1),
     *                         @OA\Property(property="first_name", type="string", example="Иван"),
     *                         @OA\Property(property="last_name", type="string", example="Иванов"),
     *                         @OA\Property(property="GG", type="string", example="ivan_pro88"),
     *                         @OA\Property(property="reputation", type="array",
     *                             @OA\Items(
     *                                 @OA\Property(property="fund_name", type="string", example="Alpha Fund"),
     *                                 @OA\Property(property="comment", type="string", example="Нарушил условия сделки"),
     *                                 @OA\Property(property="damage", type="number", example=700),
     *                                 @OA\Property(property="created_at", type="string", example="2025-06-01T12:00:00Z")
     *                             )
     *                         )
     *                     )
     *                 ),
     *                 @OA\Schema(
     *                     type="object",
     *                     @OA\Property(property="message", type="string", example="Нет точных совпадений"),
     *                     @OA\Property(property="similar_count", type="integer", example=3)
     *                 )
     *             }
     *         )
     *     )
     * )
     */




    public function search(Request $request)
    {
        $ip = $request->ip();
        $key = 'search_limit:' . $ip;
        $limit = 30;

        $current = Cache::get($key, 0);
        if ($current >= $limit) {
            return response()->json([
                'message' => 'Превышен лимит запросов на сегодня (30)',
            ], 429);
        }

        Cache::put($key, $current + 1, now()->endOfDay());
        // Поиск игроков
        $results = $this->filterPlayers($request)
            ->with('reputationRecords')
            ->get();

        if ($results->isEmpty()) {
            return response()->json(['message' => 'User not found'], 200);
        }

        // Анализ совпадений
        $matches = collect();
        $fieldsToCheck = [
            'first_name', 'last_name', 'middle_name',
            'discord', 'email', 'phonenumber',
            'PS','GG','RedStar','TigerGaming','PartyPoker','Pokerstars',
            '888poker','WPNpoker','Stretchpoker','Coinpoker',
            'chikoPoker','nickiPoker','Winamax_es','Winamax_fr','Pokerstars_es','Pokerstars_com','Ggnetwork','Ggpokerok'
        ];

        foreach ($results as $player) {
            $score = 0;
            $fieldsMatched = [];

            foreach ($fieldsToCheck as $field) {
                if ($request->filled($field) && $player->$field === $request->$field) {
                    $score++;
                    $fieldsMatched[] = $field;
                }
            }

            $matches->push([
                'player' => $player,
                'score' => $score,
                'fields' => $fieldsMatched,
            ]);
        }

        // Фильтры логики ответа
        $exactMatches = $matches->filter(fn ($m) => $m['score'] > 1);

        $onlyFIO = $matches->filter(function ($m) {
            return collect($m['fields'])->every(fn ($f) =>
            in_array($f, ['first_name', 'last_name'])
            );
        });

        $single = $matches->count() === 1 && !$onlyFIO->count();
        $multi = $results->filter(fn ($p) => $p->reputationRecords->count() > 1);

        // Ответ: только ФИО — нет точных совпадений
        if ($onlyFIO->count() > 0 && $exactMatches->isEmpty()) {
            return response()->json([
                'message' => 'Нет точных совпадений',
                'similar_count' => $onlyFIO->count(),
            ], 200);
        }

        // Ответ: точные или мульти
        $output = $results->map(function ($player) {
            $data = $player->toArray();
            $data['reputation'] = $player->reputationRecords->map(function ($rec) {
                return [
                    'fund_name'  => $rec->fund_name,
                    'comment'    => $rec->comment,
                    'damage'     => $rec->damage,
                    'source'     => $rec->source,
                    'created_at' => $rec->created_at?->toISOString(),
                    'updated_at' => $rec->updated_at?->toISOString(),
                ];
            });
            return $data;
        });

        return response()->json($output);
    }

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
                        if (count($terms) > 1) {
                            $sub->orWhere('first_name', $term);
                        }

                        $sub->orWhere('last_name', $term)
                            ->orWhere('middle_name', $term)
                            ->orWhere('discord', $term)
                            ->orWhere('phonenumber', $term);

                        if (str_ends_with($term, '@')) {
                            $username = rtrim($term, '@');
                            $sub->orWhereRaw("SUBSTRING_INDEX(email, '@', 1) = ?", [$username]);
                        } else {
                            $sub->orWhere('email', $term)
                                ->orWhereRaw("SUBSTRING_INDEX(email, '@', 1) = ?", [$term]);
                        }

                        foreach ($nicknameFields as $field) {
                            $sub->orWhere($field, $term);
                        }
                    });
                }
            });

            if ($request->filled('fund_name')) {
                $query->whereHas('reputationRecords', function ($q) use ($request) {
                    $q->where('fund_name', $request->fund_name);
                });
            }

            return $query;
        }

        // Стандартные поля
        $query
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
            ->when($request->filled('discord'), fn ($q) =>
            $q->where('discord', $request->discord))
            ->when($request->filled('email'), fn ($q) =>
            $q->where('email', $request->email))
            ->when($request->filled('phonenumber'), fn ($q) =>
            $q->where('phonenumber', $request->phonenumber));

        // Никнеймы по отдельным полям
        $nicknameFields = [
            'PS','GG','RedStar','TigerGaming','PartyPoker','Pokerstars',
            '888poker','WPNpoker','Stretchpoker','Coinpoker',
            'chikoPoker','nickiPoker'
        ];

        foreach ($nicknameFields as $field) {
            if ($request->filled($field)) {
                $query->where($field, $request->$field);
            }
        }

        if ($request->filled('fund_name')) {
            $query->whereHas('reputationRecords', function ($q) use ($request) {
                $q->where('fund_name', $request->fund_name);
            });
        }

        return $query;
    }
}