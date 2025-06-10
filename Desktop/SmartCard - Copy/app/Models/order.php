<?php

namespace App\Models;
use App\Models\parents;
use Illuminate\Database\Eloquent\Model;

class order extends Model
{
    protected $table = 'orders';
    protected $fillable = ['grade','name','parent_id'];

    public function parent()
    {
        return $this->belongsTo(parents::class, 'parent_id', 'id');
    }
}
