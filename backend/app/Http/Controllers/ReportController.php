<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\User;
use Illuminate\Support\Facades\Notification;
use App\Notifications\NewReportNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{
    /**
     * Создание репорта (доступно бэкеру).
     */
    public function store(Request $request)
    {
        // Валидация входных данных
        $data = $request->validate([
            'player_id' => 'required|string|exists:players,player_id',
            'tag'       => 'nullable|string',
            'comment'   => 'nullable|string',
        ]);

        // reporter_id = текущий пользователь
        $data['reporter_id'] = Auth::id();

        // Статус по умолчанию будет pending (задано в миграции)
        $report = Report::create($data);

        $admins = User::whereIn('role', ['admin', 'superadmin'])->get();

        // Отправляем уведомление
        Notification::send($admins, new NewReportNotification($report));

        return response()->json([
            'success' => true,
            'report'  => $report,
        ], 201);
    }

    /**
     * Получить список всех репортов (доступно админу/суперадмину).
     */
    public function index()
    {
        // Можно отфильтровать только pending, или вернуть все.
        $reports = Report::with(['player', 'reporter'])->get();

        return response()->json($reports);
    }

    /**
     * Изменить репорт (например, поменять статус, внести правки).
     * Допустим, только админ может это делать.
     */
    /**
     * Обновление статуса репорта.
     */
    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:unread,read,under_discussion',
        ]);

        $report = Report::findOrFail($id);
        $report->update(['status' => $validated['status']]);

        return response()->json([
            'success' => true,
            'report' => $report,
        ]);
    }
    /**
* Список репортов с возможностью фильтрации по одному или нескольким статусам.
*/
    public function listReports(Request $request)
    {
        $statuses = $request->query('status', null);

        $query = Report::with(['player', 'reputationRecord', 'reporter']);

        if ($statuses) {
            // Если статусы переданы через запятую (например: "read,under_discussion")
            $statusArray = explode(',', $statuses);
            $query->whereIn('status', $statusArray);
        }

        $reports = $query->orderBy('created_at', 'desc')->paginate(20);

        return response()->json($reports);
    }
}

