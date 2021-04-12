<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use \Askedio\SoftCascade\Traits\SoftCascadeTrait;

class Article extends Model
{
    use SoftCascadeTrait, SoftDeletes;

    protected $table = "articles";
    protected $fillable = [
        'user_id',
        'last_editor_id',
        'category_id',
        'subcategory_id',
        'title',
        'content',
        'color',
        'photo_uri',
        'icon_uri',
    ];
    protected $appends = [
        'figures_count',
        'publications_count',
        'challenges_count',
        'projects_count',
        'followers_count'
    ];
    protected $dates = ['deleted_at'];
    protected $softCascade = [
        'figures',
        'publications',
        'challenges'
    ];

    public function category()
    {
        return $this->belongsTo('App\Category');
    }

    public function subcategory()
    {
        return $this->belongsTo('App\Subcategory');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function last_editor()
    {
        return $this->belongsTo('App\User');
    }

    public function figures()
    {
        return $this->hasMany('App\Article_Figure');
    }

    public function getFiguresCountAttribute()
    {
        return $this->figures()->count();
    }

    public function publications()
    {
        return $this->hasMany('App\Publication');
    }

    public function getPublicationsCountAttribute()
    {
        return $this->publications()->count();
    }

    public function challenges()
    {
        return $this->morphMany('App\Challenge', 'challengeable');
    }

    public function getChallengesCountAttribute()
    {
        return $this->challenges()->count();
    }

    public function projects()
    {
        return $this->hasMany('App\Project');
    }

    public function getProjectsCountAttribute()
    {
        return $this->projects()->count();
    }

    public function followers()
    {
        return $this->belongsToMany('App\User');
    }

    public function getFollowersCountAttribute()
    {
        return $this->followers()->count();
    }
}
