<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid; 
use App\Models\child;

class Card extends Model
{
    protected $table = 'cards';
    protected $fillable = ['child_id', 'status','serial_number'];

    public function child()
    {
        return $this->belongsTo(child::class, 'child_id');
    }
    public function purchasing_transaction()
    {
        return $this->hasMany(purchasing_transaction::class,'parent_id', 'id');
    }


    // protected static function boot()
    // {
    //     parent::boot();
    
    //     static::creating(function ($card) {
    //         do {
    //             $serial = strval(random_int(100000000000, 999999999999)); // 12 رقم
    //         } while (self::where('serial_number', $serial)->exists());
    
    //         $card->serial_number = $serial;
    //     });
    // }
    
}
