@extends('layouts.app')

@section('title', 'My Dashboard')

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

                    <!-- Welcome Section -->
                    <div class="welcome-section mb-5">
                        <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">
                            Welcome back, {{ explode(' ', Auth::user()->name)[0] }}! <span
                                style="font-size: 1.5rem;">👋</span></h1>
                        <p style="color: var(--text-light); font-size: 1.05rem;">Manage your orders and account details.</p>
                    </div>

                    <!-- Stats Grid -->
                    <div class="stats-grid mb-5" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
                        <!-- Total Orders -->
                        <div class="stat-card"
                            style="background: white; padding: 2rem; border-radius: 16px; box-shadow: var(--shadow-sm); display: flex; align-items: center; gap: 1.5rem; transition: transform 0.2s;">
                            <div class="icon-box"
                                style="width: 60px; height: 60px; background: #eff6ff; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--primary); font-size: 1.5rem;">
                                <i class="fas fa-shopping-bag"></i>
                            </div>
                            <div>
                                <h3 style="font-size: 2.5rem; font-weight: 700; margin: 0; line-height: 1;">
                                    {{ $totalOrders }}</h3>
                                <span style="color: var(--text-light); font-size: 0.9rem; font-weight: 500;">Total
                                    Orders</span>
                            </div>
                        </div>

                        <!-- Pending -->
                        <div class="stat-card"
                            style="background: white; padding: 2rem; border-radius: 16px; box-shadow: var(--shadow-sm); display: flex; align-items: center; gap: 1.5rem; transition: transform 0.2s;">
                            <div class="icon-box"
                                style="width: 60px; height: 60px; background: #fffbeb; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #d97706; font-size: 1.5rem;">
                                <i class="fas fa-clock"></i>
                            </div>
                            <div>
                                <h3 style="font-size: 2.5rem; font-weight: 700; margin: 0; line-height: 1;">
                                    {{ $pendingOrders }}</h3>
                                <span style="color: var(--text-light); font-size: 0.9rem; font-weight: 500;">Pending</span>
                            </div>
                        </div>

                        <!-- Completed -->
                        <div class="stat-card"
                            style="background: white; padding: 2rem; border-radius: 16px; box-shadow: var(--shadow-sm); display: flex; align-items: center; gap: 1.5rem; transition: transform 0.2s;">
                            <div class="icon-box"
                                style="width: 60px; height: 60px; background: #f0fdf4; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #16a34a; font-size: 1.5rem;">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <div>
                                <h3 style="font-size: 2.5rem; font-weight: 700; margin: 0; line-height: 1;">
                                    {{ $completedOrders }}</h3>
                                <span
                                    style="color: var(--text-light); font-size: 0.9rem; font-weight: 500;">Completed</span>
                            </div>
                        </div>
                    </div>

                    <!-- Recent Orders -->
                    <div class="recent-orders-section bg-white rounded-xl shadow-sm overflow-hidden"
                        style="background: white; border-radius: 16px; box-shadow: var(--shadow-sm); padding: 2rem;">
                        <div class="flex items-center justify-between mb-4"
                            style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                            <h3 style="font-size: 1.25rem; font-weight: 700; margin: 0;">Recent Orders</h3>
                            <a href="{{ route('customer.orders') }}" class="btn-link"
                                style="color: var(--primary); font-weight: 600; text-decoration: none; font-size: 0.9rem;">View
                                All <i class="fas fa-arrow-right ml-1"></i></a>
                        </div>

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
                                    @forelse($recentOrders as $order)
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
                                                    style="color: var(--text-light); transition: 0.2s;" title="View Details">
                                                    <i class="fas fa-eye"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    @empty
                                        <tr>
                                            <td colspan="5"
                                                style="text-align: center; padding: 3rem; color: var(--text-light);">
                                                <div style="margin-bottom: 1rem; font-size: 2rem; color: #cbd5e1;"><i
                                                        class="fas fa-box-open"></i></div>
                                                No orders found yet. <a href="{{ route('shop') }}"
                                                    style="color: var(--primary); font-weight: 600;">Start Shopping</a>
                                            </td>
                                        </tr>
                                    @endforelse
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <style>
        .stat-card:hover {
            transform: translateY(-5px);
        }

        .order-row:hover td {
            background: #eff6ff !important;
        }

        .btn-icon:hover {
            color: var(--primary) !important;
            transform: scale(1.1);
            display: inline-block;
        }

        @media(max-width: 992px) {
            .dashboard-layout {
                grid-template-columns: 1fr;
            }

            .sidebar-col {
                position: relative;
                z-index: 10;
            }

            .stats-grid {
                grid-template-columns: repeat(2, 1fr) !important;
            }
        }

        @media(max-width: 576px) {
            .stats-grid {
                grid-template-columns: 1fr !important;
            }
        }
    </style>
@endsection