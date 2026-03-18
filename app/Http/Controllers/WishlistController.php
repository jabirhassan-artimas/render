<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wishlist;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WishlistController extends Controller
{
    public function index()
    {
        $wishlists = Wishlist::where('user_id', Auth::id())
            ->with('product')
            ->latest()
            ->paginate(12);
        return Inertia::render('Customer/Wishlist', [
            'wishlists' => $wishlists
        ]);
    }

    public function toggle(Request $request, $productId)
    {
        $user = Auth::user();
        $exists = Wishlist::where('user_id', $user->id)->where('product_id', $productId)->first();

        if ($exists) {
            $exists->delete();
            $message = 'Removed from wishlist.';
            $type = 'removed';
        } else {
            Wishlist::create([
                'user_id' => $user->id,
                'product_id' => $productId
            ]);
            $message = 'Added to wishlist.';
            $type = 'added';
        }

        if ($request->ajax()) {
            return response()->json(['success' => true, 'message' => $message, 'type' => $type]);
        }

        return back()->with('success', $message);
    }

    public function destroy($id)
    {
        $wishlist = Wishlist::where('user_id', Auth::id())->where('id', $id)->firstOrFail();
        $wishlist->delete();
        return back()->with('success', 'Product removed from wishlist.');
    }
}
