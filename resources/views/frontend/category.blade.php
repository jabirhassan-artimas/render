@extends('layouts.app')

@section('content')
    <div class="container" style="padding: 2rem 0;">
        <h1>{{ $category->name }}</h1>
        <p class="mb-4 text-light">{{ $category->products->count() }} Products Found</p>

        <div class="product-grid">
            @foreach($products as $product)
                <div class="product-card">
                    <div class="product-image">
                        @if($product->thumbnail)
                            <img src="{{ asset('storage/' . $product->thumbnail) }}" alt="{{ $product->name }}">
                        @else
                            <i class="fas fa-image fa-3x"></i>
                        @endif
                    </div>
                    <div class="product-info">
                        <div class="product-category">{{ $product->category->name }}</div>
                        <h3 class="product-title">{{ $product->name }}</h3>
                        <div class="product-price">৳{{ number_format($product->price, 2) }}</div>
                        <a href="{{ route('product.details', $product->slug) }}" class="btn btn-outline"
                            style="width:100%; margin-top:1rem;">Add to Cart</a>
                    </div>
                </div>
            @endforeach
        </div>

        {{ $products->links() }}
    </div>
@endsection