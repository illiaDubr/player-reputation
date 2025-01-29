<?php

namespace App\Http\Controllers;

use App\Models\Backer;
use Illuminate\Http\Request;

class BackerAddController extends Controller
{
    /**
     * Handle the storage of backer data.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Валидация данных
        $validated = $request->validate([
            'user_id' => 'nullable|integer',
            'old_backer' => 'nullable|string|max:255|unique:backers',
            'name' => 'required|string|max:255',
            'managers' => 'nullable|array',
            'users' => 'nullable|array',
            'readonlys' => 'nullable|array',
            'siteLink' => 'nullable|string|max:255',
            'discipline' => 'nullable|string|max:255',
            'discordHouse' => 'nullable|string|max:255',
            'discordRepresentative' => 'nullable|string|max:255',
            'rollbackStart' => 'nullable|string|max:255',
            'rollbackEnd' => 'nullable|string|max:255',
            'rollbackIncrease' => 'nullable|boolean',
            'rakeback' => 'nullable|string|max:255',
            'numberCoach' => 'nullable|integer',
            'numberPlayer' => 'nullable|integer',
            'contractStart' => 'nullable|string|max:255',
            'contractEnd' => 'nullable|string|max:255',
            'approverdAgeStart' => 'nullable|string|max:255',
            'approverdAgeEnd' => 'nullable|string|max:255',
            'fundDescr' => 'nullable|string',
            'country' => 'nullable|string|max:255',
            'approved' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
        ]);

        // Сохранение данных
        try {
            $backer = Backer::create($validated);

            return response()->json([
                'message' => 'Backer created successfully',
                'backer' => $backer,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create backer',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function updateStatus(Request $request, $id)
    {
        // Валидация входных данных
        $validated = $request->validate([
            'approved' => 'required|string|max:255',
        ]);

        try {
            // Поиск записи Backer
            $backer = Backer::findOrFail($id);

            // Обновление статуса
            $backer->approved = $validated['approved'];
            $backer->save();

            return response()->json([
                'message' => 'Approved status updated successfully',
                'backer' => $backer,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update approved status',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get all backers with approved status as 'no'.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUnapprovedBackers()
    {
        try {
            // Получаем всех бэкеров с approved = 'no'
            $backers = Backer::where('approved', 'no')->get();

            return response()->json([
                'message' => 'Unapproved backers retrieved successfully',
                'backers' => $backers,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve unapproved backers',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

}
