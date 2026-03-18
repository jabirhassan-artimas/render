<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - ShopCMS</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        :root {
            --sidebar-width: 260px;
            --sidebar-collapsed-width: 80px;
            --header-height: 70px;
            --transition-speed: 0.3s;
            --bg-body: #f4f7fe;
            --primary: #4361ee;
            --secondary: #6c757d;
            --success: #05cd99;
            --info: #00b5d8;
            --warning: #ffb547;
            --danger: #ee5d50;
            --white: #ffffff;
            --card-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
        }

        body {
            background-color: var(--bg-body);
            font-family: 'Outfit', sans-serif;
            color: #2b3674;
        }

        .admin-layout {
            display: flex;
            min-height: 100vh;
        }

        /* Sidebar Styles */
        .sidebar {
            width: var(--sidebar-width);
            background: #ffffff;
            border-right: 1px solid #e2e8f0;
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            z-index: 50;
            transition: width var(--transition-speed);
            box-shadow: 4px 0 24px 0 rgba(0, 0, 0, 0.02);
        }

        .sidebar.collapsed {
            width: var(--sidebar-collapsed-width);
        }

        .sidebar-header {
            height: var(--header-height);
            display: flex;
            align-items: center;
            padding: 0 1.5rem;
            border-bottom: 1px solid #f1f5f9;
            justify-content: space-between;
        }

        .sidebar-brand {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--primary);
            display: flex;
            align-items: center;
            gap: 0.75rem;
            white-space: nowrap;
            overflow: hidden;
            transition: opacity var(--transition-speed);
        }

        .sidebar.collapsed .sidebar-brand span {
            display: none;
            opacity: 0;
        }

        .sidebar.collapsed .sidebar-brand {
            justify-content: center;
            width: 100%;
        }

        .sidebar-menu {
            padding: 1rem 0;
            flex: 1;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }

        .sidebar-link {
            display: flex;
            align-items: center;
            padding: 0.85rem 1.5rem;
            color: #64748b;
            font-weight: 500;
            transition: all 0.2s;
            white-space: nowrap;
            position: relative;
        }

        .sidebar-link:hover {
            color: var(--primary);
            background: #eff6ff;
        }

        .sidebar-link.active {
            color: var(--primary);
            background: #eff6ff;
            border-right: 3px solid var(--primary);
        }

        .sidebar-link i {
            width: 24px;
            font-size: 1.1rem;
            margin-right: 1rem;
            text-align: center;
            flex-shrink: 0;
        }

        .sidebar.collapsed .sidebar-link span {
            display: none;
        }

        .sidebar.collapsed .sidebar-link {
            justify-content: center;
            padding: 0.85rem 0;
        }

        .sidebar.collapsed .sidebar-link i {
            margin-right: 0;
        }

        /* Main Content */
        .main-content {
            flex: 1;
            margin-left: var(--sidebar-width);
            transition: margin-left var(--transition-speed);
            display: flex;
            flex-direction: column;
            min-width: 0;
            /* Prevents overflow issues */
        }

        .main-content.expanded {
            margin-left: var(--sidebar-collapsed-width);
        }

        .header {
            height: var(--header-height);
            background: white;
            border-bottom: 1px solid #e2e8f0;
            padding: 0 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: sticky;
            top: 0;
            z-index: 40;
        }

        .toggle-btn {
            background: none;
            border: none;
            color: #64748b;
            cursor: pointer;
            font-size: 1.25rem;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s;
        }

        .toggle-btn:hover {
            background: #f1f5f9;
            color: var(--primary);
        }

        .content-body {
            padding: 2rem;
        }

        .user-profile {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .avatar-circle {
            width: 40px;
            height: 40px;
            background: #eff6ff;
            color: var(--primary);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
        }

        /* Shared Premium Components */
        .card-premium {
            background: white;
            border-radius: 20px;
            padding: 1.5rem;
            box-shadow: var(--card-shadow);
            border: 1px solid #eef2f6;
            margin-bottom: 1.5rem;
        }

        .premium-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0 15px;
            margin-top: -15px;
        }

        .premium-table th {
            color: #a3aed0;
            font-weight: 700;
            font-size: 0.8rem;
            text-transform: uppercase;
            padding: 12px 20px;
            text-align: left;
            border: none;
        }

        .premium-table tr {
            background: white;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
            transition: transform 0.2s ease;
        }

        .premium-table tr:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        .premium-table td {
            padding: 15px 20px;
            font-size: 0.9rem;
            color: #2b3674;
            font-weight: 600;
            border: none;
        }

        .premium-table td:first-child {
            border-top-left-radius: 15px;
            border-bottom-left-radius: 15px;
        }

        .premium-table td:last-child {
            border-top-right-radius: 15px;
            border-bottom-right-radius: 15px;
        }

        .premium-badge {
            padding: 5px 15px;
            border-radius: 10px;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            display: inline-block;
        }

        /* Premium Filter Styling */
        .filter-card {
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 18px;
            box-shadow: var(--card-shadow);
            border: 1px solid #eef2f6;
            display: flex;
            align-items: center;
        }

        .search-wrapper {
            position: relative;
            flex: 1;
            max-width: 500px;
        }

        .search-wrapper i {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #a3aed0;
            font-size: 0.9rem;
            pointer-events: none;
        }

        .search-input {
            width: 100%;
            padding: 12px 15px 12px 45px !important;
            background: #f4f7fe;
            border: 2px solid transparent !important;
            border-radius: 12px !important;
            font-size: 0.9rem !important;
            font-weight: 600 !important;
            color: #2b3674 !important;
            transition: all 0.2s ease;
        }

        .search-input:focus {
            outline: none;
            background: white !important;
            border-color: var(--primary) !important;
            box-shadow: 0 4px 15px rgba(67, 97, 238, 0.08);
        }

        .search-input::placeholder {
            color: #a3aed0;
            font-weight: 500;
        }

        .premium-select {
            padding: 10px 15px !important;
            background: #f4f7fe;
            border: 2px solid transparent !important;
            border-radius: 12px !important;
            font-size: 0.85rem !important;
            font-weight: 700 !important;
            color: #2b3674 !important;
            cursor: pointer;
            transition: all 0.2s ease;
            min-width: 140px;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23a3aed0' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: calc(100% - 15px) center;
            padding-right: 40px !important;
        }

        .premium-select:focus {
            outline: none;
            border-color: var(--primary) !important;
            background-color: white !important;
        }

        .premium-select:hover {
            background-color: #eef2ff !important;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .sidebar {
                transform: translateX(-100%);
            }

            .sidebar.mobile-open {
                transform: translateX(0);
            }

            .main-content {
                margin-left: 0 !important;
            }
        }
    </style>
</head>

<body>
    <div class="admin-layout">
        <aside class="sidebar" id="sidebar">
            <div class="sidebar-header">
                <a href="{{ route('home') }}" class="sidebar-brand">
                    @if(\App\Models\Setting::get('site_logo'))
                        <img src="{{ asset('storage/' . \App\Models\Setting::get('site_logo')) }}" alt="Logo"
                            style="height: 32px;">
                    @else
                        <i class="fas fa-shopping-bag"></i>
                    @endif
                    <span>{{ \App\Models\Setting::get('site_title', 'ShopCMS') }}</span>
                </a>
            </div>

            <nav class="sidebar-menu">
                <a href="{{ route('admin.dashboard') }}"
                    class="sidebar-link {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">
                    <i class="fas fa-chart-line"></i> <span>Dashboard</span>
                </a>
                <a href="{{ route('admin.products.index') }}"
                    class="sidebar-link {{ request()->routeIs('admin.products.*') ? 'active' : '' }}">
                    <i class="fas fa-box"></i> <span>Products</span>
                </a>
                <a href="{{ route('admin.categories.index') }}"
                    class="sidebar-link {{ request()->routeIs('admin.categories.*') ? 'active' : '' }}">
                    <i class="fas fa-tags"></i> <span>Categories</span>
                </a>
                <a href="{{ route('admin.brands.index') }}"
                    class="sidebar-link {{ request()->routeIs('admin.brands.*') ? 'active' : '' }}">
                    <i class="fas fa-star"></i> <span>Brands</span>
                </a>
                <a href="{{ route('admin.orders.index') }}"
                    class="sidebar-link {{ request()->routeIs('admin.orders.*') ? 'active' : '' }}">
                    <i class="fas fa-shopping-cart"></i> <span>Orders</span>
                </a>
                <a href="{{ route('admin.customers.index') }}"
                    class="sidebar-link {{ request()->routeIs('admin.customers.*') ? 'active' : '' }}">
                    <i class="fas fa-users"></i> <span>Customers</span>
                </a>
                <a href="{{ route('admin.coupons.index') }}"
                    class="sidebar-link {{ request()->routeIs('admin.coupons.*') ? 'active' : '' }}">
                    <i class="fas fa-ticket-alt"></i> <span>Coupons</span>
                </a>
                <a href="{{ route('admin.banners.index') }}"
                    class="sidebar-link {{ request()->routeIs('admin.banners.*') ? 'active' : '' }}">
                    <i class="fas fa-images"></i> <span>Banners</span>
                </a>
                <a href="{{ route('admin.pages.index') }}"
                    class="sidebar-link {{ request()->routeIs('admin.pages.*') ? 'active' : '' }}">
                    <i class="fas fa-file-alt"></i> <span>CMS Pages</span>
                </a>
                <a href="{{ route('admin.services.index') }}"
                    class="sidebar-link {{ request()->routeIs('admin.services.*') ? 'active' : '' }}">
                    <i class="fas fa-concierge-bell"></i> <span>Services</span>
                </a>
                <a href="{{ route('admin.testimonials.index') }}"
                    class="sidebar-link {{ request()->routeIs('admin.testimonials.*') ? 'active' : '' }}">
                    <i class="fas fa-comment-alt"></i> <span>Testimonials</span>
                </a>
                <a href="{{ route('admin.settings.index') }}"
                    class="sidebar-link {{ request()->routeIs('admin.settings.*') ? 'active' : '' }}">
                    <i class="fas fa-cog"></i> <span>Settings</span>
                </a>

                <div style="margin-top: auto; border-top: 1px solid #f1f5f9; padding-top: 0.5rem;">
                    <form action="{{ route('logout') }}" method="POST">
                        @csrf
                        <button type="submit" class="sidebar-link"
                            style="width:100%; border:none; background:none; cursor:pointer;">
                            <i class="fas fa-sign-out-alt"></i> <span>Logout</span>
                        </button>
                    </form>
                </div>
            </nav>
        </aside>

        <main class="main-content" id="mainContent">
            <header class="header">
                <div class="flex items-center gap-4">
                    <button class="toggle-btn" id="sidebarToggle">
                        <i class="fas fa-bars"></i>
                    </button>
                    <h2 class="m-0" style="font-size: 1.25rem;">@yield('title', 'Dashboard')</h2>
                </div>

                <div class="user-profile">
                    <span>{{ auth()->user()->name }}</span>
                    <div class="avatar-circle">
                        {{ substr(auth()->user()->name, 0, 1) }}
                    </div>
                </div>
            </header>

            <div class="content-body">
                @yield('content')
            </div>
        </main>
    </div>

    <script>
        const toggleBtn = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');

        // Check local storage
        const isCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
        if (isCollapsed) {
            sidebar.classList.add('collapsed');
            mainContent.classList.add('expanded');
        }

        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');

            // Save state
            localStorage.setItem('sidebar-collapsed', sidebar.classList.contains('collapsed'));
        });
    </script>
</body>

</html>