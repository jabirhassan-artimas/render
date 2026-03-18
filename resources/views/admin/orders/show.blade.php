@extends('layouts.admin')

@section('title', 'Order Details: #' . $order->order_number)

@section('content')
    <style>
        .order-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 2rem;
        }

        .status-timeline {
            display: flex;
            justify-content: space-between;
            margin-bottom: 2rem;
            background: white;
            padding: 1.5rem;
            border-radius: 20px;
            box-shadow: var(--card-shadow);
        }

        .timeline-step {
            flex: 1;
            text-align: center;
            position: relative;
        }

        .timeline-step:not(:last-child)::after {
            content: '';
            position: absolute;
            top: 20px;
            left: 50%;
            width: 100%;
            height: 2px;
            background: #f4f7fe;
            z-index: 1;
        }

        .step-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #f4f7fe;
            color: #a3aed0;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 0.5rem;
            position: relative;
            z-index: 2;
            font-size: 0.9rem;
            transition: all 0.3s;
        }

        .timeline-step.completed .step-icon {
            background: #4361ee;
            color: white;
        }

        .timeline-step.active .step-icon {
            background: #4361ee;
            color: white;
            box-shadow: 0 0 0 5px rgba(67, 97, 238, 0.1);
        }

        .step-label {
            font-size: 0.75rem;
            font-weight: 700;
            color: #a3aed0;
            text-transform: uppercase;
        }

        .timeline-step.active .step-label,
        .timeline-step.completed .step-label {
            color: #2b3674;
        }

        .info-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 2rem;
        }

        .order-summary-card {
            background: #f4f7fe;
            border-radius: 15px;
            padding: 1.5rem;
        }

        .summary-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1rem;
            font-weight: 600;
            color: #707eae;
        }

        .summary-total {
            border-top: 2px dashed #d1d9e8;
            padding-top: 1rem;
            margin-top: 1rem;
            font-size: 1.25rem;
            font-weight: 800;
            color: #2b3674;
        }

        .customer-avatar {
            width: 60px;
            height: 60px;
            border-radius: 15px;
            background: linear-gradient(135deg, #4361ee 0%, #4cc9f0 100%);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            font-weight: 800;
            margin-bottom: 1rem;
        }

        .detail-row {
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;
            align-items: flex-start;
        }

        .detail-icon {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            background: #f4f7fe;
            color: #4361ee;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .detail-content label {
            display: block;
            font-size: 0.75rem;
            color: #a3aed0;
            font-weight: 700;
            text-transform: uppercase;
        }

        .detail-content span {
            font-weight: 700;
            color: #2b3674;
        }
    </style>

    <div class="order-header">
        <div>
            <h2 style="font-weight: 800; color: #2b3674; margin: 0;">Order Details</h2>
            <p style="color: #a3aed0; font-weight: 600;">Full summary for Order <span
                    style="color: #4361ee;">#{{ $order->order_number }}</span></p>
        </div>
        <div class="flex gap-3">
            <a href="{{ route('admin.orders.index') }}" class="btn"
                style="background: white; border: 1px solid #eef2f6; color: #707eae; border-radius: 12px; padding: 0.75rem 1.5rem; font-weight: 700;">
                <i class="fas fa-arrow-left mr-2"></i> BACK
            </a>
            <button class="btn"
                style="background: #4361ee; color: white; border: none; border-radius: 12px; padding: 0.75rem 1.5rem; font-weight: 700; box-shadow: 0 4px 15px rgba(67, 97, 238, 0.3);">
                <i class="fas fa-print mr-2"></i> PRINT INVOICE
            </button>
        </div>
    </div>

    @if(session('success'))
        <div class="card-premium mb-6" style="background: #eefdf5; border-left: 5px solid #05cd99; color: #166534;">
            <i class="fas fa-check-circle mr-2"></i> {{ session('success') }}
        </div>
    @endif

    <!-- Order Status Timeline -->
    <div class="status-timeline">
        @php
            $statuses = ['pending', 'processing', 'shipped', 'delivered'];
            $currentIdx = array_search($order->order_status, $statuses);
        @endphp
        @foreach($statuses as $index => $status)
            <div class="timeline-step {{ $index < $currentIdx ? 'completed' : ($index == $currentIdx ? 'active' : '') }}">
                <div class="step-icon">
                    @if($index < $currentIdx)
                        <i class="fas fa-check"></i>
                    @else
                        <i
                            class="fas fa-{{ $status == 'pending' ? 'clock' : ($status == 'processing' ? 'cog' : ($status == 'shipped' ? 'truck' : 'check-double')) }}"></i>
                    @endif
                </div>
                <div class="step-label">{{ $status }}</div>
            </div>
        @endforeach
    </div>

    <div class="info-grid">
        <!-- Left Column: Items -->
        <div>
            <div class="card-premium">
                <div
                    style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 2px solid #f4f7fe;">
                    <h3 style="font-weight: 800; color: #2b3674; margin: 0;">Purchased Items</h3>
                    <span
                        style="background: #f4f7fe; color: #4361ee; padding: 4px 12px; border-radius: 8px; font-weight: 700; font-size: 0.8rem;">
                        {{ $order->items->count() }} Items
                    </span>
                </div>

                <table class="premium-table">
                    <thead>
                        <tr>
                            <th>PRODUCT</th>
                            <th style="text-align: center;">PRICE</th>
                            <th style="text-align: center;">QTY</th>
                            <th style="text-align: right;">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($order->items as $item)
                            <tr>
                                <td>
                                    <div class="flex items-center gap-4">
                                        <div
                                            style="width: 50px; height: 50px; border-radius: 12px; background: #f4f7fe; overflow: hidden; display: flex; align-items: center; justify-content: center;">
                                            @if($item->product && $item->product->thumbnail)
                                                <img src="{{ asset('storage/' . $item->product->thumbnail) }}"
                                                    style="width: 100%; height: 100%; object-fit: cover;">
                                            @else
                                                <i class="fas fa-image" style="color: #a3aed0;"></i>
                                            @endif
                                        </div>
                                        <div style="font-weight: 700; color: #2b3674;">{{ $item->product_name }}</div>
                                    </div>
                                </td>
                                <td style="text-align: center;">৳{{ number_format($item->price, 2) }}</td>
                                <td style="text-align: center;">
                                    <span
                                        style="background: #f4f7fe; padding: 4px 10px; border-radius: 6px; font-weight: 700; color: #2b3674;">
                                        x{{ $item->qty }}
                                    </span>
                                </td>
                                <td style="text-align: right; font-weight: 800; color: #2b3674;">
                                    ৳{{ number_format($item->total, 2) }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>

                <div class="order-summary-card mt-8">
                    <div class="summary-item">
                        <span>Subtotal</span>
                        <span>৳{{ number_format($order->subtotal, 2) }}</span>
                    </div>
                    <div class="summary-item">
                        <span>Discount</span>
                        <span style="color: #ee5d50;">-৳0.00</span>
                    </div>
                    <div class="summary-item">
                        <span>Shipping Fee</span>
                        <span>৳{{ number_format($order->total - $order->subtotal, 2) }}</span>
                    </div>
                    <div class="summary-total">
                        <span>Grand Total</span>
                        <span style="color: #4361ee;">৳{{ number_format($order->total, 2) }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Column: Customer & Actions -->
        <div>
            <!-- Customer Info -->
            <div class="card-premium mb-6">
                <h3
                    style="font-weight: 800; color: #2b3674; margin-bottom: 2rem; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-user-circle" style="color: #4361ee;"></i> Customer Profile
                </h3>

                <div class="customer-avatar">
                    {{ substr($order->user->name ?? 'G', 0, 1) }}
                </div>

                <div class="detail-row">
                    <div class="detail-icon"><i class="fas fa-user"></i></div>
                    <div class="detail-content">
                        <label>Full Name</label>
                        <span>{{ $order->user->name ?? 'Guest Customer' }}</span>
                    </div>
                </div>

                <div class="detail-row">
                    <div class="detail-icon"><i class="fas fa-envelope"></i></div>
                    <div class="detail-content">
                        <label>Email Address</label>
                        <span>{{ $order->user->email ?? '-' }}</span>
                    </div>
                </div>

                <div class="detail-row">
                    <div class="detail-icon"><i class="fas fa-phone"></i></div>
                    <div class="detail-content">
                        <label>Contact Number</label>
                        <span>{{ $order->user->phone ?? '-' }}</span>
                    </div>
                </div>

                <div class="detail-row">
                    <div class="detail-icon"><i class="fas fa-map-marker-alt"></i></div>
                    <div class="detail-content">
                        <label>Shipping Address</label>
                        <span>{{ $order->shipping_address }}</span>
                    </div>
                </div>
            </div>

            <!-- Management Actions -->
            <div class="card-premium">
                <h3
                    style="font-weight: 800; color: #2b3674; margin-bottom: 1.5rem; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-tasks" style="color: #4361ee;"></i> Management
                </h3>

                <form action="{{ route('admin.orders.updateStatus', $order->id) }}" method="POST">
                    @csrf
                    @method('PATCH')
                    <div class="mb-4">
                        <label
                            style="display: block; font-size: 0.75rem; color: #a3aed0; font-weight: 700; text-transform: uppercase; margin-bottom: 0.5rem;">Update
                            Order Status</label>
                        <select name="order_status" class="form-control"
                            style="background: #f4f7fe; border: 2px solid transparent; border-radius: 12px; padding: 0.75rem; font-weight: 700; color: #2b3674; width: 100%;">
                            <option value="pending" {{ $order->order_status == 'pending' ? 'selected' : '' }}>🕒 Pending
                            </option>
                            <option value="processing" {{ $order->order_status == 'processing' ? 'selected' : '' }}>⚙️
                                Processing</option>
                            <option value="shipped" {{ $order->order_status == 'shipped' ? 'selected' : '' }}>🚚 Shipped
                            </option>
                            <option value="delivered" {{ $order->order_status == 'delivered' ? 'selected' : '' }}>✅ Delivered
                            </option>
                            <option value="cancelled" {{ $order->order_status == 'cancelled' ? 'selected' : '' }}>❌ Cancelled
                            </option>
                        </select>
                    </div>

                    <button type="submit" class="btn"
                        style="width: 100%; background: linear-gradient(135deg, #4361ee 0%, #4cc9f0 100%); color: white; border: none; border-radius: 12px; padding: 0.85rem; font-weight: 700; box-shadow: 0 4px 15px rgba(67, 97, 238, 0.3);">
                        UPDATE STATUS
                    </button>
                </form>

                <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 2px solid #f4f7fe;">
                    <p style="font-size: 0.75rem; color: #a3aed0; font-weight: 600; font-style: italic;">
                        Last updated: {{ $order->updated_at->format('d M Y, h:i A') }}
                    </p>
                </div>
            </div>
        </div>
    </div>
@endsection