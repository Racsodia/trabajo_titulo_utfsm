<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use App\Comment;

class DeleteCommentMutation extends Mutation
{
    protected $attributes = [
        'name' => 'DeleteCommentMutation',
        'description' => 'Elimina un comentario'
    ];

    public function type()
    {
        return Type::int();
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
                'rules' => ['required', 'exists:comments,id', 'integer'],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $args['last_editor_id'] = auth()->id();
        $comment = Comment::findOrFail($args['id']);
        $comment->update($args);
        $comment->delete();
        return $args['id'];
    }
}
