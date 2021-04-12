<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Seal extends Model
{
    use SoftDeletes;

    protected $table = "seals";
    protected $fillable = [
        'user_id',
        'last_editor_id',
        'organization_id',
        'doc_id',
    ];
    protected $dates = ['deleted_at'];

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

    public function doc()
    {
        return $this->belongsTo('App\Doc');
    }
}
