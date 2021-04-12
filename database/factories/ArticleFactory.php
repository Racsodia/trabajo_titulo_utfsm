<?php

use Faker\Generator as Faker;

$factory->define(App\Article::class, function (Faker $faker) {
    $usr_id = App\User::all()->random()->id;
    $cat_id = App\Category::all()->random()->id;
    $subcat_id = App\Subcategory::all()->random()->id;
    $colors = ['bg00', 'bg01', 'bg02', 'bg03', 'bg04', 'bg05', 'bg06', 'bg07', 'bg08', 'bg09'];
    return [
        'title'             =>  $faker->sentence(1),
        'content'           =>  $faker->text(5000),
        'user_id'           =>  $usr_id,
        'category_id'       =>  $cat_id,
        'subcategory_id'    =>  $subcat_id,
        'color'             =>  $faker->randomElement($colors),
        'photo_uri'         =>  'http://via.placeholder.com/1920x600',
        'icon_uri'          =>  'http://via.placeholder.com/80x80',
    ];
});
