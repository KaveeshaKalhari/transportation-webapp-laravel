<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\UserController;

// Public Routes
Route::get('/data', [DataController::class, 'index'])->name('data.index');
Route::post('/register', [AuthController::class, 'register'])->name('auth.register')->middleware('throttle:10,1');
Route::post('/login', [AuthController::class, 'login'])->name('auth.login')->middleware('throttle:10,1');

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/protected-data', [DataController::class, 'show'])->name('data.show');
    Route::post('/data', [DataController::class, 'store'])->name('data.store');
    Route::put('/data/{id}', [DataController::class, 'update'])->name('data.update');
    Route::delete('/data/{id}', [DataController::class, 'destroy'])->name('data.destroy');

    Route::get('/user', function (Request $request) {
        return $request->user();
    })->name('auth.user');

    Route::middleware('can:manage-users')->group(function () {
        Route::post('/users', [UserController::class, 'store'])->name('users.store');
        Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');
        Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');
    });
});
