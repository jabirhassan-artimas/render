@extends('layouts.app')

@section('title', $page->title)

@section('content')

    @if($page->slug == 'about-us')
        <!-- Unique About Us Layout -->
        <div class="about-page">
            <!-- Hero -->
            <section class="page-hero"
                style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 5rem 0; text-align: center;">
                <div class="container">
                    <h1 style="font-size: 3rem; font-weight: 800; color: var(--text-main); margin-bottom: 1rem;">
                        {{ $page->title }}
                    </h1>
                    <p style="color: var(--text-light); font-size: 1.2rem; max-width: 600px; margin: 0 auto;">Discover the story
                        behind our craftsmanship and passion for heritage.</p>
                </div>
            </section>

            <!-- Main Content -->
            <section style="padding: 5rem 0;">
                <div class="container">
                    <div class="grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;">
                        <div class="about-image" style="position: relative;">
                            <div
                                style="width: 100%; height: 400px; background: #e2e8f0; border-radius: 20px; overflow: hidden; position: relative;">
                                @if($page->image)
                                    <img src="{{ asset('storage/' . $page->image) }}"
                                        style="width: 100%; height: 100%; object-fit: cover;">
                                @else
                                    <div
                                        style="width: 100%; height: 100%; background: linear-gradient(45deg, #cbd5e1 25%, #94a3b8 25%, #94a3b8 50%, #cbd5e1 50%, #cbd5e1 75%, #94a3b8 75%); background-size: 40px 40px; opacity: 0.1;">
                                    </div>
                                    <div
                                        style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: var(--text-light); opacity: 0.5;">
                                        <i class="fas fa-gem fa-5x"></i>
                                    </div>
                                @endif
                            </div>
                            <div
                                style="position: absolute; bottom: -20px; right: -20px; background: white; padding: 2rem; border-radius: 12px; box-shadow: var(--shadow-md);">
                                <h4 style="margin: 0; font-size: 2.5rem; font-weight: 800; color: var(--primary);">
                                    {{ $page->meta['experience_years'] ?? '10+' }}</h4>
                                <span
                                    style="color: var(--text-light); font-size: 0.9rem;">{{ $page->meta['experience_label'] ?? 'Years of Experience' }}</span>
                            </div>
                        </div>
                        <div class="about-content">
                            <h2 style="font-size: 2rem; margin-bottom: 1.5rem; position: relative; padding-bottom: 1rem;">
                                Our Story
                                <span
                                    style="position: absolute; bottom: 0; left: 0; width: 60px; height: 3px; background: var(--primary);"></span>
                            </h2>
                            <div style="color: var(--text-light); line-height: 1.8; font-size: 1.05rem;">
                                {!! $page->content !!}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Dynamic Services -->
            @if(isset($services) && $services->count() > 0)
                <section style="padding: 5rem 0; background: #f8fafc;">
                    <div class="container">
                        <div class="text-center mb-5">
                            <h2 style="font-size: 2rem; font-weight: 700;">Why Choose Us</h2>
                            <p style="color: var(--text-light);">We promise quality and reliability</p>
                        </div>
                        <div class="grid"
                            style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
                            @foreach($services as $service)
                                <div class="service-card"
                                    style="background: white; padding: 2rem; border-radius: 12px; text-align: center; box-shadow: var(--shadow-sm); transition: transform 0.3s;">
                                    <div
                                        style="width: 60px; height: 60px; background: #eff6ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: var(--primary); font-size: 1.5rem;">
                                        <i class="{{ $service->icon }}"></i>
                                    </div>
                                    <h4 style="font-size: 1.1rem; margin-bottom: 0.5rem; font-weight: 600;">{{ $service->title }}</h4>
                                    <p style="color: var(--text-light); font-size: 0.9rem;">{{ $service->description }}</p>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </section>
            @endif

            <!-- Dynamic Testimonials -->
            @if(isset($testimonials) && $testimonials->count() > 0)
                <section style="padding: 5rem 0; background: white;">
                    <div class="container">
                        <div class="text-center mb-5">
                            <h2 style="font-size: 2rem; font-weight: 700;">Client Reviews</h2>
                            <p style="color: var(--text-light);">Hear from our valued customers</p>
                        </div>
                        <div class="grid"
                            style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                            @foreach($testimonials as $testimonial)
                                <div class="testimonial-card"
                                    style="padding: 2rem; border: 1px solid #f1f5f9; border-radius: 12px; position: relative;">
                                    <i class="fas fa-quote-left" style="color: #e2e8f0; font-size: 2rem; margin-bottom: 1rem;"></i>
                                    <p style="color: var(--text-main); font-style: italic; margin-bottom: 1.5rem;">
                                        "{{ $testimonial->content }}"</p>
                                    <div class="flex items-center gap-3">
                                        @if($testimonial->image)
                                            <img src="{{ asset('storage/' . $testimonial->image) }}"
                                                style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid var(--primary);">
                                        @else
                                            <div
                                                style="width: 50px; height: 50px; background: #f1f5f9; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; color: var(--text-light); font-size: 1.2rem;">
                                                {{ substr($testimonial->name, 0, 1) }}
                                            </div>
                                        @endif
                                        <div>
                                            <h5 style="margin: 0; font-size: 0.95rem; font-weight: 600;">{{ $testimonial->name }}</h5>
                                            <span
                                                style="font-size: 0.8rem; color: var(--text-light);">{{ $testimonial->designation }}</span>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </section>
            @endif

        </div>

    @else
        <!-- Standard Page Layout -->
        <div class="standard-page" style="padding: 4rem 0;">
            <div class="container" style="max-width: 800px;">
                <div class="text-center mb-5">
                    <h1 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem;">{{ $page->title }}</h1>
                    <div style="width: 60px; height: 4px; background: var(--primary); margin: 0 auto; border-radius: 2px;">
                    </div>
                </div>

                <div class="content" style="font-size: 1.1rem; line-height: 1.8; color: var(--text-main);">
                    {!! $page->content !!}
                </div>
            </div>
        </div>
    @endif

    <style>
        @media (max-width: 768px) {
            .about-page .grid {
                grid-template-columns: 1fr !important;
            }

            .about-image {
                order: -1;
                margin-bottom: 2rem;
            }
        }
    </style>
@endsection