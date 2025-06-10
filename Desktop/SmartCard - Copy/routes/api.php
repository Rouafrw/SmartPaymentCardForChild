<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ParentsController;
use App\Http\Controllers\ChildController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PurchasingTransactionController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\BookBorrowController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('login', [AuthController::class, 'login']);

Route::post('parsons', [PersonController::class,'store']);
Route::put('parsonsupdate/{National_number}', [PersonController::class,'update']);
Route::get('/people/by_type', [PersonController::class, 'indexByType']);


// Route::get('/children/{id}/card', [PersonController::class, 'showWithCard']);
Route::get('/children/{id}/card', [ChildController::class, 'showWithCard']);
Route::get('/employees/{id}', [EmployeeController::class, 'showEmployee']);
Route::get('/parents/{id}', [ParentsController::class, 'showParent']);


Route::post('Cards', [CardController::class,'store']); //error
Route::get('Cards', [CardController::class,'index']);
Route::put('cards/deactivate/{serial_number}', [CardController::class, 'deactivateCardBySerial']);
Route::put('cards/activate/{serial_number}', [CardController::class, 'activateCardBySerial']);
Route::get('cards/child-info/{serial_number}', [CardController::class, 'getChildInfoBySerial']);


Route::post('Product', [ProductController::class,'store']);
Route::get('products/foods', [ProductController::class,'indexFoods']);
Route::get('products/Stationery', [ProductController::class,'indexStationery']);
Route::put('/Product/{name}', [ProductController::class, 'update']);
Route::delete('Productdelete/{name}', [ProductController::class,'destroy']);


Route::post('/transactions', [PurchasingTransactionController::class, 'store']);
Route::get('/transactions/card/{serial}', [PurchasingTransactionController::class, 'getTransactionsByCardSerial']);


Route::post('Orders', [OrderController::class,'store']); //error
Route::patch('orders/activate/{id}', [OrderController::class, 'activate']);
Route::get('orders/pending', [OrderController::class, 'showPending']);


Route::post('/books', [BookController::class, 'store']);
Route::get('/books', [BookController::class, 'index']);
Route::put('/books', [BookController::class, 'updateByTitle']);
Route::delete('/books', [BookController::class, 'destroy']);


Route::post('/borrows', [BookBorrowController::class, 'store']);
Route::get('/borrows/child/{child_id}', [BookBorrowController::class, 'getBorrowsByChild']);
Route::get('/borrows/book/{book_id}', [BookBorrowController::class, 'getBorrowsByBook']);
Route::get('/borrows', [BookBorrowController::class, 'index']);
Route::put('/borrows/{id}/return', [BookBorrowController::class, 'returnBook']);



