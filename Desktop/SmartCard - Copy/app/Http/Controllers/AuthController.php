<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Person;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    

   
    public function login(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'password' => 'required|string',
        ]);

        $person = Person::where('name', $validated['name'])->first();

        if (!$person) {
            return response()->json(['error' => 'اسم المستخدم غير موجود'], 404);
        }

        if ($person->employee && $person->employee->password === $validated['password']) {
            $job_title = $person->employee->job_title;
    
            $interface = match ($job_title) {
                'Financial Employee'  => 'واجهة موظف المالية',
                'Library employee'    => 'واجهة موظف المكتبة',
                'Sales employee'  => 'واجهة موظف البيع',
                'admin'        => 'واجهة المدير العام',
                default       => 'واجهة موظف عامة',
            };
    
            return response()->json([
                'message' => 'تم تسجيل الدخول كـ موظف',
                'type' => 'employee',
                'job_title' => $job_title,
                'redirect_to' => $interface
            ]);
        }
    
        if ($person->parents && $person->parents->password === $validated['password']) {
            return response()->json([
                'message' => 'تم تسجيل الدخول كـ ولي أمر',
                'type' => 'parents',
                'redirect_to' => 'واجهة ولي الأمر'
            ]);
        }
    
        return response()->json(['error' => 'كلمة المرور غير صحيحة أو لا يمكن التحقق من النوع'], 401);
    }
}
