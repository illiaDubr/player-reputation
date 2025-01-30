<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PersonalAccessTokenController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\JsonProcessingController;
use App\Http\Controllers\PlayerAddController;
use App\Http\Controllers\BackerAddController;

//Route::get('/backers/approved/no', [BackerAddController::class, 'getUnapprovedBackers']);
//
//Route::post('/backerAdd', [\App\Http\Controllers\BackerAddController::class, 'store']);
//
//Route::patch('/backers/{id}/status', [BackerAddController::class, 'updateStatus']);
Route::put('/backers/{id}', [BackerAddController::class, 'update']); // Обновление существующего Backer
Route::patch('/backers/{id}/status', [BackerAddController::class, 'updateStatus']); // Обновление статуса Backer
Route::get('/backers/unapproved', [BackerAddController::class, 'getUnapprovedBackers']); // Получение всех неподтвержденных Backer


Route::post('/playerAdd', [\App\Http\Controllers\PlayerAddController::class, 'store']);


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/process-json', [JsonProcessingController::class, 'processJson']);


Route::controller(\App\Http\Controllers\PlayerController::class)
    ->prefix('search-players')
    ->group(function (){
        Route::post('', [\App\Http\Controllers\PlayerController::class, 'search']);
});

Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware('guest')
    ->name('register');


Route::middleware(['web'])->group(function () {
    Route::post('/login', [AuthenticatedSessionController::class, 'store'])
        ->middleware('api')
        ->name('login');
});

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
    ->middleware('guest')
    ->name('password.email');

Route::post('/reset-password', [NewPasswordController::class, 'store'])
//    ->middleware('guest')
    ->name('password.store');

Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
    ->middleware(['auth', 'signed', 'throttle:6,1'])
    ->name('verification.verify');

Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
    ->middleware(['auth', 'throttle:6,1'])
    ->name('verification.send');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');
