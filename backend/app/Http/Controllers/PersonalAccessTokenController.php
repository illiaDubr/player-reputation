<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\PersonalAccessToken;

class PersonalAccessTokenController extends Controller
{
    public function token(Request $request)
    {
        // Валидация входящих данных
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'device_name' => 'nullable'
        ]);

        // Поиск пользователя по email
        $user = User::where('email', $request->email)->first();

        // Проверка пароля
        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'The provided credentials are incorrect.'
            ], 401);
        }

        $token = $user->createToken($request->device_name)->plainTextToken;

        return response()->json([
            'token' => $token,
            'message' => 'Token generated successfully'
        ]);
    }
    public function destroy(Request $request)
    {

        $request->user()->currentAccessToken()->delete();


    }

}
