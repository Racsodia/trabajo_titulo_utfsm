<?php

namespace App\GraphQL\Type;

use Rebing\GraphQL\Support\Type as GraphQLType;
use GraphQL\Type\Definition\Type;
use App\Like;
use GraphQL;

class LikeType extends GraphQLType
{
    protected $attributes = [
        'name' => 'LikeType',
        'description' => 'Likes',
        'model' => Like::class,
    ];

    public function fields()
    {
        return [
            'id' => [
                'type' => Type::int(),
                'description' => 'ID del like',
            ],
            'user' => [
                'type' => GraphQL::type('user'),
                'description' => 'Usuario creador',
            ],
            'likeable_type' => [
                'type' => Type::string(),
                'description' => 'Tipo del likeable',
            ],
            'likeable_id' => [
                'type' => Type::int(),
                'description' => 'ID del likeable',
            ],
            'created_at' => [
                'type' => Type::string(),
                'description' => 'Fecha de creación del like',
            ],
            'updated_at' => [
                'type' => Type::string(),
                'description' => 'Fecha de actualización del like',
            ],
        ];
    }
}