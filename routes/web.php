<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PatternsController;
use App\Http\Controllers\WordListController;
use App\Http\Controllers\FolderController;
use App\Http\Controllers\WordsController;
use Inertia\Inertia;
use Sassnowski\LaravelShareableModel\Shareable\ShareableLink;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::get('shared/word-list/{shareable_link}', [WordListController::class, 'showShared'])->middleware('shared');

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
   
])->group(function () {
    Route::any('/dashboard', [WordListController::class, 'index'])
    ->name('dashboard');
    Route::any('/patterns/show', [PatternsController::class, 'show'])
    ->name('patterns.show');
    Route::post('/word-list/store', [WordListController::class, 'store'])
    ->name('word-list.store');
    Route::post('/word-list/destroy/{wordList}', [WordListController::class, 'destroy'])
    ->name('word-list.destroy');
    Route::post('/word-list/move', [WordListController::class, 'move'])
    ->name('word-list.move');
    Route::post('/word-list/generate', [WordListController::class, 'generateList'])
    ->name('word-list.generate');
    Route::post('/folder/store', [FolderController::class, 'store'])
    ->name('folder.store');
    Route::post('/folder/destroy/{folder}', [FolderController::class, 'destroy'])
    ->name('folder.destroy');
    // Route::get('/word-list/show', [WordListController::class, 'show'])
    // ->name('word-list.show');
    Route::get('refresh/{word}', [WordsController::class, 'refresh'])->name('word.refresh');

});
