@extends('layouts.admin')

@section('title', 'System Settings')

@section('content')
    <style>
        .settings-container {
            max-width: 900px;
            margin: 0 auto;
        }

        .settings-tab-card {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }

        .setting-section-header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 1.5rem;
            padding-bottom: 0.75rem;
            border-bottom: 2px solid #f4f7fe;
            color: #2b3674;
            font-weight: 800;
            font-size: 1.1rem;
        }

        .setting-section-header i {
            color: #4361ee;
        }

        .premium-form-label {
            font-weight: 700;
            color: #2b3674;
            font-size: 0.85rem;
            margin-bottom: 0.5rem;
            display: block;
        }

        .premium-form-control {
            background: #f4f7fe;
            border: 2px solid transparent;
            border-radius: 12px;
            padding: 0.75rem 1rem;
            width: 100%;
            color: #2b3674;
            font-weight: 600;
            transition: all 0.3s;
        }

        .premium-form-control:focus {
            background: white;
            border-color: #4361ee;
            box-shadow: 0 4px 15px rgba(67, 97, 238, 0.1);
            outline: none;
        }

        .btn-save-settings {
            background: linear-gradient(135deg, #4361ee 0%, #4cc9f0 100%);
            color: white;
            border: none;
            border-radius: 12px;
            padding: 1rem 2rem;
            font-weight: 700;
            box-shadow: 0 4px 15px rgba(67, 97, 238, 0.3);
            cursor: pointer;
            transition: all 0.3s;
            width: 100%;
            margin-top: 2rem;
        }

        .btn-save-settings:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(67, 97, 238, 0.4);
        }

        .logo-preview {
            width: 120px;
            height: 60px;
            object-fit: contain;
            background: #f4f7fe;
            padding: 10px;
            border-radius: 12px;
            margin-bottom: 1rem;
            border: 2px solid #eef2f6;
        }
    </style>

    <div class="settings-container">
        <div class="flex justify-between items-center mb-6">
            <h2 style="font-weight: 800; color: #2b3674; margin: 0;">Global Configuration</h2>
        </div>

        @if(session('success'))
            <div class="card-premium mb-6" style="background: #eefdf5; border-left: 5px solid #05cd99; color: #166534;">
                <i class="fas fa-check-circle mr-2"></i> {{ session('success') }}
            </div>
        @endif

        <form action="{{ route('admin.settings.update') }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Branding & General -->
                <div class="settings-tab-card">
                    <div class="setting-section-header">
                        <i class="fas fa-paint-brush"></i> General Branding
                    </div>

                    <div class="mb-5">
                        <label class="premium-form-label">Site Identity Icon (Logo)</label>
                        <div class="flex items-center gap-4">
                            @if(isset($settings['site_logo']))
                                <img src="{{ asset('storage/' . $settings['site_logo']) }}" class="logo-preview">
                            @endif
                            <div class="flex-1">
                                <input type="file" name="site_logo" class="premium-form-control"
                                    style="font-size: 0.85rem;">
                                <small style="color: #a3aed0; font-size: 0.75rem;">Suggest: 50px height, Transparent
                                    PNG</small>
                            </div>
                        </div>
                    </div>

                    <div class="mb-5">
                        <label class="premium-form-label">Main Site Name</label>
                        <input type="text" name="site_title" class="premium-form-control"
                            value="{{ $settings['site_title'] ?? 'ShopCMS' }}">
                    </div>

                    <div class="mb-5">
                        <label class="premium-form-label">Footer Copyright Signature</label>
                        <input type="text" name="footer_text" class="premium-form-control"
                            value="{{ $settings['footer_text'] ?? '' }}">
                    </div>

                    <div class="mb-0">
                        <label class="premium-form-label">Meta Description (SEO)</label>
                        <textarea name="site_description" class="premium-form-control"
                            rows="4">{{ $settings['site_description'] ?? '' }}</textarea>
                    </div>
                </div>

                <!-- Contact & Social -->
                <div class="flex flex-col gap-6">
                    <div class="settings-tab-card">
                        <div class="setting-section-header">
                            <i class="fas fa-headset"></i> Contact Communication
                        </div>

                        <div class="mb-5">
                            <label class="premium-form-label">Primary Support Email</label>
                            <input type="email" name="contact_email" class="premium-form-control"
                                value="{{ $settings['contact_email'] ?? '' }}">
                        </div>

                        <div class="mb-5">
                            <label class="premium-form-label">Contact Hotline</label>
                            <input type="text" name="contact_phone" class="premium-form-control"
                                value="{{ $settings['contact_phone'] ?? '' }}">
                        </div>

                        <div class="mb-0">
                            <label class="premium-form-label">Physical Office Address</label>
                            <textarea name="contact_address" class="premium-form-control"
                                rows="3">{{ $settings['contact_address'] ?? '' }}</textarea>
                        </div>
                    </div>

                    <div class="settings-tab-card">
                        <div class="setting-section-header">
                            <i class="fas fa-share-alt"></i> Social Presence
                        </div>

                        <div class="mb-5">
                            <label class="premium-form-label"><i class="fab fa-facebook mr-2"></i> Facebook URL</label>
                            <input type="url" name="facebook_url" class="premium-form-control"
                                value="{{ $settings['facebook_url'] ?? '' }}" placeholder="https://facebook.com/your-brand">
                        </div>

                        <div class="mb-0">
                            <label class="premium-form-label"><i class="fab fa-twitter mr-2"></i> Twitter URL</label>
                            <input type="url" name="twitter_url" class="premium-form-control"
                                value="{{ $settings['twitter_url'] ?? '' }}" placeholder="https://twitter.com/your-brand">
                        </div>
                    </div>

                    <button type="submit" class="btn-save-settings">
                        <i class="fas fa-check-circle mr-2"></i> DEPLOY ALL SETTINGS
                    </button>
                </div>
            </div>
        </form>
    </div>
@endsection