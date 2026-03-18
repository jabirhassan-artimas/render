<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Order;
use App\Models\User;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();
        $recentOrders = Order::where('user_id', $user->id)->latest()->take(5)->get();
        $totalOrders = Order::where('user_id', $user->id)->count();
        $pendingOrders = Order::where('user_id', $user->id)->where('order_status', 'pending')->count();
        $completedOrders = Order::where('user_id', $user->id)->where('order_status', 'delivered')->count();

        return Inertia::render('Customer/Dashboard', [
            'user' => $user,
            'recentOrders' => $recentOrders,
            'totalOrders' => $totalOrders,
            'pendingOrders' => $pendingOrders,
            'completedOrders' => $completedOrders,
        ]);
    }

    public function orders()
    {
        $orders = Order::where('user_id', Auth::id())->latest()->paginate(10);
        return Inertia::render('Customer/Orders', [
            'orders' => $orders
        ]);
    }

    public function orderShow(Order $order)
    {
        if ($order->user_id !== Auth::id()) {
            abort(403);
        }
        $order->load('items');
        return Inertia::render('Customer/OrderShow', [
            'order' => $order
        ]);
    }

    public function profile()
    {
        $user = Auth::user();
        return Inertia::render('Customer/Profile', [
            'user' => $user
        ]);
    }

    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:500',
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        $user->name = $request->name;
        $user->phone = $request->phone;
        $user->address = $request->address;

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        /** @var \App\Models\User $user */
        $user->save();

        return back()->with('success', 'Profile updated successfully.');
    }

    public function addresses()
    {
        $user = Auth::user();
        return view('customer.search_address', compact('user'));
    }

    public function cancelOrder(Order $order)
    {
        if ($order->user_id !== Auth::id()) {
            abort(403);
        }

        if ($order->order_status !== 'pending') {
            return back()->with('error', 'Only pending orders can be cancelled.');
        }

        $order->update(['order_status' => 'cancelled']);

        // Log History
        \App\Models\OrderHistory::create([
            'order_id' => $order->id,
            'user_id' => Auth::id(),
            'action' => 'cancelled',
            'description' => 'Order cancelled by customer.',
        ]);

        return back()->with('success', 'Order has been cancelled successfully.');
    }
}
