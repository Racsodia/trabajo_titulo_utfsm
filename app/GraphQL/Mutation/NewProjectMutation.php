<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\Facades\GraphQL;
use App\Project;

class NewProjectMutation extends Mutation
{
    protected $attributes = [
        'name' => 'NewProjectMutation',
        'description' => 'Crea un nuevo proyecto'
    ];

    public function type()
    {
        return GraphQL::type('project');
    }

    public function authorize($args)
    {
        $user = auth()->user();
        $cond1 = ($user->type == 'general') && ($user->verified == 'yes') && ($user->organization_id == $args['organization_id']);
        $cond2 = in_array($user->type, ['minsal', 'admin', 'super_admin']);
        return $cond1 || $cond2;
    }

    public function args()
    {
        return [
            'name' => [
                'type'  => Type::nonNull(Type::string()),
                'rules' => ['required', 'string', 'max:191'],
            ],
            'organization_id' => [
                'type'  => Type::nonNull(Type::int()),
                'rules' => ['required', 'integer', 'exists:organizations,id'],
            ],
            'context' => [
                'type'  => Type::nonNull(Type::string()),
                'rules' => ['required', 'string', 'max:1000'],
            ],
            'status' => [
                'type'  => Type::string(),
                'rules' => ['nullable', 'string', 'in:construction,development,completed'],
            ],
            'article_id' => [
                'type'  => Type::int(),
                'rules' => ['nullable', 'integer', 'exists:articles,id'],
            ],
            'photo_uri' => [
                'type'  => Type::string(),
                'rules' => ['nullable', 'url', 'max:191'],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $user = auth()->user();
        $args['user_id'] = $user->id;
        if (isset($args['status']) && ($args['status'] == 'completed') && !in_array($user->type, ['minsal', 'admin', 'super_admin']))
            unset($args['status']);
        return Project::create($args);
    }
}
