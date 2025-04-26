<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RouteCounter extends Model
{
    protected $fillable = ['route', 'fund_name', 'count'];
    public $timestamps = false;
}
