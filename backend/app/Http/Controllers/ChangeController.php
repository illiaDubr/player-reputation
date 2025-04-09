<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Change;

class ChangeController extends Controller
{
    /**
     * Получение списка изменений с фильтрацией по статусу.
     */
    public function index(Request $request)
    {
        $status = $request->query('status', 'unread');

        $changes = Change::where('status', $status)
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        // Декодируем данные и, если нужно, догружаем backer_tag
        $changes->getCollection()->transform(function ($change) {
            $old = json_decode($change->old_data, true) ?? [];
            $new = json_decode($change->new_data, true) ?? [];

            // Предположим, в ReputationRecord есть player_id
            if (isset($new['player_id'])) {
                $player = \App\Models\Player::where('player_id', $new['player_id'])->first();
                if ($player) {
                    $new['backer_tag'] = $player->backer_tag;
                }
            }

            if (isset($old['player_id'])) {
                $player = \App\Models\Player::where('player_id', $old['player_id'])->first();
                if ($player) {
                    $old['backer_tag'] = $player->backer_tag;
                }
            }

            // Теперь $change->old_data/$new_data станут массивами
            $change->old_data = $old;
            $change->new_data = $new;
            return $change;
        });

        return response()->json($changes);
    }

    /**
     * Обновление статуса изменения.
     */
    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:unread,read,under_discussion',
        ]);

        $change = Change::findOrFail($id);
        $change->update(['status' => $validated['status']]);

        return response()->json([
            'success' => true,
            'change' => $change
        ]);
    }

    public function rollback($id)
    {
        $change = Change::findOrFail($id);

        // Берем старые данные
        $oldData = $change->old_data;

        if (!$oldData) {
            return response()->json([
                'success' => false,
                'message' => 'Отсутствуют старые данные для отката.',
            ], 400);
        }

        // Определяем класс и ID модели для отката
        $modelClass = $change->model_type;
        $modelId = $change->model_id;

        if (!class_exists($modelClass)) {
            return response()->json([
                'success' => false,
                'message' => 'Модель не найдена для отката.',
            ], 400);
        }

        $modelInstance = $modelClass::find($modelId);

        if (!$modelInstance) {
            return response()->json([
                'success' => false,
                'message' => 'Запись не найдена для отката.',
            ], 400);
        }

        // Сохраняем текущее состояние, чтобы зафиксировать rollback
        $currentData = $modelInstance->toArray();

        // Применяем старые данные
        foreach ($oldData as $field => $value) {
            // Пропускаем технические поля, если нужно
            if (in_array($field, ['id', 'created_at', 'updated_at'])) {
                continue;
            }
            $modelInstance->$field = $value;
        }
        $modelInstance->save();

        // Помечаем текущее изменение как откат (rolled_back)
        $change->update(['status' => 'rolled_back']);

        // Создаем запись rollback в таблице изменений
        Change::create([
            'model_type' => $modelClass,
            'model_id'   => $modelId,
            'old_data'   => $currentData,
            'new_data'   => $oldData,
            'user_id'    => auth()->id(),
            'status'     => 'approved', // rollback обычно автоматически одобряется
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Откат изменений успешно выполнен.',
            'change' => $change,
        ]);
    }

}

