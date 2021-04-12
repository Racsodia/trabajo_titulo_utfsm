<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\Facades\GraphQL;
use App\Article_Figure;

class EditArticleFigureMutation extends Mutation
{
    protected $attributes = [
        'name' => 'EditArticleFigureMutation',
        'description' => 'Edita una cifra'
    ];

    public function type()
    {
        return GraphQL::type('article_figure');
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
                'rules' => ['required', 'integer', 'exists:articles_figures,id'],
            ],
            'article_id' => [
                'type'  => Type::int(),
                'rules' => ['integer', 'exists:articles,id'],
            ],
            'figure' => [
                'type'  => Type::string(),
                'rules' => ['string', 'max:191'],
            ],
            'context' => [
                'type'  => Type::string(),
                'rules' => ['string', 'max:1000'],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $args['last_editor_id'] = auth()->id();
        $figure = Article_Figure::findOrFail($args['id']);
        $figure->update($args);
        return $figure;
    }
}
