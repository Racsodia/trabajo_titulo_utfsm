<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use App\Subcategory;

class DeleteSubcategoryMutation extends Mutation
{
    protected $attributes = [
        'name' => 'DeleteSubcategoryMutation',
        'description' => 'Elimina una subcategoría'
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
                'rules' => ['required', 'integer', 'exists:subcategories,id'],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $args['last_editor_id'] = auth()->id();
        $subcategory = Subcategory::findOrFail($args['id']);
        $subcategory->update($args);
        $subcategory->delete();
        return $args['id'];
    }
}
