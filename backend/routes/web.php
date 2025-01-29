<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterUserController;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::post('/register', [RegisterUserController::class, 'register']);

require __DIR__.'/auth.php';
