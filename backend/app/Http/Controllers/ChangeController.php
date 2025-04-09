<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Change;

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Change extends Model
{
    protected $fillable = [
        'model_type',
        'model_id',
        'old_data',
        'new_data',
        'user_id',
        'status',
    ];

    protected $casts = [
        'old_data' => 'array',
        'new_data' => 'array',
    ];
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

