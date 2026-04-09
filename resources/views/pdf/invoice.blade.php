<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invoice {{ $order->invoice_no }}</title>
    <style>
        body { font-family: 'DejaVu Sans', sans-serif; font-size: 12px; color: #333; line-height: 1.4; }
        .invoice-box { max-width: 800px; margin: auto; padding: 20px; }
        .header { margin-bottom: 30px; }
        .logo { width: 120px; }
        .clear { clear: both; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        table th { background: #f4f4f4; padding: 12px 10px; border-bottom: 2px solid #1B5E20; text-align: left; font-weight: 800; color: #1B5E20; text-transform: uppercase; font-size: 10px; }
        table td { padding: 12px 10px; border-bottom: 1px solid #eee; }
        .customer-info { width: 50%; float: left; margin-bottom: 30px; }
        .order-info { width: 45%; float: right; text-align: right; margin-bottom: 30px; }
        .totals { margin-top: 30px; text-align: right; width: 300px; float: right; }
        .totals table td { border: none; padding: 4px 10px; }
        .totals .grand-total { font-size: 18px; font-weight: 900; color: #1B5E20; border-top: 2px solid #1B5E20 !important; padding-top: 10px; }
        .footer { margin-top: 60px; text-align: center; font-size: 9px; color: #999; border-top: 1px solid #eee; padding-top: 20px; clear: both; }
        .badge { padding: 4px 8px; border-radius: 4px; font-size: 9px; font-weight: bold; text-transform: uppercase; }
        .badge-confirmed { background: #1B5E20; color: #fff; }
        .badge-pending { background: #f59e0b; color: #fff; }
    </style>
</head>
<body>
    <div class="invoice-box">
        <div class="header">
            <div style="float: left;">
                @php
                    $logo = \App\Models\Setting::get('site_logo');
                    $logoPath = $logo ? public_path('uploads/' . $logo) : null;
                    // Robustness: Prevent 500 error if GD extension is missing on host
                    $hasGd = extension_loaded('gd');
                @endphp
                @if($hasGd && $logoPath && file_exists($logoPath))
                    <img src="data:image/png;base64,{{ base64_encode(file_get_contents($logoPath)) }}" class="logo">
                @else
                    <h1 style="margin:0; color: #1B5E20; font-weight: 900;">{{ \App\Models\Setting::get('site_title', 'Oitijjer Bahar') }}</h1>
                @endif
            </div>
            <div style="float: right; text-align: right;">
                <h2 style="margin:0; color: #1B5E20; letter-spacing: 2px;">INVOICE</h2>
                <p style="margin:5px 0; font-weight: bold;">#{{ $order->invoice_no ?? $order->order_number }}</p>
            </div>
            <div class="clear"></div>
        </div>

        <div class="info-section">
            <div class="customer-info">
                <p style="text-transform: uppercase; font-size: 10px; font-weight: 800; color: #999; margin-bottom: 5px;">Billed To</p>
                <p style="margin:0; font-size: 14px; font-weight: bold;">{{ $order->user->name ?? 'Valued Customer' }}</p>
                <p style="margin:2px 0;">{{ $order->email }}</p>
                <p style="margin:2px 0;">{{ $order->phone }}</p>
                <p style="margin:5px 0; font-size: 11px; color: #666; max-width: 250px;">{{ $order->shipping_address }}</p>
            </div>
            <div class="order-info">
                <p style="margin:4px 0;"><strong>Order Date:</strong> {{ $order->created_at->format('d M, Y') }}</p>
                <p style="margin:4px 0;"><strong>Payment:</strong> {{ strtoupper($order->payment_method) }}</p>
                <p style="margin:4px 0;"><strong>Status:</strong> <span class="badge badge-{{ $order->order_status }}">{{ $order->order_status }}</span></p>
            </div>
            <div class="clear"></div>
        </div>

        <table>
            <thead>
                <tr>
                    <th width="50%">Description</th>
                    <th style="text-align: center;">Price</th>
                    <th style="text-align: center;">Qty</th>
                    <th style="text-align: right;">Amount</th>
                </tr>
            </thead>
            <tbody>
                @foreach($order->items as $item)
                <tr>
                    <td>
                        <div style="font-weight: bold;">{{ $item->product_name }}</div>
                        <div style="font-size: 9px; color: #999;">SKU: {{ $item->product->sku ?? 'N/A' }}</div>
                    </td>
                    <td style="text-align: center;">৳{{ number_format($item->price, 2) }}</td>
                    <td style="text-align: center;">{{ $item->qty }}</td>
                    <td style="text-align: right; font-weight: bold;">৳{{ number_format($item->total, 2) }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <div class="totals">
            <table width="100%">
                <tr>
                    <td>Subtotal</td>
                    <td style="text-align: right;">৳{{ number_format($order->subtotal, 2) }}</td>
                </tr>
                @if($order->discount > 0)
                <tr>
                    <td>Discount</td>
                    <td style="text-align: right; color: #e53e3e;">-৳{{ number_format($order->discount, 2) }}</td>
                </tr>
                @endif
                <tr>
                    <td>Shipping</td>
                    <td style="text-align: right;">৳{{ number_format($order->shipping_cost, 2) }}</td>
                </tr>
                <tr>
                    <td class="grand-total">Total</td>
                    <td class="grand-total" style="text-align: right;">৳{{ number_format($order->total, 2) }}</td>
                </tr>
            </table>
        </div>

        <div class="footer">
            <p><strong>Note:</strong> This is a computer generated invoice and does not require a physical signature.</p>
            <p>{{ \App\Models\Setting::get('site_title', 'Oitijjer Bahar') }} | {{ \App\Models\Setting::get('site_address', 'Dhaka, Bangladesh') }} | {{ \App\Models\Setting::get('site_phone', '+880') }}</p>
            <p>&copy; {{ date('Y') }} All Rights Reserved.</p>
        </div>
    </div>
</body>
</html>
