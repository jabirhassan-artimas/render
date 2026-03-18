<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function checkout()
    {
        $cart = session()->get('cart', []);
        if (!$cart) {
            return redirect()->route('cart')->with('error', 'Cart is empty');
        }
        
        $coupon = session()->get('coupon');
        $shipping_methods = \App\Models\ShippingMethod::where('status', true)->get();
        $payment_gateways = \App\Models\PaymentGateway::where('status', true)->get();
        
        return Inertia::render('Checkout', [
            'cart' => $cart,
            'coupon' => $coupon,
            'shipping_methods' => $shipping_methods,
            'payment_gateways' => $payment_gateways,
        ]);
    }

    public function placeOrder(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'phone' => 'required',
            'address' => 'required',
            'shipping_method_id' => 'required|exists:shipping_methods,id',
            'payment_method' => 'required|exists:payment_gateways,code',
        ]);

        $cart = session()->get('cart');
        if (!$cart) {
            return redirect()->route('cart')->with('error', 'Cart is empty');
        }

        // 1. Advance Validation: Check Stock & Calculate Total accurately
        $subtotal = 0;
        foreach ($cart as $id => $item) {
            $product = \App\Models\Product::find($id);
            if (!$product) {
                return redirect()->route('cart')->with('error', "Product ID {$id} not found.");
            }
            if ($product->stock_qty < $item['quantity']) {
                return redirect()->route('cart')->with('error', "Sorry, {$product->name} does not have enough stock. Available: {$product->stock_qty}");
            }
            // Use DB price for security
            $price = $product->discount_price > 0 ? $product->discount_price : $product->price;
            $subtotal += $price * $item['quantity'];

            // Update cart session price just in case simple logic uses it later (though we use DB price for order)
            $cart[$id]['price'] = $price;
        }

        $shippingMethod = \App\Models\ShippingMethod::findOrFail($request->shipping_method_id);
        $shipping_cost = $shippingMethod->cost;

        // Calculate Discount
        $discount = 0;
        if (session()->has('coupon')) {
            if (session('coupon')['discount_amount']) {
                $discount = session('coupon')['discount_amount'];
            } elseif (session('coupon')['discount_percentage']) {
                $discount = ($subtotal * session('coupon')['discount_percentage']) / 100;
            }
        }

        $total = ($subtotal + $shipping_cost) - $discount;
        if ($total < 0)
            $total = 0;

        // 2. Advance Reward Logic
        $discount_on_advance = 0;
        if ($request->payment_method !== 'cod') {
            $discount_on_advance = round(($subtotal * 0.05)); // 5% reward for digital payment
            $total -= $discount_on_advance;
        }

        // 3. Auto Courier Assignment
        $courier = \App\Models\Courier::where('status', true)->first(); // Simple logic: pick first active

        // 4. Create Order
        $order = Order::create([
            'user_id' => Auth::id(),
            'subtotal' => $subtotal,
            'total' => max(0, $total),
            'discount' => $discount,
            'shipping_cost' => $shipping_cost,
            'payment_method' => $request->payment_method,
            'payment_status' => 'pending',
            'shipping_address' => $request->address,
            'shipping_method' => $shippingMethod->name,
            'billing_address' => $request->address,
            'phone' => $request->phone,
            'order_number' => 'ORD-' . strtoupper(Str::random(10)),
            'order_status' => 'pending',
            'order_source' => $request->header('User-Agent') && str_contains(strtolower($request->header('User-Agent')), 'mobile') ? 'mobile' : 'web',
            'courier_id' => $courier ? $courier->id : null,
            'advance_payment_amount' => $request->payment_method !== 'cod' ? $total : 0,
            'discount_on_advance' => $discount_on_advance,
        ]);

        // 3. Create Items & Deduct Stock
        foreach ($cart as $id => $item) {
            $product = \App\Models\Product::find($id);

            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $id,
                'product_name' => $product->name,
                'qty' => $item['quantity'],
                'price' => $cart[$id]['price'], // Secured price
                'total' => $cart[$id]['price'] * $item['quantity']
            ]);

            // Deduct Stock
            $product->decrement('stock_qty', $item['quantity']);
        }

        session()->forget('cart');

        if ($request->payment_method !== 'cod') {
            // Note: In real life, redirect to SSLCommerz/Stripe here. For now, we simulate success.
            return redirect()->route('customer.orders.show', ['order' => $order->id])->with('success', 'Order placed successfully! Order #' . $order->order_number);
        }

        return redirect()->route('customer.orders.show', ['order' => $order->id])->with('success', 'Order placed successfully! Order #' . $order->order_number);
    }
}
