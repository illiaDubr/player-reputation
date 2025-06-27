<?php

namespace App\Http\Controllers;

use App\Models\Player;
use App\Models\ReputationRecord;
use App\Models\RouteCounter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApiController extends Controller
{
    public function search(Request $request)
    {

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
            'chikoPoker','nickiPoker'
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