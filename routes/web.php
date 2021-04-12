<?php

use Illuminate\Support\Facades\Route;

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

Auth::routes();

Route::get('/', function () {
    return view('welcome');
})->name('inicio');

Route::get('/home', function () {
    return view('welcome');
})->name('home');

Route::get('/explorar/{id}', function () {
    return view('welcome');
});

Route::get('/desafios', function () {
    return view('/challenges');
});

Route::get('/desafios-tematica/{id}', function () {
    return view('challenges');
});

Route::get('/conocimientos-tematica/{id}', function () {
    return view('publications');
});

Route::get('/proyectos', function () {
    return view('/projects');
});

Route::get('/desafios-proyecto/{id}', function () {
    return view('challenges');
});

Route::get('/conocimientos', function () {
    return view('publications');
});

Route::get('/proyectos/{id}', function () {
    return view('/projects');
});

Route::get('/organizaciones/{id}', function () {
    return view('welcome');
});

Route::get('/privacidad', function () {
    return view('privacy');
});

Route::get('/terminos-de-servicio', function () {
    return view('tos');
});

Route::group(['middleware' => 'auth'], function () {

    Route::get('/perfil', function () {
        return view('welcome');
    });

    Route::get('/muro', function () {
        return view('welcome');
    });

    Route::get('/gestionar-tematicas', function () {
        return view('welcome');
    });

    Route::get('/gestionar-proyectos', function () {
        return view('welcome');
    });

    Route::get('/gestionar-usuarios', function () {
        return view('welcome');
    });

    Route::get('/lista-organizaciones', function () {
        return view('welcome');
    });
});

Route::group(['prefix' => 'auth'], function () {
    Route::get('/{provider}', 'Auth\LoginController@redirectToProvider');
    Route::get('/{provider}/callback', 'Auth\LoginController@handleProviderCallback');
});
