<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\Facades\GraphQL;
use App\Category;

class EditCategoryMutation extends Mutation
{
    protected $attributes = [
        'name' => 'EditCategoryMutation',
        'description' => 'Edita una categoría'
    ];

    public function type()
    {
        return GraphQL::type('category');
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
                'rules' => ['required', 'integer', 'exists:articles,id'],
            ],
            'name' => [
                'type'  => Type::string(),
                'rules' => ['string', 'max:191'],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $args['last_editor_id'] = auth()->id();
        $category = Category::findOrFail($args['id']);
        $category->update($args);
        return $category;
    }
}
