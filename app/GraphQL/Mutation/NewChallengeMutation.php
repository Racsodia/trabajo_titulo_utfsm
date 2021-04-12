<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\Facades\GraphQL;
use App\Challenge;

class NewChallengeMutation extends Mutation
{
    protected $attributes = [
        'name' => 'NewChallengeMutation',
        'description' => 'Crea un nuevo desafío'
    ];

    public function type()
    {
        return GraphQL::type('challenge');
    }

    public function authorize($args)
    {
        return auth()->check();
    }

    public function args()
    {
        return [
            'challengeable_type' => [
                'type'  => Type::string(),
                'rules' => ['required_with:challengeable_id', 'string', 'in:App\Article,App\Project'],
            ],
            'challengeable_id' => [
                'type'  => Type::int(),
                'rules' => ['required_with:challengeable_type', 'integer', 'poly_exists:challengeable_type'],
            ],
            'context' => [
                'type'  => Type::nonNull(Type::string()),
                'rules' => ['required', 'string', 'max:10000'],
            ],
            'challenge' => [
                'type'  => Type::nonNull(Type::string()),
                'rules' => ['required', 'string', 'max:10000'],
            ],
            'name' => [
                'type' => Type::string(),
                'rules' => ['string', 'max:191'],
            ],
            'target' => [
                'type' => Type::string(),
                'rules' => ['string', 'max:191'],
            ],
            'evaluation' => [
                'type' => Type::string(),
                'rules' => ['string', 'max:191'],
            ],
            'doc_uri' => [
                'type'  => Type::string(),
                'rules' => ['nullable', 'url', 'max:191'],
            ],
            'as_organization' => [
                'type'  => Type::boolean(),
                'rules' => ['required', 'boolean'],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $user = auth()->user();
        $args['user_id'] = $user->id;
        if ($args['as_organization'])
            $args['organization_id'] = $user->organization_id;
        if (isset($args['challengeable_type']))
            resolve($args['challengeable_type'])->find($args['challengeable_id'])->touch();
        unset($args['as_organization']);
        return Challenge::create($args);
    }
}
