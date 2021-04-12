<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use App\User;

class DeleteUserMutation extends Mutation
{
    protected $attributes = [
        'name' => 'DeleteUserMutation',
        'description' => 'Elimina un usuario'
    ];

    public function type()
    {
        return Type::int();
    }

    public function authorize($args)
    {
        $editor = auth()->user();
        return in_array($editor->type, ['admin', 'super_admin']);
    }

    public function args()
    {
        return [
            'id' => [
                'type'  => Type::nonNull(Type::int()),
                'rules' => ['required', 'integer', 'exists:users,id'],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $user = User::findOrFail($args['id']);
        $args['last_editor_id'] = auth()->id();
        $user->update($args);
        $user->delete();
        return $args['id'];
    }
}