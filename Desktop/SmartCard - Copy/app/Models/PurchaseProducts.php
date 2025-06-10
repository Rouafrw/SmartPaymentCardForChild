<?php

namespace App\Models;
use App\Models\product;
use App\Models\purchasing_transaction;
use Illuminate\Database\Eloquent\Model;

class PurchaseProducts extends Model
{
    public function product()
    {
        return $this->belongsTo(product::class, 'child_id');
    }
    public function purchasing_transaction()
    {
        return $this->belongsTo(purchasing_transaction::class, 'child_id');
    }
}
