<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use App\Models\child;
use App\Models\Book;

class BookBorrow extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = ['borrowed_at', 'returned_at'];

    public function book()
    {
        
        return $this->belongsTo(Book::class);
    }
    public function child()
    {
        
        return $this->belongsTo(child::class);
    }   
}
