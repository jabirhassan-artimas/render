@extends('layouts.app')

@section('title', 'All Collections')

@section('content')
    <div class="categories-page" style="padding: 4rem 0; background: #f8fafc; min-height: 80vh;">
        <div class="container">

            <!-- Header -->
            <div class="text-center mb-5">
                <h1
                    style="font-size: 2.5rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem; letter-spacing: -0.5px;">
                    Our Collections</h1>
                <p style="color: var(--text-light); font-size: 1.1rem; max-width: 600px; margin: 0 auto;">Explore our
                    exclusive range of handcrafted jewelry, designed for every occasion.</p>
            </div>

            @if($categories->count() > 0)
                <div class="category-grid"
                    style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem;">
                    @foreach($categories as $category)
                        @php
                            // Simple icon mapping for demo purposes if no image exists
                            $iconClass = 'fa-gem'; // Default
                            if (stripos($category->name, 'Necklace') !== false)
                                $iconClass = 'fa-circle-notch'; // Roughly looks like a necklace loop
                            elseif (stripos($category->name, 'Earring') !== false)
                                $iconClass = 'fa-bell'; // Abstract earring shape
                            elseif (stripos($category->name, 'Ring') !== false)
                                $iconClass = 'fa-ring';
                            elseif (stripos($category->name, 'Bracelet') !== false)
                                $iconClass = 'fa-circle';
                            elseif (stripos($category->name, 'Anklet') !== false)
                                $iconClass = 'fa-socks'; // Closest approximation
                            elseif (stripos($category->name, 'Bridal') !== false)
                                $iconClass = 'fa-crown';
                        @endphp

                        <a href="{{ route('category', $category->slug) }}" class="category-card"
                            style="display: block; text-decoration: none; color: inherit; position: relative; background: white; border-radius: 16px; overflow: hidden; box-shadow: var(--shadow-sm); transition: transform 0.3s, box-shadow 0.3s; height: 100%; display: flex; flex-direction: column;">

                            <!-- Image Area -->
                            <div class="img-wrapper"
                                style="height: 220px; background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
                                @if($category->image)
                                    <img src="{{ asset('storage/' . $category->image) }}" alt="{{ $category->name }}"
                                        style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s;">
                                @else
                                    <i class="fas {{ $iconClass }}"
                                        style="font-size: 4rem; color: #cbd5e1; opacity: 0.5; transition: transform 0.3s, color 0.3s;"></i>
                                @endif

                                <!-- Overlay on Hover -->
                                <div class="overlay"
                                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.1); opacity: 0; transition: opacity 0.3s;">
                                </div>
                            </div>

                            <!-- Content Area -->
                            <div class="content"
                                style="padding: 1.5rem; text-align: center; flex: 1; display: flex; flex-direction: column; justify-content: center;">
                                <h3 style="font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem; color: var(--text-main);">
                                    {{ $category->name }}</h3>
                                <span
                                    style="font-size: 0.85rem; color: var(--text-light); text-transform: uppercase; letter-spacing: 1px;">
                                    {{ $category->children->count() > 0 ? $category->children->count() . ' Styles' : 'View Collection' }}
                                </span>

                                <div class="btn-arrow"
                                    style="margin-top: 1rem; color: var(--primary); font-weight: 600; font-size: 0.9rem; opacity: 0; transform: translateY(10px); transition: all 0.3s;">
                                    Shop Now <i class="fas fa-arrow-right ml-1"></i>
                                </div>
                            </div>
                        </a>
                    @endforeach
                </div>
            @else
                <div class="text-center py-5">
                    <i class="fas fa-search fa-3x text-muted mb-3" style="color: #cbd5e1;"></i>
                    <h3 class="text-muted">No collections found.</h3>
                </div>
            @endif
        </div>
    </div>

    <style>
        .category-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .category-card:hover .img-wrapper img {
            transform: scale(1.05);
        }

        .category-card:hover .img-wrapper i {
            transform: scale(1.2) rotate(-10deg);
            color: var(--primary);
            opacity: 0.8;
        }

        .category-card:hover .overlay {
            opacity: 1;
        }

        .category-card:hover .btn-arrow {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
@endsection