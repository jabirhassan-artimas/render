<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Frontend Routes
// Frontend Routes
Route::get('/', [FrontendController::class, 'index'])->name('home');
Route::get('/shop', [FrontendController::class, 'shop'])->name('shop');
Route::get('/categories', [FrontendController::class, 'categories'])->name('categories');
Route::get('/about', [FrontendController::class, 'about'])->name('about');
Route::get('/page/{slug}', [FrontendController::class, 'cmsPage'])->name('page.show');
Route::get('/product/{slug}', [FrontendController::class, 'product'])->name('product.details');
Route::post('/newsletter/subscribe', [FrontendController::class, 'subscribeNewsletter'])->name('newsletter.subscribe');
// Keep this last to avoid conflict with specific routes if slug is generic
Route::get('/category/{slug}', [FrontendController::class, 'category'])->name('category');
Route::get('/district/{id}/products', [FrontendController::class, 'districtProducts'])->name('district.products');

// Cart Routes
Route::get('/cart', [CartController::class, 'index'])->name('cart');
Route::post('/cart/add/{id}', [CartController::class, 'addToCart'])->name('cart.add');
Route::patch('/cart/update', [CartController::class, 'update'])->name('cart.update');
Route::delete('/cart/remove', [CartController::class, 'remove'])->name('cart.remove');

Route::post('/cart/coupon', [CartController::class, 'applyCoupon'])->name('cart.coupon');
Route::delete('/cart/coupon', [CartController::class, 'removeCoupon'])->name('cart.coupon.remove');

// Auth Routes (Custom)
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);

    // Social Login
    Route::get('/auth/{provider}/redirect', [\App\Http\Controllers\SocialAuthController::class, 'redirectToProvider'])->name('social.redirect');
    Route::get('/auth/{provider}/callback', [\App\Http\Controllers\SocialAuthController::class, 'handleProviderCallback'])->name('social.callback');
});

Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');

// Customer Protected Routes
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\CustomerController::class, 'dashboard'])->name('dashboard');
    Route::get('/my-orders', [\App\Http\Controllers\CustomerController::class, 'orders'])->name('customer.orders');
    Route::get('/my-orders/{order}', [\App\Http\Controllers\CustomerController::class, 'orderShow'])->name('customer.orders.show');
    Route::get('/my-orders/{order}/invoice', [\App\Http\Controllers\CustomerController::class, 'downloadInvoice'])->name('orders.invoice.download.customer');

    Route::get('/profile', [\App\Http\Controllers\CustomerController::class, 'profile'])->name('customer.profile');
    Route::put('/profile', [\App\Http\Controllers\CustomerController::class, 'updateProfile'])->name('customer.profile.update');

    Route::get('/wishlist', [\App\Http\Controllers\WishlistController::class, 'index'])->name('wishlist.index');
    Route::post('/wishlist/{product}', [\App\Http\Controllers\WishlistController::class, 'toggle'])->name('wishlist.toggle');
    Route::delete('/wishlist/{id}', [\App\Http\Controllers\WishlistController::class, 'destroy'])->name('wishlist.destroy');

    Route::post('/reviews/{product}', [\App\Http\Controllers\ReviewController::class, 'store'])->name('reviews.store');

    Route::get('/checkout', [OrderController::class, 'checkout'])->name('checkout');
    Route::post('/checkout', [OrderController::class, 'placeOrder'])->name('order.place');
});

// Admin Routes
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::resource('products', \App\Http\Controllers\AdminProductController::class);
    Route::resource('categories', \App\Http\Controllers\AdminCategoryController::class);
    Route::get('orders', [\App\Http\Controllers\AdminOrderController::class, 'index'])->name('orders.index');
    Route::get('orders/{order}', [\App\Http\Controllers\AdminOrderController::class, 'show'])->name('orders.show');
    Route::match(['put', 'patch'], 'orders/{order}/status', [\App\Http\Controllers\AdminOrderController::class, 'updateStatus'])->name('orders.updateStatus');
    Route::patch('orders/{order}/notes', [\App\Http\Controllers\AdminOrderController::class, 'updateNotes'])->name('orders.updateNotes');
    Route::post('orders/{order}/assign-courier', [\App\Http\Controllers\AdminOrderController::class, 'assignCourier'])->name('orders.assignCourier');
    Route::post('orders/{order}/rate-delivery', [\App\Http\Controllers\AdminOrderController::class, 'rateDelivery'])->name('orders.rateDelivery');
    Route::get('orders/{order}/invoice', [\App\Http\Controllers\AdminOrderController::class, 'invoice'])->name('orders.invoice');
    Route::get('orders/{order}/invoice/download', [\App\Http\Controllers\AdminOrderController::class, 'downloadInvoice'])->name('orders.invoice.download');
    Route::post('orders/{order}/invoice/resend', [\App\Http\Controllers\AdminOrderController::class, 'resendInvoice'])->name('orders.invoice.resend');

    Route::get('customers', [\App\Http\Controllers\AdminCustomerController::class, 'index'])->name('customers.index');
    Route::post('customers/{user}/toggle-vip', [\App\Http\Controllers\AdminCustomerController::class, 'toggleVip'])->name('customers.toggleVip');
    Route::post('customers/{user}/toggle-block', [\App\Http\Controllers\AdminCustomerController::class, 'toggleBlock'])->name('customers.toggleBlock');
    Route::post('customers/{user}/tags', [\App\Http\Controllers\AdminCustomerController::class, 'updateTags'])->name('customers.updateTags');
    Route::post('customers/{user}/sms', [\App\Http\Controllers\AdminCustomerController::class, 'sendSms'])->name('customers.sendSms');

    // New Modules
    Route::resource('brands', \App\Http\Controllers\AdminBrandController::class);
    Route::resource('coupons', \App\Http\Controllers\AdminCouponController::class);
    Route::resource('banners', App\Http\Controllers\AdminBannerController::class);
    Route::resource('stories', \App\Http\Controllers\Admin\StoryController::class);
    Route::resource('cms-pages', App\Http\Controllers\AdminCmsPageController::class)->names('pages');
    Route::resource('services', App\Http\Controllers\AdminServiceController::class);
    Route::resource('testimonials', App\Http\Controllers\AdminTestimonialController::class);
    Route::resource('reviews', \App\Http\Controllers\AdminReviewController::class)->only(['index', 'update', 'destroy']);
    
    // Add Courier Resource
    Route::resource('couriers', \App\Http\Controllers\AdminCourierController::class);

    // Advanced Reporting
    Route::get('reports', [App\Http\Controllers\AdminReportController::class, 'index'])->name('reports.index');

    Route::resource('districts', \App\Http\Controllers\AdminDistrictController::class);
    Route::resource('campaign-items', \App\Http\Controllers\AdminCampaignItemController::class);
    Route::get('newsletter', [App\Http\Controllers\AdminController::class, 'newsletter'])->name('newsletter.index');
    Route::delete('newsletter/{subscriber}', [App\Http\Controllers\AdminController::class, 'newsletterDestroy'])->name('newsletter.destroy');

    Route::get('settings', [\App\Http\Controllers\AdminSettingController::class, 'index'])->name('settings.index');
    Route::put('settings', [\App\Http\Controllers\AdminSettingController::class, 'update'])->name('settings.update');
});
