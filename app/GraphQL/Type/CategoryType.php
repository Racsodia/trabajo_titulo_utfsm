<?php

namespace App\GraphQL\Type;

use Rebing\GraphQL\Support\Type as GraphQLType;
use GraphQL\Type\Definition\Type;
use App\Category;
use GraphQL;

class CategoryType extends GraphQLType
{
    protected $attributes = [
        'name' => 'CategoryType',
        'description' => 'Categorías',
        'model' => Category::class,
    ];

    public function fields()
    {
        return [
            'id' => [
                'type' => Type::int(),
                'description' => 'ID de la categoría',
            ],
            'user' => [
                'type' => GraphQL::type('user'),
                'description' => 'Usuario creador',
            ],
            'last_editor' => [
                'type' => GraphQL::type('user'),
                'description' => 'Último usuario editor',
            ],
            'name' => [
                'type' => Type::string(),
                'description' => 'Nombre de la categoría',
            ],
            'created_at' => [
                'type' => Type::string(),
                'description' => 'Fecha de creación de la categoría',
            ],
            'updated_at' => [
                'type' => Type::string(),
                'description' => 'Fecha de actualización de la categoría',
            ],
            'subcategories' => [
                'type' => Type::listOf(GraphQL::type('subcategory')),
                'description' => 'Subcategorías pertenecientes a la categoría',
            ],
            'subcategories_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de subcategorías pertenecientes a la categoría',
            ],
            'articles' => [
                'type' => Type::listOf(GraphQL::type('article')),
                'description' => 'Artículos pertenecientes a la categoría',
            ],
            'articles_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de artículos pertenecientes a la categoría',
            ],
        ];
    }
}