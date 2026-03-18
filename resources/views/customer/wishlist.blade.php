@extends('layouts.app')

@section('title', 'My Wishlist')

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
                        <h1 style="font-size: 1.75rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem;">My Wishlist</h1>
                        <p style="color: var(--text-light);">Products you've saved for later.</p>
                    </div>
                </div>

                @if($wishlists->count() > 0)
                <div class="grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 2rem;">
                    @foreach($wishlists as $item)
                        @if($item->product)
                        <div class="product-card" style="background: white; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; transition: transform 0.2s, box-shadow 0.2s; position: relative;">
                            
                            <!-- Remove Button -->
                            <form action="{{ route('wishlist.destroy', $item->id) }}" method="POST" style="position: absolute; top: 10px; right: 10px; z-index: 10;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" style="background: white; border: none; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ef4444; box-shadow: 0 2px 4px rgba(0,0,0,0.1); cursor: pointer;">
                                    <i class="fas fa-times"></i>
                                </button>
                            </form>

                            <a href="{{ route('product.details', $item->product->slug) }}" style="text-decoration: none; color: inherit;">
                                <div class="img-wrap" style="height: 200px; overflow: hidden; background: #f8fafc; display: flex; align-items: center; justify-content: center;">
                                    @if($item->product->thumbnail)
                                        <img src="{{ asset('storage/' . $item->product->thumbnail) }}" style="width: 100%; height: 100%; object-fit: cover;">
                                    @else
                                        <i class="fas fa-image fa-3x text-gray-300"></i>
                                    @endif
                                </div>
                                <div class="content" style="padding: 1rem;">
                                    <h3 style="margin: 0 0 0.5rem; font-size: 1rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{ $item->product->name }}</h3>
                                    <div style="color: var(--primary); font-weight: 700;">৳{{ number_format($item->product->discount_price ?: $item->product->price, 2) }}</div>
                                </div>
                            </a>
                            <div style="padding: 0 1rem 1rem;">
                                <form action="{{ route('cart.add', $item->product->id) }}" method="POST">
                                    @csrf
                                    <button type="submit" class="btn btn-sm btn-outline-primary" style="width: 100%; border-radius: 8px;">Add to Cart</button>
                                </form>
                            </div>
                        </div>
                        @endif
                    @endforeach
                </div>
                <div class="mt-4">
                    {{ $wishlists->links() }}
                </div>
                @else
                <div class="empty-state text-center" style="padding: 4rem; background: white; border-radius: 16px;">
                    <i class="far fa-heart" style="font-size: 3rem; color: #cbd5e1; margin-bottom: 1rem;"></i>
                    <p>Your wishlist is empty.</p>
                    <a href="{{ route('shop') }}" class="btn btn-primary" style="margin-top: 1rem;">Start Shopping</a>
                </div>
                @endif

            </div>
        </div>
    </div>
</div>
@endsection
