<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use  App\Models\child;
use  App\Models\Person;
use App\Models\Card;

class ChildController extends Controller
{
    public function showWithCard($id)
{
    // محاولة جلب الطفل
    $child = Child::find($id);

    if (!$child) {
        return response()->json([
            'message' => 'الطفل غير موجود',
        ], 404);
    }

    // جلب آخر بطاقة مرتبطة بالطفل (أو البطاقة الفعالة حسب الحاجة)
    $card = Card::where('child_id', $id)
                ->orderByDesc('created_at')
                ->first();

    return response()->json([
        'child' => $child,
        'card' => $card ? [
            'serial_number' => $card->serial_number,
            'status' => $card->status,
        ] : null,
    ]);
}

}
