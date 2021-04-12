<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\Facades\GraphQL;
use App\Organization;

class NewOrganizationMutation extends Mutation
{
    protected $attributes = [
        'name' => 'NewOrganizationMutation',
        'description' => 'Crea una organización'
    ];

    public function type()
    {
        return GraphQL::type('organization');
    }

    public function authorize($args)
    {
        $user = auth()->user();
        return in_array($user->type, ['minsal', 'admin', 'super_admin']);
    }

    public function args()
    {
        return [
            'name' => [
                'type'  => Type::nonNull(Type::string()),
                'rules' => ['required', 'string', 'max:191'],
            ],
            'mission' => [
                'type'  => Type::nonNull(Type::string()),
                'rules' => ['required', 'string', 'max:1000'],
            ],
            'vision' => [
                'type'  => Type::nonNull(Type::string()),
                'rules' => ['required', 'string', 'max:1000'],
            ],
            'description' => [
                'name'  => 'description',
                'type'  => Type::nonNull(Type::string()),
                'rules' => ['required', 'string', 'max:2000'],
            ],
            'photo_uri' => [
                'type'  => Type::nonNull(Type::string()),
                'rules' => ['required', 'url', 'max:191'],
            ],
            'webpage' => [
                'type'  => Type::nonNull(Type::string()),
                'rules' => ['required', 'url', 'max:191'],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $args['user_id'] = auth()->id();
        return Organization::create($args);
    }
}
