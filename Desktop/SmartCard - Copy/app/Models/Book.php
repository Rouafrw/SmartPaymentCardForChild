<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class Book extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = ['title','kind','points'];

    public function borrows()
    {
    
        return $this->hasMany(BookBorrow::class);
    }
}
