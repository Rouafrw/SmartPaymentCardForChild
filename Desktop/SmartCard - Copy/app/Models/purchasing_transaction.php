<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Card;
use App\Models\PurchaseProducts;
use App\Models\product;

class purchasing_transaction extends Model
{
    public function Card()
    {
        return $this->belongsTo(Card::class, 'child_id');
    }
        protected $fillable = [
    'total_amount',
    'date',
    'card_id',
];
        public function purchase_products()
        {
            return $this->hasMany(PurchaseProducts::class);
        }

        public function products()
        {
            return $this->belongsToMany(product::class, 'purchase_products');
        }





}
