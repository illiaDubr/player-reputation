<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Backer extends Model
{
    use HasFactory;

    protected $primaryKey = 'backer_id';

    protected $fillable = [
        'user_id',
        'old_backer',
        'name',
        'managers',
        'users',
        'readonlys',
        'email',
    ];

    protected $casts = [
        'managers' => 'array',
        'users' => 'array',
        'readonlys' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function reputationRecords()
    {
        return $this->hasMany(ReputationRecord::class, 'backer_id');
    }
}
