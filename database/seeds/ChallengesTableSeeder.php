<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class ChallengesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Challenge::class, 20)->create();        
    }
}
