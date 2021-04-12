<?php

namespace App\GraphQL\Query;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ResolveInfo;
use Rebing\GraphQL\Support\SelectFields;
use Rebing\GraphQL\Support\Query;
use Rebing\GraphQL\Support\Facades\GraphQL;
use App\Comment;
use Carbon\Carbon;

class CommentQuery extends Query
{
    protected $attributes = [
        'name' => 'CommentQuery',
        'description' => 'Retorna información de comentarios'
    ];

    public function type()
    {
        return GraphQL::paginate('comment');
    }

    public function args()
    {
        return [
            'limit' => [
                'type' => Type::int(),
                'description' => 'Límite de comentarios por página',
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
                'description' => 'ID del comentario',
            ],
            'user_id' => [
                'type' => Type::int(),
                'description' => 'Usuario creador',
            ],
            'last_editor_id' => [
                'type' => Type::int(),
                'description' => 'ID del último usuario editor',
            ],
            'commentable_type' => [
                'type' => Type::string(),
                'description' => 'Tipo del comentable',
            ],
            'commentable_id' => [
                'type' => Type::int(),
                'description' => 'ID del comentable',
            ],
            'content' => [
                'type' => Type::string(),
                'description' => 'Cuerpo del comentario',
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

            if (isset($args['commentable_type']))
                $query->where('commentable_type', $args['commentable_type']);

            if (isset($args['commentable_id']))
                $query->where('commentable_id', $args['commentable_id']);

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

        $temp = Comment::with(array_keys($fields->getRelations()))->where($where)->get();

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
