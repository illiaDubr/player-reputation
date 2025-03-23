<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    // Явное указание таблицы (необязательно, если следуем конвенции "reports")
    protected $table = 'reports';

    // Если нужно, укажите, какие поля массово заполняются:
    protected $fillable = [
        'player_id',
        'reporter_id',
        'tag',
        'comment',
        'status',
    ];

    // Если первичный ключ (id) идёт по конвенции - ничего не указываем.
    // Если бы таблица не имела auto increment, можно было бы указать:
    // protected $primaryKey = '...';

    // Связь с моделью Player (если у вас есть соответствующая модель Player)
public function player()
{
    return $this->belongsTo(Player::class, 'player_id', 'player_id');
}

    public function reputationRecord()
    {
        return $this->hasOne(ReputationRecord::class, 'player_id', 'player_id');
    }

    public function reporter()
    {
        return $this->belongsTo(User::class, 'reporter_id');
    }

    public function show(Report $report)
    {
        // Подгрузить игрока, репортера
        $report->load(['player', 'reporter']);

        return response()->json($report);
    }
}
