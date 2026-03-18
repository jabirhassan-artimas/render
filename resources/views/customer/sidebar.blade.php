<div class="customer-sidebar"
    style="background: white; border-radius: 16px; overflow: hidden; box-shadow: var(--shadow-sm); position: sticky; top: 2rem;">
    <!-- Profile Header -->
    <div class="sidebar-header"
        style="background: linear-gradient(135deg, var(--primary) 0%, #1e40af 100%); padding: 2rem; text-align: center; color: white;">
        <div
            style="width: 80px; height: 80px; background: rgba(255,255,255,0.2); backdrop-filter: blur(5px); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 700; margin: 0 auto 1rem; border: 2px solid rgba(255,255,255,0.3);">
            {{ substr(Auth::user()->name, 0, 1) }}
        </div>
        <h4 style="margin: 0; font-size: 1.1rem; font-weight: 600;">{{ Auth::user()->name }}</h4>
        <p style="margin: 0.5rem 0 0; font-size: 0.85rem; opacity: 0.8;">{{ Auth::user()->email }}</p>
    </div>

    <!-- Navigation -->
    <nav class="sidebar-nav" style="padding: 1.5rem;">
        <a href="{{ route('dashboard') }}" class="nav-item {{ request()->routeIs('dashboard') ? 'active' : '' }}">
            <i class="fas fa-th-large icon"></i> Dashboard
        </a>
        <a href="{{ route('customer.orders') }}"
            class="nav-item {{ request()->routeIs('customer.orders*') ? 'active' : '' }}">
            <i class="fas fa-shopping-bag icon"></i> My Orders
        </a>
        <a href="{{ route('customer.profile') }}"
            class="nav-item {{ request()->routeIs('customer.profile') ? 'active' : '' }}">
            <i class="fas fa-user-circle icon"></i> My Profile
        </a>

        <form action="{{ route('logout') }}" method="POST"
            style="margin-top: 1rem; border-top: 1px solid #f1f5f9; padding-top: 1rem;">
            @csrf
            <button type="submit" class="nav-item logout">
                <i class="fas fa-sign-out-alt icon"></i> Logout
            </button>
        </form>
    </nav>
</div>

<style>
    .nav-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        color: var(--text-light);
        text-decoration: none;
        border-radius: 12px;
        transition: all 0.2s;
        margin-bottom: 0.5rem;
        font-weight: 500;
    }

    .nav-item:hover {
        background: #f8fafc;
        color: var(--primary);
        transform: translateX(5px);
    }

    .nav-item.active {
        background: #eff6ff;
        color: var(--primary);
        font-weight: 600;
    }

    .nav-item .icon {
        width: 24px;
        text-align: center;
    }

    .nav-item.logout {
        width: 100%;
        border: none;
        background: none;
        cursor: pointer;
        text-align: left;
        color: #ef4444;
    }

    .nav-item.logout:hover {
        background: #fef2f2;
        color: #dc2626;
    }
</style>