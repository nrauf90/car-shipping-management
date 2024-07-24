<?php

use App\Http\Controllers\Api\V1\CarController;
use App\Http\Controllers\Api\V1\ChangeShippingStatus;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::prefix('v1')->group(function () {
    Route::apiResource('/cars', CarController::class)->middleware('auth:sanctum');
    Route::patch('/cars/{car}/change-shipping-status', ChangeShippingStatus::class)->middleware('auth:sanctum');
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
