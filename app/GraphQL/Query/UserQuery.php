<?php

namespace App\GraphQL\Query;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ResolveInfo;
use Rebing\GraphQL\Support\SelectFields;
use Rebing\GraphQL\Support\Query;
use Rebing\GraphQL\Support\Facades\GraphQL;
use App\User;
use Carbon\Carbon;

class UserQuery extends Query
{
    protected $attributes = [
        'name' => 'UserQuery',
        'description' => 'Retorna información de usuarios'
    ];

    public function type()
    {
        return GraphQL::paginate('user');
    }

    public function args()
    {
        return [
            'limit' => [
                'type' => Type::int(),
                'description' => 'Límite de usuarios por página',
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
                'description' => 'ID del usuario',
            ],
            'provider' => [
                'type' => Type::string(),
                'description' => 'Red social con la que el usuario inició sesión',
            ],
            'type' => [
                'type' => Type::string(),
                'description' => 'Tipo de usuario',
            ],
            'organization_id' => [
                'type' => Type::int(),
                'description' => 'ID de la organización del usuario',
            ],
            'verified' => [
                'type' => Type::string(),
                'description' => 'Estado de verificación del usuario',
            ],
            'org_admin' => [
                'type' => Type::string(),
                'description' => 'El usuario es o no administrador de su organización',
            ],
            'last_editor_id' => [
                'type' => Type::int(),
                'description' => 'ID del último usuario editor',
            ],
            'email' => [
                'type' => Type::string(),
                'description' => 'E-mail del usuario',
            ],
            'name' => [
                'type' => Type::string(),
                'description' => 'Nombre del usuario',
            ],
            'position' => [
                'type' => Type::string(),
                'description' => 'Cargo del usuario',
            ],
        ];
    }

    public function resolve($root, $args, SelectFields $fields, ResolveInfo $info)
    {
        $where = function ($query) use ($args) {
            if (isset($args['id']))
                $query->where('id', $args['id']);

            if (isset($args['provider']))
                $query->where('provider', $args['provider']);

            if (isset($args['type']))
                $query->where('type', $args['type']);

            if (isset($args['organization_id']))
                $query->where('organization_id', $args['organization_id']);

            if (isset($args['verified']))
                $query->where('verified', $args['verified']);

            if (isset($args['org_admin']))
                $query->where('org_admin', $args['org_admin']);

            if (isset($args['last_editor']))
                $query->where('last_editor', $args['last_editor']);

            if (isset($args['email']))
                $query->where('email', 'LIKE', '%' . $args['email'] . '%');

            if (isset($args['name']))
                $query->where('name', 'LIKE', '%' . $args['name'] . '%');

            if (isset($args['position']))
                $query->where('position', 'LIKE', '%' . $args['position'] . '%');

            if (isset($args['month']))
                $query->whereMonth('updated_at', '=', $args['month']);

            if (isset($args['week'])) {
                $start = Carbon::now()->setISODate(date("Y"), $args['week']);
                $end = Carbon::now()->setISODate(date("Y"), $args['week'] + 1);
                $query->whereBetween('updated_at', [$start, $end]);
            }
        };

        $temp = User::with(array_keys($fields->getRelations()))->where($where)->get();

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
