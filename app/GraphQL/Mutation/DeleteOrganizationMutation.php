<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use App\Organization;

class DeleteOrganizationMutation extends Mutation
{
    protected $attributes = [
        'name' => 'DeleteOrganizationMutation',
        'description' => 'Elimina una organización'
    ];

    public function type()
    {
        return Type::int();
    }

    public function authorize($args)
    {
        $user = auth()->user();
        return (($user->organization_id == $args['id']) && ($user->org_admin == 'yes')) || in_array($user->type, ['minsal', 'admin', 'super_admin']);
    }

    public function args()
    {
        return [
            'id' => [
                'type'  => Type::nonNull(Type::int()),
                'rules' => ['required', 'exists:organizations,id', 'integer'],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $args['last_editor_id'] = auth()->id();
        $organization = Organization::findOrFail($args['id']);
        $organization->update($args);
        $organization->delete();
        return $args['id'];
    }
}