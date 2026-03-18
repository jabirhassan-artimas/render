@extends('layouts.app')

@section('title', 'Shopping Cart')

@section('content')
<div class="cart-page" style="padding: 4rem 0; background: #f8fafc; min-height: 80vh;">
    <div class="container">
        
        <!-- Breadcrumb -->
        <nav class="mb-4" style="font-size: 0.9rem; color: var(--text-light);">
            <a href="{{ route('home') }}" style="color: var(--text-light); text-decoration: none;">Home</a>
            <span class="mx-2">/</span>
            <span style="color: var(--text-main); font-weight: 500;">Shopping Cart</span>
        </nav>

        <h1 style="font-size: 2rem; font-weight: 700; color: var(--text-main); margin-bottom: 2rem;">Your Shopping Bag</h1>

        @if(session('success'))
            <div class="alert alert-success mb-4" style="background: #dcfce7; color: #166534; padding: 1rem; border-radius: 12px; border: 1px solid #bbf7d0;">
                <i class="fas fa-check-circle mr-2"></i> {{ session('success') }}
            </div>
        @endif

        @if(session('cart') && count(session('cart')) > 0)
            <div class="cart-grid" style="display: grid; grid-template-columns: 1fr 350px; gap: 2rem;">
                
                <!-- Cart Items List -->
                <div class="cart-items">
                    <div style="background: white; border-radius: 12px; box-shadow: var(--shadow-sm); overflow: hidden;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <thead style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                                <tr>
                                    <th style="text-align: left; padding: 1.5rem; color: var(--text-light); font-weight: 600; font-size: 0.9rem;">Product</th>
                                    <th style="text-align: center; padding: 1.5rem; color: var(--text-light); font-weight: 600; font-size: 0.9rem;">Price</th>
                                    <th style="text-align: center; padding: 1.5rem; color: var(--text-light); font-weight: 600; font-size: 0.9rem;">Quantity</th>
                                    <th style="text-align: right; padding: 1.5rem; color: var(--text-light); font-weight: 600; font-size: 0.9rem;">Subtotal</th>
                                    <th style="padding: 1.5rem;"></th>
                                </tr>
                            </thead>
                            <tbody>
                                @php $total = 0 @endphp
                                @foreach(session('cart') as $id => $details)
                                    @php 
                                        $price = $details['price'];
                                        $qty = $details['quantity'];
                                        $subtotal = $price * $qty;
                                        $total += $subtotal;
                                    @endphp
                                    <tr style="border-bottom: 1px solid #f1f5f9;">
                                        <td style="padding: 1.5rem;">
                                            <div style="display: flex; align-items: center; gap: 1rem;">
                                                <div style="width: 70px; height: 70px; border-radius: 8px; overflow: hidden; background: #f1f5f9; border: 1px solid #e2e8f0;">
                                                    @if(isset($details['image']))
                                                        <img src="{{ asset('storage/' . $details['image']) }}" alt="{{ $details['name'] }}" style="width: 100%; height: 100%; object-fit: cover;">
                                                    @else
                                                        <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #cbd5e1;">
                                                            <i class="fas fa-image"></i>
                                                        </div>
                                                    @endif
                                                </div>
                                                <div>
                                                    <h4 style="margin: 0; font-size: 1rem; font-weight: 600; color: var(--text-main);">{{ $details['name'] }}</h4>
                                                    <span style="font-size: 0.85rem; color: var(--text-light);">Product Details</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td style="padding: 1.5rem; text-align: center; font-weight: 600; color: var(--text-main);">
                                            ৳{{ number_format($price, 2) }}
                                        </td>
                                        <td style="padding: 1.5rem; text-align: center;">
                                            <form action="{{ route('cart.update') }}" method="POST" style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                                                @csrf
                                                @method('PATCH')
                                                <input type="hidden" name="id" value="{{ $id }}">
                                                <div class="qty-group" style="position: relative;">
                                                    <input type="number" name="quantity" value="{{ $qty }}" min="1" style="width: 70px; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 8px; text-align: center; font-weight: 600;">
                                                </div>
                                                <button type="submit" class="btn-icon" style="background: none; border: none; cursor: pointer; color: var(--primary); font-size: 0.9rem; padding: 0.5rem;" title="Update Quantity">
                                                    <i class="fas fa-sync-alt"></i>
                                                </button>
                                            </form>
                                        </td>
                                        <td style="padding: 1.5rem; text-align: right; font-weight: 700; color: var(--primary);">
                                            ৳{{ number_format($subtotal, 2) }}
                                        </td>
                                        <td style="padding: 1.5rem; text-align: right;">
                                            <form action="{{ route('cart.remove') }}" method="POST">
                                                @csrf
                                                @method('DELETE')
                                                <input type="hidden" name="id" value="{{ $id }}">
                                                <button type="submit" style="background: #fee2e2; border: none; width: 35px; height: 35px; border-radius: 50%; color: #991b1b; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
                                                    <i class="fas fa-trash-alt"></i>
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                        
                        <div style="padding: 1.5rem; border-top: 1px solid #f1f5f9;">
                            <a href="{{ route('shop') }}" style="color: var(--primary); text-decoration: none; font-weight: 500; display: inline-flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-arrow-left"></i> Continue Shopping
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Order Summary -->
                <div class="order-summary">
                    <div style="background: white; border-radius: 12px; box-shadow: var(--shadow-sm); padding: 2rem; position: sticky; top: 2rem;">
                        <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.5rem; border-bottom: 2px solid #f1f5f9; padding-bottom: 1rem;">Order Summary</h3>
                        
                        @php
                            $subtotal = $total; 
                            $discount = 0;
                            if(session()->has('coupon')) {
                                if(session('coupon')['discount_amount']) {
                                     $discount = session('coupon')['discount_amount'];
                                } elseif(session('coupon')['discount_percentage']) {
                                     $discount = ($subtotal * session('coupon')['discount_percentage']) / 100;
                                }
                            }
                            $finalTotal = $subtotal - $discount;
                            if($finalTotal < 0) $finalTotal = 0;
                        @endphp

                        <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; color: var(--text-light);">
                            <span>Subtotal</span>
                            <span style="color: var(--text-main); font-weight: 600;">৳{{ number_format($subtotal, 2) }}</span>
                        </div>
                        
                        @if($discount > 0)
                        <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; color: #166534;">
                            <span>Discount ({{ session('coupon')['code'] }})</span>
                            <span style="font-weight: 600;">- ৳{{ number_format($discount, 2) }}</span>
                        </div>
                        <form action="{{ route('cart.coupon.remove') }}" method="POST" class="mb-3 text-right">
                            @csrf
                            @method('DELETE')
                            <button type="submit" style="color: #ef4444; font-size: 0.85rem; background: none; border: none; cursor: pointer; text-decoration: underline;">Remove Coupon</button>
                        </form>
                        @endif

                        <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; color: var(--text-light);">
                            <span>Shipping</span>
                            <span style="font-size: 0.85rem; font-style: italic;">Calculated at checkout</span>
                        </div>
                        
                        <div style="margin: 1.5rem 0; border-top: 2px dashed #e2e8f0;"></div>
                        
                        <div style="display: flex; justify-content: space-between; margin-bottom: 2rem; align-items: center;">
                            <span style="font-weight: 700; font-size: 1.1rem;">Total</span>
                            <span style="font-weight: 800; font-size: 1.5rem; color: var(--primary);">৳{{ number_format($finalTotal, 2) }}</span>
                        </div>

                        <!-- Coupon Code -->
                        @if(!$discount)
                        <div class="mb-4">
                            <label style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 0.5rem; display: block;">Have a coupon?</label>
                            <form action="{{ route('cart.coupon') }}" method="POST" style="display: flex; gap: 0.5rem;">
                                @csrf
                                <input type="text" name="code" placeholder="Coupon Code" style="flex: 1; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 8px;">
                                <button type="submit" class="btn btn-outline" style="padding: 0.75rem 1rem;">Apply</button>
                            </form>
                        </div>
                        @endif

                        <a href="{{ route('checkout') }}" class="btn btn-primary" style="width: 100%; padding: 1rem; border-radius: 50px; font-weight: 600; text-align: center; display: block; box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);">
                            Proceed to Checkout <i class="fas fa-arrow-right ml-2"></i>
                        </a>

                        <div style="margin-top: 2rem; text-align: center;">
                            <p style="font-size: 0.8rem; color: var(--text-light); margin-bottom: 1rem;">We accept</p>
                            <div style="display: flex; gap: 0.5rem; justify-content: center; opacity: 0.7;">
                                <i class="fab fa-cc-visa fa-2x"></i>
                                <i class="fab fa-cc-mastercard fa-2x"></i>
                                <i class="fab fa-cc-amex fa-2x"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        @else
            <div style="text-align: center; padding: 6rem 2rem; background: white; border-radius: 12px; box-shadow: var(--shadow-sm);">
                <div style="width: 100px; height: 100px; background: #f1f5f9; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; color: #cbd5e1;">
                    <i class="fas fa-shopping-basket fa-3x"></i>
                </div>
                <h2 style="font-size: 1.8rem; font-weight: 700; margin-bottom: 1rem;">Your Cart is Empty</h2>
                <p style="color: var(--text-light); margin-bottom: 2rem; max-width: 400px; margin-left: auto; margin-right: auto;">
                    Looks like adding products to your cart is the only way to fix this.
                </p>
                <a href="{{ route('shop') }}" class="btn btn-primary" style="padding: 1rem 2.5rem; border-radius: 50px; font-size: 1.1rem;">
                    Start Shopping
                </a>
            </div>
        @endif
    </div>
</div>

<style>
    @media (max-width: 992px) {
        .cart-grid {
            grid-template-columns: 1fr;
        }
        .order-summary {
            order: -1; /* Show summary on top on mobile? Or bottom? Standard is bottom usually, but top is good for total visibility. I'll keep default bottom (normal flow) by removing order -1 unless requested */
            order: initial; 
        }
    }
    @media (max-width: 640px) {
        .cart-items thead {
            display: none; /* Hide headers on mobile */
        }
        .cart-items tr {
            display: flex;
            flex-direction: column;
            padding: 1rem;
            border-bottom: 1px solid #f1f5f9;
        }
        .cart-items td {
            text-align: left !important;
            padding: 0.5rem 0 !important;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .qty-group input {
            width: 50px !important;
        }
    }
</style>
@endsection