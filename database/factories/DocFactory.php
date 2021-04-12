<?php

use Faker\Generator as Faker;

$factory->define(App\Doc::class, function (Faker $faker) {
    $usr_id = App\User::all()->random()->id;
    return [
        'user_id'   =>  $usr_id,
        'name'      =>  $faker->imageUrl,
        'uri'       =>  $faker->imageUrl
    ];
});
