<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\Facades\GraphQL;
use App\Subcategory;

class EditSubcategoryMutation extends Mutation
{
    protected $attributes = [
        'name' => 'EditSubcategoryMutation',
        'description' => 'Edita una subcategoría'
    ];

    public function type()
    {
        return GraphQL::type('subcategory');
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
            'category_id' => [
                'type'  => Type::int(),
                'rules' => ['integer', 'exists:categories,id'],
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
        $subcategory = Subcategory::findOrFail($args['id']);
        $subcategory->update($args);
        return $subcategory;
    }
}