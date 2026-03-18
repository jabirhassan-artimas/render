@extends('layouts.admin')

@section('title', 'Promo Coupons')

@section('content')
    <div class="product-dashboard">
        <div class="flex justify-between items-center mb-6">
            <h3 style="font-weight: 800; color: #2b3674; margin: 0;">Discount Coupons</h3>
            <a href="{{ route('admin.coupons.create') }}" class="btn"
                style="background: linear-gradient(135deg, #4361ee 0%, #4cc9f0 100%); color: white; border-radius: 12px; padding: 0.75rem 1.5rem; font-weight: 700; border: none; box-shadow: 0 4px 15px rgba(67, 97, 238, 0.3);">
                <i class="fas fa-plus mr-2"></i> CREATE COUPON
            </a>
        </div>

        <!-- Search & Filters -->
        <div class="filter-card mb-6">
            <form action="{{ route('admin.coupons.index') }}" method="GET" class="flex flex-wrap items-center gap-4">
                <div class="search-wrapper">
                    <i class="fas fa-search"></i>
                    <input type="text" name="search" value="{{ request('search') }}" class="search-input"
                        placeholder="Search by coupon code (e.g. SAVE20)...">
                </div>

                <select name="per_page" class="premium-select" onchange="this.form.submit()">
                    <option value="10" {{ request('per_page') == 10 ? 'selected' : '' }}>10 Per Page</option>
                    <option value="25" {{ request('per_page') == 25 ? 'selected' : '' }}>25 Per Page</option>
                    <option value="50" {{ request('per_page') == 50 ? 'selected' : '' }}>50 Per Page</option>
                </select>
            </form>
        </div>

        <div class="card-premium" style="overflow-x: auto;">
            <table class="premium-table">
                <thead>
                    <tr>
                        <th>COUPON CODE</th>
                        <th>DISCOUNT</th>
                        <th>EXPIRY DATE</th>
                        <th>STATUS</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($coupons as $coupon)
                        <tr>
                            <td>
                                <div class="flex items-center gap-3">
                                    <div
                                        style="width: 40px; height: 40px; border-radius: 10px; background: #eef2ff; color: #4361ee; display: flex; align-items: center; justify-content: center;">
                                        <i class="fas fa-ticket-alt"></i>
                                    </div>
                                    <span
                                        style="font-weight: 800; color: #4361ee; font-family: monospace; font-size: 1.1rem; letter-spacing: 1px;">{{ $coupon->code }}</span>
                                </div>
                            </td>
                            <td>
                                <div style="font-weight: 800; color: #2b3674; font-size: 1rem;">
                                    @if($coupon->discount_amount)
                                        ৳{{ number_format($coupon->discount_amount, 2) }}
                                    @else
                                        {{ $coupon->discount_percentage }}% OFF
                                    @endif
                                </div>
                            </td>
                            <td>
                                <div style="color: #707eae; font-weight: 600; font-size: 0.85rem;">
                                    <i class="far fa-calendar-alt mr-1"></i>
                                    {{ $coupon->expires_at ? $coupon->expires_at->format('d M, Y') : 'Life-time' }}
                                </div>
                            </td>
                            <td>
                                <span class="premium-badge {{ $coupon->status ? 'status-active' : 'status-inactive' }}"
                                    style="background: {{ $coupon->status ? '#eefdf5' : '#fff1f2' }}; color: {{ $coupon->status ? '#05cd99' : '#ee5d50' }};">
                                    {{ $coupon->status ? 'Active' : 'Expired/Inactive' }}
                                </span>
                            </td>
                            <td>
                                <div class="flex gap-2">
                                    <a href="{{ route('admin.coupons.edit', $coupon->id) }}" class="btn"
                                        style="width: 38px; height: 38px; border-radius: 10px; background: #f4f7fe; color: #4361ee; display: flex; align-items: center; justify-content: center; padding: 0;">
                                        <i class="fas fa-pen-nib"></i>
                                    </a>
                                    <form action="{{ route('admin.coupons.destroy', $coupon->id) }}" method="POST"
                                        onsubmit="return confirm('Archive this coupon?')">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn"
                                            style="width: 38px; height: 38px; border-radius: 10px; background: #fff1f2; color: #ee5d50; display: flex; align-items: center; justify-content: center; padding: 0; border: none;">
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <div class="pagination-wrapper mt-6">
            {{ $coupons->links() }}
        </div>
    </div>
@endsection