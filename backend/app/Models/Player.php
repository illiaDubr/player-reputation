<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    use HasFactory;

    protected $table = 'players';

    protected $primaryKey = 'player_id';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'player_id',
        'user_id',
        'old_id',
        'first_name',
        'last_name',
        'middle_name',
        'email',
        'phonenumber',
        'Ggpokerok',
        'Ggnetwork',
        'Pokerstars_com',
        'Pokerstars_es',
        'Winamax_fr',
        'Winamax_es',
        'PS',
        'GG',
        'RedStar',
        'TigerGaming',
        'PartyPoker',
        'Pokerstars',
        '888poker',
        'WPNpoker',
        'Stretchpoker',
        'Coinpoker',
        'chikoPoker',
        'nickiPoker',
        'Skrill',
        'Neteller',
        'GipsyTeam',
        'Luxon',
        'telegram',
        'discord',
        'skype',
        'kyc_status',
        'kyc_verified_at',
        'backer_tag',
        'created_by',
    ];

    protected $casts = [
        'kyc_status' => 'boolean',
        'kyc_verified_at' => 'datetime',
    ];

    public function reputationRecords()
    {
        return $this->hasMany(ReputationRecord::class, 'player_id', 'player_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
    public function reporter()
    {
        return $this->belongsTo(User::class, 'reporter_id');
    }

}
