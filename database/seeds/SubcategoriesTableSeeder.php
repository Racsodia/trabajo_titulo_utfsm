<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class SubcategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Subcategory::class, 10)->create();
    }
}
