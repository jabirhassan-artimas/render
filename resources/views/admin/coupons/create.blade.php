@extends('layouts.admin')

@section('title', 'Add Coupon')

@section('content')
    <div class="card" style="max-width: 600px;">
        <form action="{{ route('admin.coupons.store') }}" method="POST">
            @csrf
            <div class="form-group">
                <label class="form-label">Coupon Code</label>
                <input type="text" name="code" class="form-control" placeholder="e.g. SUMMER2024" required>
            </div>

            <div class="grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                    <label class="form-label">Discount Amount (৳)</label>
                    <input type="number" name="discount_amount" class="form-control" step="0.01">
                </div>
                <div class="form-group">
                    <label class="form-label">Discount Percentage (%)</label>
                    <input type="number" name="discount_percentage" class="form-control" min="1" max="100">
                </div>
            </div>
            <p class="text-light mb-4 text-sm" style="font-size: 0.8rem;">Fill either Amount OR Percentage.</p>

            <div class="form-group">
                <label class="form-label">Expires At</label>
                <input type="datetime-local" name="expires_at" class="form-control">
            </div>

            <div class="form-group">
                <label class="flex items-center gap-2">
                    <input type="checkbox" name="status" checked> Active
                </label>
            </div>

            <button type="submit" class="btn btn-primary">Save Coupon</button>
        </form>
    </div>
@endsection