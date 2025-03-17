<?php

namespace App\Notifications;

use App\Models\Report;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewReportNotification extends Notification
{
    use Queueable;

    protected $report;

    /**
     * Передаём в конструктор сам репорт,
     * чтобы использовать его данные в уведомлении.
     */
    public function __construct(Report $report)
    {
        $this->report = $report;
    }

    /**
     * Определяем, по каким каналам слать уведомление.
     * 'database' – чтобы записывать в таблицу notifications.
     * 'mail' – чтобы отправлять письма.
     */
    public function via($notifiable)
    {
        return ['database', 'mail'];
    }

    /**
     * Описание содержимого уведомления в виде записи в БД.
     * Это попадёт в поле data в таблице notifications.
     */
    public function toDatabase($notifiable)
    {
        return [
            'report_id'    => $this->report->id,
            'player_id'    => $this->report->player_id,
            'reporter_id'  => $this->report->reporter_id,
            'tag'          => $this->report->tag,
            'comment'      => $this->report->comment,
            'created_at'   => $this->report->created_at->toDateTimeString(),
            // Можно добавить любые поля
        ];
    }

    /**
     * Описание содержимого письма (MailChannel).
     * Если хотите на почту отправлять.
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Новый репорт на метку')
            ->line('Поступил новый репорт на иметку с ID: ' . $this->report->player_id)
            ->action('Посмотреть репорт', url('/admin/reports/' . $this->report->id))
            ->line('Спасибо!');
    }
}
