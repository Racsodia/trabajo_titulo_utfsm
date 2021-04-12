<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use App\Project;

class DeleteProjectMutation extends Mutation
{
    protected $attributes = [
        'name' => 'DeleteProjectMutation',
        'description' => 'Elimina un proyecto'
    ];

    public function type()
    {
        return Type::int();
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
                'rules' => ['required', 'integer', 'exists:projects,id',],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $args['last_editor_id'] = auth()->id();
        $project = Project::findOrFail($args['id']);
        $project->update($args);
        $project->delete();
        return $args['id'];
    }
}
