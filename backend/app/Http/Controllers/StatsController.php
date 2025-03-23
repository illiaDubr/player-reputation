<?php

namespace App\Http\Controllers;

use App\Models\RouteCounter;

class StatsController extends Controller
{
    public function searchPlayersCount()
    {
        $count = RouteCounter::where('route', 'search-players')->value('count') ?? 0;
        return response()->json([
            'route' => 'search-players',
            'count' => $count
        ]);
    }
}
