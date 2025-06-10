<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use  App\Models\Employee;

class EmployeeController extends Controller
{

    public function showEmployee($id)
    {
        $employee = Employee::find($id);

        if (!$employee) {
            return response()->json([
                'message' => 'الموظف غير موجود',
            ], 404);
        }

        return response()->json([
            'employee' => $employee,
        ]);
    }

}
