<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Report;
use App\Models\Player;

class AdminController extends Controller
{
    /**
     * Список уведомлений для админа
     */
    public function notifications()
    {
        $notifications = Report::with([
            'player',
            'reputationRecord',
            'reporter'
        ])
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        $formattedNotifications = $notifications->map(function ($report) {
            return [
                'id' => $report->id,
                'player_first_name' => optional($report->player)->first_name,
                'player_last_name' => optional($report->player)->last_name,
                'player_id' => optional($report->player)->player_id,
                'reputation_comment' => optional($report->reputationRecord)->comment, // комментарий репутации
                'damage' => optional($report->reputationRecord)->damage, // сумма ущерба
                'report_comment' => $report->comment, // комментарий к репорту
                'reporter_name' => optional($report->reporter)->name, // имя отправителя
                'backer_tag' => optional($report->player)->backer_tag,
                'status' => $report->status,
                'created_at' => $report->created_at,
            ];
        });

        return response()->json([
            'success' => true,
            'notifications' => $formattedNotifications,
            'pagination' => [
                'total' => $notifications->total(),
                'current_page' => $notifications->currentPage(),
                'per_page' => $notifications->perPage(),
                'last_page' => $notifications->lastPage(),
            ],
        ]);
    }

    /**
     * Просмотр одного уведомления (и, например, пометка как прочитанное)
     */
    public function showNotification(Request $request, $id)
    {
        $user = $request->user();

        // Ищем уведомление по ID для текущего юзера
        $notification = $user->notifications()->where('id', $id)->firstOrFail();

        // Можно сразу пометить как прочитанное:
        if ($notification->read_at === null) {
            $notification->markAsRead();
        }

        // Извлекаем из $notification->data['report_id'] нужное
        // Предположим, что в NewReportNotification мы сохранили 'report_id'
        $reportId = $notification->data['report_id'] ?? null;
        $report = $reportId ? Report::find($reportId) : null;

        return response()->json([
            'success'      => true,
            'notification' => $notification,
            'report'       => $report,
        ]);
    }

    /**
     * (Опционально) Пометить все уведомления как прочитанные
     */
    public function markAllAsRead(Request $request)
    {
        $user = $request->user();
        $user->unreadNotifications->markAsRead();

        return response()->json([
            'success' => true,
            'message' => 'Все уведомления помечены как прочитанные',
        ]);
    }
}
