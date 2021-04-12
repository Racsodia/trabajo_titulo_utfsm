<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\Facades\GraphQL;
use App\Challenge;

class EditChallengeMutation extends Mutation
{
    protected $attributes = [
        'name' => 'EditChallengeMutation',
        'description' => 'Edita un desafío'
    ];

    public function type()
    {
        return GraphQL::type('challenge');
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
                'rules' => ['required', 'integer', 'exists:challenges,id'],
            ],
            'challengeable_type' => [
                'type'  => Type::string(),
                'rules' => ['required_with:challengeable_id', 'string', 'in:App\Article,App\Project'],
            ],
            'challengeable_id' => [
                'type'  => Type::int(),
                'rules' => ['required_with:challengeable_type', 'integer', 'poly_exists:challengeable_type'],
            ],
            'context' => [
                'type'  => Type::string(),
                'rules' => ['string', 'max:10000'],
            ],
            'challenge' => [
                'type'  => Type::string(),
                'rules' => ['string', 'max:10000'],
            ],
            'doc_uri' => [
                'type'  => Type::string(),
                'rules' => ['nullable', 'url', 'max:191'],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $args['last_editor_id'] = auth()->id();
        $challenge = Challenge::findOrFail($args['id']);
        $challenge->update($args);
        return $challenge;
    }
}
