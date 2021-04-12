<?php

namespace App\GraphQL\Type;

use Rebing\GraphQL\Support\Type as GraphQLType;
use GraphQL\Type\Definition\Type;
use App\Seal;
use GraphQL;

class SealType extends GraphQLType
{
    protected $attributes = [
        'name' => 'SealType',
        'description' => 'Sellos',
        'model' => Seal::class,
    ];

    public function fields()
    {
        return [
            'id' => [
                'type' => Type::int(),
                'description' => 'ID del sello',
            ],
            'user' => [
                'type' => GraphQL::type('user'),
                'description' => 'Usuario creador',
            ],
            'last_editor' => [
                'type' => GraphQL::type('user'),
                'description' => 'Último usuario editor',
            ],
            'organization' => [
                'type' => GraphQL::type('organization'),
                'description' => 'Organización',
            ],
            'doc' => [
                'type' => GraphQL::type('doc'),
                'description' => 'Documento',
            ],
            'created_at' => [
                'type' => Type::string(),
                'description' => 'Fecha de creación del sello',
            ],
            'updated_at' => [
                'type' => Type::string(),
                'description' => 'Fecha de actualización del sello',
            ],
        ];
    }
}