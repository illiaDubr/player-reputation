<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Report;

class AdminController extends Controller
{
    /**
     * Список уведомлений для админа
     */
    public function notifications(Request $request)
    {
        // Админ залогинен
        $user = $request->user();

        // Например, только непрочитанные уведомления:
        $notifications = $user->unreadNotifications()->get();

        // Или если хотим все, включая прочитанные:
        // $notifications = $user->notifications()->get();

        return response()->json([
            'success'       => true,
            'notifications' => $notifications,
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
