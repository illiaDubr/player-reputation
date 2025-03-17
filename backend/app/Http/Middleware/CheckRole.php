<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  mixed  ...$roles  // здесь можно передавать одно или несколько значений роли
     * @return mixed
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = $request->user(); // или auth()->user()

        // Если пользователь не авторизован или его роль не входит в список, отдаём 403
        if (!$user || !in_array($user->role, $roles)) {
            abort(403, 'Access denied');
        }

        return $next($request);
    }
}
