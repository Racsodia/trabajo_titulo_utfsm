<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use App\Article_Figure;

class DeleteArticleFigureMutation extends Mutation
{
    protected $attributes = [
        'name' => 'DeleteArticleFigureMutation',
        'description' => 'Elimina una cifra'
    ];

    public function type()
    {
        return Type::int();
    }

    public function authorize($args)
    {
        $user = auth()->user();
        return in_array($user->type, ['minsal', 'admin', 'super_admin']);
    }

    public function args()
    {
        return [
            'id' => [
                'type'  => Type::nonNull(Type::int()),
                'rules' => ['required', 'integer', 'exists:articles_figures,id'],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $args['last_editor_id'] = auth()->id();
        $figure = Article_Figure::findOrFail($args['id']);
        $figure->update($args);
        $figure->delete();
        return $args['id'];
    }
}
