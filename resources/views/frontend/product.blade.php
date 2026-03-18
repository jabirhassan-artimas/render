@extends('layouts.app')

@section('title', $product->name)

@section('content')
    <div class="product-page" style="padding: 4rem 0; background: #f8fafc;">
        <div class="container">

            <!-- Breadcrumbs -->
            <nav style="font-size: 0.9rem; color: var(--text-light); margin-bottom: 2rem;">
                <a href="{{ route('home') }}" style="color: var(--text-light); text-decoration: none;">Home</a>
                <span style="margin: 0 0.5rem;">/</span>
                <a href="{{ route('shop') }}" style="color: var(--text-light); text-decoration: none;">Shop</a>
                <span style="margin: 0 0.5rem;">/</span>
                <span style="color: var(--text-main);">{{ $product->name }}</span>
            </nav>

            <div class="product-layout"
                style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem; margin-bottom: 4rem;">

                <!-- Gallery Section -->
                <div class="product-gallery">
                    <div class="main-image"
                        style="background: white; border-radius: 20px; overflow: hidden; box-shadow: var(--shadow-sm); position: relative; padding-top: 100%;">
                        @if($product->thumbnail)
                            <img src="{{ asset('storage/' . $product->thumbnail) }}" alt="{{ $product->name }}"
                                id="mainProductImage"
                                style="position: absolute; top:0; left:0; width: 100%; height: 100%; object-fit: cover; transition: opacity 0.3s ease-in-out;">
                        @else
                            <div
                                style="position: absolute; top:0; left:0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #f1f5f9; color: #cbd5e1;">
                                <i class="fas fa-image fa-5x"></i>
                            </div>
                        @endif

                        @if($product->discount_price && $product->discount_price < $product->price)
                            <span class="badge"
                                style="position: absolute; top: 20px; left: 20px; background: #ef4444; color: white; padding: 0.5rem 1rem; border-radius: 8px; font-weight: 600; box-shadow: 0 4px 6px rgba(239, 68, 68, 0.3);">SALE</span>
                        @endif
                    </div>

                    @if($product->images->count() > 0)
                        <div class="thumbnails-track"
                            style="display: flex; gap: 1rem; margin-top: 1.5rem; overflow-x: auto; padding-bottom: 0.5rem; scrollbar-width: thin;">
                            <!-- Main Thumbnail -->
                            <div class="thumb active"
                                onclick="changeImage('{{ asset('storage/' . $product->thumbnail) }}', this)"
                                style="width: 80px; height: 80px; flex-shrink: 0; cursor: pointer; border-radius: 12px; overflow: hidden; border: 2px solid var(--primary); opacity: 1;">
                                <img src="{{ asset('storage/' . $product->thumbnail) }}"
                                    style="width: 100%; height: 100%; object-fit: cover;">
                            </div>

                            <!-- Gallery Images -->
                            @foreach($product->images as $img)
                                <div class="thumb" onclick="changeImage('{{ asset('storage/' . $img->image_path) }}', this)"
                                    style="width: 80px; height: 80px; flex-shrink: 0; cursor: pointer; border-radius: 12px; overflow: hidden; border: 2px solid transparent; opacity: 0.6; transition: all 0.2s;">
                                    <img src="{{ asset('storage/' . $img->image_path) }}"
                                        style="width: 100%; height: 100%; object-fit: cover;">
                                </div>
                            @endforeach
                        </div>
                    @endif
                </div>

                <!-- Details Section -->
                <div class="product-details" style="display: flex; flex-direction: column; justify-content: center;">
                    <div class="product-meta mb-3"
                        style="display: flex; align-items: center; gap: 1rem; font-size: 0.85rem; color: var(--text-light); text-transform: uppercase; letter-spacing: 1px;">
                        <span
                            style="background: #eff6ff; color: var(--primary); padding: 0.25rem 0.75rem; border-radius: 50px; font-weight: 600;">{{ $product->category->name ?? 'Collection' }}</span>
                        <span>SKU: {{ $product->sku ?? 'N/A' }}</span>
                    </div>

                    <h1
                        style="font-size: 2.5rem; font-weight: 800; color: var(--text-main); margin-bottom: 1rem; line-height: 1.2;">
                        {{ $product->name }}
                    </h1>

                    <div class="price-block mb-4" style="display: flex; align-items: baseline; gap: 1rem;">
                        @if($product->discount_price && $product->discount_price < $product->price)
                            <span
                                style="font-size: 2rem; font-weight: 700; color: var(--primary);">৳{{ number_format($product->discount_price, 2) }}</span>
                            <span
                                style="font-size: 1.25rem; color: var(--text-light); text-decoration: line-through;">৳{{ number_format($product->price, 2) }}</span>
                        @else
                            <span
                                style="font-size: 2rem; font-weight: 700; color: var(--primary);">৳{{ number_format($product->price, 2) }}</span>
                        @endif
                    </div>

                    <p class="description mb-4" style="color: var(--text-light); line-height: 1.8; font-size: 1.05rem;">
                        {{ $product->description }}
                    </p>

                    <!-- Status -->
                    <div class="mb-4">
                        @if($product->stock_qty > 0)
                            <span
                                style="color: #166534; background: #dcfce7; padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.9rem; font-weight: 500;"><i
                                    class="fas fa-check-circle mr-1"></i> In Stock</span>
                        @else
                            <span
                                style="color: #991b1b; background: #fee2e2; padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.9rem; font-weight: 500;"><i
                                    class="fas fa-times-circle mr-1"></i> Out of Stock</span>
                        @endif
                    </div>

                    <form action="{{ route('cart.add', $product->id) }}" method="POST" class="mb-5">
                        @csrf
                        <div class="actions-wrapper" style="display: flex; gap: 1rem; flex-wrap: wrap;">
                            <!-- Quantity -->
                            <div class="qty-control"
                                style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; display: flex; align-items: center; overflow: hidden; width: 140px;">
                                <button type="button" onclick="updateQty(-1)"
                                    style="width: 40px; height: 50px; border: none; background: none; cursor: pointer; color: var(--text-main); font-size: 1.2rem;">-</button>
                                <input type="number" name="quantity" id="qtyInput" value="1" min="1"
                                    max="{{ $product->stock_qty }}"
                                    style="width: 60px; height: 50px; border: none; text-align: center; font-size: 1.1rem; font-weight: 600; -moz-appearance: textfield;">
                                <button type="button" onclick="updateQty(1)"
                                    style="width: 40px; height: 50px; border: none; background: none; cursor: pointer; color: var(--text-main); font-size: 1.2rem;">+</button>
                            </div>

                            <!-- Add to Cart -->
                            <button type="submit" class="btn btn-primary"
                                style="flex: 1; padding: 0 2rem; border-radius: 12px; font-size: 1.1rem; display: flex; items-center: center; justify-content: center; gap: 0.5rem; box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2); min-width: 200px;">
                                <i class="fas fa-shopping-bag"></i> Add to Cart
                            </button>

                            <!-- Wishlist -->
                            <button type="button" class="btn btn-outline"
                                style="width: 50px; border-radius: 12px; border-color: #e2e8f0; color: var(--text-light); display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">
                                <i class="far fa-heart"></i>
                            </button>
                        </div>
                    </form>

                    <!-- Features -->
                    <div class="features-list"
                        style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; padding-top: 2rem; border-top: 1px solid #f1f5f9;">
                        <div class="feature-item" style="display: flex; align-items: flex-start; gap: 1rem;">
                            <div class="icon"
                                style="width: 40px; height: 40px; background: #eff6ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--primary); font-size: 1.1rem; flex-shrink: 0;">
                                <i class="fas fa-truck"></i>
                            </div>
                            <div>
                                <h5 style="margin: 0 0 0.25rem; font-size: 0.95rem; font-weight: 600;">Free Delivery</h5>
                                <p style="margin: 0; font-size: 0.85rem; color: var(--text-light);">Inside Dhaka City Loop
                                </p>
                            </div>
                        </div>
                        <div class="feature-item" style="display: flex; align-items: flex-start; gap: 1rem;">
                            <div class="icon"
                                style="width: 40px; height: 40px; background: #eff6ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--primary); font-size: 1.1rem; flex-shrink: 0;">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <div>
                                <h5 style="margin: 0 0 0.25rem; font-size: 0.95rem; font-weight: 600;">Brand Warranty</h5>
                                <p style="margin: 0; font-size: 0.85rem; color: var(--text-light);">1 Year Official Warranty
                                </p>
                            </div>
                        </div>
                        <div class="feature-item" style="display: flex; align-items: flex-start; gap: 1rem;">
                            <div class="icon"
                                style="width: 40px; height: 40px; background: #eff6ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--primary); font-size: 1.1rem; flex-shrink: 0;">
                                <i class="fas fa-undo"></i>
                            </div>
                            <div>
                                <h5 style="margin: 0 0 0.25rem; font-size: 0.95rem; font-weight: 600;">Easy Returns</h5>
                                <p style="margin: 0; font-size: 0.85rem; color: var(--text-light);">7 Days Return Policy</p>
                            </div>
                        </div>
                        <div class="feature-item" style="display: flex; align-items: flex-start; gap: 1rem;">
                            <div class="icon"
                                style="width: 40px; height: 40px; background: #eff6ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--primary); font-size: 1.1rem; flex-shrink: 0;">
                                <i class="fas fa-headset"></i>
                            </div>
                            <div>
                                <h5 style="margin: 0 0 0.25rem; font-size: 0.95rem; font-weight: 600;">Support 24/7</h5>
                                <p style="margin: 0; font-size: 0.85rem; color: var(--text-light);">Dedicated Support Team
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Additional Info Tabs -->
            <div class="product-tabs"
                style="background: white; border-radius: 12px; padding: 2rem; margin-bottom: 4rem; box-shadow: var(--shadow-sm);">
                <div style="border-bottom: 1px solid #e2e8f0; margin-bottom: 2rem; display: flex; gap: 2rem;">
                    <button class="tab-btn active" onclick="switchTab('desc', this)"
                        style="background: none; border: none; padding: 1rem 0; font-size: 1.1rem; font-weight: 600; color: var(--primary); border-bottom: 2px solid var(--primary); cursor: pointer;">Description</button>
                    <button class="tab-btn" onclick="switchTab('reviews', this)"
                        style="background: none; border: none; padding: 1rem 0; font-size: 1.1rem; font-weight: 600; color: var(--text-light); border-bottom: 2px solid transparent; cursor: pointer;">Reviews ({{ $product->reviews->count() }})</button>
                </div>

                <div id="desc-content" class="tab-content" style="color: var(--text-light); line-height: 1.8;">
                    <p>{{ $product->description }}</p>
                    <p>Experience the finest quality with our authentic products.</p>
                </div>

                <div id="reviews-content" class="tab-content" style="display: none; color: var(--text-light);">
                    @if($product->reviews->count() > 0)
                        <div class="reviews-list mb-4">
                            @foreach($product->reviews as $review)
                                <div class="review-item" style="border-bottom: 1px solid #f1f5f9; padding-bottom: 1rem; margin-bottom: 1rem;">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                        <strong style="color: var(--text-main);">{{ $review->user->name }}</strong>
                                        <div style="color: #fbbf24;">
                                            @for($i=1; $i<=5; $i++)
                                                @if($i <= $review->rating) <i class="fas fa-star"></i> @else <i class="far fa-star"></i> @endif
                                            @endfor
                                        </div>
                                    </div>
                                    <p style="margin: 0; font-size: 0.95rem;">{{ $review->comment }}</p>
                                    <small style="color: #cbd5e1;">{{ $review->created_at->diffForHumans() }}</small>
                                </div>
                            @endforeach
                        </div>
                    @else
                        <p class="mb-4">No reviews yet. Be the first!</p>
                    @endif

                    @auth
                        <div style="background: #f8fafc; padding: 1.5rem; border-radius: 12px;">
                            <h4 style="margin-bottom: 1rem; color: var(--text-main);">Write a Review</h4>
                            <form action="{{ route('reviews.store', $product->id) }}" method="POST">
                                @csrf
                                <div class="mb-3">
                                    <label class="block mb-2 text-sm font-bold text-gray-700">Rating</label>
                                    <select name="rating" class="form-control" style="width: 100px;" required>
                                        <option value="5">5 Stars</option>
                                        <option value="4">4 Stars</option>
                                        <option value="3">3 Stars</option>
                                        <option value="2">2 Stars</option>
                                        <option value="1">1 Star</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="block mb-2 text-sm font-bold text-gray-700">Comment</label>
                                    <textarea name="comment" class="form-control" rows="3" required placeholder="Share your experience..."></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary">Submit Review</button>
                            </form>
                        </div>
                    @else
                        <div style="background: #f8fafc; padding: 1.5rem; border-radius: 12px; text-align: center;">
                            <p>Please <a href="{{ route('login') }}" style="color: var(--primary); font-weight: 600;">login</a> to write a review.</p>
                        </div>
                    @endauth
                </div>
            </div>

            <!-- Related Products -->
            @if(isset($relatedProducts) && $relatedProducts->count() > 0)
                <div class="related-products">
                    <h3 style="font-size: 1.8rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">You May Also Like
                    </h3>
                    <div class="grid"
                        style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 2rem;">
                        @foreach($relatedProducts as $related)
                            @include('partials.product-card', ['product' => $related])
                        @endforeach
                    </div>
                </div>
            @endif
        </div>
    </div>

    <style>
        /* Turn off number input spinners */
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        @media(max-width: 768px) {
            .product-layout {
                grid-template-columns: 1fr;
            }

            .features-list {
                grid-template-columns: 1fr;
            }
        }
    </style>
@endsection

@section('scripts')
    <script>
        function updateQty(change) {
            const input = document.getElementById('qtyInput');
            let val = parseInt(input.value);
            const max = parseInt(input.getAttribute('max'));

            val += change;
            if (val < 1) val = 1;
            if (val > max) val = max;

            input.value = val;
        }

        function changeImage(src, element) {
            const mainImg = document.getElementById('mainProductImage');
            mainImg.style.opacity = '0.5';
            setTimeout(() => {
                mainImg.src = src;
                mainImg.style.opacity = '1';
            }, 100);

            // Update active state logic
            const allThumbs = document.querySelectorAll('.thumb');
            allThumbs.forEach(thumb => {
                thumb.style.borderColor = 'transparent';
                thumb.style.opacity = '0.6';
            });
            element.style.borderColor = 'var(--primary)';
            element.style.opacity = '1';
        }

        function switchTab(tab, btn) {
            document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.tab-btn').forEach(el => {
                el.style.borderBottomColor = 'transparent';
                el.style.color = 'var(--text-light)';
            });
            
            document.getElementById(tab + '-content').style.display = 'block';
            btn.style.borderBottomColor = 'var(--primary)';
            btn.style.color = 'var(--primary)';
        }
    </script>
@endsection