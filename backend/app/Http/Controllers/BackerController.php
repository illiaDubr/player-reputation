<?php

namespace App\Http\Controllers;

use App\Models\Backer;
use Illuminate\Http\Request;

class BackerController extends Controller
{
    /**
     * Обновление поля "fund_for_search" для определённого бэкера.
     */

    public function updateFundInfo(Request $request, $id)
    {
        // Валидируем входящие данные
        $validated = $request->validate(array(
            'logo'         => 'nullable|string',
            'description'  => 'nullable|string',
            'contact_name' => 'nullable|string|max:255',
            'discord'      => 'nullable|string|max:255',
            'email'        => 'nullable|email|max:255',
            'id'           => 'nullable|string|max:255',
            // 'password'  => 'nullable|string|min:8', // при необходимости
        ));

        // Находим бэкера
        $backer = Backer::findOrFail($id);

        // Если хотите менять пароль
        // if (!empty($validated['password'])) {
        //     $validated['password'] = Hash::make($validated['password']);
        // }

        // Обновляем поля
        $backer->update($validated);

        return response()->json([
            'success' => true,
            'backer'  => $backer,
        ]);
    }
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
