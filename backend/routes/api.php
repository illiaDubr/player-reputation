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
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\BackerAddController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\ChangeController;
use App\Http\Controllers\BackupController;
//Роуты для игроков

Route::get('/stats/search-players', [StatsController::class, 'searchPlayersCount']);




//Роуты для бекеров

Route::middleware(['auth', 'check.role:backer'])
    ->group(function () {
        Route::post('/reports', [ReportController::class, 'store']);
    });
Route::prefix('search-players')->group(function () {
    Route::post('/', [PlayerController::class, 'search']);
});


Route::prefix('players')->group(function () {
    Route::put('/{playerId}', [PlayerController::class, 'update']);
    Route::patch('/{playerId}/reputation/{recordId}', [PlayerController::class, 'updateReputation']);
    Route::post('/add', [PlayerAddController::class, 'store']);
});


//роуты для админов и суперадминов

Route::middleware(['auth', 'check.role:admin,superadmin'])->group(function () {

    // Откат изменений
    Route::post('/changes/{id}/rollback', [ChangeController::class, 'rollback']);

});


Route::middleware(['auth', 'check.role:admin,superadmin'])->group(function () {

    // Список изменений с фильтрацией по статусу
    Route::get('/changes', [ChangeController::class, 'index']);

    // Обновить статус изменения
    Route::patch('/changes/{id}', [ChangeController::class, 'updateStatus']);

});
Route::middleware(['auth', 'check.role:admin,superadmin'])
    ->get('/players/{playerId}/reputation/{recordId}', [PlayerController::class, 'showReputationRecord']);
Route::middleware(['auth', 'check.role:admin,superadmin'])->group(function () {

    Route::patch('/players/{playerId}/backer-tag', [PlayerController::class, 'updateBackerTag']);

        // Просмотреть список уведомлений
    Route::get('/admin/notifications', [AdminController::class, 'notifications']);

    // Посмотреть конкретное уведомление и информацию о репорте
    Route::get('/admin/notifications/{id}', [AdminController::class, 'showNotification']);

    // Пометить все как прочитанные
    Route::patch('/admin/notifications/markAllAsRead', [AdminController::class, 'markAllAsRead']);

    Route::get('/reports/{report}', [ReportController::class, 'show']);
});
Route::get('/backers/unapproved', [BackerAddController::class, 'getUnapprovedBackers']); // Получение всех неподтвержденных Backer
Route::patch('/backers/{id}/status', [BackerAddController::class, 'updateStatus']); // Обновление статуса Backer
Route::put('/backers/{id}', [BackerAddController::class, 'update']); // Обновление существующего Backer
Route::middleware(['auth', 'check.role:admin,superadmin'])
    ->group(function () {
        Route::get('/reports', [ReportController::class, 'index']);
        Route::patch('/reports/{report}', [ReportController::class, 'update']);
        // Можно добавить delete, show и т. д. при необходимости.
    });

//роуты для суперадминов
Route::middleware(['auth', 'check.role:admin,superadmin'])->group(function () {
    // Скачать бекап
    Route::get('/backup/download', [BackupController::class, 'downloadBackup']);

    // Загрузить бекап для восстановления
    Route::post('/backup/upload', [BackupController::class, 'uploadBackup']);
});

//произвольные роуты
Route::post('/process-json', [JsonProcessingController::class, 'processJson']);

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware('api')
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
