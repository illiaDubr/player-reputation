<?php

namespace App\Http\Controllers;

use App\Models\Backer;
use Illuminate\Http\Request;

class BackerController extends Controller
{
    /**
     * Обновление поля "fund_for_search" для определённого бэкера.
     */
    public function updateFundForSearch(Request $request, $backerId)
    {
        // Валидируем входные данные
        $validated = $request->validate([
            'fund_for_search' => 'required|string',
        ]);

        // Ищем конкретного бэкера
        $backer = Backer::findOrFail($backerId);

        // Записываем новое значение
        $backer->fund_for_search = $validated['fund_for_search'];
        $backer->save();

        return response()->json([
            'success' => true,
            'backer' => $backer,
        ]);
    }
}
