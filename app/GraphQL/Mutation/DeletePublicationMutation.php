<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use App\Publication;

class DeletePublicationMutation extends Mutation
{
    protected $attributes = [
        'name' => 'DeletePublicationMutation',
        'description' => 'Elimina una publicación'
    ];

    public function type()
    {
        return Type::int();
    }

    public function authorize($args)
    {
        $user = auth()->user();
        $publication = Publication::findOrFail($args['id']);
        return ($user->id == $publication->user_id) || in_array($user->type, ['admin', 'super_admin']);
    }

    public function args()
    {
        return [
            'id' => [
                'type'  => Type::nonNull(Type::int()),
                'rules' => ['required', 'integer', 'exists:publications,id',],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $args['last_editor_id'] = auth()->id();
        $publication = Publication::findOrFail($args['id']);
        $publication->update($args);
        $publication->delete();
        return $args['id'];
    }
}
