<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\Facades\GraphQL;
use App\Organization;

class EditOrganizationMutation extends Mutation
{
    protected $attributes = [
        'name' => 'EditOrganizationMutation',
        'description' => 'Edita una organización'
    ];

    public function type()
    {
        return GraphQL::type('organization');
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
                'rules' => ['required', 'integer', 'exists:organizations,id'],
            ],
            'name' => [
                'type'  => Type::string(),
                'rules' => ['string', 'max:191'],
            ],
            'mission' => [
                'type'  => Type::string(),
                'rules' => ['string', 'max:1000'],
            ],
            'vision' => [
                'type'  => Type::string(),
                'rules' => ['string', 'max:1000'],
            ],
            'description' => [
                'type'  => Type::string(),
                'rules' => ['string', 'max:2000'],
            ],
            'photo_uri' => [
                'type'  => Type::string(),
                'rules' => ['url', 'max:191'],
            ],
            'webpage' => [
                'type'  => Type::string(),
                'rules' => ['url', 'max:191'],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $args['last_editor_id'] = auth()->id();
        $organization = Organization::findOrFail($args['id']);
        $organization->update($args);
        return $organization;
    }
}
