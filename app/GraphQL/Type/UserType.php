<?php

namespace App\GraphQL\Type;

use Rebing\GraphQL\Support\Type as GraphQLType;
use GraphQL\Type\Definition\Type;
use App\User;
use GraphQL;

class UserType extends GraphQLType
{
    protected $attributes = [
        'name' => 'UserType',
        'description' => 'Usuarios',
        'model' => User::class,
    ];

    public function fields()
    {
        return [
            'id' => [
                'type' => Type::int(),
                'description' => 'ID del usuario',
            ],
            'email' => [
                'type' => Type::string(),
                'description' => 'E-mail del usuario',
            ],
            'provider' => [
                'type' => Type::string(),
                'description' => 'Red social con la que el usuario inició sesión',
            ],
            'provider_id' => [
                'type' => Type::string(),
                'description' => 'ID con la que el provider identifica al usuario',
            ],
            'type' => [
                'type' => Type::string(),
                'description' => 'Tipo de usuario',
            ],
            'name' => [
                'type' => Type::string(),
                'description' => 'Nombre del usuario',
            ],
            'organization' => [
                'type' => GraphQL::type('organization'),
                'description' => 'Organización a la que pertenece el usuario',
            ],
            'position' => [
                'type' => Type::string(),
                'description' => 'Cargo del usuario dentro de su organización',
            ],
            'verified' => [
                'type' => Type::string(),
                'description' => 'Estado de verificación del usuario',
            ],
            'org_admin' => [
                'type' => Type::string(),
                'description' => 'El usuario es o no administrador de su organización',
            ],
            'photo_uri' => [
                'type' => Type::string(),
                'description' => 'URI de la foto de perfil del usuario',
            ],
            'last_editor' => [
                'type' => GraphQL::type('user'),
                'description' => 'Último usuario editor',
            ],
            'created_at' => [
                'type' => Type::string(),
                'description' => 'Fecha de creación del usuario',
            ],
            'updated_at' => [
                'type' => Type::string(),
                'description' => 'Fecha de actualización del usuario',
            ],
            'categories' => [
                'type' => Type::listOf(GraphQL::type('category')),
                'description' => 'Categorías hechas por el usuario',
            ],
            'categories_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de categorías hechas por el usuario',
            ],
            'subcategories' => [
                'type' => Type::listOf(GraphQL::type('subcategory')),
                'description' => 'Subcategorías hechas por el usuario',
            ],
            'subcategories_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de subcategorías hechas por el usuario',
            ],
            'articles' => [
                'type' => Type::listOf(GraphQL::type('article')),
                'description' => 'Artículos hechos por el usuario',
            ],
            'articles_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de artículos hechos por el usuario',
            ],
            'projects' => [
                'type' => Type::listOf(GraphQL::type('project')),
                'description' => 'Proyectos hechos por el usuario',
            ],
            'projects_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de proyectos hechos por el usuario',
            ],
            'figures' => [
                'type' => Type::listOf(GraphQL::type('article_figure')),
                'description' => 'Cifras hechas por el usuario',
            ],
            'figures_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de cifras hechas por el usuario',
            ],
            'publications' => [
                'type' => Type::listOf(GraphQL::type('publication')),
                'description' => 'Publicaciones hechas por el usuario',
            ],
            'publications_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de publicaciones hechas por el usuario',
            ],
            'docs' => [
                'type' => Type::listOf(GraphQL::type('doc')),
                'description' => 'Documentos hechos por el usuario',
            ],
            'docs_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de documentos hechos por el usuario',
            ],
            'challenges' => [
                'type' => Type::listOf(GraphQL::type('challenge')),
                'description' => 'Desafíos hechos por el usuario',
            ],
            'challenges_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de desafíos hechos por el usuario',
            ],
            'comments' => [
                'type' => Type::listOf(GraphQL::type('comment')),
                'description' => 'Comentarios hechos por el usuario',
            ],
            'comments_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de comentarios hechos por el usuario',
            ],
            'likes' => [
                'type' => Type::listOf(GraphQL::type('like')),
                'description' => 'Likes hechos por el usuario',
            ],
            'likes_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de likes hechos por el usuario',
            ],
            'seals' => [
                'type' => Type::listOf(GraphQL::type('seal')),
                'description' => 'Sellos hechos por el usuario',
            ],
            'seals_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de sellos hechos por el usuario',
            ],
            'articlesfollowing' => [
                'type' => Type::listOf(GraphQL::type('article')),
                'description' => 'Temáticas seguidas por el usuario',
            ],
            'articlesfollowing_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de temáticas seguidas por el usuario',
            ],
            'organizationsfollowing' => [
                'type' => Type::listOf(GraphQL::type('organization')),
                'description' => 'Organizaciones seguidas por el usuario',
            ],
            'organizationsfollowing_count' => [
                'type' => Type::int(),
                'description' => 'Conteo de organizaciones seguidas por el usuario',
            ],
        ];
    }
}