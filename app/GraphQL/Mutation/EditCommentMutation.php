<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\Facades\GraphQL;
use App\Comment;

class EditCommentMutation extends Mutation
{
    protected $attributes = [
        'name' => 'EditCommentMutation',
        'description' => 'Edita un comentario'
    ];

    public function type()
    {
        return GraphQL::type('comment');
    }

    public function authorize($args)
    {
        $user = auth()->user();
        $comment = Comment::findOrFail($args['id']);
        return ($user->id == $comment->user_id) || in_array($user->type, ['admin', 'super_admin']);
    }

    public function args()
    {
        return [
            'id' => [
                'type'  => Type::nonNull(Type::int()),
                'rules' => ['required', 'integer', 'exists:comments,id'],
            ],
            'commentable_type' => [
                'type'  => Type::string(),
                'rules' => ['required_with:commentable_id', 'string', 'in:App\Challenge,App\Doc,App\Publication'],
            ],
            'commentable_id' => [
                'type'  => Type::int(),
                'rules' => ['required_with:commentable_type', 'integer', 'poly_exists:commentable_type'],
            ],
            'content' => [
                'type'  => Type::nonNull(Type::string()),
                'rules' => ['string', 'max:10000'],
            ],
            'doc_uri' => [
                'type'  => Type::string(),
                'rules' => ['url', 'max:191'],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $args['last_editor_id'] = auth()->id();
        $comment = Comment::findOrFail($args['id']);
        $comment->update($args);
        return $comment;
    }
}
