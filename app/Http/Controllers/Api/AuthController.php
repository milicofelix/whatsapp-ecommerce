<?php

namespace App\Http\Controllers\Api;

use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    use AuthenticatesUsers;

    public function login(Request $request) {

        $this->validateLogin($request);
        $credentials = $this->credentials($request);
        //dd($credentials);

        $token = \JWTAuth::attempt($credentials);

        return $token ? ['token' => $token] : response()->json(['error' => \Lang::get('auth.failed')],400);
    }

    public function logout() {

        \Auth::guard('api')->logout();
        return response()->json([],204);
    }

    public function me() {

        return \Auth::guard('api')->user();
    }

    public function refresh() {

        $refresh = \Auth::guard('api')->refresh();
        return ['token' => $refresh];
    }
}
