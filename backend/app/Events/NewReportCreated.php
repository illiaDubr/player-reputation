<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class NewReportCreated implements ShouldBroadcast
{
    use SerializesModels;

    public $report;

    public function __construct($report)
    {
        $this->report = $report;
    }

    public function broadcastOn(): Channel
    {
        return new Channel('admin-channel');
    }

    public function broadcastAs(): string
    {
        return 'new-report';
    }
}
