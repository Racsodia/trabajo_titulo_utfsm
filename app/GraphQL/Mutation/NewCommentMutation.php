<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\Facades\GraphQL;
use App\Comment;

class NewCommentMutation extends Mutation
{
    protected $attributes = [
        'name' => 'NewCommentMutation',
        'description' => 'Crea un nuevo comentario'
    ];

    public function type()
    {
        return GraphQL::type('comment');
    }

    public function authorize($args)
    {
        return auth()->check();
    }

    public function args()
    {
        return [
            'commentable_type' => [
                'type'  => Type::string(),
                'rules' => ['required', 'string', 'in:App\Challenge,App\Doc,App\Publication'],
            ],
            'commentable_id' => [
                'type'  => Type::int(),
                'rules' => ['required', 'integer', 'poly_exists:commentable_type'],
            ],
            'content' => [
                'type'  => Type::nonNull(Type::string()),
                'rules' => ['required', 'string', 'max:10000'],
            ],
            'doc_uri' => [
                'type'  => Type::string(),
                'rules' => ['nullable', 'url', 'max:191'],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        resolve($args['commentable_type'])->find($args['commentable_id'])->touch();
        $args['user_id'] = auth()->id();
        return Comment::create($args);
    }
}
