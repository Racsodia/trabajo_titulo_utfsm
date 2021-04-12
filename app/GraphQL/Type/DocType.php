<?php

namespace App\GraphQL\Type;

use Rebing\GraphQL\Support\Type as GraphQLType;
use GraphQL\Type\Definition\Type;
use App\Doc;
use GraphQL;

class DocType extends GraphQLType
{
    protected $attributes = [
        'name' => 'DocType',
        'description' => 'Documentos',
        'model' => Doc::class,
    ];

    public function fields()
    {
        return [
            'id' => [
                'type' => Type::int(),
                'description' => 'ID del documento',
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
                'description' => 'Nombre del documento',
            ],
            'uri' => [
                'type' => Type::string(),
                'description' => 'URI del documento',
            ],
            'created_at' => [
                'type' => Type::string(),
                'description' => 'Fecha de creación del documento',
            ],
            'updated_at' => [
                'type' => Type::string(),
                'description' => 'Fecha de actualización del documento',
            ],
            'publications' => [
                'type' => Type::listOf(GraphQL::type('publication')),
                'description' => 'Publicaciones del documento',
            ],
            'publications_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de publicaciones del documento',
            ],
            'projects' => [
                'type' => Type::listOf(GraphQL::type('project')),
                'description' => 'Proyectos del documento',
            ],
            'projects_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de proyectos del documento',
            ],
            'challenges' => [
                'type' => Type::listOf(GraphQL::type('challenge')),
                'description' => 'Desafíos del documento',
            ],
            'challenges_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de desafíos del documento',
            ],
            'comments' => [
                'type' => Type::listOf(GraphQL::type('comment')),
                'description' => 'Comentarios del documento',
            ],
            'comments_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de comentarios del documento',
            ],
            'likes' => [
                'type' => Type::listOf(GraphQL::type('like')),
                'description' => 'Likes del documento',
            ],
            'likes_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de likes del documento',
            ],
            'seals' => [
                'type' => Type::listOf(GraphQL::type('seal')),
                'description' => 'Sellos del documento',
            ],
            'seals_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de sellos del documento',
            ],
        ];
    }
}