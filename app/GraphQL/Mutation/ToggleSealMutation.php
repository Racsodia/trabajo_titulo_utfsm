<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use App\Seal;
use App\Doc;

class ToggleSealMutation extends Mutation
{
    protected $attributes = [
        'name' => 'ToggleSealMutation',
        'description' => 'Añade/quita un sello'
    ];

    public function type()
    {
        return Type::int();
    }

    public function authorize($args)
    {
        $user = auth()->user();
        return $user->verified == 'yes';
    }

    public function args()
    {
        return [
            'doc_id' => [
                'type'  => Type::nonNull(Type::int()),
                'rules' => ['required', 'integer', 'exists:docs,id'],
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $user = auth()->user();
        $args['user_id'] = $user->id;
        $args['organization_id'] = $user->organization_id;
        $seal = Seal::where([
            ['user_id', $args['user_id']],
            ['doc_id',  $args['doc_id']],
            ['organization_id', $user->organization_id]
        ])->first();
        if (!$seal) {
            $seal = Seal::withTrashed()->where([
                ['user_id', $args['user_id']],
                ['doc_id',  $args['doc_id']],
                ['organization_id', $args['organization_id'] ]
            ])->first();
            if (!$seal) {
                Seal::create($args);;
            } else {
                $seal->restore();
            }
        } else {
            $seal->delete();
        }
        return Doc::find($args['doc_id'])->seals_count;
    }
}
