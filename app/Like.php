<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Like extends Model
{
    use SoftDeletes;

    protected $table = "likes";
    protected $fillable = [
        'user_id',
        'likeable_type',
        'likeable_id',
    ];
    protected $dates = ['deleted_at'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function likeable()
    {
        return $this->morphTo();
    }
}
