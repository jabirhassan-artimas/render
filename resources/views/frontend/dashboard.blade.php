@extends('layouts.app')

@section('content')
    <div class="container" style="padding: 2rem 0;">
        <h1>My Account</h1>

        <div class="grid" style="display: grid; grid-template-columns: 250px 1fr; gap: 2rem; margin-top: 2rem;">
            <aside>
                <div class="card p-4">
                    <div class="mb-4 text-center">
                        <div
                            style="width: 80px; height: 80px; background: #eff6ff; border-radius: 50%; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; color: var(--primary); font-size: 2rem;">
                            {{ substr(auth()->user()->name, 0, 1) }}
                        </div>
                        <h4>{{ auth()->user()->name }}</h4>
                        <p class="text-light">{{ auth()->user()->email }}</p>
                    </div>
                    <nav style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <a href="#" class="btn btn-primary" style="text-align: left;">My Orders</a>
                        <a href="#" class="btn btn-outline" style="text-align: left; border: none;">Profile Settings</a>
                        <a href="#" class="btn btn-outline" style="text-align: left; border: none;">Address Book</a>
                    </nav>
                </div>
            </aside>

            <main>
                <div class="card p-4">
                    <h3>Order History</h3>
                    <p class="text-light">You have placed no orders yet.</p>
                </div>
            </main>
        </div>
    </div>
@endsection