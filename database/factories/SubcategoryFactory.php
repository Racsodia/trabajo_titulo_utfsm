<?php

use Faker\Generator as Faker;

$factory->define(App\Subcategory::class, function (Faker $faker) {
    $usr_id = App\User::all()->random()->id;
    $cat_id = App\Category::all()->random()->id;
    return [
        'user_id'       =>  $usr_id,
        'name'          =>  $faker->word,
        'category_id'   =>  $cat_id
    ];
});
