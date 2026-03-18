@extends('layouts.app')

@section('title', 'Home')

@section('content')

    <!-- Hero Slider -->
    <div class="hero-slider" style="position: relative; overflow: hidden; background: var(--secondary);">
        <div class="slides-container" style="position: relative; height: 600px;">
            @forelse($sliderBanners as $key => $banner)
                <div class="slide {{ $key == 0 ? 'active' : '' }}"
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; transition: opacity 0.8s ease-in-out; z-index: 0;">
                    <div class="slide-bg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
                        @if($banner->image)
                            <img src="{{ asset('storage/' . $banner->image) }}" alt="{{ $banner->title }}"
                                style="width: 100%; height: 100%; object-fit: cover;">
                        @else
                            <div
                                style="width: 100%; height: 100%; background: linear-gradient(135deg, var(--secondary) 0%, #2d2d2c 100%);">
                            </div>
                        @endif
                        <!-- Gradient Overlay -->
                        <div
                            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%);">
                        </div>
                    </div>

                    <div class="container"
                        style="position: relative; height: 100%; display: flex; align-items: center; z-index: 10;">
                        <div class="slide-content" style="max-width: 600px; padding: 2rem; color: white;">
                            <h2
                                style="font-size: 3.5rem; font-weight: 700; line-height: 1.2; margin-bottom: 1rem; color: var(--primary);">
                                {{ $banner->title }}</h2>
                            <p style="font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9;">{{ $banner->description }}</p>
                            @if($banner->link)
                                <a href="{{ $banner->link }}" class="btn btn-primary"
                                    style="padding: 1rem 2.5rem; font-size: 1.1rem; border-radius: 50px; text-transform: uppercase; letter-spacing: 1px; color: var(--secondary); font-weight: 700;">Explore
                                    Now</a>
                            @endif
                        </div>
                    </div>
                </div>
            @empty
                <div class="slide active"
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--secondary) 0%, #2d2d2c 100%); color: white;">
                    <div class="text-center">
                        <h2 style="font-size: 3rem; color: var(--primary);">Welcome to
                            {{ \App\Models\Setting::get('site_title', 'Sorno Heritage') }}</h2>
                        <p>Experience the elegance of tradition.</p>
                    </div>
                </div>
            @endforelse
        </div>

        <!-- Controls -->
        @if($sliderBanners->count() > 1)
            <button class="slider-prev" onclick="changeSlide(-1)"
                style="position: absolute; top: 50%; left: 20px; transform: translateY(-50%); background: rgba(255,255,255,0.1); color: white; border: none; width: 50px; height: 50px; border-radius: 50%; cursor: pointer; z-index: 20; transition: background 0.3s;"><i
                    class="fas fa-chevron-left"></i></button>
            <button class="slider-next" onclick="changeSlide(1)"
                style="position: absolute; top: 50%; right: 20px; transform: translateY(-50%); background: rgba(255,255,255,0.1); color: white; border: none; width: 50px; height: 50px; border-radius: 50%; cursor: pointer; z-index: 20; transition: background 0.3s;"><i
                    class="fas fa-chevron-right"></i></button>
        @endif
    </div>

    <!-- Features Bar -->
    <div class="features-bar" style="background: var(--secondary); padding: 3rem 0; color: white;">
        <div class="container">
            <div class="grid"
                style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
                @foreach($services as $service)
                    <div class="feature-item" style="display: flex; align-items: center; gap: 1rem;">
                        <div class="icon" style="font-size: 2rem; color: var(--primary);">
                            <i class="{{ $service->icon }}"></i>
                        </div>
                        <div>
                            <h4 style="font-size: 1.1rem; margin: 0; color: white;">{{ $service->title }}</h4>
                            <p style="margin: 0; font-size: 0.9rem; opacity: 0.7;">{{ $service->description }}</p>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>

    <!-- Categories -->
    <section style="padding: 5rem 0; background: var(--background);">
        <div class="container">
            <div class="section-header text-center mb-5">
                <span
                    style="color: var(--primary); text-transform: uppercase; letter-spacing: 2px; font-weight: 600; font-size: 0.9rem;">Collections</span>
                <h2 style="font-size: 2.5rem; font-weight: 700; color: var(--secondary); margin-top: 0.5rem;">Shop by
                    Category</h2>
                <div style="width: 60px; height: 3px; background: var(--primary); margin: 1rem auto;"></div>
            </div>

            <div class="grid"
                style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 2rem;">
                @foreach($categories as $category)
                    <a href="{{ route('category', $category->slug) }}" class="category-card text-center"
                        style="display: block; text-decoration: none;">
                        <div class="img-wrap"
                            style="width: 180px; height: 180px; border-radius: 50%; overflow: hidden; margin: 0 auto 1.5rem; border: 3px solid transparent; transition: all 0.3s; position: relative;">
                            @if($category->image)
                                <img src="{{ asset('storage/' . $category->image) }}"
                                    style="width: 100%; height: 100%; object-fit: cover;">
                            @else
                                <div
                                    style="width: 100%; height: 100%; background: #e2e2e0; display: flex; align-items: center; justify-content: center; color: var(--secondary);">
                                    <i class="fas fa-gem fa-2x"></i>
                                </div>
                            @endif
                        </div>
                        <h3 style="font-size: 1.1rem; font-weight: 600; color: var(--secondary);">{{ $category->name }}</h3>
                    </a>
                @endforeach
            </div>
        </div>
    </section>

    <!-- New Arrivals -->
    <section style="padding: 5rem 0; background: white;">
        <div class="container">
            <div class="flex justify-between items-center mb-5">
                <div>
                    <h2 style="font-size: 2rem; font-weight: 700; color: var(--secondary);">New Arrivals</h2>
                </div>
                <a href="{{ route('shop', ['sort' => 'newest']) }}" class="btn btn-outline">View All</a>
            </div>

            <div class="product-grid">
                @foreach($newArrivals as $product)
                    @include('partials.product-card', ['product' => $product])
                @endforeach
            </div>
        </div>
    </section>

    <!-- Promo Banner -->
    @if($promoBanners->count() > 0)
        <section class="promo-section"
            style="padding: 5rem 0; background: var(--secondary); position: relative; overflow: hidden;">
            <div
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.1; background-image: radial-gradient(var(--primary) 1px, transparent 1px); background-size: 20px 20px;">
            </div>
            <div class="container" style="position: relative; z-index: 10;">
                <div class="grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;">
                    <div>
                        <span
                            style="background: var(--danger); color: white; padding: 0.5rem 1rem; border-radius: 50px; font-weight: 600; font-size: 0.9rem; margin-bottom: 1rem; display: inline-block;">{{ $promoBanners->first()->subtitle ?? 'Special Offer' }}</span>
                        <h2 style="font-size: 3rem; color: white; margin-bottom: 1.5rem; font-weight: 700;">
                            {{ $promoBanners->first()->title }}</h2>
                        <p style="color: #e2e2e0; font-size: 1.1rem; margin-bottom: 2rem;">
                            {{ $promoBanners->first()->description }}</p>
                        <a href="{{ $promoBanners->first()->link }}" class="btn btn-primary"
                            style="padding: 1rem 2.5rem; border-radius: 50px;">Shop Now</a>
                    </div>
                    <div style="display: flex; justify-content: flex-end;">
                        <div
                            style="width: 100%; max-width: 400px; height: 300px; background: white; border-radius: 20px; overflow: hidden; transform: rotate(3deg); box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
                            @if($promoBanners->first()->image)
                                <img src="{{ asset('storage/' . $promoBanners->first()->image) }}"
                                    style="width: 100%; height: 100%; object-fit: cover;">
                            @else
                                <div
                                    style="width: 100%; height: 100%; background: #f1f5f9; display: flex; align-items: center; justify-content: center;">
                                    <i class="fas fa-gift fa-4x text-muted"></i>
                                </div>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </section>
    @endif

    <!-- Featured Products -->
    @if($featuredProducts->count() > 0)
        <section style="padding: 5rem 0; background: var(--background);">
            <div class="container">
                <div class="text-center mb-5">
                    <h2 style="font-size: 2.5rem; font-weight: 700; color: var(--secondary);">Featured Collections</h2>
                    <div style="width: 60px; height: 3px; background: var(--primary); margin: 1rem auto;"></div>
                </div>
                <div class="product-grid">
                    @foreach($featuredProducts as $product)
                        @include('partials.product-card', ['product' => $product])
                    @endforeach
                </div>
            </div>
        </section>
    @endif

    <!-- Testimonials -->
    <section style="padding: 5rem 0; background: white;">
        <div class="container">
            <div class="text-center mb-5">
                <i class="fas fa-quote-left" style="font-size: 2rem; color: var(--primary); margin-bottom: 1rem;"></i>
                <h2 style="font-size: 2rem; font-weight: 700; color: var(--secondary);">What Our Clients Say</h2>
            </div>

            <div class="grid"
                style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                @foreach($testimonials->take(3) as $testimonial)
                    <div class="testimonial-card"
                        style="padding: 2rem; background: var(--background); border-radius: 12px; border: 1px solid var(--border);">
                        <p style="font-style: italic; color: var(--text-main); margin-bottom: 1.5rem;">
                            "{{ $testimonial->content }}"</p>
                        <div class="flex items-center gap-3">
                            @if($testimonial->image)
                                <img src="{{ asset('storage/' . $testimonial->image) }}"
                                    style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid var(--primary);">
                            @else
                                <div
                                    style="width: 50px; height: 50px; background: var(--secondary); color: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.2rem;">
                                    {{ substr($testimonial->name, 0, 1) }}
                                </div>
                            @endif
                            <div>
                                <h5 style="margin: 0; font-size: 1rem; font-weight: 600; color: var(--secondary);">
                                    {{ $testimonial->name }}</h5>
                                <span
                                    style="font-size: 0.8rem; color: var(--text-light);">{{ $testimonial->designation }}</span>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </section>

    <style>
        .slide.active {
            opacity: 1 !important;
            z-index: 10 !important;
        }

        .category-card:hover .img-wrap {
            border-color: var(--primary);
            transform: scale(1.05);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .slider-prev:hover,
        .slider-next:hover {
            background: var(--primary) !important;
            color: var(--secondary) !important;
        }
    </style>
@endsection

@section('scripts')
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            let currentSlide = 0;
            const slides = document.querySelectorAll('.slide');
            const totalSlides = slides.length;

            if (totalSlides > 0) {
                window.changeSlide = function (n) {
                    slides[currentSlide].classList.remove('active');
                    currentSlide = (currentSlide + n + totalSlides) % totalSlides;
                    slides[currentSlide].classList.add('active');
                }

                // Auto play
                setInterval(() => {
                    changeSlide(1);
                }, 6000);
            }
        });
    </script>
@endsection