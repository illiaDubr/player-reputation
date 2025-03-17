<?php

namespace App\Http\Controllers;

use App\Models\Report;
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
            'player_id' => 'required|integer|exists:players,player_id',
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
    public function update(Request $request, Report $report)
    {
        // Валидация входных данных для обновления
        $data = $request->validate([
            'status' => 'required|in:pending,resolved,rejected',
        ]);

        $report->update($data);

        return response()->json([
            'success' => true,
            'report'  => $report,
        ]);
    }
}

