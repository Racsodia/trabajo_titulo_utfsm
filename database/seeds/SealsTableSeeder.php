<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class SealsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Seal::class, 20)->create();
    }
}
