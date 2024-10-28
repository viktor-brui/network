<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('user', function (Request $request) {
//    return $request->user();
//});

//Route::group(['middleware' => 'auth:api'], function () {
//    Route::get('user', App\Http\Controllers\Api\UsersController::class, 'user');
//});
Route::group(['middleware' => 'auth:api'], function () {
    Route::get('user', [App\Http\Controllers\Api\UsersController::class, 'user']);
    Route::post('changePassword', [\App\Http\Controllers\Api\UsersController::class, 'changePassword']);
    Route::post('changeDetails', [\App\Http\Controllers\Api\UsersController::class, 'changeDetails']);
});
//Route::group(['middleware' => 'auth:api'], function () {
//    Route::get('addMessage', [App\Http\Controllers\ChatController::class, 'addMessage']);
////    Route::post('changePassword', [\App\Http\Controllers\Api\UsersController::class, 'changePassword']);
////    Route::post('changeDetails', [\App\Http\Controllers\Api\UsersController::class, 'changeDetails']);
//});

Route::post('register',[\App\Http\Controllers\Api\AuthController::class, 'register']);
Route::post('login',[\App\Http\Controllers\Api\AuthController::class, 'login']);
Route::post('forgot-password',[\App\Http\Controllers\Api\ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post('reset-password',[\App\Http\Controllers\Api\ResetPasswordController::class, 'reset']);

Route::controller(\App\Http\Controllers\ChatController::class)->group(function () {
    Route::get('chat', 'index');
    Route::get('/messages', 'messages');
//    Route::post('send', 'send');

});
Route::post('send',[\App\Http\Controllers\ChatController::class, 'send']);
