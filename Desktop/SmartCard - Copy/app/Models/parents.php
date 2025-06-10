<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Person;
use App\Models\child;
use App\Models\application;



class parents extends Model
{
    protected $table = 'parents';
    protected $fillable = ['National_number','phone_number','E_mail','password'];


    
    public function Person()
    {
        return $this->belongsTo(Person::class,'National_number','National_number');
    }


    public function child()
    {
        return $this->hasMany(child::class,'parent_id', 'id');
    }

    public function appication()
    {
        return $this->hasMany(application::class,'parent_id', 'id');
    }

}
    
