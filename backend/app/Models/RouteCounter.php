<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RouteCounter extends Model
{
    protected $table = 'route_counters';
    protected $fillable = ['route', 'count'];
}
