<?php

namespace App\GraphQL\Type;

use Rebing\GraphQL\Support\Type as GraphQLType;
use GraphQL\Type\Definition\Type;
use App\Challenge;
use GraphQL;

class ChallengeType extends GraphQLType
{
    protected $attributes = [
        'name' => 'ChallengeType',
        'description' => 'Desafíos',
        'model' => Challenge::class,
    ];

    public function fields()
    {
        return [
            'id' => [
                'type' => Type::int(),
                'description' => 'ID del desafío',
            ],
            'user' => [
                'type' => GraphQL::type('user'),
                'description' => 'Usuario creador',
            ],
            'organization' => [
                'type' => GraphQL::type('organization'),
                'description' => 'Organización del usuario creador',
            ],
            'last_editor' => [
                'type' => GraphQL::type('user'),
                'description' => 'Último usuario editor',
            ],
            'context' => [
                'type' => Type::string(),
                'description' => 'Contexto del desafío',
            ],
            'challenge' => [
                'type' => Type::string(),
                'description' => 'Desafío',
            ],
            'challengeable_type' => [
                'type' => Type::string(),
                'description' => 'Tipo de elemento asociado al desafio'
            ],
            'challengeable_id' => [
                'type' => Type::int(),
                'description' => 'ID del elemento asociado al desafio',
            ],
            'name' => [
                'type' => Type::string(),
                'description' => 'Nombre',
            ],
            'target' => [
                'type' => Type::string(),
                'description' => 'Público objetivo',
            ],
            'evaluation' => [
                'type' => Type::string(),
                'description' => 'Evaluación',
            ],
            'doc_uri' => [
                'type' => Type::string(),
                'description' => 'URI del documento asociado al desafío',
            ],
            'created_at' => [
                'type' => Type::string(),
                'description' => 'Fecha de creación del desafío',
            ],
            'updated_at' => [
                'type' => Type::string(),
                'description' => 'Fecha de actualización del desafío',
            ],
            'docs' => [
                'type' => Type::listOf(GraphQL::type('doc')),
                'description' => 'Documentos de la publicación',
            ],
            'docs_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de documentos del desafío',
            ],
            'comments' => [
                'type' => Type::listOf(GraphQL::type('comment')),
                'description' => 'Comentarios del desafío',
            ],
            'comments_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de comentarios del desafío',
            ],
            'likes' => [
                'type' => Type::listOf(GraphQL::type('like')),
                'description' => 'Likes del desafío',
            ],
            'likes_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de likes del desafío',
            ],
        ];
    }
}