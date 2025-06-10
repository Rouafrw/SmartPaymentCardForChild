<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use App\Models\parents;
use App\Models\Person;
use App\Models\Card;
use App\Models\BookBorrow;
use App\Models\forbidden_food;

class child extends Model
{
    use HasFactory, Notifiable;

    //childrens
    protected $table = 'children';
    // protected $fillable = ['National_number', 'grade', 'balance', 'forbidden_foods', 'points', 'card_serial_number', 'parent_id'];
    protected $fillable = ['National_number', 'grade', 'balance', 'points', 'parent_id','daily_balance'];

    // protected $casts = [
    //     'forbidden_foods' => 'array',
    // ];


   
    public function person()
    {
        return $this->belongsTo(Person::class, 'National_number', 'National_number');
    }
    

    public function parent()
    {
        return $this->belongsTo(parents::class, 'parent_id', 'id');
    }


    public function cards()
    {
        return $this->hasMany(Card::class, 'child_id');
    }


    public function borrows()
    { 
        return $this->hasMany(BookBorrow::class);
    }


    public function forbiddenItems()
    {
        return $this->hasMany(forbidden_food::class);
    }

}
