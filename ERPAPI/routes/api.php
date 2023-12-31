<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ClientsController;
use App\Http\Controllers\PaymentsController;
use App\Http\Controllers\PackagesController;
use App\Http\Controllers\WorkersController;
use App\Http\Controllers\WorkerPayoutsController;
use App\Http\Controllers\InsightsController;
use App\Http\Controllers\ApiPassportAuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('register', [ApiPassportAuthController::class, 'register']);
Route::post('login', [ApiPassportAuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {

    // Routes for Clients 
    Route::get('/clients', [ClientsController::class, 'index']);
    Route::get('/clients/search', [ClientsController::class, 'search']);
    Route::get('/clients/{id}', [ClientsController::class, 'show']);
    Route::post('/clients', [ClientsController::class, 'store']);
    Route::put('/clients/{id}', [ClientsController::class, 'update']);
    Route::delete('/clients/{id}', [ClientsController::class, 'destroy']);

    // Routes for Payments 
    Route::get('/payments', [PaymentsController::class, 'index']);
    Route::get('/payments/search', [PaymentsController::class, 'search']);
    Route::get('/payments/{id}', [PaymentsController::class, 'show']);
    Route::post('/payments', [PaymentsController::class, 'store']);
    Route::put('/payments/{id}', [PaymentsController::class, 'update']);
    Route::delete('/payments/{id}', [PaymentsController::class, 'destroy']);

    // Routes for Packages
    Route::get('/packages', [PackagesController::class, 'index']);
    Route::get('/packages/{id}', [PackagesController::class, 'show']);
    Route::post('/packages', [PackagesController::class, 'store']);
    Route::put('/packages/{id}', [PackagesController::class, 'update']);
    Route::delete('/packages/{id}', [PackagesController::class, 'destroy']);

    // Routes for Workers
    Route::get('/workers', [WorkersController::class, 'index']);
    Route::get('/workers/{id}', [WorkersController::class, 'show']);
    Route::post('/workers', [WorkersController::class, 'store']);
    Route::put('/workers/{id}', [WorkersController::class, 'update']);
    Route::delete('/workers/{id}', [WorkersController::class, 'destroy']);

    // Routes for Workers
    Route::get('/worker-payouts', [WorkerPayoutsController::class, 'index']);
    Route::get('/worker-payouts/{id}', [WorkerPayoutsController::class, 'show']);
    Route::post('/worker-payouts', [WorkerPayoutsController::class, 'store']);
    Route::put('/worker-payouts/{id}', [WorkerPayoutsController::class, 'update']);
    Route::delete('/worker-payouts/{id}', [WorkerPayoutsController::class, 'destroy']);

    // Routes for Insights
    //Route::get('/insights', [PackagesController::class, 'index']);
    Route::get('/insights/totalNumberOfUsers', [InsightsController::class, 'totalNumberOfUsers']);
    Route::get('/insights/totalPayments', [InsightsController::class, 'totalPayments']);
    Route::get('/insights/paymentsByWeek', [InsightsController::class, 'paymentsByWeek']);
    Route::get('/insights/paymentsByMonth', [InsightsController::class, 'paymentsByMonth']);

});