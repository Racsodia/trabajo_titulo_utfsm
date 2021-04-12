<?php

use Faker\Generator as Faker;

$factory->define(App\Organization::class, function (Faker $faker) {
    $usr_id = App\User::all()->random()->id;
    return [
        'name'          =>  $faker->company,
        'user_id'       =>  $usr_id,
        'description'   =>  $faker->text(1000),
        'photo_uri'     =>  'http://via.placeholder.com/600x600',
        'webpage'       =>  $faker->url,
        'mission'       =>  $faker->text(100),
        'vision'        =>  $faker->text(100),
    ];
});
