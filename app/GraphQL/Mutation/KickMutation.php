<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use App\User;

class KickMutation extends Mutation
{
    protected $attributes = [
        'name' => 'KickMutation',
        'description' => 'Elimina a un usuario de su organización'
    ];

    public function type()
    {
        return Type::boolean();
    }

    public function authorize($args)
    {
        $user = auth()->user();
        return (($user->organization_id == $args['organization_id']) && ($user->org_admin == 'yes')) || in_array($user->type, ['minsal', 'admin', 'super_admin']);
    }

    public function args()
    {
        return [
            'user_id' => [
                'type'  => Type::nonNull(Type::int()),
                'rules' => ['required', 'integer', 'exists:users,id'],
            ],
            'organization_id' => [
                'type'  => Type::nonNull(Type::int()),
                'rules' => ['required', 'integer', 'exists:organizations,id'],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $user = User::findOrFail($args['user_id']);
        $args['last_editor_id'] = auth()->id();
        if ($user->organization_id == $args['organization_id']) {
            $args['organization_id'] = NULL;
            $args['verified']        = 'no';
            $user->update($args);
            return true;
        } else {
            return false;
        }
    }
}
