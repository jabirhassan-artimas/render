@extends('layouts.app')

@section('title', 'Shop')

@section('content')
    <div class="shop-page" style="background: #f8fafc; padding: 2rem 0; min-height: 80vh;">
        <div class="container">
            <!-- Breadcrumb / Header -->
            <div class="flex justify-between items-center mb-4">
                <h1 style="font-size: 2rem; font-weight: 700; color: var(--text-main);">Shop</h1>
                <div class="flex items-center gap-2 text-sm text-light">
                    <a href="{{ route('home') }}" style="color: var(--text-light); text-decoration: none;">Home</a>
                    <span>/</span>
                    <span style="color: var(--text-main);">Shop</span>
                </div>
            </div>

            <div class="shop-layout"
                style="display: grid; grid-template-columns: 260px 1fr; gap: 2rem; align-items: start;">
                <!-- Sidebar Filters -->
                <aside class="shop-sidebar"
                    style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: var(--shadow-sm); position: sticky; top: 2rem;">

                    <!-- Search -->
                    <div class="filter-group mb-4">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: 1rem;">Search</h4>
                        <form action="{{ route('shop') }}" method="GET">
                            <div class="input-group" style="position: relative;">
                                <input type="text" name="search" class="form-control" placeholder="Search product..."
                                    value="{{ request('search') }}" style="padding-right: 2.5rem;">
                                <button type="submit"
                                    style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text-light); cursor: pointer;">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                        </form>
                    </div>

                    <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 1.5rem 0;">

                    <!-- Categories -->
                    <div class="filter-group mb-4">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: 1rem;">Categories</h4>
                        <ul class="list-unstyled" style="list-style: none; padding: 0; margin: 0;">
                            @foreach($categories as $category)
                                <li class="mb-2">
                                    <a href="{{ route('shop', array_merge(request()->all(), ['category' => $category->slug])) }}"
                                        style="display: flex; justify-content: space-between; color: {{ request('category') == $category->slug ? 'var(--primary)' : 'var(--text-main)' }}; font-weight: {{ request('category') == $category->slug ? '600' : '400' }}; text-decoration: none; padding: 0.25rem 0; transition: color 0.2s;">
                                        <span>{{ $category->name }}</span>
                                        @if($category->children->count() > 0)
                                            <i class="fas fa-chevron-down" style="font-size: 0.7rem; margin-top: 5px;"></i>
                                        @endif
                                    </a>
                                    @if($category->children->count() > 0)
                                        <ul
                                            style="padding-left: 1rem; margin-top: 0.25rem; list-style: none; border-left: 2px solid #f1f5f9;">
                                            @foreach($category->children as $child)
                                                <li class="mb-1">
                                                    <a href="{{ route('shop', array_merge(request()->all(), ['category' => $child->slug])) }}"
                                                        style="font-size: 0.9rem; color: {{ request('category') == $child->slug ? 'var(--primary)' : 'var(--text-light)' }}; text-decoration: none; display: block; padding: 0.1rem 0;">
                                                        {{ $child->name }}
                                                    </a>
                                                </li>
                                            @endforeach
                                        </ul>
                                    @endif
                                </li>
                            @endforeach
                        </ul>
                    </div>

                    <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 1.5rem 0;">

                    <!-- Brands -->
                    <div class="filter-group mb-4">
                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: 1rem;">Brands</h4>
                        <ul class="list-unstyled" style="list-style: none; padding: 0;">
                            @foreach($brands as $brand)
                                <li class="mb-2">
                                    <a href="{{ route('shop', array_merge(request()->all(), ['brand' => $brand->slug])) }}"
                                        style="display: block; color: {{ request('brand') == $brand->slug ? 'var(--primary)' : 'var(--text-main)' }}; text-decoration: none; padding: 0.25rem 0;">
                                        {{ $brand->name }}
                                    </a>
                                </li>
                            @endforeach
                        </ul>
                    </div>

                    @if(request()->has('category') || request()->has('brand') || request()->has('search'))
                        <a href="{{ route('shop') }}" class="btn btn-outline mt-4"
                            style="width: 100%; text-align: center; border-color: #e2e8f0; color: var(--text-light);">
                            <i class="fas fa-times mx-1"></i> Clear Filters
                        </a>
                    @endif
                </aside>

                <!-- Product Grid -->
                <div class="shop-content">
                    <!-- Toolbar -->
                    <div class="shop-toolbar"
                        style="background: white; padding: 1rem; border-radius: 12px; box-shadow: var(--shadow-sm); display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                        <p style="margin: 0; color: var(--text-light); font-size: 0.9rem;">
                            Showing <strong>{{ $products->firstItem() ?? 0 }}-{{ $products->lastItem() ?? 0 }}</strong> of
                            <strong>{{ $products->total() }}</strong> results
                        </p>

                        <form action="{{ route('shop') }}" method="GET" id="sortForm" class="flex items-center gap-2">
                            <!-- Preserve other params -->
                            @foreach(request()->except('sort', 'page') as $key => $value)
                                <input type="hidden" name="{{ $key }}" value="{{ $value }}">
                            @endforeach

                            <label style="font-size: 0.9rem; color: var(--text-light);">Sort by:</label>
                            <select name="sort" class="form-control" onchange="document.getElementById('sortForm').submit()"
                                style="width: auto; padding: 0.4rem 2rem 0.4rem 0.8rem; font-size: 0.9rem; border-radius: 6px; border: 1px solid #e2e8f0;">
                                <option value="newest" {{ request('sort') == 'newest' ? 'selected' : '' }}>Newest</option>
                                <option value="price_low_high" {{ request('sort') == 'price_low_high' ? 'selected' : '' }}>
                                    Price: Low to High</option>
                                <option value="price_high_low" {{ request('sort') == 'price_high_low' ? 'selected' : '' }}>
                                    Price: High to Low</option>
                            </select>
                        </form>
                    </div>

                    @if($products->count() > 0)
                        <div class="product-grid"
                            style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.5rem;">
                            @foreach($products as $product)
                                @include('partials.product-card', ['product' => $product])
                            @endforeach
                        </div>

                        <div class="pagination mt-5 flex justify-center">
                            {{ $products->links() }}
                        </div>
                    @else
                        <div class="text-center p-5 card" style="background: white; border-radius: 12px; padding: 4rem 2rem;">
                            <div style="font-size: 3rem; color: #e2e8f0; margin-bottom: 1rem;"><i class="fas fa-search"></i>
                            </div>
                            <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">No products found</h3>
                            <p class="text-light">Try adjusting your filters or search query.</p>
                            <a href="{{ route('shop') }}" class="btn btn-primary mt-3">View All Products</a>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>

    <style>
        @media(max-width: 768px) {
            .shop-layout {
                grid-template-columns: 1fr;
            }

            .shop-sidebar {
                position: static;
                margin-bottom: 2rem;
            }
        }
    </style>
@endsection