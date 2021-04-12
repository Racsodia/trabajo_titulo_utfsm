<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\Facades\GraphQL;
use App\Project;

class EditProjectMutation extends Mutation
{
    protected $attributes = [
        'name' => 'EditProjectMutation',
        'description' => 'Edita un projecto'
    ];

    public function type()
    {
        return GraphQL::type('project');
    }

    public function authorize($args)
    {
        $user = auth()->user();
        $project = Project::findOrFail($args['id']);
        return ($user->organization_id == $project->organization_id) || in_array($user->type, ['minsal', 'admin', 'super_admin']);
    }

    public function args()
    {
        return [
            'id' => [
                'type'  => Type::nonNull(Type::int()),
                'rules' => ['required', 'integer', 'exists:projects,id'],
            ],
            'name' => [
                'type'  => Type::string(),
                'rules' => ['string', 'max:191'],
            ],
            'organization_id' => [
                'type'  => Type::int(),
                'rules' => ['integer', 'exists:organizations,id'],
            ],
            'context' => [
                'type'  => Type::string(),
                'rules' => ['string', 'max:1000'],
            ],
            'article_id' => [
                'type'  => Type::int(),
                'rules' => ['integer', 'exists:articles,id'],
            ],
            'status' => [
                'type'  => Type::string(),
                'rules' => ['string', 'in:construction,development,completed'],
            ],
            'photo_uri' => [
                'type'  => Type::string(),
                'rules' => ['url', 'max:191'],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $user = auth()->user();
        $args['last_editor_id'] = $user->id;
        $project = Project::findOrFail($args['id']);
        if (isset($args['status']) && ($args['status'] == 'completed') && !in_array($user->type, ['minsal', 'admin', 'super_admin']))
            unset($args['status']);
        $project->update($args);
        return $project;
    }
}
