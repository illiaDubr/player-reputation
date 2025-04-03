<?php

namespace App\Http\Controllers;

use App\Models\Backer;
use Illuminate\Http\Request;

class BackerAddController extends Controller
{
    /**
     * Handle the update of backer data.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        // Валидация данных
        $validated = $request->validate([
            'user_id' => 'nullable|integer',
            'old_backer' => 'nullable|string|max:255|unique:backers,old_backer,' . $id,
            'name' => 'nullable|string|max:255',
            'fund_name' => 'nullable|string|max:255',
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

        try {
            // Поиск существующей записи
            $backer = Backer::findOrFail($id);

            // Обновление данных
            $backer->update($validated);

            return response()->json([
                'message' => 'Backer updated successfully',
                'backer' => $backer,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update backer',
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
            $backers = Backer::where('approved', 'under_review')->get();

            return response()->json([
                'message' => 'Unapproved backers retrieved successfully',
                'data' => $backers,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve unapproved backers',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function getApprovedBackers()
    {
        try {
            // Получаем всех бэкеров с approved = 'yes'
            $backers = Backer::where('approved', 'yes')->get();

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
