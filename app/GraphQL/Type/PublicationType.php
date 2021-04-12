<?php

namespace App\GraphQL\Type;

use Rebing\GraphQL\Support\Type as GraphQLType;
use GraphQL\Type\Definition\Type;
use App\Publication;
use GraphQL;

class PublicationType extends GraphQLType
{
    protected $attributes = [
        'name' => 'PublicationType',
        'description' => 'Publicaciones',
        'model' => Publication::class,
    ];

    public function fields()
    {
        return [
            'id' => [
                'type' => Type::int(),
                'description' => 'ID de la publicación',
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
            'title' => [
                'type' => Type::string(),
                'description' => 'Título de la publicación',
            ],
            'content' => [
                'type' => Type::string(),
                'description' => 'Contenido de la publicación',
            ],
            'doc_uri' => [
                'type' => Type::string(),
                'description' => 'URI del documento asociado a la publicación',
            ],
            'created_at' => [
                'type' => Type::string(),
                'description' => 'Fecha de creación de la publicación',
            ],
            'updated_at' => [
                'type' => Type::string(),
                'description' => 'Fecha de actualización de la publicación',
            ],
            'docs' => [
                'type' => Type::listOf(GraphQL::type('doc')),
                'description' => 'Documentos de la publicación',
            ],
            'docs_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de documentos de la publicación',
            ],
            'comments' => [
                'type' => Type::listOf(GraphQL::type('comment')),
                'description' => 'Comentarios de la publicación',
            ],
            'comments_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de comentarios de la publicación',
            ],
            'likes' => [
                'type' => Type::listOf(GraphQL::type('like')),
                'description' => 'Likes de la publicación',
            ],
            'likes_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de likes de la publicación',
            ],
        ];
    }
}