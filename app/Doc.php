<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use \Askedio\SoftCascade\Traits\SoftCascadeTrait;

class Doc extends Model
{
    use SoftCascadeTrait, SoftDeletes;

    protected $table = "docs";
    protected $fillable = [
        'user_id',
        'last_editor_id',
        'name',
        'context',
        'uri',
    ];
    protected $appends = [
        'publications_count',
        'projects_count',
        'challenges_count',
        'comments_count',
        'seals_count',
        'likes_count',
    ];
    protected $dates = ['deleted_at'];
    protected $softCascade = [
        'comments',
        'seals',
        'likes',
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function last_editor()
    {
        return $this->belongsTo('App\User');
    }

    public function publications()
    {
        return $this->morphedByMany('App\Publication', 'documentable');
    }

    public function getPublicationsCountAttribute()
    {
        return $this->publications()->count();
    }

    public function projects()
    {
        return $this->morphedByMany('App\Project', 'documentable');
    }

    public function getProjectsCountAttribute()
    {
        return $this->projects()->count();
    }

    public function challenges()
    {
        return $this->morphedByMany('App\Challenge', 'documentable');
    }

    public function getChallengesCountAttribute()
    {
        return $this->challenges()->count();
    }

    public function comments()
    {
        return $this->morphMany('App\Comment', 'commentable');
    }

    public function getCommentsCountAttribute()
    {
        return $this->comments()->count();
    }

    public function seals()
    {
        return $this->hasMany('App\Seal');
    }

    public function getSealsCountAttribute()
    {
        return $this->seals()->count();
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
