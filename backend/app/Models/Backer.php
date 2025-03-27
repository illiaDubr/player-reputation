<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Backer extends Model
{
    use HasFactory;

    protected $table = 'backers';
    protected $primaryKey = 'backer_id'; // Указываем кастомный первичный ключ

    protected $fillable = [
        'user_id',
        'old_backer',
        'name',
        'managers',
        'users',
        'readonlys',
        'siteLink',
        'discipline',
        'discordHouse',
        'discordRepresentative',
        'rollbackStart',
        'rollbackEnd',
        'rollbackIncrease',
        'rakeback',
        'numberCoach',
        'numberPlayer',
        'contractStart',
        'contractEnd',
        'approverdAgeStart',
        'approverdAgeEnd',
        'fundDescr',
        'country',
        'approved',
        'email',
        'fund_for_search'
    ];

    protected $casts = [
        'managers' => 'array',
        'users' => 'array',
        'readonlys' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
