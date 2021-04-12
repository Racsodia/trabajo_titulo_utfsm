<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class LikesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Like::class, 100)->create();
    }
}
