@extends('layouts.app')

@section('title', 'My Orders')

@section('content')
    <div class="dashboard-page" style="padding: 4rem 0; background: #f8fafc; min-height: 80vh;">
        <div class="container">
            <div class="dashboard-layout" style="display: grid; grid-template-columns: 280px 1fr; gap: 3rem;">

                <!-- Sidebar -->
                <div class="sidebar-col">
                    @include('customer.sidebar')
                </div>

                <!-- Main Content -->
                <div class="content-col">

                    <div class="card-header mb-4 flex justify-between items-center" style="margin-bottom: 2rem;">
                        <div>
                            <h1
                                style="font-size: 1.75rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem;">
                                My Orders</h1>
                            <p style="color: var(--text-light);">Track and view your order history.</p>
                        </div>
                    </div>

                    <div class="card"
                        style="background: white; border-radius: 16px; box-shadow: var(--shadow-sm); padding: 2rem; overflow: hidden;">
                        <div class="table-responsive" style="overflow-x: auto;">
                            <table style="width: 100%; border-collapse: separate; border-spacing: 0 0.5rem;">
                                <thead>
                                    <tr>
                                        <th
                                            style="text-align: left; padding: 1rem; color: var(--text-light); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
                                            Order ID</th>
                                        <th
                                            style="text-align: left; padding: 1rem; color: var(--text-light); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
                                            Date</th>
                                        <th
                                            style="text-align: left; padding: 1rem; color: var(--text-light); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
                                            Total</th>
                                        <th
                                            style="text-align: left; padding: 1rem; color: var(--text-light); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
                                            Status</th>
                                        <th
                                            style="text-align: right; padding: 1rem; color: var(--text-light); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
                                            Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @forelse($orders as $order)
                                        <tr class="order-row" style="transition: all 0.2s;">
                                            <td
                                                style="padding: 1rem; background: #f8fafc; border-radius: 8px 0 0 8px; font-family: monospace; font-weight: 600; color: var(--text-main);">
                                                #{{ $order->order_number }}</td>
                                            <td style="padding: 1rem; background: #f8fafc; color: var(--text-main);">
                                                {{ $order->created_at->format('M d, Y') }}</td>
                                            <td
                                                style="padding: 1rem; background: #f8fafc; font-weight: 600; color: var(--text-main);">
                                                ৳{{ number_format($order->total, 2) }}</td>
                                            <td style="padding: 1rem; background: #f8fafc;">
                                                @php
                                                    $statusColor = 'bg-gray-100 text-gray-800';
                                                    if ($order->order_status == 'pending')
                                                        $statusColor = 'background: #fffbeb; color: #d97706; border: 1px solid #fcd34d;';
                                                    elseif ($order->order_status == 'processing')
                                                        $statusColor = 'background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe;';
                                                    elseif ($order->order_status == 'delivered')
                                                        $statusColor = 'background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0;';
                                                    elseif ($order->order_status == 'cancelled')
                                                        $statusColor = 'background: #fef2f2; color: #dc2626; border: 1px solid #fecaca;';
                                                @endphp
                                                <span
                                                    style="padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; {{ $statusColor }}">
                                                    {{ ucfirst($order->order_status) }}
                                                </span>
                                            </td>
                                            <td
                                                style="padding: 1rem; background: #f8fafc; border-radius: 0 8px 8px 0; text-align: right;">
                                                <a href="{{ route('customer.orders.show', $order->id) }}" class="btn-icon"
                                                    style="color: var(--text-light); transition: 0.2s; font-weight: 600; font-size: 0.9rem;"
                                                    title="View Details">
                                                    View <i class="fas fa-arrow-right ml-1"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    @empty
                                        <tr>
                                            <td colspan="5"
                                                style="text-align: center; padding: 4rem; color: var(--text-light);">
                                                <div
                                                    style="margin-bottom: 1rem; font-size: 3rem; color: #cbd5e1; opacity: 0.5;">
                                                    <i class="fas fa-box-open"></i></div>
                                                <p style="font-size: 1.1rem; margin-bottom: 1rem;">You haven't placed any orders
                                                    yet.</p>
                                                <a href="{{ route('shop') }}" class="btn btn-primary"
                                                    style="padding: 0.75rem 2rem; border-radius: 50px;">Start Shopping</a>
                                            </td>
                                        </tr>
                                    @endforelse
                                </tbody>
                            </table>
                        </div>

                        <div class="mt-4" style="margin-top: 2rem;">
                            {{ $orders->links() }}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <style>
        .order-row:hover td {
            background: #eff6ff !important;
            transform: scale(1.005);
        }

        .btn-icon:hover {
            color: var(--primary) !important;
            transform: translateX(5px);
            display: inline-block;
        }

        @media(max-width: 900px) {
            .dashboard-layout {
                grid-template-columns: 1fr;
            }
        }
    </style>
@endsection