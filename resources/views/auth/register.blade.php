@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="auth-card card">
            <h2 class="text-center mb-4">Create Account</h2>

            @if ($errors->any())
                <div
                    style="color: var(--danger); margin-bottom: 1rem; background: #fee2e2; padding: 0.5rem; border-radius: var(--radius);">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <form method="POST" action="{{ route('register') }}">
                @csrf

                <div class="form-group">
                    <label for="name" class="form-label">Full Name</label>
                    <input type="text" id="name" name="name" class="form-control" required autofocus>
                </div>

                <div class="form-group">
                    <label for="email" class="form-label">Email Address</label>
                    <input type="email" id="email" name="email" class="form-control" required>
                </div>

                <div class="form-group">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" id="password" name="password" class="form-control" required>
                </div>

                <div class="form-group">
                    <label for="password_confirmation" class="form-label">Confirm Password</label>
                    <input type="password" id="password_confirmation" name="password_confirmation" class="form-control"
                        required>
                </div>

                <button type="submit" class="btn btn-primary" style="width: 100%;">Register</button>

                <div class="text-center mt-4">
                    <a href="{{ route('login') }}" style="color: var(--primary); font-size: 0.9rem;">Already have an
                        account? Login</a>
                </div>
            </form>
        </div>
    </div>
@endsection