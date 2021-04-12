<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\Facades\GraphQL;
use App\Article;

class EditArticleMutation extends Mutation
{
    protected $attributes = [
        'name' => 'EditArticleMutation',
        'description' => 'Edita un artículo'
    ];

    public function type()
    {
        return GraphQL::type('article');
    }

    public function authorize($args)
    {
        $user = auth()->user();
        return in_array($user->type, ['minsal', 'admin', 'super_admin']);
    }

    public function args()
    {
        return [
            'id' => [
                'type'  => Type::nonNull(Type::int()),
                'rules' => ['required', 'integer', 'exists:articles,id'],
            ],
            'category_id' => [
                'type'  => Type::int(),
                'rules' => ['integer', 'exists:categories,id'],
            ],
            'subcategory_id' => [
                'type'  => Type::int(),
                'rules' => ['integer', 'exists:subcategories,id'],
            ],
            'title' => [
                'type'  => Type::string(),
                'rules' => ['string', 'max:191'],
            ],
            'content' => [
                'type'  => Type::string(),
                'rules' => ['string', 'max:10000'],
            ],
            'color' => [
                'type'  => Type::string(),
                'rules' => ['in:bg00,bg01,bg02,bg03,bg04,bg05,bg06,bg07,bg08,bg09'],
            ],
            'photo_uri' => [
                'type'  => Type::string(),
                'rules' => ['url', 'max:191'],
            ],
            'icon_uri' => [
                'type'  => Type::string(),
                'rules' => ['url', 'max:191'],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $args['last_editor_id'] = auth()->id();
        $article = Article::findOrFail($args['id']);
        $article->update($args);
        return $article;
    }
}
