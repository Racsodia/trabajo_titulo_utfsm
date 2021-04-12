<?php

use Faker\Generator as Faker;

$factory->define(App\Comment::class, function (Faker $faker) {
    $usr_id = App\User::all()->random()->id;
    $cmmtbl = 'App\\' . $faker->randomElement(['Challenge', 'Doc', 'Publication']);
    $cmmtbl_id = resolve($cmmtbl)::all()->random()->id;
    return [
        'user_id'           =>  $usr_id,
        'commentable_type'  =>  $cmmtbl,
        'commentable_id'    =>  $cmmtbl_id,
        'content'           =>  $faker->text(100),
        'doc_uri'           =>  $faker->randomElement([null, $faker->imageUrl(640, 480, 'nature')])
    ];
});
