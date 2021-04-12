<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use \Askedio\SoftCascade\Traits\SoftCascadeTrait;

class Publication extends Model
{
    use SoftCascadeTrait, SoftDeletes;

    protected $table = "publications";
    protected $fillable = [
        'user_id',
        'last_editor_id',
        'article_id',
        'title',
        'content',
        'doc_uri',
    ];
    protected $appends = [
        'docs_count',
        'comments_count',
        'likes_count'
    ];
    protected $dates = ['deleted_at'];
    protected $softCascade = [
        'comments',
        'likes'
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function last_editor()
    {
        return $this->belongsTo('App\User');
    }

    public function article()
    {
        return $this->belongsTo('App\Article');
    }

    public function docs()
    {
        return $this->morphToMany('App\Doc', 'documentable');
    }

    public function getDocsCountAttribute()
    {
        return $this->docs()->count();
    }

    public function comments()
    {
        return $this->morphMany('App\Comment', 'commentable');
    }

    public function getCommentsCountAttribute()
    {
        return $this->comments()->count();
    }

    public function likes()
    {
        return $this->morphMany('App\Like', 'likeable');
    }

    public function getLikesCountAttribute()
    {
        return $this->likes()->count();
    }
}
