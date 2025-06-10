<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use  App\Models\Book;
// use  App\Models\child;

class BookController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
        'title' => 'required',
        'points' => 'required',
        'kind' => 'required',
        // 'is_borrowed' => 'required',
        // 'author' => 'required',
        ]);
        $book = Book::create($request->all());
        return response()->json($book);
    }


    public function index(Request $request)
    {
        $query = Book::query();
        if ($search = $request->input('search')) 
        {
            $query->where('title', 'like', "%$search%")->orWhere('author', 'like', "%$search%");
        }
        $books = $query->get();
        return response()->json($books);
    }

    public function updateByTitle(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'field' => 'required|string',
            'value' => 'required',
        ]);

        // جلب الكتاب حسب العنوان
        $book = Book::where('title', $request->title)->first();

        if (!$book) {
            return response()->json([
                'message' => 'الكتاب غير موجود',
            ], 404);
        }

        // التعديل حسب الحقل والقيمة المطلوبة
        $field = $request->field;
        $value = $request->value;

        // التحقق من أن الحقل موجود ضمن الأعمدة المسموحة
        if (!in_array($field, ['author', 'points', 'kind', 'is_borrowed'])) {
            return response()->json([
                'message' => 'لا يمكن تعديل هذا الحقل',
            ], 400);
        }

        $book->$field = $value;
        $book->save();

        return response()->json([
            'message' => '✔️ تم التعديل بنجاح',
            'data' => $book,
        ]);
    }


    public function destroy(Book $book)
    {
        $book->delete();
        return response()->json(['message' => 'Book deleted']);
    }
 

}
