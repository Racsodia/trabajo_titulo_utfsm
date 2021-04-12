<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use App\Category;

class DeleteCategoryMutation extends Mutation
{
    protected $attributes = [
        'name' => 'DeleteCategoryMutation',
        'description' => 'Elimina una categoría'
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
                'rules' => ['required', 'integer', 'exists:categories,id'],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $args['last_editor_id'] = auth()->id();
        $category = Category::findOrFail($args['id']);
        $category->update($args);
        $category->delete();
        return $args['id'];
    }
}
