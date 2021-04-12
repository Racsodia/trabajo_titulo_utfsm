<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\Facades\GraphQL;
use App\Publication;

class EditPublicationMutation extends Mutation
{
    protected $attributes = [
        'name' => 'EditPublicationMutation',
        'description' => 'Edita una publicación'
    ];

    public function type()
    {
        return GraphQL::type('publication');
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
                'rules' => ['required', 'integer', 'exists:publications,id'],
            ],
            'title' => [
                'type'  => Type::string(),
                'rules' => ['string', 'max:191'],
            ],
            'content' => [
                'type'  => Type::string(),
                'rules' => ['string', 'max:1000'],
            ],
            'article_id' => [
                'type'  => Type::int(),
                'rules' => ['integer', 'exists:articles,id'],
            ],
            'doc_uri' => [
                'type'  => Type::int(),
                'rules' => ['url', 'max:191'],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $args['last_editor_id'] = auth()->id();
        $publication = Publication::findOrFail($args['id']);
        $publication->update($args);
        return $publication;
    }
}
