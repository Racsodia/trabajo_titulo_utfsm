<?php

namespace App\Providers;

use Laravel\Passport\Passport;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Collection;
use Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);

        /**
         * Adds de 'paginate' method to collections
         */
        if (!Collection::hasMacro('paginate')) {
            Collection::macro(
                'paginate',
                function ($perPage = 15, $page = null, $options = []) {
                    $page = $page ?: (\Illuminate\Pagination\Paginator::resolveCurrentPage() ?: 1);
                    return (new \Illuminate\Pagination\LengthAwarePaginator(
                        $this->forPage($page, $perPage),
                        $this->count(),
                        $perPage,
                        $page,
                        $options
                    ))->withPath('');
                }
            );
        }

        /**
         * Adds the 'poly_exists' rule to validator
         */
        Validator::extend('poly_exists', function ($attribute, $value, $parameters, $validator) {
            if (!$objectType = array_get($validator->getData(), $parameters[0], false)) {
                return false;
            }
            return !empty(resolve($objectType)->find($value));
        }, 'El :attribute seleccionado es inválido.');

        /**
         * Adds passport
         */
        Passport::routes();
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
