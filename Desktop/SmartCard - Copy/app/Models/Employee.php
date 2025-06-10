<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Person;

class Employee extends Model
{
    protected $table = 'employees';
    protected $fillable = ['National_number', 'job_title', 'salary','password'];

    public function person()
    {
        return $this->belongsTo(Person::class,'National_number','National_number');
    }
}
