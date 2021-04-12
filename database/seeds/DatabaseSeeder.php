<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UsersTableSeeder::class,
            OrganizationsTableSeeder::class,
            CategoriesTableSeeder::class,
            SubcategoriesTableSeeder::class,
            ArticlesTableSeeder::class,
            ArticlesFiguresTableSeeder::class,
            PublicationsTableSeeder::class,
            DocsTableSeeder::class,
            SealsTableSeeder::class,
            ProjectsTableSeeder::class,
            ChallengesTableSeeder::class,
            CommentsTableSeeder::class,
            LikesTableSeeder::class,
        ]);
    }
}
