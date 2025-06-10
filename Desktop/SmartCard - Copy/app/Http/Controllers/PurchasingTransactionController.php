<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use  App\Models\purchasing_transaction;
use  App\Models\child;
use  App\Models\Card;
use  App\Models\Product;
use Carbon\Carbon;

class PurchasingTransactionController extends Controller
{
    
    

    public function showByCard($serialNumber)
    {
        // 1. البحث عن البطاقة
        $card = Card::where('serial_number', $serialNumber)->first();

        if (!$card) {
            return response()->json(['error' => 'لم يتم العثور على بطاقة بهذا الرقم'], 404);
        }

        // 2. جلب العمليات المرتبطة بها
        $transactions = PurchasingTransaction::where('card_id', $card->id)
            ->with(['items.product']) // لو عندك جدول تفاصيل المنتجات
            ->orderBy('date', 'desc')
            ->get();

        // 3. تجهيز البيانات للعرض
        $data = $transactions->map(function ($transaction) {
            return [
                'id' => $transaction->id,
                'date' => $transaction->date,
                'total_amount' => $transaction->total_amount,
                'items' => $transaction->items->map(function ($item) {
                    return [
                        'product_name' => $item->product->name ?? 'غير معروف',
                        'price' => $item->price
                    ];
                })
            ];
        });

        return response()->json([
            'card_owner' => $card->child->name ?? 'غير محدد',
            'transactions' => $data
        ]);
    }





public function index()
    {
        $transactions = PurchasingTransaction::with(['card', 'products'])->orderBy('date', 'desc')->get();

        $data = $transactions->map(function ($transaction) {
            return [
                'transaction_id' => $transaction->id,
                'card_serial_number' => $transaction->card->serial_number ?? 'غير معروف',
                'date' => $transaction->date,
                'total_amount' => $transaction->total_amount,
                'products' => $transaction->products->map(function ($product) {
                    return [
                        'product_name' => $product->name,
                        'price' => $product->pivot->price // السعر المحفوظ في جدول purchase_product
                    ];
                })
            ];
        });

        return response()->json([
            'total_transactions' => $data->count(),
            'transactions' => $data
        ]);
    }
   



    public function store(Request $request)
    {
        $barcodes = $request->input('product_barcodes');
        if (is_string($barcodes)) {
            $parsed = json_decode($barcodes, true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($parsed)) {
                $request->merge(['product_barcodes' => $parsed]);
            } else {
                return response()->json(['error' => 'product_barcodes ليست مصفوفة صالحة'], 422);
            }
        }

        $validated = $request->validate([
            'card_serial' => 'required|string|exists:cards,serial_number',
            'product_barcodes' => 'required|array|min:1',
            'product_barcodes.*' => 'integer',
        ]);

        $card = Card::with('child')->where('serial_number', $validated['card_serial'])->first();
        if (!$card || !$card->status) {
            return response()->json(['error' => 'البطاقة غير موجودة أو غير مفعّلة'], 400);
        }

        $child = $card->child;

        $products = Product::whereIn('barcode', $validated['product_barcodes'])->get();
        if ($products->count() !== count($validated['product_barcodes'])) {
            return response()->json(['error' => 'بعض المنتجات غير موجودة'], 400);
        }

        $forbidden = $child->forbidden_foods ? json_decode($child->forbidden_foods, true) : [];
        $forbiddenItems = $products->filter(fn($p) => in_array($p->name, $forbidden));

        if ($forbiddenItems->isNotEmpty()) {
            return response()->json([
                'error' => 'تم إدخال منتجات محظورة',
                'forbidden_products' => $forbiddenItems->pluck('name'),
            ], 403);
        }

        $total = $products->sum('price');

        if ($total > $child->daily_balance) {
            return response()->json([
                'error' => 'تجاوز السقف اليومي',
                'daily_limit' => $child->daily_balance,
                'requested_total' => $total,
            ], 403);
        }

        if ($total > $child->balance) {
            return response()->json([
                'error' => 'الرصيد غير كافٍ',
                'child_balance' => $child->balance,
                'required_total' => $total,
            ], 403);
        }

        $child->balance -= $total;
        $child->save();

        $transaction = purchasing_transaction::create([
            'total_amount' => $total,
            'date' => Carbon::now()->toDateString(),
            'card_id' => $card->id,
        ]);

        return response()->json([
            'message' => 'تمت العملية بنجاح ',
            'transaction_id' => $transaction->id,
            'total_amount' => $total,
            'remaining_balance' => $child->balance,
        ]);
    }

    public function getTransactionsByCardSerial($serial)
{
    $card = Card::where('serial_number', $serial)->first();

    if (!$card) {
        return response()->json([
            'error' => '🚫 البطاقة غير موجودة',
        ], 404);
    }

    $transactions = purchasing_transaction::with('products:name,id') // جلب أسماء المنتجات فقط
        ->where('card_id', $card->id)
        ->get()
        ->map(function ($transaction) {
            return [
                'id' => $transaction->id,
                'date' => $transaction->date,
                'total_amount' => $transaction->total_amount,
                'products' => $transaction->products->pluck('name'),
            ];
        });

    return response()->json([
        'card_serial' => $serial,
        'total_transactions' => $transactions->count(),
        'transactions' => $transactions,
    ]);
}




    
}
