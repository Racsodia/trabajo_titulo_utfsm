<?php

namespace App\GraphQL\Query;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ResolveInfo;
use Rebing\GraphQL\Support\SelectFields;
use Rebing\GraphQL\Support\Query;
use Rebing\GraphQL\Support\Facades\GraphQL;
use App\Publication;
use Carbon\Carbon;

class PublicationQuery extends Query
{
    protected $attributes = [
        'name' => 'PublicationQuery',
        'description' => 'Retorna información de publicaciones'
    ];

    public function type()
    {
        return GraphQL::paginate('publication');
    }

    public function args()
    {
        return [
            'limit' => [
                'type' => Type::int(),
                'description' => 'Límite de publicaciones por página',
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
            'article_id' => [
                'type' => Type::int(),
                'description' => 'ID del artículo',
            ],
            'title' => [
                'type' => Type::string(),
                'description' => 'Título de la publicación',
            ],
            'content' => [
                'type' => Type::string(),
                'description' => 'Cuerpo de la publicación',
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

            if (isset($args['article_id']))
                $query->where('article_id', $args['article_id']);

            if (isset($args['title']))
                $query->where('title', 'LIKE', '%' . $args['title'] . '%');

            if (isset($args['content']))
                $query->where('content', 'LIKE', '%' . $args['content'] . '%');

            if (isset($args['month']))
                $query->whereMonth('updated_at', '=', $args['month']);

            if (isset($args['week'])) {
                $start = Carbon::now()->setISODate(date("Y"), $args['week']);
                $end = Carbon::now()->setISODate(date("Y"), $args['week'] + 1);
                $query->whereBetween('updated_at', [$start, $end]);
            }
        };

        $temp = Publication::with(array_keys($fields->getRelations()))->where($where)->get();

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
