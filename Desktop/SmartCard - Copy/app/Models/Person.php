<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\parents;
use App\Models\Employee;
use App\Models\child;

class Person extends Model
{
    protected $fillable = ['name','type','National_number'];
    protected $table = 'people';//people
    protected $primarykey = 'National_number';

    // protected $primaryKey = 'National_number';
    public $incrementing = false;
    protected $keyType = 'string';


    public function child()
    {
        return $this->hasOne(child::class, 'National_number', 'National_number');
    }

    public function employee()
    {
        return $this->hasOne(Employee::class, 'National_number', 'National_number');
    }
    
    public function parents()
    {
        return $this->hasOne(parents::class, 'National_number', 'National_number');
    }
}
