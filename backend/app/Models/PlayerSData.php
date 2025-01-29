<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Enums\backerTag;

class PlayerSData extends Model
{
    /** @use HasFactory<\Database\Factories\PlayerSDataFactory> */
    use HasFactory;
    protected $table = 'player_s_data';

    protected $fillable = [
        'name',
    'surname',
    'middle_name',
    'discord',
    'nickPS',
    'nickGG',
    'nickRedStar',
    'nickTigerGaming',
    'nickPartyPoker',
    'nickPokerstars',
    'nick888poker',
    'nickWPNpoker',
    'nickStretchpoker',
    'nickCoinpoker',
    'nickchikoPoker',
    'nickiPoker',
    'mailSkrill',
    'mailNeteller',
    'mailGipsyTeam',
    'mailLuxon',
    'Email',
    'telegram',
    'phonenumber',
    'AmountOfDamage',
    'MakeupAmount',
    'fundComment',
    'playerComment',
    'backerTag',
    ];


    protected $casts = [
        'backerTag' => backerTag::class,
    ];

public function user(): BelongsTo
{
    return $this->belongsTo(related: User::class);
}

}

