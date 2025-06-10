<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\child;

class forbidden_food extends Model
{
    protected $table = 'forbidden_items';

    public function child()
    {
        return $this->belongsTo(child::class);
    }

}
