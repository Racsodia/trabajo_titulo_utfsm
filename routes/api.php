<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'docs', 'middleware' => 'auth:api'], function(){
    Route::post('create', 'DocsController@create');
    Route::group(['prefix' => '{doc}'], function(){
        Route::delete('', 'DocsController@destroy');
        Route::group(['prefix' => 'link'], function () {
            Route::post('challenge/{challenge}', 'DocsController@link_challenge');
            Route::delete('challenge/{challenge}', 'DocsController@remove_link_challenge');
            Route::post('project/{project}', 'DocsController@link_project');
            Route::delete('project/{project}', 'DocsController@remove_link_project');
            Route::post('publication/{publication}', 'DocsController@link_publication');
            Route::delete('publication/{publication}', 'DocsController@remove_link_publication');
            Route::post('figure/{figure}', 'DocsController@link_figure');
            Route::delete('figure/{figure}', 'DocsController@remove_link_figure');
        });
    });
});
