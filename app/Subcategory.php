<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use \Askedio\SoftCascade\Traits\SoftCascadeTrait;

class Subcategory extends Model
{
    use SoftCascadeTrait, SoftDeletes;

    protected $table = "subcategories";
    protected $fillable = [
        'user_id',
        'last_editor_id',
        'category_id',
        'name',
    ];
    protected $appends = ['articles_count'];
    protected $dates = ['deleted_at'];
    protected $softCascade = ['articles'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function last_editor()
    {
        return $this->belongsTo('App\User');
    }

    public function category()
    {
        return $this->belongsTo('App\Category');
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
