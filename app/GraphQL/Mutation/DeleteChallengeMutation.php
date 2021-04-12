<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use App\Challenge;

class DeleteChallengeMutation extends Mutation
{
    protected $attributes = [
        'name' => 'DeleteChallengeMutation',
        'description' => 'Elimina un desafío'
    ];

    public function type()
    {
        return Type::int();
    }

    public function authorize($args)
    {
        $user = auth()->user();
        $challenge = Challenge::findOrFail($args['id']);
        return ($user->id == $challenge->user_id) || in_array($user->type, ['admin', 'super_admin']);
    }

    public function args()
    {
        return [
            'id' => [
                'type'  => Type::nonNull(Type::int()),
                'rules' => ['required', 'exists:challenges,id', 'integer'],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $args['last_editor_id'] = auth()->id();
        $challenge = Challenge::findOrFail($args['id']);
        $challenge->update($args);
        $challenge->delete();
        return $args['id'];
    }
}
