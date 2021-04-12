<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\Facades\GraphQL;
use App\User;

class EditUserMutation extends Mutation
{
    protected $attributes = [
        'name' => 'EditUserMutation',
        'description' => 'Edita un usuario'
    ];

    public function type()
    {
        return GraphQL::type('user');
    }

    public function authorize($args)
    {
        $editor = auth()->user();
        return ($editor->id == $args['id']) || ($editor->org_admin == 'yes') || in_array($editor->type, ['minsal', 'admin', 'super_admin']);
    }

    public function args()
    {
        return [
            'id' => [
                'type'  => Type::nonNull(Type::int()),
                'rules' => ['required', 'integer', 'exists:users,id'],
            ],
            'organization_id' => [
                'type'  => Type::int(),
                'rules' => ['nullable', 'integer', 'exists:organizations,id'],
            ],
            'position' => [
                'type'  => Type::string(),
                'rules' => ['nullable', 'string', 'max:191'],
            ],
            'verified' => [
                'type'  => Type::string(),
                'rules' => ['string', 'in:yes,no'],
            ],
            'org_admin' => [
                'type'  => Type::string(),
                'rules' => ['string', 'in:yes,no'],
            ],
            'type' => [
                'type'  => Type::string(),
                'rules' => ['string', 'in:admin,minsal,general'],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $editor = auth()->user();
        $user = User::findOrFail($args['id']);
        $args['last_editor_id'] = $editor->id;
        switch ($editor->type) {
            case 'super_admin':
                $user->update($args);
                break;
            case 'admin':
                if (isset($args['type']) && $args['type'] == 'admin')
                    unset($args['type']);
                $user->update($args);
                break;
            case 'minsal':
                unset($args['type'], $args['position']);
                $user->update($args);
                break;
            case 'general':
                if ($editor->id == $args['id']) {
                    unset($args['type'], $args['verified'], $args['org_admin']);
                    $old = $user;
                    $user->update($args);
                    if ($old->position != $user->position || $old->organization_id != $user->organization_id)
                        $user->update(['verified' => 'no', 'org_admin' => 'no']);
                    break;
                } else if (($editor->org_admin == 'yes') && ($editor->organization_id == $user->organization_id)) {
                    unset($args['type'], $args['organization_id']);
                    $user->update($args);
                    break;
                } else {
                    return abort(403, 'Unauthorized action.');
                }
        }
        return $user;
    }
}
