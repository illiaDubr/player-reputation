<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use app\Http\Requests\Auth\LoginRequest;


class UserController extends Controller
{
    public function login(LoginRequest $request ){
    $email = $request->input('email');
    $password = $request->input('password');

    dd(Auth::attempt([
        'email'=>$email,
        'password'=> $password
    ]));


    }
}
