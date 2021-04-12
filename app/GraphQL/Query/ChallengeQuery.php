<?php

namespace App\GraphQL\Query;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ResolveInfo;
use Rebing\GraphQL\Support\SelectFields;
use Rebing\GraphQL\Support\Query;
use Rebing\GraphQL\Support\Facades\GraphQL;
use App\Challenge;
use Carbon\Carbon;

class ChallengeQuery extends Query
{
    protected $attributes = [
        'name' => 'ChallengeQuery',
        'description' => 'Retorna información de desafíos'
    ];

    public function type()
    {
        return GraphQL::paginate('challenge');
    }

    public function args()
    {
        return [
            'limit' => [
                'type' => Type::int(),
                'description' => 'Límite de desafíos por página',
            ],
            'page' => [
                'type' => Type::int(),
                'description' => 'Número de página que se revisará',
            ],
            'sortByAsc' => [
                'type' => Type::string(),
                'description' => 'Columna por la que se ordenarán los datos, en orden ascendente',
            ],
            'sortByDesc' => [
                'type' => Type::string(),
                'description' => 'Columna por la que se ordenarán los datos, en orden descendente',
            ],
            'month' => [
                'type' => Type::int(),
                'description' => 'Mes por el que se filtrará',
            ],
            'week' => [
                'type' => Type::int(),
                'description' => 'Semana por la que se filtrará',
            ],
            'id' => [
                'type' => Type::int(),
                'description' => 'ID del artículo',
            ],
            'user_id' => [
                'type' => Type::int(),
                'description' => 'Usuario creador',
            ],
            'last_editor_id' => [
                'type' => Type::int(),
                'description' => 'ID del último usuario editor',
            ],
            'challengeable_type' => [
                'type' => Type::string(),
                'description' => 'Tipo del desafiable',
            ],
            'challengeable_id' => [
                'type' => Type::int(),
                'description' => 'ID del desafiable',
            ],
            'context' => [
                'type' => Type::string(),
                'description' => 'Contexto del desafío',
            ],
            'challenge' => [
                'type' => Type::string(),
                'description' => 'Cuerpo del desafío',
            ],
        ];
    }

    public function resolve($root, $args, SelectFields $fields, ResolveInfo $info)
    {
        $where = function ($query) use ($args) {
            if (isset($args['id']))
                $query->where('id', $args['id']);

            if (isset($args['user_id']))
                $query->where('user_id', $args['user_id']);

            if (isset($args['last_editor_id']))
                $query->where('last_editor_id', $args['last_editor_id']);

            if (isset($args['challengeable_type']))
                $query->where('challengeable_type', $args['challengeable_type']);

            if (isset($args['challengeable_id']))
                $query->where('challengeable_id', $args['challengeable_id']);

            if (isset($args['context']))
                $query->where('context', 'LIKE', '%' . $args['context'] . '%');

            if (isset($args['challenge']))
                $query->where('challenge', 'LIKE', '%' . $args['challenge'] . '%');

            if (isset($args['month']))
                $query->whereMonth('updated_at', '=', $args['month']);

            if (isset($args['week'])) {
                $start = Carbon::now()->setISODate(date("Y"), $args['week']);
                $end = Carbon::now()->setISODate(date("Y"), $args['week'] + 1);
                $query->whereBetween('updated_at', [$start, $end]);
            }
        };

        $temp = Challenge::with(array_keys($fields->getRelations()))->where($where)->get();

        if (isset($args['sortByAsc']) && !isset($args['sortByDesc']))
            $temp = $temp->sortBy($args['sortByAsc']);

        if (!isset($args['sortByAsc']) && isset($args['sortByDesc']))
            $temp = $temp->sortByDesc($args['sortByDesc']);

        if (isset($args['limit']) && isset($args['page']))
            $temp = $temp->paginate($args['limit'], $args['page']);
        else
            $temp = $temp->paginate();

        return $temp;
    }
}
