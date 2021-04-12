<?php

namespace App\GraphQL\Type;

use Rebing\GraphQL\Support\Type as GraphQLType;
use GraphQL\Type\Definition\Type;
use App\Article_Figure;
use GraphQL;

class ArticleFigureType extends GraphQLType
{
    protected $attributes = [
        'name' => 'ArticleFigureType',
        'description' => 'Cifras de artículos',
        'model' => Article_Figure::class,
    ];

    public function fields()
    {
        return [
            'id' => [
                'type' => Type::int(),
                'description' => 'ID de la cifra',
            ],
            'user' => [
                'type' => GraphQL::type('user'),
                'description' => 'Usuario creador',
            ],
            'last_editor' => [
                'type' => GraphQL::type('user'),
                'description' => 'Último usuario editor',
            ],
            'article' => [
                'type' => GraphQL::type('article'),
                'description' => 'Artículo',
            ],
            'figure' => [
                'type' => Type::string(),
                'description' => 'Cifra de la cifra',
            ],
            'context' => [
                'type' => Type::string(),
                'description' => 'Contexto de la cifra',
            ],
            'icon_uri' => [
                'type' => Type::string(),
                'description' => 'URI del ícono de la cifra',
            ],
            'created_at' => [
                'type' => Type::string(),
                'description' => 'Fecha de creación de la cifra',
            ],
            'updated_at' => [
                'type' => Type::string(),
                'description' => 'Fecha de actualización de la cifra',
            ],
        ];
    }
}