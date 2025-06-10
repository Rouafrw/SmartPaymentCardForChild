<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use  App\Models\parents;

class ParentsController extends Controller
{

    public function showParent($id)
    {
        $parent = parents::find($id);

        if (!$parent) {
            return response()->json([
                'message' => ' ولي الأمر غير موجود',
            ], 404);
        }

        return response()->json([
            'parent' => $parent,
        ]);
    }

}
