<?php

namespace App\Http\Controllers;
use App\Models\order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'grade' => 'required|string|max:100',
            'parent_id' => 'required|exists:parents,id',
        ]);

        // إنشاء الطلب بدون تمرير status
        $order = order::create($validated);

        return response()->json([
            'message' => 'تم تقديم الطلب بنجاح',
            'data' => $order,
            'status' =>false
        ], 201);
    }


    public function activate($id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json([
                'error' => 'لم يتم العثور على الطلب'
            ], 404);
        }

        if ($order->status) {
            return response()->json([
                'message' => 'الطلب مفعل مسبقاً'
            ], 200);
        }

        $order->status = true;
        $order->save();

        return response()->json([
            'message' => 'تم قبول الطلب بنجاح',
            'order_id' => $order->id,
            'status' => true
        ]);
    }

    public function showPending()
    {
        $orders = Order::where('status', false)->get();

        return response()->json([
            'count' => $orders->count(),
            'pending_orders' => $orders
        ]);
    }

}
