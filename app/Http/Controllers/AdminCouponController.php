<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Coupon;
use Inertia\Inertia;

class AdminCouponController extends Controller
{
    public function index(Request $request)
    {
        $query = Coupon::query();

        if ($request->has('search')) {
            $query->where('code', 'like', '%' . $request->search . '%');
        }

        $perPage = $request->get('per_page', 10);
        $coupons = $query->latest()->paginate($perPage)->withQueryString();

        return Inertia::render('Admin/Coupons/Index', [
            'coupons' => $coupons,
            'filters' => $request->only(['search'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Coupons/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|unique:coupons',
            'discount_amount' => 'nullable|numeric',
            'discount_percentage' => 'nullable|integer|min:1|max:100',
            'expires_at' => 'nullable|date',
        ]);

        Coupon::create([
            'code' => strtoupper($request->code),
            'discount_amount' => $request->discount_amount,
            'discount_percentage' => $request->discount_percentage,
            'expires_at' => $request->expires_at,
            'status' => $request->has('status'),
        ]);

        return redirect()->route('admin.coupons.index')->with('success', 'Coupon created successfully.');
    }

    public function edit(Coupon $coupon)
    {
        return Inertia::render('Admin/Coupons/Edit', [
            'coupon' => $coupon
        ]);
    }

    public function update(Request $request, Coupon $coupon)
    {
        $request->validate([
            'code' => 'required|unique:coupons,code,' . $coupon->id,
            'discount_amount' => 'nullable|numeric',
            'discount_percentage' => 'nullable|integer|min:1|max:100',
            'expires_at' => 'nullable|date',
        ]);

        $coupon->update([
            'code' => strtoupper($request->code),
            'discount_amount' => $request->discount_amount,
            'discount_percentage' => $request->discount_percentage,
            'expires_at' => $request->expires_at,
            'status' => $request->has('status'),
        ]);

        return redirect()->route('admin.coupons.index')->with('success', 'Coupon updated successfully.');
    }

    public function destroy(Coupon $coupon)
    {
        $coupon->delete();
        return redirect()->route('admin.coupons.index')->with('success', 'Coupon deleted successfully.');
    }
}
