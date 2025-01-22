<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReputationRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'player_id',
        'backer_id',
        'old_player_id',
        'old_backer_id',
        'comment',
        'arbitrage_descr',
        'amount',
        'source',
    ];

    public function player()
    {
        return $this->belongsTo(Player::class, 'player_id');
    }

    public function backer()
    {
        return $this->belongsTo(Backer::class, 'backer_id');
    }
}
