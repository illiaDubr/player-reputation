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
        $data = $request->validate([
            'player_id' => 'required|string|exists:players,player_id',
            'tag'       => 'nullable|string',
            'comment'   => 'nullable|string',
        ]);

        $data['reporter_id'] = Auth::id();
        $data['status']      = 'unread';

        $report = Report::create($data);

        $admins = User::whereIn('role', ['admin', 'superadmin'])->get();

        Notification::send($admins, new NewReportNotification($report));

        return response()->json([
            'success' => true,
            'report'  => $report,
        ], 201);
    }

    /**
     * Получение всех репортов (доступно админу/суперадмину).
     */
    public function index()
    {
        $reports = Report::with(['player', 'reporter'])->get();

        return response()->json($reports);
    }

    /**
     * Обновление статуса репорта (доступно админу/суперадмину).
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
     * Список репортов с фильтрацией по статусам.
     */
    public function listReports(Request $request)
{
    $statuses = $request->query('status', null);

    $query = Report::with(['player', 'reputationRecord', 'reporter']);

    if ($statuses) {
        $statusArray = explode(',', $statuses);
        $query->whereIn('status', $statusArray);
    }

    $reports = $query->orderBy('created_at', 'desc')->paginate(20);

    $formattedReports = $reports->map(function ($report) {
        return [
            'id' => $report->id,
            'player_first_name' => optional($report->player)->first_name,
            'player_last_name' => optional($report->player)->last_name,
            'reputation_comment' => optional($report->reputationRecord)->comment,
            'damage' => optional($report->reputationRecord)->damage,
            'report_comment' => $report->comment,
            'reporter_name' => optional($report->reporter)->name,
            'status' => $report->status,
            'created_at' => $report->created_at,
            'backer_tag' =>optional($report->player)->backer_tag,
        ];
    });

    return response()->json([
        'data' => $formattedReports,
        'pagination' => [
            'current_page' => $reports->currentPage(),
            'per_page' => $reports->perPage(),
            'total' => $reports->total(),
            'last_page' => $reports->lastPage(),
        ],
    ]);
}
    /**
     * Удаление проверенного репорта (resolved или approved).
     */
    public function deleteVerifiedReport($id)
    {
        try {
            $report = Report::findOrFail($id);

            // Проверяем, что репорт действительно можно удалять
            if (!in_array($report->status, ['resolved', 'approved'])) {
                return response()->json([
                    'success' => false,
                    'message' => 'Удалять можно только проверенные репорты.',
                ], 400);
            }

            $report->delete();

            return response()->json([
                'success' => true,
                'message' => 'Репорт успешно удален.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при удалении репорта: ' . $e->getMessage(),
            ], 500);
        }
    }
}
