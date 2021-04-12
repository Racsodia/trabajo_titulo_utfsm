<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use \Askedio\SoftCascade\Traits\SoftCascadeTrait;

class Comment extends Model
{
    use SoftCascadeTrait, SoftDeletes;

    protected $table = "comments";
    protected $fillable = [
        'user_id',
        'last_editor_id',
        'commentable_type',
        'commentable_id',
        'content',
        'doc_uri',
    ];
    protected $appends = ['likes_count'];
    protected $dates = ['deleted_at'];
    protected $softCascade = ['likes'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function last_editor()
    {
        return $this->belongsTo('App\User');
    }

    public function commentable()
    {
        return $this->morphTo();
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
