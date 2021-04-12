<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Article_Figure extends Model
{
    use SoftDeletes;

    protected $table = "articles_figures";
    protected $fillable = [
        'user_id',
        'last_editor_id',
        'article_id',
        'figure',
        'context',
        'icon_uri',
    ];
    protected $dates = ['deleted_at'];

    public function article()
    {
        return $this->belongsTo('App\Article');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function last_editor()
    {
        return $this->belongsTo('App\User');
    }
}
