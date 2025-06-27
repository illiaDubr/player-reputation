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
use App\Http\Controllers\BackerController;
use App\Http\Controllers\DiscordImportController;
use App\Http\Controllers\ApiController;
//Роуты для игроков

Route::post('/messages', [DiscordImportController::class, 'import']);
// Счётчик запросов
Route::get('/stats/search-players', [StatsController::class, 'searchPlayersCount']);

Route::prefix('search-player')->group(function () {
    Route::post('/', [ApiController::class, 'search']);
});
Route::prefix('search-players')->group(function () {
    Route::post('/', [PlayerController::class, 'search']);
});

Route::prefix('players')->group(function () {
    Route::put('/{playerId}', [PlayerController::class, 'update']);
    Route::patch('/{playerId}/reputation/{recordId}', [PlayerController::class, 'updateReputation']);

});
Route::post('/playerAdd', [PlayerAddController::class, 'store']);

//Роуты для бекеров

Route::middleware(['auth', 'check.role:backer,admin,superadmin'])->group(function () {
    Route::post('/reports', [ReportController::class, 'store']);
});

Route::get('/backers/unapproved', [BackerAddController::class, 'getUnapprovedBackers']);
Route::get('/backers/approved', [BackerAddController::class, 'getApprovedBackers']);
Route::patch('/backers/{id}/status', [BackerAddController::class, 'updateStatus']);
Route::put('/backers/{id}', [BackerAddController::class, 'update']);


//роуты для админов и суперадминов
Route::middleware(['auth','check.role:backer,admin,superadmin'])
    ->patch('/backers/{id}/fund-info', [BackerController::class, 'updateFundInfo']);
Route::middleware(['auth','check.role:backer,admin,superadmin'])
    ->patch('/backers/{id}/fund-for-search', [BackerController::class, 'updateFundForSearch']);
Route::middleware(['auth', 'check.role:backer,admin,superadmin'])->group(function () {
    // Удаление проверенного репорта
    Route::patch('/players/{playerId}/backer-tag', [PlayerController::class, 'updateBackerTag']);
    Route::delete('/reports/{id}', [ReportController::class, 'deleteVerifiedReport']);
});
Route::middleware(['auth', 'check.role:admin,superadmin'])->group(function () {

    // Управление изменениями (Changes)
    Route::get('/changes', [ChangeController::class, 'index']);
    Route::post('/changes/{id}/rollback', [ChangeController::class, 'rollback']);
    Route::patch('/changes/{id}', [ChangeController::class, 'updateStatus']);

    // Управление уведомлениями (Notifications)
    Route::get('/admin/notifications', [AdminController::class, 'notifications']);
    Route::get('/admin/notifications/{id}', [AdminController::class, 'showNotification']);
    Route::patch('/admin/notifications/markAllAsRead', [AdminController::class, 'markAllAsRead']);

    // Просмотр и редактирование репортов
    Route::get('/reports', [ReportController::class, 'listReports']);
    Route::patch('/reports/{report}', [ReportController::class, 'update']);
//    Route::get('/reports/{report}', [ReportController::class, 'listReports']);
    Route::patch('/reports/{id}/status', [ReportController::class, 'updateStatus']);

    // Управление репутацией игроков
    Route::get('/players/{playerId}/reputation/{recordId}', [PlayerController::class, 'showReputationRecord']);


    // Резервное копирование и восстановление
    Route::get('/backup/download', [BackupController::class, 'downloadBackup']);
    Route::post('/backup/upload', [BackupController::class, 'uploadBackup']);
});

//роуты для суперадминов
Route::middleware(['auth', 'check.role:admin,superadmin'])->group(function () {
    // Скачать бекап
    Route::get('/backup/download', [BackupController::class, 'downloadBackup']);

    // Загрузить бекап для восстановления
    Route::post('/backup/upload', [BackupController::class, 'uploadBackup']);
});

//произвольные роуты
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user()->load('backer');
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


Route::post('/process-json', [JsonProcessingController::class, 'processJson']);