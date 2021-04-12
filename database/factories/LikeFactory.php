<?php

use Faker\Generator as Faker;

$factory->define(App\Like::class, function (Faker $faker) {
    $usr_id = App\User::all()->random()->id;
    $lkbl = 'App\\' . $faker->randomElement(['Challenge', 'Comment', 'Doc', 'Project', 'Publication']);
    $lkbl_id = resolve($lkbl)::all()->random()->id;
    return [
        'user_id'        =>  $usr_id,
        'likeable_type'  =>  $lkbl,
        'likeable_id'    =>  $lkbl_id,
    ];
});
