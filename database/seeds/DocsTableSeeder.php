<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DocsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Doc::class, 10)->create();
    }
}
