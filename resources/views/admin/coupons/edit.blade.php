@extends('layouts.admin')

@section('title', 'Edit Coupon')

@section('content')
    <div class="card" style="max-width: 600px;">
        <form action="{{ route('admin.coupons.update', $coupon->id) }}" method="POST">
            @csrf
            @method('PUT')

            <div class="form-group">
                <label class="form-label">Coupon Code</label>
                <input type="text" name="code" class="form-control" value="{{ $coupon->code }}" required>
            </div>

            <div class="grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                    <label class="form-label">Discount Amount (৳)</label>
                    <input type="number" name="discount_amount" class="form-control" step="0.01"
                        value="{{ $coupon->discount_amount }}">
                </div>
                <div class="form-group">
                    <label class="form-label">Discount Percentage (%)</label>
                    <input type="number" name="discount_percentage" class="form-control" min="1" max="100"
                        value="{{ $coupon->discount_percentage }}">
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">Expires At</label>
                <input type="datetime-local" name="expires_at" class="form-control"
                    value="{{ $coupon->expires_at ? $coupon->expires_at->format('Y-m-d\TH:i') : '' }}">
            </div>

            <div class="form-group">
                <label class="flex items-center gap-2">
                    <input type="checkbox" name="status" {{ $coupon->status ? 'checked' : '' }}> Active
                </label>
            </div>

            <button type="submit" class="btn btn-primary">Update Coupon</button>
        </form>
    </div>
@endsection