<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use App\Like;

class ToggleLikeMutation extends Mutation
{
    protected $attributes = [
        'name' => 'ToggleLikeMutation',
        'description' => 'Like/dislike'
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
            'likeable_type' => [
                'type'  => Type::nonNull(Type::string()),
                'rules' => ['required_with:likeable_id', 'in:App\Challenge,App\Comment,App\Doc,App\Project,App\Publication'],
            ],
            'likeable_id' => [
                'type'  => Type::nonNull(Type::int()),
                'rules' => ['required_with:likeable_type', 'integer', 'poly_exists:likeable_type'],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $args['user_id'] = auth()->id();
        $like = Like::where([
            ['user_id', $args['user_id']],
            ['likeable_type', $args['likeable_type']],
            ['likeable_id', $args['likeable_id']]
        ])->first();
        if (!$like) {
            $like = Like::withTrashed()->where([
                ['user_id', $args['user_id']],
                ['likeable_type', $args['likeable_type']],
                ['likeable_id', $args['likeable_id']]
            ])->first();
            if (!$like) {
                Like::create($args);
            } else {
                $like->restore();
            }
        } else {
            $like->delete();
        }
        return resolve($args['likeable_type'])->find($args['likeable_id'])->likes_count;
    }
}
