<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use App\Article;

class ToggleArticleFollowMutation extends Mutation
{
    protected $attributes = [
        'name' => 'ToggleArticleFollowMutation',
        'description' => 'Sigue un artículo'
    ];

    public function type()
    {
        return Type::boolean();
    }

    public function authorize($args)
    {
        return auth()->check();
    }

    public function args()
    {
        return [
            'id' => [
                'type'  => Type::nonNull(Type::int()),
                'rules' => ['required', 'exists:articles,id', 'integer'],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $user = auth()->user();
        $article = Article::find($args['id']);

        if (!$article->followers()->find($user->id)) {
            $article->followers()->attach($user->id);
            return true;
        } else {
            $article->followers()->detach($user->id);
            return false;
        }
    }
}
