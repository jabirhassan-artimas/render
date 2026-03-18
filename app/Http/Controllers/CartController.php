<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        // Simple session based cart for now
        $cart = session()->get('cart', []);
        $coupon = session()->get('coupon');
        
        return Inertia::render('Cart', [
            'cart' => $cart,
            'coupon' => $coupon,
        ]);
    }

    public function addToCart(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $cart = session()->get('cart', []);

        $quantity = $request->input('quantity', 1);
        $currentQty = isset($cart[$id]) ? $cart[$id]['quantity'] : 0;

        if ($currentQty + $quantity > $product->stock_qty) {
            return redirect()->back()->with('error', "Sorry, only {$product->stock_qty} items are available in stock.");
        }

        if (isset($cart[$id])) {
            $cart[$id]['quantity'] += $quantity;
        } else {
            $cart[$id] = [
                "name" => $product->name,
                "quantity" => $quantity,
                "price" => $product->price,
                "image" => $product->thumbnail
            ];
        }

        session()->put('cart', $cart);
        return redirect()->back()->with('success', 'Product added to cart successfully!');
    }

    public function update(Request $request)
    {
        if ($request->id && $request->quantity) {
            $product = Product::find($request->id);

            if (!$product) {
                session()->flash('error', 'Product not found.');
                return response()->json(['success' => false], 404);
            }

            if ($request->quantity > $product->stock_qty) {
                session()->flash('error', "Sorry, only {$product->stock_qty} items available.");
                // Return generic error for AJAX to handle, or just flash.
                // For simplicity, we keep the flash message.
                if ($request->ajax()) {
                    return response()->json(['success' => false, 'message' => "Only {$product->stock_qty} available"], 400);
                }
                return redirect()->back();
            }

            $cart = session()->get('cart');
            $cart[$request->id]["quantity"] = $request->quantity;
            session()->put('cart', $cart);

            if ($request->ajax()) {
                session()->flash('success', 'Cart updated successfully');
            } else {
                return redirect()->back()->with('success', 'Cart updated successfully');
            }
        }
    }

    public function remove(Request $request)
    {
        if ($request->id) {
            $cart = session()->get('cart');
            if (isset($cart[$request->id])) {
                unset($cart[$request->id]);
                session()->put('cart', $cart);
            }
            session()->flash('success', 'Product removed successfully');
            if (!$request->ajax()) {
                return redirect()->back()->with('success', 'Product removed successfully');
            }
        }
    }

    public function applyCoupon(Request $request)
    {
        $request->validate(['code' => 'required']);
        $coupon = \App\Models\Coupon::where('code', $request->code)->where('status', true)->first();

        if (!$coupon) {
            return redirect()->back()->with('error', 'Invalid coupon code.');
        }

        if ($coupon->expires_at && now()->gt($coupon->expires_at)) {
            return redirect()->back()->with('error', 'Coupon expired.');
        }

        session()->put('coupon', [
            'code' => $coupon->code,
            'discount_amount' => $coupon->discount_amount,
            'discount_percentage' => $coupon->discount_percentage,
        ]);

        return redirect()->back()->with('success', 'Coupon applied successfully!');
    }

    public function removeCoupon()
    {
        session()->forget('coupon');
        return redirect()->back()->with('success', 'Coupon removed.');
    }
}
