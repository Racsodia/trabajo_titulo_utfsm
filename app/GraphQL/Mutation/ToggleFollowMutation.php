<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\SelectFields;
use Illuminate\Validation\Rule;
use App\Organization;
use App\User;

class ToggleFollowMutation extends Mutation
{
    protected $attributes = [
        'name' => 'ToggleFollowMutation',
        'description' => 'Follow/unfollow'
    ];

    public function type()
    {
        return Type::int();
    }

    public function authorize($args)
    {
        return auth()->check();
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
        $user = auth()->user();
        $organization = Organization::find($args['id']);

        if (!$organization->followers()->find($user->id)) {
            $organization->followers()->attach($user->id);
        } else {
            $organization->followers()->detach($user->id);
        }
        return $organization->followers()->count();
    }
}
