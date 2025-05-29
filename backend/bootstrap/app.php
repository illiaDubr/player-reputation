<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        channels: __DIR__.'/../routes/channels.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Эти middleware применяются к API, "prepend" добавляет их в начало цепочки
        $middleware->api(prepend: [
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        ]);

        // Регистрация alias (псевдонимов) для Route Middleware,
        // чтобы мы могли использовать 'verified' или 'check.role'
        $middleware->alias([
            'verified'    => \App\Http\Middleware\EnsureEmailIsVerified::class,
            // Ваш кастомный посредник, который проверяет роль
            'check.role'  => \App\Http\Middleware\CheckRole::class,
        ]);

        // Если нужно "auth" или ещё что-то — тоже здесь:
        // $middleware->alias(['auth' => \App\Http\Middleware\Authenticate::class]);

        // Можно добавить глобальные middleware, если нужно:
        // $middleware->api(append: [
        //     \App\Http\Middleware\SomethingGlobal::class,
        // ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })
    ->create();
