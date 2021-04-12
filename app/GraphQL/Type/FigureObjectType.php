<?php

namespace App\GraphQL\Type;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Type as GraphQLType;

class FigureObjectType extends GraphQLType
{
    protected $inputObject = true;
    protected $attributes = [
        'name' => 'FigureObjectType',
        'description' => 'Crea una nueva cifra'
    ];

    public function fields()
    {
        return [
            'figure' => [
                'name'  => 'figure',
                'description' => 'Cifra de la cifra',
                'type'  => Type::nonNull(Type::string()),
                'rules' => ['required', 'string', 'max:191'],
            ],
            'context' => [
                'name'  => 'context',
                'description' => 'Contexto de la cifra',
                'type'  => Type::nonNull(Type::string()),
                'rules' => ['required', 'string', 'max:1000'],
            ],
        ];
    }
}