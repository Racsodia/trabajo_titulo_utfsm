<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\Facades\GraphQL;
use App\Article;
use App\Article_Figure;

class NewArticleMutation extends Mutation
{
    protected $attributes = [
        'name' => 'NewArticleMutation',
        'description' => 'Crea un nuevo artículo'
    ];

    public function type()
    {
        return GraphQL::type('article');
    }
    public function logError($args) {
        $my_file = 'c:/log.txt';
        $handle = fopen($my_file, 'w') or die('Cannot open file:  '.$my_file);
        fwrite($handle, $args);
        fclose($handle);
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
            'subcategory_id' => [
                'type'  => Type::nonNull(Type::int()),
                'rules' => ['required', 'integer', 'exists:subcategories,id'],
            ],
            'title' => [
                'type'  => Type::nonNull(Type::string()),
                'rules' => ['required', 'string', 'max:191'],
            ],
            'content' => [
                'type'  => Type::nonNull(Type::string()),
                'rules' => ['required', 'string', 'max:10000'],
            ],
            'color' => [
                'type'  => Type::string(),
                'rules' => ['in:bg00,bg01,bg02,bg03,bg04,bg05,bg06,bg07,bg08,bg09'],
            ],
            'photo_uri' => [
                'type'  => Type::string(),
                'rules' => ['nullable', 'url', 'max:191'],
            ],
            'icon_uri' => [
                'type'  => Type::string(),
                'rules' => ['nullable', 'url', 'max:191'],
            ],
            'figures' => [
                'type'  => Type::listOf(GraphQL::type('figure')),
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $args['user_id'] = auth()->id();
        $article = Article::create($args);
        if (isset($args['figures'])) {
            foreach ($args['figures'] as $figure) {
                $figure['user_id'] = $args['user_id'];
                $figure['article_id'] = $article->id;
                Article_Figure::create($figure);
            }
        }
        return $article;
    }
}
