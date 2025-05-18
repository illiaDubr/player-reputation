<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class NewBackerForModeration implements ShouldBroadcast
{
    use SerializesModels;

    public $backer;

    public function __construct($backer)
    {
        $this->backer = $backer;
    }

    public function broadcastOn(): Channel
    {
        return new Channel('admin-channel');
    }

    public function broadcastAs(): string
    {
        return 'new-backer';
    }
}

