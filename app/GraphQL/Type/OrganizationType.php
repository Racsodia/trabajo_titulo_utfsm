<?php

namespace App\GraphQL\Type;

use Rebing\GraphQL\Support\Type as GraphQLType;
use GraphQL\Type\Definition\Type;
use App\Organization;
use GraphQL;

class OrganizationType extends GraphQLType
{
    protected $attributes = [
        'name' => 'OrganizationType',
        'description' => 'Organizaciones',
        'model' => Organization::class,
    ];

    public function fields()
    {
        return [
            'id' => [
                'type' => Type::int(),
                'description' => 'ID de la organización',
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
                'description' => 'Nombre de la organización',
            ],
            'description' => [
                'type' => Type::string(),
                'description' => 'Descripción de la organización',
            ],
            'photo_uri' => [
                'type' => Type::string(),
                'description' => 'URI de la foto de la organización',
            ],
            'webpage' => [
                'type' => Type::string(),
                'description' => 'Página web de la organización',
            ],
            'created_at' => [
                'type' => Type::string(),
                'description' => 'Fecha de creación de la organización',
            ],
            'updated_at' => [
                'type' => Type::string(),
                'description' => 'Fecha de actualización de la organización',
            ],
            'users' => [
                'type' => Type::listOf(GraphQL::type('user')),
                'description' => 'Usuarios pertenecientes a la organización',
            ],
            'users_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de usuarios pertenecientes a la organización',
            ],
            'projects' => [
                'type' => Type::listOf(GraphQL::type('project')),
                'description' => 'Proyectos pertenecientes a la organización',
            ],
            'projects_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de proyectos pertenecientes a la organización',
            ],
            'seals' => [
                'type' => Type::listOf(GraphQL::type('seal')),
                'description' => 'Sellos realizados a nombre de la organización',
            ],
            'seals_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de sellos realizados a nombre de la organización',
            ],
            'followers' => [
                'type' => Type::listOf(GraphQL::type('user')),
                'description' => 'Usuarios que siguen a esta organización',
            ],
            'followers_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de usuarios que siguen a esta organización',
            ],
        ];
    }
}