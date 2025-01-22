<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    use HasFactory;

    /**
     * Таблица, связанная с моделью.
     *
     * @var string
     */
    protected $table = 'players';

    /**
     * Первичный ключ таблицы.
     *
     * @var string
     */
    protected $primaryKey = 'player_id';

    /**
     * Тип данных первичного ключа.
     *
     * @var string
     */
    protected $keyType = 'string';

    /**
     * Автоинкремент первичного ключа.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * Атрибуты, которые можно массово заполнять.
     *
     * @var array
     */
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
        'Pokersters_es',
        'Winamax_fr',
        'Winamax_es',
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
        'created_at',
        'updated_at'
    ];

    /**
     * Атрибуты, которые должны быть приведены к нативным типам.
     *
     * @var array
     */
    protected $casts = [
        'kyc_status' => 'boolean',
        'kyc_verified_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    /**
     * Связь с таблицей reputation_records (один ко многим).
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function reputationRecords()
    {
        return $this->hasMany(ReputationRecord::class, 'player_id', 'player_id');
    }

    /**
     * Связь с таблицей users (создатель игрока).
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
}
