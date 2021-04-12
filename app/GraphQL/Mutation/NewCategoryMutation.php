<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\Facades\GraphQL;
use App\Category;

class NewCategoryMutation extends Mutation
{
    protected $attributes = [
        'name' => 'NewCategoryMutation',
        'description' => 'Crea una nueva categoría'
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
            'name' => [
                'type'  => Type::nonNull(Type::string()),
                'rules' => ['required', 'string', 'max:191'],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $args['user_id'] = auth()->id();
        return Category::create($args);
    }
}
