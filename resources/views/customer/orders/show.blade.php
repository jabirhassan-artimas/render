@extends('layouts.app')

@section('title', 'Order Details')

@section('content')
    <div class="container" style="padding: 3rem 0;">
        <div style="display: grid; grid-template-columns: 250px 1fr; gap: 2rem;">

            @include('customer.sidebar')

            <div class="dashboard-content">
                <div class="flex justify-between items-center mb-4">
                    <h2>Order #{{ $order->order_number }}</h2>
                    <a href="{{ route('customer.orders') }}" class="btn btn-outline">Back to Orders</a>
                </div>

                <div class="card mb-4">
                    <div class="flex justify-between items-center border-bottom pb-4 mb-4">
                        <div>
                            <p class="text-light mb-1">Placed on</p>
                            <strong>{{ $order->created_at->format('d M Y, h:i A') }}</strong>
                        </div>
                        <div>
                            <p class="text-light mb-1">Total</p>
                            <strong class="text-primary"
                                style="font-size: 1.25rem;">৳{{ number_format($order->total, 2) }}</strong>
                        </div>
                        <div>
                            <p class="text-light mb-1">Status</p>
                            <span class="badge {{ $order->order_status }}">{{ ucfirst($order->order_status) }}</span>
                        </div>
                    </div>

                    <h4 class="mb-3">Items</h4>
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 2rem;">
                        <thead>
                            <tr style="text-align: left; border-bottom: 1px solid var(--border);">
                                <th class="p-2">Product</th>
                                <th class="p-2">Price</th>
                                <th class="p-2">Qty</th>
                                <th class="p-2 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($order->items as $item)
                                <tr style="border-bottom: 1px solid var(--surface);">
                                    <td class="p-2">
                                        {{ $item->product_name }}
                                    </td>
                                    <td class="p-2">৳{{ number_format($item->price, 2) }}</td>
                                    <td class="p-2">{{ $item->qty }}</td>
                                    <td class="p-2 text-right">৳{{ number_format($item->total, 2) }}</td>
                                </tr>
                            @endforeach
                            <tr>
                                <td colspan="3" class="p-2 text-right"><strong>Subtotal</strong></td>
                                <td class="p-2 text-right">৳{{ number_format($order->subtotal, 2) }}</td>
                            </tr>
                            <tr>
                                <td colspan="3" class="p-2 text-right"><strong>Shipping</strong></td>
                                <td class="p-2 text-right">৳{{ number_format($order->shipping_cost, 2) }}</td>
                            </tr>
                            <tr>
                                <td colspan="3" class="p-2 text-right"><strong>Total</strong></td>
                                <td class="p-2 text-right"><strong
                                        class="text-primary">৳{{ number_format($order->total, 2) }}</strong></td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                        <div>
                            <h4>Shipping Address</h4>
                            <p style="white-space: pre-line;">{{ $order->shipping_address }}</p>
                        </div>
                        <div>
                            <h4>Billing Address</h4>
                            <p style="white-space: pre-line;">{{ $order->billing_address ?? $order->shipping_address }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection