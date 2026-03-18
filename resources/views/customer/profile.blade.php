@extends('layouts.app')

@section('title', 'My Profile')

@section('content')
    <div class="dashboard-page" style="padding: 4rem 0; background: #f8fafc; min-height: 80vh;">
        <div class="container">
            <div class="dashboard-layout" style="display: grid; grid-template-columns: 280px 1fr; gap: 3rem;">

                <!-- Sidebar -->
                <div class="sidebar-col">
                    @include('customer.sidebar')
                </div>

                <!-- Main Content -->
                <div class="content-col">

                    <div class="card-header mb-4 flex justify-between items-center" style="margin-bottom: 2rem;">
                        <div>
                            <h1
                                style="font-size: 1.75rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem;">
                                My Profile</h1>
                            <p style="color: var(--text-light);">Update your personal information and security settings.</p>
                        </div>
                    </div>

                    <form action="{{ route('customer.profile.update') }}" method="POST">
                        @csrf

                        <!-- Personal Info Card -->
                        <div class="profile-card mb-5"
                            style="background: white; border-radius: 16px; box-shadow: var(--shadow-sm); overflow: hidden;">
                            <div class="card-header"
                                style="background: #fdfbf7; padding: 1.5rem 2rem; border-bottom: 1px solid #f1f5f9;">
                                <h3
                                    style="font-size: 1.1rem; font-weight: 600; color: var(--secondary); margin: 0; display: flex; align-items: center; gap: 0.75rem;">
                                    <i class="fas fa-user-circle" style="color: var(--primary);"></i> Personal Details
                                </h3>
                            </div>

                            <div class="card-body" style="padding: 2rem;">
                                <div class="grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                                    <!-- Full Name -->
                                    <div class="form-group">
                                        <label class="form-label"
                                            style="font-weight: 600; font-size: 0.9rem; color: var(--text-light); margin-bottom: 0.5rem; display: block;">Full
                                            Name</label>
                                        <div class="input-wrap relative">
                                            <i class="fas fa-user"
                                                style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #cbd5e1;"></i>
                                            <input type="text" name="name" value="{{ $user->name }}"
                                                class="form-control premium-input pl-5" required
                                                style="padding-left: 2.75rem;">
                                        </div>
                                    </div>

                                    <!-- Email -->
                                    <div class="form-group">
                                        <label class="form-label"
                                            style="font-weight: 600; font-size: 0.9rem; color: var(--text-light); margin-bottom: 0.5rem; display: block;">Email
                                            Address</label>
                                        <div class="input-wrap relative">
                                            <i class="fas fa-envelope"
                                                style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #cbd5e1;"></i>
                                            <input type="email" value="{{ $user->email }}"
                                                class="form-control premium-input pl-5" readonly
                                                style="padding-left: 2.75rem; background: #f8fafc; cursor: not-allowed; opacity: 0.7;">
                                        </div>
                                        <small
                                            style="color: var(--text-light); font-size: 0.75rem; margin-top: 0.25rem; display: block;">Email
                                            cannot be changed contact support.</small>
                                    </div>

                                    <!-- Phone -->
                                    <div class="form-group">
                                        <label class="form-label"
                                            style="font-weight: 600; font-size: 0.9rem; color: var(--text-light); margin-bottom: 0.5rem; display: block;">Phone
                                            Number</label>
                                        <div class="input-wrap relative">
                                            <i class="fas fa-phone"
                                                style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #cbd5e1;"></i>
                                            <input type="text" name="phone" value="{{ $user->phone }}"
                                                class="form-control premium-input pl-5" placeholder="Enter phone number"
                                                style="padding-left: 2.75rem;">
                                        </div>
                                    </div>
                                </div>

                                <!-- Address -->
                                <div class="form-group mt-4" style="margin-top: 1.5rem;">
                                    <label class="form-label"
                                        style="font-weight: 600; font-size: 0.9rem; color: var(--text-light); margin-bottom: 0.5rem; display: block;">Shipping
                                        Address</label>
                                    <div class="input-wrap relative">
                                        <i class="fas fa-map-marker-alt"
                                            style="position: absolute; left: 1rem; top: 1rem; color: #cbd5e1;"></i>
                                        <textarea name="address" class="form-control premium-input pl-5" rows="3"
                                            placeholder="Enter your full address"
                                            style="padding-left: 2.75rem;">{{ $user->address }}</textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Security Card -->
                        <div class="profile-card mb-5"
                            style="background: white; border-radius: 16px; box-shadow: var(--shadow-sm); overflow: hidden;">
                            <div class="card-header"
                                style="background: #fdfbf7; padding: 1.5rem 2rem; border-bottom: 1px solid #f1f5f9;">
                                <h3
                                    style="font-size: 1.1rem; font-weight: 600; color: var(--secondary); margin: 0; display: flex; align-items: center; gap: 0.75rem;">
                                    <i class="fas fa-lock" style="color: var(--primary);"></i> Security Settings
                                </h3>
                            </div>
                            <div class="card-body" style="padding: 2rem;">
                                <p style="color: var(--text-light); font-size: 0.9rem; margin-bottom: 1.5rem;">Leave blank
                                    if you don't want to change your password.</p>

                                <div class="grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                                    <div class="form-group">
                                        <label class="form-label"
                                            style="font-weight: 600; font-size: 0.9rem; color: var(--text-light); margin-bottom: 0.5rem; display: block;">New
                                            Password</label>
                                        <div class="input-wrap relative">
                                            <i class="fas fa-key"
                                                style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #cbd5e1;"></i>
                                            <input type="password" name="password" class="form-control premium-input pl-5"
                                                placeholder="Min. 8 characters" style="padding-left: 2.75rem;">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label"
                                            style="font-weight: 600; font-size: 0.9rem; color: var(--text-light); margin-bottom: 0.5rem; display: block;">Confirm
                                            Password</label>
                                        <div class="input-wrap relative">
                                            <i class="fas fa-check-circle"
                                                style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #cbd5e1;"></i>
                                            <input type="password" name="password_confirmation"
                                                class="form-control premium-input pl-5" placeholder="Confirm new password"
                                                style="padding-left: 2.75rem;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Actions -->
                        <div class="text-right" style="text-align: right;">
                            <button type="submit" class="btn btn-primary"
                                style="padding: 1rem 3rem; border-radius: 50px; font-size: 1rem; font-weight: 600; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <style>
        .premium-input {
            border: 1px solid #e2e8f0;
            transition: all 0.2s;
            border-radius: 12px;
        }

        .premium-input:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(225, 188, 101, 0.1);
            outline: none;
        }

        .input-wrap i {
            transition: color 0.2s;
        }

        .input-wrap input:focus+i,
        .input-wrap textarea:focus+i {
            color: var(--primary) !important;
        }

        /* Sibling selector won't work easily here due to DOM order. */
        .input-wrap:focus-within i {
            color: var(--primary) !important;
        }

        @media(max-width: 900px) {
            .dashboard-layout {
                grid-template-columns: 1fr;
            }

            .grid {
                grid-template-columns: 1fr !important;
            }
        }
    </style>
@endsection