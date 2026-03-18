<div class="product-card"
    style="background: white; border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-sm); transition: transform 0.3s, box-shadow 0.3s; position: relative; height: 100%; display: flex; flex-direction: column;">

    @if($product->discount_price && $product->discount_price < $product->price)
        <span class="badge"
            style="position: absolute; top: 10px; left: 10px; background: #ef4444; color: white; padding: 4px 10px; border-radius: 4px; font-size: 0.75rem; z-index: 10; font-weight: 600;">SALE</span>
    @endif

    <div class="product-image" style="position: relative; padding-top: 100%; overflow: hidden; background: #f8fafc;">
        <a href="{{ route('product.details', $product->slug) }}">
            @if($product->thumbnail)
                <img src="{{ asset('storage/' . $product->thumbnail) }}" alt="{{ $product->name }}"
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s;">
            @else
                <div
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #e2e8f0; color: #94a3b8;">
                    <i class="fas fa-camera fa-2x"></i>
                </div>
            @endif
        </a>

        <!-- Hover Actions -->
        <div class="actions"
            style="position: absolute; bottom: 10px; right: 10px; display: flex; flex-direction: column; gap: 8px; transform: translateX(50px); transition: transform 0.3s; opacity: 0;">
            <form action="{{ route('cart.add', $product->id) }}" method="POST">
                @csrf
                <button type="submit" class="btn-icon"
                    style="width: 40px; height: 40px; border-radius: 50%; background: white; border: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1); color: var(--text-main); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s, color 0.2s;"
                    title="Add to Cart">
                    <i class="fas fa-shopping-cart"></i>
                </button>
            </form>
            <a href="{{ route('product.details', $product->slug) }}" class="btn-icon"
                style="width: 40px; height: 40px; border-radius: 50%; background: white; border: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1); color: var(--text-main); display: flex; align-items: center; justify-content: center; cursor: pointer; text-decoration: none;"
                title="View Details">
                <i class="fas fa-eye"></i>
            </a>
        </div>
    </div>

    <div class="product-info" style="padding: 1.25rem; flex: 1; display: flex; flex-direction: column;">
        <span
            style="font-size: 0.75rem; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.5rem;">
            {{ $product->category->name ?? 'Uncategorized' }}
        </span>

        <h4 style="font-size: 1rem; margin: 0 0 0.5rem; font-weight: 600; line-height: 1.4;">
            <a href="{{ route('product.details', $product->slug) }}"
                style="color: var(--text-main); text-decoration: none; transition: color 0.2s;">{{ $product->name }}</a>
        </h4>

        <div class="flex justify-between items-center mt-auto">
            <div class="price"
                style="font-weight: 700; color: var(--primary); font-size: 1.1rem; display: flex; flex-direction: column; line-height: 1.2;">
                @if($product->discount_price && $product->discount_price < $product->price)
                    <span
                        style="text-decoration: line-through; color: var(--text-light); font-size: 0.85rem; font-weight: 400;">৳{{ number_format($product->price, 2) }}</span>
                    <span>৳{{ number_format($product->discount_price, 2) }}</span>
                @else
                    <span>৳{{ number_format($product->price, 2) }}</span>
                @endif
            </div>
            <div class="rating" style="color: #f59e0b; font-size: 0.8rem;">
                <i class="fas fa-star"></i> 4.5
            </div>
        </div>
    </div>
</div>

<style>
    .product-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-md);
    }

    .product-card:hover .product-image img {
        transform: scale(1.05);
    }

    .product-card:hover .actions {
        transform: translateX(0);
        opacity: 1;
    }

    .btn-icon:hover {
        background: var(--primary) !important;
        color: white !important;
    }
</style>