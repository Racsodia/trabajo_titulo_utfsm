<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use \Askedio\SoftCascade\Traits\SoftCascadeTrait;

class Organization extends Model
{
    use SoftCascadeTrait, SoftDeletes;

    protected $table = "organizations";
    protected $fillable = [
        'user_id',
        'last_editor_id',
        'name',
        'mission',
        'vision',
        'description',
        'photo_uri',
        'webpage',
    ];
    protected $appends = [
        'users_count',
        'projects_count',
        'challenges_count',
        'seals_count',
        'followers_count'
    ];
    protected $dates = ['deleted_at'];
    protected $softCascade = [
        'projects',
        'seals'
    ];

    public function users()
    {
        return $this->hasMany('App\User');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function last_editor()
    {
        return $this->belongsTo('App\User');
    }

    public function getUsersCountAttribute()
    {
        return $this->users()->count();
    }

    public function projects()
    {
        return $this->hasMany('App\Project');
    }

    public function getProjectsCountAttribute()
    {
        return $this->projects()->count();
    }

    public function challenges()
    {
        return $this->hasMany('App\Challenge');
    }

    public function getChallengesCountAttribute()
    {
        return $this->challenges()->count();
    }

    public function seals()
    {
        return $this->hasMany('App\Seal');
    }

    public function getSealsCountAttribute()
    {
        return $this->seals()->count();
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
