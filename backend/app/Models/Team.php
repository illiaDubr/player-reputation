<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'email',
        'skype',
        'site',
        'discord',
        'owner',
    ];

    public function managers()
    {
        return $this->hasMany(TeamManager::class, 'team_id');
    }

    public function users()
    {
        return $this->hasMany(TeamUser::class, 'team_id');
    }

    public function readonlys()
    {
        return $this->hasMany(TeamReadonly::class, 'team_id');
    }
}
