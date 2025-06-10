<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use  App\Models\Person;
use  App\Models\Employee;
use  App\Models\child;
use  App\Models\parents;
use  App\Models\forbidden_food;

use Illuminate\Support\Facades\DB;




class PersonController extends Controller
{

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'National_number' => 'required|unique:people,National_number',
            'name' => 'required',
            'type' => 'required|in:child,employee,parents',
            'grade' => 'nullable|required_if:type,child',
            'balance' => 'nullable|numeric|required_if:type,child',
            // 'forbidden_foods' => 'nullable|json|required_if:type,child',
            'points' => 'nullable|integer|required_if:type,child',
            // 'card_serial_number' => 'nullable|unique:children,card_serial_number|required_if:type,child',
            'parent_id' => 'nullable|exists:parents,id|required_if:type,child',
            'phone_number' => 'nullable|required_if:type,parents',
            'E_mail' => 'nullable|required_if:type,parents',
            'job_title' => 'nullable|required_if:type,employee',
            'salary' => 'nullable|numeric|required_if:type,employee',
            'password' => 'nullable|required_if:type,employee,parents|min:8',
            'daily_balance' => 'nullable|numeric|required_if:type,child',
        ]);

        $person = Person::create([
            'National_number' => $validatedData['National_number'],
            'name' => $validatedData['name'],
            'type' => $validatedData['type'],
        ]);

        if ($validatedData['type'] === 'child') {
            Child::create([
                'National_number' => $validatedData['National_number'],
                'grade' => $validatedData['grade'],
                'balance' => $validatedData['balance'],
                // 'forbidden_foods' => $validatedData['forbidden_foods'], // لأن البيانات تأتي بالفعل كمصفوفة
                'points' => $validatedData['points'],
                // 'card_serial_number' => $validatedData['card_serial_number'],
                'parent_id' => $validatedData['parent_id'],
                'daily_balance'=> $validatedData['daily_balance'],]);
                if ($request->has('forbidden_products') && is_array($request->forbidden_products)) {
                    foreach ($request->forbidden_products as $item) {
                        forbidden_food::create([
                            'child_id' => $child->id,
                            'product_name' => $item,
                        ]);
                    }
                }
           
        }

        if ($validatedData['type'] === 'employee') {
            Employee::create([
                'National_number' => $validatedData['National_number'],
                'job_title' => $validatedData['job_title'],
                'salary' => $validatedData['salary'],
                'password' => $validatedData['password'],

            ]);
        }

        if ($validatedData['type'] === 'parents') {
            parents::create([
                'National_number' => $validatedData['National_number'],
                'phone_number' => $validatedData['phone_number'],
                'E_mail' => $validatedData['E_mail'],
                'password' => $validatedData['password'],


            ]);
        }

        return response()->json(['message' => 'تمت إضافة الشخص بنجاح', 'data' => $person], 201);
    }





    public function index()
    {
        $people = Person::all();  

        return response()->json(['data' => $people], 200);
    }



    public function update(Request $request, $National_number)
    {
        $validatedData = $request->validate([
            'key' => 'required|string|in:name,type,grade,balance,points,parent_id,phone_number,E_mail,job_title,salary,password,daily_balance,forbidden_product',
            'value' => 'required',
        ]);
    
        $person = Person::where('National_number', $National_number)->first();
    
        if (!$person) {
            return response()->json([
                'message' => 'لا يوجد شخص بهذا الرقم الوطني',
            ], 404);
        }
    
        if (in_array($validatedData['key'], ['name', 'type'])) {
            $person->update([$validatedData['key'] => $validatedData['value']]);
        }
    
        elseif ($person->type === 'child') {
            $child = Child::where('National_number', $National_number)->first();
    
            if (!$child) {
                return response()->json(['message' => 'الطفل غير موجود'], 404);
            }
    
            if (in_array($validatedData['key'], ['grade', 'balance', 'points', 'daily_balance'])) {
                $child->update([$validatedData['key'] => $validatedData['value']]);
            }
            elseif ($validatedData['key'] === 'forbidden_product') {
                $exists = $child->forbiddenItems()
                                ->where('product_name', $validatedData['value'])
                                ->exists();
    
                if ($exists) {
                    return response()->json([
                        'message' => 'هذا المنتج محظور بالفعل لهذا الطفل',
                    ], 409);
                }
    
                $child->forbiddenItems()->create([
                    'product_name' => $validatedData['value'],
                ]);
            }
            else {
                return response()->json([
                    'message' => 'لا يمكن تعديل هذا الحقل لهذا الطفل',
                ], 400);
            }
        }
    
        elseif ($person->type === 'employee' && in_array($validatedData['key'], ['job_title', 'salary', 'password'])) {
            $data = $validatedData['key'] === 'password'
                ? bcrypt($validatedData['value'])
                : $validatedData['value'];
    
            Employee::where('National_number', $National_number)
                ->update([$validatedData['key'] => $data]);
        }
    
        elseif ($person->type === 'parents' && in_array($validatedData['key'], ['phone_number', 'E_mail', 'password'])) {
            $data = $validatedData['key'] === 'password'
                ? bcrypt($validatedData['value'])
                : $validatedData['value'];
    
            parents::where('National_number', $National_number)
                ->update([$validatedData['key'] => $data]);
        }
    
        else {
            return response()->json([
                'message' => 'لا يمكن تعديل هذا الحقل لهذا النوع من الأشخاص',
            ], 400);
        }
    
        return response()->json([
            'message' => 'تم تعديل البيانات بنجاح',
            'data' => [
                'type' => $person->type,
                'field' => $validatedData['key'],
                'value' => $validatedData['value'],
            ],
        ]);
    }    
    


    public function indexByType(Request $request)
        {
            $type = $request->query('type'); // 'employee', 'child', or 'parents'

            $validTypes = ['employee', 'child', 'parents'];
            if (!in_array($type, $validTypes)) {
                return response()->json(['error' => 'نوع غير معروف'], 400);
            }

            // استعلام مشترك حسب النوع
            switch ($type) {
                case 'employee':
                    $data = DB::table('people')
                        ->join('employees', 'people.National_number', '=', 'employees.National_number')
                        ->where('people.type', 'employee')
                        ->select(
                            'people.name',
                            'people.National_number',
                            'employees.job_title',
                            'employees.salary',
                            'employees.created_at'
                        )
                        ->get();
                    break;

                case 'child':
                    $data = DB::table('people')
                        ->join('children', 'people.National_number', '=', 'children.National_number')
                        ->where('people.type', 'child')
                        ->select(
                            'children.id',
                            'people.name',
                            'people.National_number',
                            'children.grade',
                            'children.balance',
                            'children.daily_balance',
                            'children.points',
                            'children.created_at'
                        )
                        ->get();
                    break;

                case 'parents':
                    // على فرض عندك جدول 'parents' فيه National_number ومعلومات إضافية
                    $data = DB::table('people')
                        ->join('parents', 'people.National_number', '=', 'parents.National_number')
                        ->where('people.type', 'parents')
                        ->select(
                            'people.name',
                            'people.National_number',
                            'parents.created_at'
                        )
                        ->get();
                    break;
            }


    

            return response()->json([
                'type' => $type,
                'count' => $data->count(),
                'people' => $data
            ]);
        }






        


}
