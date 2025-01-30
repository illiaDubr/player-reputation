<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Backer;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Http\JsonResponse;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => ['required', 'string'], // Ограничиваем возможные роли
        ]);

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->input('password')),
            'role' => $request->role,
        ]);

        // Если роль пользователя - backer, создаём запись в таблице backers
        if ($user->role === 'backer') {
            \Log::info('Creating Backer for user ID: ' . $user->id);
            Backer::create([
                'user_id' => $user->id,
                'email' => $user->email,
                'name' => 'Default Backer Name', // Убедитесь, что значение не null
            ]);
        }

        event(new Registered($user));
        Auth::login($user);

        return response()->json([
            'message' => 'User registered successfully',
            'user_id' => $user->id
        ], 201);
    }
}
