<?php

namespace App\Http\Controllers;

use App\Models\BookBorrow;
use App\Models\Book;
use  App\Models\child;
use Illuminate\Http\Request;

class BookBorrowController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'child_id' => 'required|exists:children,id',
            'book_id' => 'required|exists:books,id',
        ]);
        $book = Book::find($request->book_id);
        if ($book->is_borrowed) 
        {
            return response()->json(['message' => 'Book already borrowed'], 400);
        }
        $borrow = BookBorrow::create([
            'child_id' => $request->child_id,
            'book_id' => $request->book_id,
            'borrowed_at' => now(),
        ]);
        $book->update(['is_borrowed' => true]);
        return response()->json($borrow);
    }

    public function returnBook($id)
    {
        $borrow = BookBorrow::findOrFail($id);
        if ($borrow->returned_at)
        {
            return response()->json(['message' => 'Book already returned'], 400);
        }
        $borrow->update(['returned_at' => now()]);
        $borrow->book->update(['is_borrowed' => false]);
        return response()->json(['message' => 'Book returned successfully']);
    }

    public function index()
    {
        return BookBorrow::with('child', 'book')->get();
    }

    public function getBorrowsByChild($child_id)
    {
        $borrows = BookBorrow::with('book')->where('child_id', $child_id)->get();
        return response()->json($borrows);
    }

    public function getBorrowsByBook($book_id)
    {
        $borrows = BookBorrow::with('child')->where('book_id', $book_id)->get();
        return response()->json($borrows);
    }
}
