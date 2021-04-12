<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use \Askedio\SoftCascade\Traits\SoftCascadeTrait;

class Category extends Model
{
    use SoftCascadeTrait, SoftDeletes;

    protected $table = "categories";
    protected $fillable = [
        'user_id',
        'last_editor_id',
        'name',
    ];
    protected $appends = [
        'subcategories_count',
        'articles_count'
    ];
    protected $dates = ['deleted_at'];
    protected $softCascade = [
        'subcategories',
        'articles'
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function last_editor()
    {
        return $this->belongsTo('App\User');
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
}
