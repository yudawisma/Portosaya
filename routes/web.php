<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/', function () {
    return view('home');
});




Route::get('/init-log', function () {
    $logPath = storage_path('logs/laravel.log');
    try {
        if (!file_exists(dirname($logPath))) {
            mkdir(dirname($logPath), 0775, true);
        }
        if (!file_exists($logPath)) {
            file_put_contents($logPath, '');
        }
        chmod($logPath, 0775);
        return '✅ Log file initialized.';
    } catch (\Exception $e) {
        return '❌ Error: ' . $e->getMessage();
    }
});



Route::post('/contact/send', [ContactController::class, 'send'])->name('contact.send');

