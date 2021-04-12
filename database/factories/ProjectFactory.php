<?php

use Faker\Generator as Faker;

$factory->define(App\Project::class, function (Faker $faker) {
    $usr_id = App\User::all()->random()->id;
    $org_id = App\Organization::all()->random()->id;
    $art_id = App\Article::all()->random()->id;
    return [
        'user_id'           =>  $usr_id,
        'organization_id'   =>  $org_id,
        'article_id'        =>  $art_id,
        'name'              =>  $faker->sentence(2),
        'context'           =>  $faker->text(500),
        'status'            =>  $faker->randomElement(['construction', 'development', 'completed']),
        'photo_uri'         =>  'http://via.placeholder.com/800x600',
    ];
});
