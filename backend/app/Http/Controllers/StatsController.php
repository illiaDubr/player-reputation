<?php

namespace App\Http\Controllers;

use App\Models\RouteCounter;
use Illuminate\Http\Request;

class StatsController extends Controller
{
    /**
     * Кол-во поисков по каждому фонду.
     * ?fund_name=MVP  →  только для одного фонда
     */
    public function searchPlayersCount(Request $request)
    {
        $fund = $request->query('fund_name');

        $query = RouteCounter::where('route', 'search-players');

        if ($fund !== null) {
            $query->where('fund_name', $fund);
        }

        // если нужен суммарный счётчик по всем фондам:
        if ($fund === null) {
            $total = $query->sum('count');

            return response()->json([
                'route'  => 'search-players',
                'total'  => $total,
                'byFund' => $query->get(['fund_name', 'count']),
            ]);
        }

        // счётчик конкретного фонда
        $count = $query->value('count') ?? 0;

        return response()->json([
            'route'     => 'search-players',
            'fund_name' => $fund,
            'count'     => $count,
        ]);
    }
}
