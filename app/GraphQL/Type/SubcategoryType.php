<?php

namespace App\GraphQL\Type;

use Rebing\GraphQL\Support\Type as GraphQLType;
use GraphQL\Type\Definition\Type;
use App\Subcategory;
use GraphQL;

class SubcategoryType extends GraphQLType
{
    protected $attributes = [
        'name' => 'SubcategoryType',
        'description' => 'Subcategorías',
        'model' => Subcategory::class,
    ];

    public function fields()
    {
        return [
            'id' => [
                'type' => Type::int(),
                'description' => 'ID de la subcategoría',
            ],
            'user' => [
                'type' => GraphQL::type('user'),
                'description' => 'Usuario creador',
            ],
            'last_editor' => [
                'type' => GraphQL::type('user'),
                'description' => 'Último usuario editor',
            ],
            'category' => [
                'type' => GraphQL::type('category'),
                'description' => 'Categoría',
            ],
            'name' => [
                'type' => Type::string(),
                'description' => 'Nombre de la subcategoría',
            ],
            'created_at' => [
                'type' => Type::string(),
                'description' => 'Fecha de creación de la subcategoría',
            ],
            'updated_at' => [
                'type' => Type::string(),
                'description' => 'Fecha de actualización de la subcategoría',
            ],
            'articles' => [
                'type' => Type::listOf(GraphQL::type('article')),
                'description' => 'Artículos pertenecientes a la subcategoría',
            ],
            'articles_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de artículos pertenecientes a la subcategoría',
            ],
        ];
    }
}