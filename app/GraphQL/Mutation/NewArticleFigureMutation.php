<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\Facades\GraphQL;
use App\Article_Figure;

class NewArticleFigureMutation extends Mutation
{
    protected $attributes = [
        'name' => 'NewArticleFigureMutation',
        'description' => 'Crea una nueva cifra'
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
            'article_id' => [
                'type'  => Type::nonNull(Type::int()),
                'rules' => ['required', 'integer', 'exists:articles,id'],
            ],
            'figure' => [
                'type'  => Type::nonNull(Type::string()),
                'rules' => ['required', 'string', 'max:191'],
            ],
            'context' => [
                'type'  => Type::nonNull(Type::string()),
                'rules' => ['required', 'string', 'max:1000'],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $args['user_id'] = auth()->id();
        return Article_Figure::create($args);
    }
}
