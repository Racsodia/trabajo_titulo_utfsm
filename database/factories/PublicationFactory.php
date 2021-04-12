<?php

use Faker\Generator as Faker;

$factory->define(App\Publication::class, function (Faker $faker) {
    $usr_id = App\User::all()->random()->id;
    $art_id = App\Article::all()->random()->id;
    return [
        'title'         =>  $faker->sentence,
        'content'       =>  $faker->text(5000),
        'user_id'       =>  $usr_id,
        'article_id'    =>  $art_id,
        'doc_uri'       =>  $faker->randomElement([null, $faker->imageUrl(640, 480, 'nature')])
    ];
});
