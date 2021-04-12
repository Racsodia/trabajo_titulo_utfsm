<?php

namespace App\GraphQL\Type;

use Rebing\GraphQL\Support\Type as GraphQLType;
use GraphQL\Type\Definition\Type;
use App\Comment;
use GraphQL;

class CommentType extends GraphQLType
{
    protected $attributes = [
        'name' => 'CommentType',
        'description' => 'Comentarios',
        'model' => Comment::class,
    ];

    public function fields()
    {
        return [
            'id' => [
                'type' => Type::int(),
                'description' => 'ID del comentario',
            ],
            'user' => [
                'type' => GraphQL::type('user'),
                'description' => 'Usuario creador',
            ],
            'last_editor' => [
                'type' => GraphQL::type('user'),
                'description' => 'Último usuario editor',
            ],
            'content' => [
                'type' => Type::string(),
                'description' => 'Contenido del comentario',
            ],
            'commentable_type' => [
                'type' => Type::string(),
                'description' => 'Tipo del comentable',
            ],
            'commentable_id' => [
                'type' => Type::int(),
                'description' => 'ID del comentable',
            ],
            'doc_uri' => [
                'type' => Type::string(),
                'description' => 'URI del documento asociado al comentario',
            ],
            'created_at' => [
                'type' => Type::string(),
                'description' => 'Fecha de creación del comentario',
            ],
            'updated_at' => [
                'type' => Type::string(),
                'description' => 'Fecha de actualización del comentario',
            ],
            'likes' => [
                'type' => Type::listOf(GraphQL::type('like')),
                'description' => 'Likes del comentario',
            ],
            'likes_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de likes del comentario',
            ],
        ];
    }
}