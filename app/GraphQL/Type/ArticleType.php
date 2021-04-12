<?php

namespace App\GraphQL\Type;

use Rebing\GraphQL\Support\Type as GraphQLType;
use GraphQL\Type\Definition\Type;
use App\Article;
use GraphQL;

class ArticleType extends GraphQLType
{
    protected $attributes = [
        'name' => 'ArticleType',
        'description' => 'Artículos',
        'model' => Article::class,
    ];

    public function fields()
    {
        return [
            'id' => [
                'type' => Type::int(),
                'description' => 'ID del artículo',
            ],
            'user' => [
                'type' => GraphQL::type('user'),
                'description' => 'Usuario creador',
            ],
            'last_editor' => [
                'type' => GraphQL::type('user'),
                'description' => 'Último usuario editor',
            ],
            'category' => [
                'type' => GraphQL::type('category'),
                'description' => 'Categoría',
            ],
            'subcategory' => [
                'type' => GraphQL::type('subcategory'),
                'description' => 'Subcategoría',
            ],
            'color' => [
                'type' => Type::string(),
                'description' => 'Esquema de color del artículo',
            ],
            'title' => [
                'type' => Type::string(),
                'description' => 'Título del artículo',
            ],
            'content' => [
                'type' => Type::string(),
                'description' => 'Contenido del artículo',
            ],
            'photo_uri' => [
                'type' => Type::string(),
                'description' => 'URI de la foto de fondo del artículo',
            ],
            'icon_uri' => [
                'type' => Type::string(),
                'description' => 'URI del ícono del artículo',
            ],
            'created_at' => [
                'type' => Type::string(),
                'description' => 'Fecha de creación del artículo',
            ],
            'updated_at' => [
                'type' => Type::string(),
                'description' => 'Fecha de actualización del artículo',
            ],
            'figures' => [
                'type' => Type::listOf(GraphQL::type('article_figure')),
                'description' => 'Cifras del artículo',
            ],
            'figures_count' => [
                'type' => Type::int(),
            ],
            'publications' => [
                'type' => Type::listOf(GraphQL::type('publication')),
                'description' => 'Publicaciones del artículo',
            ],
            'publications_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de publicaciones del artículo',
            ],
            'projects' => [
                'type' => Type::listOf(GraphQL::type('project')),
                'description' => 'Proyectos del artículo',
            ],
            'projects_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de proyectos del artículo',
            ],
            'challenges' => [
                'type' => Type::listOf(GraphQL::type('challenge')),
                'description' => 'Desafíos del artículo',
            ],
            'challenges_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de desafíos del artículo',
            ],
            'followers' => [
                'type' => Type::listOf(GraphQL::type('user')),
                'description' => 'Usuarios que siguen esta temática',
            ],
            'followers_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de usuarios que siguen esta temática',
            ],
        ];
    }
}