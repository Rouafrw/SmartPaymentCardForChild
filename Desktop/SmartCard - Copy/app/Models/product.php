<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\PurchaseProducts;
use App\Models\purchasing_transaction;

class product extends Model
{       protected $table = 'products';
    protected $fillable = ['name', 'kind', 'price', 'description', 'price_in_points','barcode'];

    public function purchase_products()
    {
        return $this->hasMany(PurchaseProducts::class);
    }

    public function transactions()
    {
        return $this->belongsToMany(purchasing_transaction::class, 'purchase_products');
    }


}
