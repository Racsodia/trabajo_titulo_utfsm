<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use \Askedio\SoftCascade\Traits\SoftCascadeTrait;

class Project extends Model
{
    use SoftCascadeTrait, SoftDeletes;

    protected $table = "projects";
    protected $fillable = [
        'user_id',
        'last_editor_id',
        'organization_id',
        'article_id',
        'name',
        'context',
        'status',
        'photo_uri',
    ];
    protected $appends = [
        'docs_count',
        'likes_count',
        'challenges_count'
    ];
    protected $dates = ['deleted_at'];
    protected $softCascade = [
        'likes',
        'challenges'
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

    public function likes()
    {
        return $this->morphMany('App\Like', 'likeable');
    }

    public function getLikesCountAttribute()
    {
        return $this->likes()->count();
    }

    public function challenges()
    {
        return $this->morphMany('App\Challenge', 'challengeable');
    }

    public function getChallengesCountAttribute()
    {
        return $this->challenges()->count();
    }
}
