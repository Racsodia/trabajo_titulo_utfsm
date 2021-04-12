<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use \Askedio\SoftCascade\Traits\SoftCascadeTrait;

class Challenge extends Model
{
    use SoftCascadeTrait, SoftDeletes;

    protected $table = "challenges";
    protected $fillable = [
        'user_id',
        'last_editor_id',
        'challengeable_type',
        'challengeable_id',
        'context',
        'challenge',
        'doc_uri',
        'organization_id',
        'name',
        'target',
        'evaluation',
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

    public function organization()
    {
        return $this->belongsTo('App\Organization');
    }

    public function challengeable()
    {
        return $this->morphTo();
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
