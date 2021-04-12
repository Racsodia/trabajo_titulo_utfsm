<?php

use Faker\Generator as Faker;
use Illuminate\Support\Facades\DB;

$factory->define(App\Seal::class, function (Faker $faker) {
    $usr_id = App\User::all()->random()->id;
    $doc_id = App\Doc::all()->random()->id;
    $org_id = App\Organization::all()->random()->id;
    return [
        'user_id'           =>  $usr_id,
        'organization_id'   =>  $org_id,
        'doc_id'            =>  $doc_id
    ];
});
