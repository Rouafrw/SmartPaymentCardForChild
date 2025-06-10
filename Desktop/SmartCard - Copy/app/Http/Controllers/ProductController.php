<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use  App\Models\product;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|unique:products|max:255',
            'kind' => 'required|in:foods,Stationery',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'price_in_points' => 'required|integer|min:0',
            'barcode' => 'required|digits:13|unique:products,barcode',
            
             ]);
    
        $product = Product::create($validatedData);
    
        return response()->json(['message' => 'تمت إضافة المنتج بنجاح', 'data' => $product], 201);
    }



    public function indexFoods()
    {
        $products = Product::where('kind','foods')->orderBy('created_at', 'desc')->get();
        return response()->json(['message' => 'تم جلب جميع المنتجات من نوع foods بنجاح', 'data' => $products], 200);
    }


    public function indexStationery()
    {
        $products = Product::where('kind','Stationery')->orderBy('created_at','desc')->get();
        return response()->json(['message' => 'تم جلب جميع المنتجات من نوع Stationery بنجاح', 'data' => $products], 200);
    }
  

    public function update(Request $request, $name)
    {
        $validatedData = $request->validate([
            'key' => 'required|in:kind,price,description,price_in_points',
            'value' => 'required',
        ]);

        $product = Product::where('name', '=', $name)->firstOrFail();

        $product->update([
            $validatedData['key'] => $validatedData['value']
        ]);

        return response()->json([
            'message' => ' تم تعديل المنتج بنجاح',
            'data' => [
                'name' => $product->name,
                $validatedData['key'] => $validatedData['value'],
            ]
        ], 200);
    }

    


    public function destroy($name)
    {
        $product = Product::where('name', '=', $name)->firstOrFail();
        $product->delete();

        return response()->json(['message' => 'تم حذف المنتج بنجاح'], 200);
    }






    

}
