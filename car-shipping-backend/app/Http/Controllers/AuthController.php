<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6'
        ]);


        $user = User::create($data);
        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'access_token' => $token,
            'token_type' => 'Bearer',
            'email' => $user->email,
            'name' => $user->name,
            'id' => $user->id
        ];
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required|string'
        ]);

        if (!auth()->attempt($data)) {
            return response()->json([
                'message' => 'Invalid Credentials'
            ], 401);
        }

        $token = auth()->user()->createToken('auth_token')->plainTextToken;

        return [
            'access_token' => $token,
            'token_type' => 'Bearer',
            'email' => auth()->user()->email,
            'name' => auth()->user()->name,
            'id' => auth()->user()->id
        ];
    }
}
