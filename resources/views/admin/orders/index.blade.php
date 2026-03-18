@extends('layouts.admin')

@section('title', 'Sales Orders')

@section('content')
    <div class="product-dashboard">
        <div class="flex justify-between items-center mb-6">
            <h3 style="font-weight: 800; color: #2b3674; margin: 0;">Order Management</h3>
        </div>

        <!-- Search & Filters -->
        <div class="filter-card mb-6">
            <form action="{{ route('admin.orders.index') }}" method="GET" class="flex flex-wrap items-center gap-4">
                <div class="search-wrapper">
                    <i class="fas fa-search"></i>
                    <input type="text" name="search" value="{{ request('search') }}" class="search-input"
                        placeholder="Search by Order ID (e.g. 1001)...">
                </div>

                <select name="status" class="premium-select" onchange="this.form.submit()">
                    <option value="">All Statuses</option>
                    <option value="pending" {{ request('status') == 'pending' ? 'selected' : '' }}>Pending</option>
                    <option value="processing" {{ request('status') == 'processing' ? 'selected' : '' }}>Processing</option>
                    <option value="shipped" {{ request('status') == 'shipped' ? 'selected' : '' }}>Shipped</option>
                    <option value="delivered" {{ request('status') == 'delivered' ? 'selected' : '' }}>Delivered</option>
                    <option value="cancelled" {{ request('status') == 'cancelled' ? 'selected' : '' }}>Cancelled</option>
                </select>

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
                        <th>ORDER ID</th>
                        <th>CUSTOMER</th>
                        <th>TOTAL</th>
                        <th>STATUS</th>
                        <th>DATE</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($orders as $order)
                        <tr>
                            <td>
                                <span
                                    style="font-weight: 800; color: #4361ee; font-family: monospace;">#{{ $order->order_number }}</span>
                            </td>
                            <td>
                                <div class="flex items-center gap-3">
                                    <div
                                        style="width: 35px; height: 35px; border-radius: 50%; background: #eff6ff; color: #4361ee; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.8rem;">
                                        {{ substr($order->user->name ?? 'G', 0, 1) }}
                                    </div>
                                    <div style="font-weight: 700; color: #2b3674;">{{ $order->user->name ?? 'Guest' }}</div>
                                </div>
                            </td>
                            <td>
                                <div style="font-weight: 800; color: #2b3674;">৳{{ number_format($order->total, 2) }}</div>
                            </td>
                            <td>
                                <span class="premium-badge"
                                    style="background: {{ $order->order_status == 'delivered' ? '#eefdf5' : ($order->order_status == 'pending' ? '#fff9e6' : '#eff6ff') }}; color: {{ $order->order_status == 'delivered' ? '#05cd99' : ($order->order_status == 'pending' ? '#ffb547' : '#4361ee') }};">
                                    {{ $order->order_status }}
                                </span>
                            </td>
                            <td>
                                <div style="color: #707eae; font-weight: 600; font-size: 0.85rem;">
                                    {{ $order->created_at->format('d M, Y') }}</div>
                            </td>
                            <td>
                                <div class="flex gap-2">
                                    <a href="{{ route('admin.orders.show', $order->id) }}" class="btn"
                                        style="width: 38px; height: 38px; border-radius: 10px; background: #f4f7fe; color: #4361ee; display: flex; align-items: center; justify-content: center; padding: 0;"
                                        title="View Order">
                                        <i class="fas fa-eye"></i>
                                    </a>
                                </div>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <div class="pagination-wrapper mt-6">
            {{ $orders->links() }}
        </div>
    </div>
@endsection