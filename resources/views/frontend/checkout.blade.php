@extends('layouts.app')

@section('title', 'Secure Checkout')

@section('content')
<div class="checkout-wrapper" style="background: #ffffff; min-height: 100vh;">
    
    <div class="checkout-container" style="display: flex; flex-wrap: wrap;">
        
        <!-- Left Column: Form -->
        <div class="checkout-form-section" style="flex: 1 1 600px; padding: 4rem 5%; border-right: 1px solid #f1f5f9;">
            
            <!-- Breadcrumb / Header -->
            <div class="mb-5">
                <a href="{{ route('home') }}" style="font-size: 1.5rem; color: var(--text-main); font-weight: 800; text-decoration: none; display: flex; align-items: center; gap: 0.5rem; margin-bottom: 2rem;">
                    <i class="fas fa-chevron-left" style="font-size: 1rem;"></i> 
                    {{ \App\Models\Setting::get('site_title', 'ShopCMS') }}
                </a>
                
                <div class="checkout-steps" style="display: flex; gap: 1rem; color: var(--text-light); font-size: 0.9rem;">
                    <span style="color: var(--primary); font-weight: 600;">Cart</span>
                    <i class="fas fa-chevron-right" style="font-size: 0.8rem; padding-top: 3px;"></i>
                    <span style="color: var(--text-main); font-weight: 600;">Information</span>
                    <i class="fas fa-chevron-right" style="font-size: 0.8rem; padding-top: 3px;"></i>
                    <span>Payment</span>
                </div>
            </div>

            <form action="{{ route('order.place') }}" method="POST" id="checkoutForm">
                @csrf
                
                <!-- Contact Info -->
                <div class="form-section mb-5">
                    <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 1.5rem;">Contact Information</h3>
                    
                    <div class="form-group mb-4">
                        <label style="font-size: 0.85rem; font-weight: 600; color: var(--text-light); margin-bottom: 0.5rem; display: block;">Email Address</label>
                        <input type="email" name="email" value="{{ auth()->user()->email }}" readonly class="form-control premium-input">
                    </div>
                </div>

                <!-- Shipping Address -->
                <div class="form-section mb-5">
                    <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 1.5rem;">Shipping Address</h3>
                    
                    <div class="grid-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                        <div class="form-group">
                            <label class="input-label">Full Name</label>
                            <input type="text" name="name" value="{{ auth()->user()->name }}" required class="form-control premium-input" placeholder="Total Name">
                        </div>
                        <div class="form-group">
                            <label class="input-label">Phone Number</label>
                            <input type="text" name="phone" value="{{ auth()->user()->phone ?? '' }}" required class="form-control premium-input" placeholder="017...">
                        </div>
                    </div>

                    <div class="form-group mb-3">
                        <label class="input-label">Address</label>
                        <textarea name="address" rows="3" required class="form-control premium-input" placeholder="House, Road, Area...">{{ auth()->user()->address ?? '' }}</textarea>
                    </div>

                    <div class="form-group">
                        <label class="input-label">Order Notes (Optional)</label>
                        <textarea name="notes" rows="2" class="form-control premium-input" placeholder="Specific delivery instructions..."></textarea>
                    </div>
                </div>

                <!-- Shipping Method -->
                <div class="form-section mb-5">
                    <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 1.5rem;">Shipping Method</h3>
                    
                    <div class="shipping-options">
                        <label class="shipping-card selected">
                            <input type="radio" name="shipping_method" value="inside_dhaka" checked onchange="updateTotal(this)">
                            <div class="content">
                                <div class="icon"><i class="fas fa-truck"></i></div>
                                <div class="details">
                                    <span class="title">Inside Dhaka</span>
                                    <span class="subtitle">2-3 Business Days</span>
                                </div>
                                <span class="price">৳60.00</span>
                            </div>
                        </label>
                        
                        <label class="shipping-card">
                            <input type="radio" name="shipping_method" value="outside_dhaka" onchange="updateTotal(this)">
                            <div class="content">
                                <div class="icon"><i class="fas fa-plane"></i></div>
                                <div class="details">
                                    <span class="title">Outside Dhaka</span>
                                    <span class="subtitle">3-5 Business Days</span>
                                </div>
                                <span class="price">৳120.00</span>
                            </div>
                        </label>
                    </div>
                </div>

                <!-- Payment -->
                <div class="form-section mb-5">
                    <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 1.5rem;">Payment Method</h3>
                    
                    <div class="payment-options" style="border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                        <label class="payment-card" style="border-bottom: 1px solid #f1f5f9;">
                            <input type="radio" name="payment_method" value="cod" checked>
                            <div class="content">
                                <span style="font-weight: 600;">Cash on Delivery (COD)</span>
                            </div>
                        </label>
                        <div style="background: #f8fafc; padding: 2rem; text-align: center; color: var(--text-light); font-size: 0.9rem;">
                            <i class="fas fa-money-bill-wave fa-2x mb-2" style="color: var(--text-light);"></i>
                            <p style="margin: 0;">Pay with cash upon delivery.</p>
                        </div>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary btn-block btn-lg" id="submitBtn">
                    Complete Order <i class="fas fa-arrow-right ml-2"></i>
                </button>
            </form>
            
            <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #f1f5f9; font-size: 0.85rem; color: var(--text-light); display: flex; gap: 2rem;">
                <span class="flex items-center gap-1"><i class="fas fa-lock"></i> Secure SSL Encryption</span>
                <span class="flex items-center gap-1"><i class="fas fa-undo"></i> Easy Returns</span>
            </div>
        </div>

        <!-- Right Column: Summary -->
        <div class="checkout-summary-section" style="flex: 1 1 400px; background: #f8fafc; padding: 4rem 5%; border-left: 1px solid #e2e8f0;">
            <div class="sticky-summary" style="position: sticky; top: 2rem;">
                
                <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 2rem;">Order Summary</h3>
                
                <div class="summary-items" style="max-height: 400px; overflow-y: auto; margin-bottom: 2rem; padding-right: 10px;">
                    @php $subtotal = 0; @endphp
                    @foreach($cart as $item)
                        @php $subtotal += $item['price'] * $item['quantity']; @endphp
                        <div class="summary-item" style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                            <div class="img-badge" style="position: relative; width: 64px; height: 64px;">
                                <div style="width: 64px; height: 64px; background: white; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; display: flex; align-items: center; justify-content: center;">
                                    @if(isset($item['image']))
                                        <img src="{{ asset('storage/' . $item['image']) }}" alt="{{ $item['name'] }}" style="width: 100%; height: 100%; object-fit: cover;">
                                    @else
                                        <i class="fas fa-image text-muted"></i>
                                    @endif
                                </div>
                                <span style="position: absolute; top: -8px; right: -8px; background: var(--text-light); color: white; width: 20px; height: 20px; border-radius: 50%; font-size: 0.75rem; display: flex; align-items: center; justify-content: center; opacity: 0.8;">{{ $item['quantity'] }}</span>
                            </div>
                            <div class="details" style="flex: 1;">
                                <h4 style="font-size: 0.95rem; font-weight: 600; margin: 0; line-height: 1.3;">{{ $item['name'] }}</h4>
                            </div>
                            <div class="price" style="font-weight: 600;">৳{{ number_format($item['price'] * $item['quantity'], 2) }}</div>
                        </div>
                    @endforeach
                </div>

                <div class="summary-totals" style="border-top: 1px solid #e2e8f0; padding-top: 1.5rem;">
                    <div class="row">
                        <span>Subtotal</span>
                        <span>৳{{ number_format($subtotal, 2) }}</span>
                    </div>
                    <div class="row">
                        <span>Shipping</span>
                        <span id="shippingDisplay">৳60.00</span>
                    </div>
                    <div class="total-row">
                        <span>Total</span>
                        <span class="grand-total" id="grandTotal">৳{{ number_format($subtotal + 60, 2) }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    /* Styling */
    .input-label {
        font-size: 0.85rem; font-weight: 600; color: var(--text-light); margin-bottom: 0.5rem; display: block;
    }
    .premium-input {
        width: 100%; padding: 0.9rem; border: 1px solid #e2e8f0; border-radius: 8px; transition: all 0.2s; font-size: 0.95rem;
    }
    .premium-input:focus {
        border-color: var(--primary); box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); outline: none;
    }
    
    /* Shipping Cards */
    .shipping-options { display: flex; flex-direction: column; gap: 1rem; }
    .shipping-card {
        border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; cursor: pointer; transition: all 0.2s; display: block;
    }
    .shipping-card.selected {
        border-color: var(--primary); background: #eff6ff;
    }
    .shipping-card .content {
        display: flex; align-items: center; gap: 1rem;
    }
    .shipping-card input { display: none; } /* Hide radio */
    
    .shipping-card .icon {
        width: 40px; height: 40px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--primary); border: 1px solid #e2e8f0;
    }
    .shipping-card .details { flex: 1; }
    .shipping-card .title { display: block; font-weight: 600; font-size: 0.95rem; }
    .shipping-card .subtitle { display: block; font-size: 0.8rem; color: var(--text-light); }
    .shipping-card .price { font-weight: 700; }
    
    /* Payment Cards */
    .payment-card {
        padding: 1.25rem; display: flex; align-items: center; gap: 1rem; cursor: pointer;
    }
    .payment-card input { accent-color: var(--primary); transform: scale(1.2); }
    
    /* Summary Rows */
    .summary-totals .row {
        display: flex; justify-content: space-between; margin-bottom: 1rem; color: var(--text-light); font-size: 0.95rem;
    }
    .summary-totals .total-row {
        display: flex; justify-content: space-between; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #e2e8f0; font-size: 1.25rem; font-weight: 700; color: var(--text-main); align-items: center;
    }
    .grand-total { color: var(--text-main); font-size: 1.5rem; letter-spacing: -0.5px; }

    @media(max-width: 900px) {
        .checkout-container { flex-direction: column-reverse; } /* Show summary on top on mobile? Standard is summary collapsed or bottom. Shopify puts simplified summary at top. */
        .checkout-summary-section { background: #f8fafc; border-bottom: 1px solid #e2e8f0; border-left: none; padding: 2rem 5%; }
        .checkout-form-section { padding: 2rem 5%; border-right: none; }
    }
</style>

<script>
    const subtotal = {{ $subtotal }};
    const shippingRates = {
        'inside_dhaka': 60,
        'outside_dhaka': 120
    };

    function updateTotal(element) {
        // Handle UI selection class
        document.querySelectorAll('.shipping-card').forEach(el => el.classList.remove('selected'));
        if(element) element.closest('.shipping-card').classList.add('selected');

        const method = document.querySelector('input[name="shipping_method"]:checked').value;
        const shippingCost = shippingRates[method];
        const total = subtotal + shippingCost;
        
        // Update DOM
        document.getElementById('shippingDisplay').innerText = '৳' + shippingCost.toFixed(2);
        
        // Format Currency
        const formattedTotal = total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        document.getElementById('grandTotal').innerText = '৳' + formattedTotal;
    }
    
    // Add loading state on submit
    document.getElementById('checkoutForm').addEventListener('submit', function() {
        const btn = document.getElementById('submitBtn');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Processing...';
        btn.disabled = true;
        btn.style.opacity = '0.7';
    });
</script>
@endsection