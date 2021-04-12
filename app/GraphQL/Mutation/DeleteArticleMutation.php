<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use App\Article;

class DeleteArticleMutation extends Mutation
{
    protected $attributes = [
        'name' => 'DeleteArticleMutation',
        'description' => 'Elimina un artículo'
    ];

    public function type()
    {
        return Type::int();
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
                'rules' => ['required', 'exists:articles,id', 'integer'],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $args['last_editor_id'] = auth()->id();
        $article = Article::findOrFail($args['id']);
        $article->update($args);
        $article->delete();
        return $args['id'];
    }
}
