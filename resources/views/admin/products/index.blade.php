@extends('layouts.admin')

@section('title', 'Product Management')

@section('content')
    <style>
        .btn-add {
            background: linear-gradient(135deg, #4361ee 0%, #4cc9f0 100%);
            color: white;
            border: none;
            border-radius: 12px;
            padding: 0.75rem 1.5rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            box-shadow: 0 4px 15px rgba(67, 97, 238, 0.3);
            transition: all 0.3s;
        }

        .btn-add:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(67, 97, 238, 0.4);
            color: white;
        }

        .product-thumb {
            width: 50px;
            height: 50px;
            border-radius: 12px;
            object-fit: cover;
            background: #f4f7fe;
        }

        .status-badge {
            padding: 0.4rem 1rem;
            border-radius: 10px;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
        }

        .status-active {
            background: #eefdf5;
            color: #05cd99;
        }

        .status-inactive {
            background: #fff1f2;
            color: #ee5d50;
        }

        .action-btn {
            width: 40px;
            height: 40px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            border: none;
            font-size: 1rem;
        }

        .btn-edit {
            background: #eef2ff;
            color: #4361ee;
        }

        .btn-delete {
            background: #fff1f2;
            color: #ee5d50;
        }

        .action-btn:hover {
            transform: scale(1.1);
        }

        /* Pagination Styling */
        .pagination-wrapper {
            margin-top: 2rem;
            display: flex;
            justify-content: center;
        }

        .pagination-wrapper nav svg {
            width: 20px;
        }

        .pagination-wrapper nav>div:first-child {
            display: none;
        }

        .pagination-wrapper .pagination,
        .pagination-wrapper nav .flex.flex-1 {
            display: flex;
            gap: 0.5rem;
            list-style: none;
            align-items: center;
        }

        .pagination-wrapper .page-item .page-link,
        .pagination-wrapper nav a,
        .pagination-wrapper nav span {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
            background: white;
            color: #2b3674;
            font-weight: 700;
            border: 1px solid #eef2f6;
            transition: all 0.3s;
            text-decoration: none;
            font-size: 0.9rem;
        }

        .pagination-wrapper .page-item.active .page-link,
        .pagination-wrapper nav span[aria-current="page"] span {
            background: #4361ee !important;
            color: white !important;
            border-color: #4361ee !important;
        }

        .pagination-wrapper nav span[aria-current="page"] {
            background: transparent;
            border: none;
            width: auto;
            height: auto;
        }

        .pagination-wrapper nav span[aria-current="page"] span {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
        }

        .pagination-wrapper .page-link:hover,
        .pagination-wrapper nav a:hover {
            background: #f4f7fe;
            color: #4361ee;
            transform: translateY(-2px);
        }
    </style>

    <div class="product-dashboard">
        @if(session('success'))
            <div class="card-premium mb-4" style="background: #eefdf5; border-left: 5px solid #05cd99; color: #166534;">
                <i class="fas fa-check-circle mr-2"></i> {{ session('success') }}
            </div>
        @endif

        <!-- Search & Filters -->
        <div class="filter-card">
            <form action="{{ route('admin.products.index') }}" method="GET" class="flex flex-wrap items-center gap-4">
                <div class="search-wrapper">
                    <i class="fas fa-search"></i>
                    <input type="text" name="search" value="{{ request('search') }}" class="search-input"
                        placeholder="Search products by name or SKU...">
                </div>

                <select name="category" class="premium-select" onchange="this.form.submit()">
                    <option value="">All Categories</option>
                    @foreach($categories as $category)
                        <option value="{{ $category->id }}" {{ request('category') == $category->id ? 'selected' : '' }}>
                            {{ $category->name }}
                        </option>
                    @endforeach
                </select>

                <select name="per_page" class="premium-select" onchange="this.form.submit()">
                    <option value="10" {{ request('per_page') == 10 ? 'selected' : '' }}>10 Per Page</option>
                    <option value="25" {{ request('per_page') == 25 ? 'selected' : '' }}>25 Per Page</option>
                    <option value="50" {{ request('per_page') == 50 ? 'selected' : '' }}>50 Per Page</option>
                </select>

                <a href="{{ route('admin.products.create') }}" class="btn-add">
                    <i class="fas fa-plus"></i> ADD PRODUCT
                </a>
            </form>
        </div>

        <!-- Product Table -->
        <div class="card-premium" style="overflow-x: auto;">
            <table class="premium-table">
                <thead>
                    <tr>
                        <th>PRODUCT</th>
                        <th>CATEGORY</th>
                        <th>PRICE</th>
                        <th>STOCK</th>
                        <th>STATUS</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($products as $product)
                        <tr>
                            <td style="min-width: 250px;">
                                <div class="flex items-center gap-4">
                                    @if($product->thumbnail)
                                        <img src="{{ asset('storage/' . $product->thumbnail) }}" class="product-thumb">
                                    @else
                                        <div class="product-thumb flex items-center justify-center"><i
                                                class="fas fa-image text-light"></i></div>
                                    @endif
                                    <div>
                                        <div style="font-weight: 700; color: #2b3674; font-size: 0.95rem;">
                                            {{ Str::limit($product->name, 35) }}
                                        </div>
                                        <div style="font-size: 0.75rem; color: #a3aed0;">SKU: {{ $product->sku }}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span
                                    style="background: #f4f7fe; padding: 6px 15px; border-radius: 10px; font-size: 0.8rem; color: #4361ee; font-weight: 700; white-space: nowrap;">
                                    {{ $product->category->name ?? 'None' }}
                                </span>
                            </td>
                            <td>
                                <div style="font-weight: 800; color: #2b3674; white-space: nowrap; font-size: 1rem;">
                                    ৳{{ number_format($product->price, 2) }}</div>
                            </td>
                            <td>
                                <div
                                    style="font-weight: 700; color: {{ $product->stock_qty < 10 ? '#ee5d50' : '#2b3674' }}; white-space: nowrap;">
                                    {{ $product->stock_qty }} <span style="font-size: 0.75rem; opacity: 0.7;">Units</span>
                                </div>
                            </td>
                            <td>
                                <span class="premium-badge {{ $product->status ? 'status-active' : 'status-inactive' }}"
                                    style="font-size: 0.7rem;">
                                    {{ $product->status ? 'Active' : 'Inactive' }}
                                </span>
                            </td>
                            <td>
                                <div class="flex gap-2">
                                    <a href="{{ route('admin.products.edit', $product->id) }}" class="action-btn btn-edit"
                                        title="Edit Product">
                                        <i class="fas fa-pen-nib"></i>
                                    </a>
                                    <form action="{{ route('admin.products.destroy', $product->id) }}" method="POST"
                                        onsubmit="return confirm('Archive this product?')">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="action-btn btn-delete" title="Delete Product">
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6" class="text-center p-8">
                                <div style="color: #a3aed0;">
                                    <i class="fas fa-box-open"
                                        style="font-size: 3rem; margin-bottom: 1rem; display: block;"></i>
                                    No products found matching your criteria.
                                </div>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="pagination-wrapper">
            {{ $products->links() }}
        </div>
    </div>
@endsection