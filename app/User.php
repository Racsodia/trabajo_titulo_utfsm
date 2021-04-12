<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use \Askedio\SoftCascade\Traits\SoftCascadeTrait;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use SoftDeletes, SoftCascadeTrait, Notifiable, HasApiTokens;
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $fillable = [
        'email',
        'name',
        'provider',
        'provider_id',
        'organization_id',
        'position',
        'photo_uri',
        'type',
        'verified',
        'org_admin',
    ];
    protected $hidden = [
        'email',
        'provider',
        'provider_id',
    ];
    protected $appends = [
        'likes_count',
        'categories_count',
        'subcategories_count',
        'articles_count',
        'projects_count',
        'figures_count',
        'publications_count',
        'docs_count',
        'challenges_count',
        'comments_count',
        'seals_count',
        'likes_count',
        'articlesfollowing_count',
        'organizationsfollowing_count',
    ];
    protected $dates = ['deleted_at'];
    protected $softCascade = [
        'likes',
        'publications',
        'docs',
        'challenges',
        'comments',
        'likes',
    ];

    public function organization()
    {
        return $this->belongsTo('App\Organization');
    }

    public function last_editor()
    {
        return $this->belongsTo('App\User');
    }

    public function categories()
    {
        return $this->hasMany('App\Category');
    }

    public function getCategoriesCountAttribute()
    {
        return $this->categories()->count();
    }

    public function subcategories()
    {
        return $this->hasMany('App\Subcategory');
    }

    public function getSubcategoriesCountAttribute()
    {
        return $this->subcategories()->count();
    }

    public function articles()
    {
        return $this->hasMany('App\Article');
    }

    public function getArticlesCountAttribute()
    {
        return $this->articles()->count();
    }

    public function projects()
    {
        return $this->hasMany('App\Project');
    }

    public function getProjectsCountAttribute()
    {
        return $this->projects()->count();
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

    public function docs()
    {
        return $this->hasMany('App\Doc');
    }

    public function getDocsCountAttribute()
    {
        return $this->docs()->count();
    }

    public function challenges()
    {
        return $this->hasMany('App\Challenge');
    }

    public function getChallengesCountAttribute()
    {
        return $this->challenges()->count();
    }

    public function comments()
    {
        return $this->hasMany('App\Comment');
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
        return $this->hasMany('App\Like');
    }

    public function getLikesCountAttribute()
    {
        return $this->likes()->count();
    }

    public function articlesFollowing()
    {
        return $this->belongsToMany('App\Article');
    }

    public function getArticlesFollowingCountAttribute()
    {
        return $this->articlesFollowing()->count();
    }

    public function organizationsFollowing()
    {
        return $this->belongsToMany('App\Organization');
    }

    public function getOrganizationsFollowingCountAttribute()
    {
        return $this->organizationsFollowing()->count();
    }
}
