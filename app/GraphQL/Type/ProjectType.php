<?php

namespace App\GraphQL\Type;

use Rebing\GraphQL\Support\Type as GraphQLType;
use GraphQL\Type\Definition\Type;
use App\Project;
use GraphQL;

class ProjectType extends GraphQLType
{
    protected $attributes = [
        'name' => 'ProjectType',
        'description' => 'Proyectos',
        'model' => Project::class,
    ];

    public function fields()
    {
        return [
            'id' => [
                'type' => Type::int(),
                'description' => 'ID del proyecto',
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
            'article' => [
                'type' => GraphQL::type('article'),
                'description' => 'Artículo',
            ],
            'name' => [
                'type' => Type::string(),
                'description' => 'Nombre del proyecto',
            ],
            'context' => [
                'type' => Type::string(),
                'description' => 'Contexto del proyecto',
            ],
            'status' => [
                'type' => Type::string(),
                'description' => 'Estado del proyecto',
            ],            
            'photo_uri' => [
                'type' => Type::string(),
                'description' => 'URI de la foto del proyecto',
            ],
            'created_at' => [
                'type' => Type::string(),
                'description' => 'Fecha de creación del proyecto',
            ],
            'updated_at' => [
                'type' => Type::string(),
                'description' => 'Fecha de actualización del proyecto',
            ],
            'docs' => [
                'type' => Type::listOf(GraphQL::type('doc')),
                'description' => 'Documentos del proyecto',
            ],
            'docs_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de documentos del proyecto',
            ],
            'challenges' => [
                'type' => Type::listOf(GraphQL::type('challenge')),
                'description' => 'Comentarios del proyecto',
            ],
            'challenges_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de desafíos del proyecto',
            ],
            'likes' => [
                'type' => Type::listOf(GraphQL::type('like')),
                'description' => 'Likes del proyecto',
            ],
            'likes_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de likes del proyecto',
            ],
        ];
    }
}