<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        \Illuminate\Pagination\Paginator::useBootstrap();

        // Share common data to all views
        view()->composer('*', function ($view) {
            $settings = \App\Models\Setting::all()->pluck('value', 'key')->toArray();
            $view->with('globalSettings', $settings);

            // Cart Count (only if session driven, or generic)
            // Assuming session cart structure for guest, or DB for auth user if implemented.
            // For now, let's assume session based 'cart' array.
            $cartCount = 0;
            if (session()->has('cart')) {
                $cartCount = count(session('cart'));
            }
            $view->with('cartCount', $cartCount);
        });
    }
}
