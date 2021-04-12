<?php

use Faker\Generator as Faker;

$factory->define(App\Challenge::class, function (Faker $faker) {
    $usr_id = App\User::all()->random()->id;
    $org_id = App\Organization::all()->random()->id;
    $chlngbl = 'App\\' . $faker->randomElement(['Article', 'Project']);
    $chlngbl_id = resolve($chlngbl)::all()->random()->id;
    return [
        'user_id'               =>  $usr_id,
        'challengeable_type'    =>  $chlngbl,
        'challengeable_id'      =>  $chlngbl_id,
        'context'               =>  $faker->text(500),
        'challenge'             =>  $faker->text(1000),
        'doc_uri'               =>  $faker->randomElement([null, $faker->imageUrl(640, 480, 'nature')]),
        'organization_id'       =>  $faker->randomElement([null, $org_id]),
        'name'                  =>  $faker->sentence(),
        'target'                =>  $faker->sentence(),
        'evaluation'            =>  $faker->sentence(),
    ];
});
