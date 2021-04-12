<?php

use Faker\Generator as Faker;

$factory->define(App\Article_Figure::class, function (Faker $faker) {
    $art_id = App\Article::all()->random()->id;
    $usr_id = App\User::all()->random()->id;
    $units = ['gigawatt', 'megavolt', 'millones de dolares', 'millones de personas'];
    return [
        'article_id'    =>  $art_id,
        'user_id'       =>  $usr_id,
        'figure'        =>  $faker->randomFloat(2, 0, 10) . " " . $faker->randomElement($units),
        'context'       =>  $faker->text(200),
        'icon_uri'      =>  'http://via.placeholder.com/80x80',
    ];
});
