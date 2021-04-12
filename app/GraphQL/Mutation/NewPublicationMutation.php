<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\SelectFields;
use Rebing\GraphQL\Support\Facades\GraphQL;
use App\Publication;
use App\User;

class NewPublicationMutation extends Mutation
{
    protected $attributes = [
        'name' => 'NewPublicationMutation',
        'description' => 'Crea una nueva publicación'
    ];

    public function type()
    {
        return GraphQL::type('publication');
    }

    public function authorize($args)
    {
        $user = auth()->user();
        return ($user->verified == 'yes') || in_array($user->type, ['minsal', 'admin', 'super_admin']);
    }

    public function args()
    {
        return [
            'title' => [
                'type'  => Type::nonNull(Type::string()),
                'rules' => ['required', 'string', 'max:191'],
            ],
            'content' => [
                'type'  => Type::nonNull(Type::string()),
                'rules' => ['required', 'string', 'max:1000'],
            ],
            'article_id' => [
                'type'  => Type::nonNull(Type::int()),
                'rules' => ['required', 'integer', 'exists:articles,id'],
            ],
            'doc_uri' => [
                'type'  => Type::string(),
                'rules' => ['url', 'max:191'],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $args['user_id'] = auth()->id();
        return Publication::create($args);
    }
}
