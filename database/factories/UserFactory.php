<?php

use Faker\Generator as Faker;

$factory->define(App\User::class, function (Faker $faker) {
    return [
        'email'             => $faker->unique()->safeEmail,
        'provider'          => $faker->randomElement(['facebook', 'google']),
        'provider_id'       => $faker->randomNumber(9),
        'name'              => $faker->name,
        'position'          => $faker->jobTitle,
        'photo_uri'         => 'http://via.placeholder.com/80x80'
    ];
});
