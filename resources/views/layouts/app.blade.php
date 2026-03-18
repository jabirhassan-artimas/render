<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Home') - {{ \App\Models\Setting::get('site_title', 'ShopCMS') }}</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>

<body>
    <header>
        <div class="container nav-wrapper">
            <a href="{{ route('home') }}" class="logo">
                @if(\App\Models\Setting::get('site_logo'))
                    <img src="{{ asset('storage/' . \App\Models\Setting::get('site_logo')) }}"
                        alt="{{ \App\Models\Setting::get('site_title', 'ShopCMS') }}"
                        style="height: 40px; vertical-align: middle;">
                @else
                    <i class="fas fa-shopping-bag"></i> {{ \App\Models\Setting::get('site_title', 'ShopCMS') }}
                @endif
            </a>

            <nav class="nav-links">
                <a href="{{ route('home') }}" class="{{ request()->routeIs('home') ? 'active' : '' }}">Home</a>
                <a href="{{ route('shop') }}" class="{{ request()->routeIs('shop') ? 'active' : '' }}">Shop</a>
                <a href="{{ route('categories') }}"
                    class="{{ request()->routeIs('categories') ? 'active' : '' }}">Categories</a>
                <a href="{{ route('page.show', 'about-us') }}"
                    class="{{ request()->is('page/about-us') ? 'active' : '' }}">About Us</a>
            </nav>

            <div class="nav-actions">
                <a href="{{ route('cart') }}" class="btn btn-outline" style="padding: 0.5rem; position: relative;">
                    <i class="fas fa-shopping-cart"></i>
                    @if($cartCount > 0)
                        <span
                            style="position: absolute; top: -5px; right: -5px; background: var(--danger); color: white; font-size: 0.7rem; padding: 2px 6px; border-radius: 50%;">{{ $cartCount }}</span>
                    @endif
                </a>

                @auth
                    @if(auth()->user()->role === 'admin')
                        <a href="{{ route('admin.dashboard') }}" class="btn btn-primary">Admin Panel</a>
                    @else
                        <a href="{{ route('dashboard') }}" class="btn btn-outline">My Account</a>
                    @endif
                    <form action="{{ route('logout') }}" method="POST" style="display:inline;">
                        @csrf
                        <button type="submit" class="btn btn-outline" style="border:none; color: var(--danger);">
                            <i class="fas fa-sign-out-alt"></i>
                        </button>
                    </form>
                @else
                    <a href="{{ route('login') }}" class="btn btn-outline">Login</a>
                    <a href="{{ route('register') }}" class="btn btn-primary">Sign Up</a>
                @endauth
            </div>
        </div>
    </header>

    <main>
        @if(session('success'))
            <div class="container mt-4">
                <div class="p-4"
                    style="background: #dcfce7; color: #166534; border-radius: var(--radius); border: 1px solid #bbf7d0;">
                    <i class="fas fa-check-circle mr-2"></i> {{ session('success') }}
                </div>
            </div>
        @endif
        @if(session('error'))
            <div class="container mt-4">
                <div class="p-4"
                    style="background: #fee2e2; color: #991b1b; border-radius: var(--radius); border: 1px solid #fecaca;">
                    <i class="fas fa-exclamation-circle mr-2"></i> {{ session('error') }}
                </div>
            </div>
        @endif

        @yield('content')
    </main>

    <footer>
        <div class="container" style="padding: 2rem 0;">
            <div class="grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div>
                    <h4 class="mb-3">{{ $globalSettings['site_title'] ?? 'ShopCMS' }}</h4>
                    <p class="text-light mb-2">{{ $globalSettings['site_description'] ?? 'Your trusted online store.' }}
                    </p>
                    <p class="text-light mb-1"><i class="fas fa-map-marker-alt"></i>
                        {{ $globalSettings['contact_address'] ?? '123 Main St, City' }}</p>
                    <p class="text-light mb-1"><i class="fas fa-phone"></i>
                        {{ $globalSettings['contact_phone'] ?? '+123456789' }}</p>
                    <p class="text-light"><i class="fas fa-envelope"></i> {{ $globalSettings['contact_email'] ??
                        'info@example.com' }}</p>
                </div>
                <div style="text-align: right;">
                    <h4 class="mb-3">Follow Us</h4>
                    <div class="social-links" style="display: flex; gap: 1rem; justify-content: flex-end;">
                        @if(!empty($globalSettings['facebook_url']))
                            <a href="{{ $globalSettings['facebook_url'] }}" target="_blank"
                                style="color: white; font-size: 1.5rem;"><i class="fab fa-facebook"></i></a>
                        @endif
                        @if(!empty($globalSettings['twitter_url']))
                            <a href="{{ $globalSettings['twitter_url'] }}" target="_blank"
                                style="color: white; font-size: 1.5rem;"><i class="fab fa-twitter"></i></a>
                        @endif
                    </div>
                    <p class="mt-4 text-light">&copy; {{ date('Y') }}
                        {{ $globalSettings['footer_text'] ?? ($globalSettings['site_title'] ?? 'ShopCMS') . '. All rights reserved.' }}
                    </p>
                </div>
            </div>
        </div>
    </footer>
    @yield('scripts')
</body>

</html>