<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;

use Inertia\Inertia;

class AdminReviewController extends Controller
{
    public function index()
    {
        $reviews = Review::with('product', 'user')->latest()->get();
        return Inertia::render('Admin/Reviews/Index', [
            'reviews' => $reviews
        ]);
    }

    public function update(Request $request, $id)
    {
        $review = Review::findOrFail($id);
        $review->status = !$review->status; // Toggle status
        $review->save();

        return redirect()->back()->with('success', 'Review status updated.');
    }

    public function destroy($id)
    {
        $review = Review::findOrFail($id);
        $review->delete();

        return redirect()->back()->with('success', 'Review deleted.');
    }
}
