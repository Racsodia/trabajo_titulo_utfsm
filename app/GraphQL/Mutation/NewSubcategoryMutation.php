<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\Facades\GraphQL;
use App\Subcategory;

class NewSubcategoryMutation extends Mutation
{
    protected $attributes = [
        'name' => 'NewSubcategoryMutation',
        'description' => 'Crea una nueva subcategoría'
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
            'category_id' => [
                'type'  => Type::nonNull(Type::int()),
                'rules' => ['required', 'integer', 'exists:categories,id'],
            ],
            'name' => [
                'type'  => Type::nonNull(Type::string()),
                'rules' => ['required', 'string', 'max:191'],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $args['user_id'] = auth()->id();
        return Subcategory::create($args);
    }
}
