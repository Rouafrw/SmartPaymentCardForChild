<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use  App\Models\Card;
use  App\Models\child;
use Illuminate\Support\Str;

class CardController extends Controller
{



    public function store(Request $request)
    {
        $validated = $request->validate([
            'child_id' => 'required|exists:children,id',
            'serial_number' => 'required|numeric|unique:cards,serial_number',
        ]);

        // إلغاء تفعيل أي بطاقة سابقة مفعّلة لهذا الطفل
        Card::where('child_id', $validated['child_id'])
            ->where('status', true)
            ->update(['status' => false]);

        // إنشاء بطاقة جديدة باستخدام الرقم القادم من الطلب
        $card = Card::create([
            'child_id' => $validated['child_id'],
            'serial_number' => $validated['serial_number'],
            'status' => true,
        ]);

        return response()->json([
            'message' => ' تم إنشاء البطاقة بنجاح',
            'data' => $card,
        ], 201);
    }


        

    public function index()
    {
        $cards = Card::all();  

        return response()->json(['data' => $cards], 200);
    }



    public function deactivateCardBySerial($serialNumber)
    {
        $card = Card::where('serial_number', $serialNumber)->first();
    
        if (!$card) {
            return response()->json([
                'error' => 'لم يتم العثور على بطاقة بهذا الرقم'
            ], 404);
        }
    
        if (!$card->status) {
            return response()->json([
                'message' => 'البطاقة بالفعل غير مفعّلة'
            ], 200);
        }
    
        $card->status = false;
        $card->save();
    
        return response()->json([
            'message' => 'تم تعطيل البطاقة بنجاح',
            'serial_number' => $card->serial_number,
            'status' => false
        ]);
    }
    
    public function activateCardBySerial($serialNumber)
{
    $card = Card::where('serial_number', $serialNumber)->first();

    if (!$card) {
        return response()->json([
            'error' => 'لم يتم العثور على بطاقة بهذا الرقم'
        ], 404);
    }

    if ($card->status) {
        return response()->json([
            'message' => 'البطاقة بالفعل مفعّلة'
        ], 200);
    }

    $card->status = true;
    $card->save();

    return response()->json([
        'message' => 'تم تفعيل البطاقة بنجاح',
        'serial_number' => $card->serial_number,
        'status' => true
    ]);
}


    public function getChildInfoBySerial($serial_number)
{
    // جلب البطاقة مع الطفل وعلاقته بالشخص
    $card = Card::with(['child.person'])->where('serial_number', $serial_number)->first();

    if (!$card) {
        return response()->json(['error' => 'لم يتم العثور على بطاقة بهذا الرقم'], 404);
    }

    $child = $card->child;

    if (!$child) {
        return response()->json(['error' => 'لا يوجد طفل مرتبط بهذه البطاقة'], 404);
    }

    $person = $child->person;

    return response()->json([
        'child_name' => $person->name ?? 'غير معروف',
        'national_number' => $child->National_number ?? 'غير محدد',
        'grade' => $child->grade,
        'balance' => $child->balance,
        'daily_balance' => $child->daily_balance,
        'points' => $child->points,
        'card_status' => $card->status ? 'مفعّلة' : 'غير مفعّلة',
        'card_serial_number' => $card->serial_number,
    ]);
}


}
