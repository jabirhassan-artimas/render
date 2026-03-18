<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Category;
use App\Models\Brand;
use App\Models\Product;
use App\Models\Coupon;
use App\Models\Banner;
use App\Models\CmsPage;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Service;
use App\Models\Testimonial;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 0. Primary Environment Seeders
        $this->call([
            BangladeshiEnvironmentSeeder::class,
        ]);

        // 1. Create Admin User
        $this->command->info('Creating Admin User...');
        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );

        // 2. Create One Customer
        $customer = User::updateOrCreate(
            ['email' => 'sadia@example.com'],
            [
                'name' => 'Sadia Islam',
                'password' => Hash::make('password'),
                'role' => 'customer',
                'phone' => '01711223344',
                'address' => 'House 12, Road 5, Dhanmondi, Dhaka',
                'email_verified_at' => now(),
            ]
        );

        // 3. Create One Category
        $category = Category::updateOrCreate(
            ['slug' => 'traditional-wear'],
            ['name' => 'Traditional Wear', 'status' => true]
        );

        // 4. Create One Brand
        $brand = Brand::updateOrCreate(
            ['slug' => 'deshi-heritage'],
            ['name' => 'Deshi Heritage', 'status' => true]
        );

        // 5. Create One Product (Bangladeshi environment girl product)
        $product = Product::updateOrCreate(
            ['slug' => 'authentic-dhakai-jamdani-saree'],
            [
                'category_id' => $category->id,
                'brand_id' => $brand->id,
                'name' => 'Authentic Dhakai Jamdani Saree',
                'sku' => 'JMD-001',
                'price' => 12500,
                'discount_price' => 10500,
                'stock_qty' => 15,
                'description' => 'A pure cotton handwoven Dhakai Jamdani Saree, perfect for young women and girls for festive occasions like Pohela Boishakh or Eid. Represents the rich cultural heritage of rural Bangladesh.',
                'featured' => true,
                'status' => true,
                'thumbnail' => 'https://images.unsplash.com/photo-1610030469983-98e550d615ef?auto=format&fit=crop&q=80&w=800' // Stock image placeholder matching saree/fabric style
            ]
        );

        // 6. Create One Service
        Service::updateOrCreate(
            ['title' => 'Fast Delivery Inside Dhaka'],
            [
                'icon' => 'Truck',
                'description' => 'Get your products delivered within 24 hours anywhere in Dhaka city.',
                'status' => true,
                'sort_order' => 1
            ]
        );

        // 7. Create One Testimonial
        Testimonial::updateOrCreate(
            ['name' => 'Nusrat Jahan'],
            [
                'designation' => 'University Student',
                'content' => 'The Jamdani Saree I bought is absolutely stunning! The fabric is so breathable and the intricate designs reflect our beautiful Bengali culture.',
                'rating' => 5,
                'status' => true
            ]
        );

        // 8. Create One Slider Banner
        Banner::updateOrCreate(
            ['title' => 'Boishakhi Fest 2026'],
            [
                'subtitle' => 'Celebrate The Bengali New Year',
                'description' => 'Explore our exclusive collection of traditional wear curated specially for young women.',
                'type' => 'slider',
                'link' => '/shop?category=traditional-wear',
                'status' => true,
                'sort_order' => 1,
                'image' => 'https://images.unsplash.com/photo-1583391733958-6c5eeefdb273?auto=format&fit=crop&q=80&w=1200' // Saree/fabric theme
            ]
        );

        // 8.5 Create Promo Banner
        Banner::updateOrCreate(
            ['title' => 'Unlock 20% Off Your First Purchase'],
            [
                'description' => 'Join our inner circle for exclusive early access to drops, member-only drops and styling tips.',
                'type' => 'promo_home',
                'link' => '/shop',
                'status' => true,
                'sort_order' => 2,
                'image' => 'https://images.unsplash.com/photo-1596455607563-ad6193f76b17?auto=format&fit=crop&q=80&w=800'
            ]
        );

        // 9. Create One Coupon
        Coupon::updateOrCreate(
            ['code' => 'BOISHAKH500'],
            [
                'discount_amount' => 500,
                'expires_at' => now()->addMonths(2),
                'status' => true
            ]
        );

        // 10. Create One CMS Page
        CmsPage::updateOrCreate(
            ['slug' => 'about-us'],
            [
                'title' => 'About Us',
                'content' => '<h2>Our Roots</h2><p>We bring you the absolute best of Bengal. Our traditional wear for girls and women is crafted by rural artisans from across Bangladesh...</p>',
                'status' => true
            ]
        );

        // 11. Create One Order for the Customer
        $orderInfo = Order::updateOrCreate(
            ['order_number' => 'ORD-JMD-001'],
            [
                'user_id' => $customer->id,
                'subtotal' => 10500,
                'total' => 10600, // 100 shipping
                'payment_method' => 'cod',
                'payment_status' => 'pending',
                'order_status' => 'processing',
                'shipping_address' => $customer->address,
                'billing_address' => $customer->address,
                'phone' => $customer->phone,
                'email' => $customer->email,
            ]
        );

        OrderItem::firstOrCreate(
            [
                'order_id' => $orderInfo->id,
                'product_id' => $product->id,
            ],
            [
                'product_name' => $product->name,
                'price' => 10500,
                'qty' => 1,
                'total' => 10500,
            ]
        );

        // 12. Create Shipping Methods
        \App\Models\ShippingMethod::firstOrCreate(
            ['name' => 'Inside Dhaka'],
            ['description' => '24-48 Hours delivery', 'cost' => 60, 'status' => true]
        );
        \App\Models\ShippingMethod::firstOrCreate(
            ['name' => 'Outside Dhaka'],
            ['description' => '3-5 Days delivery', 'cost' => 120, 'status' => true]
        );

        // 13. Create Payment Gateways
        \App\Models\PaymentGateway::firstOrCreate(
            ['code' => 'cod'],
            ['name' => 'Cash on Delivery', 'description' => 'Pay when you receive', 'icon' => 'ShoppingBag', 'status' => true]
        );
        \App\Models\PaymentGateway::firstOrCreate(
            ['code' => 'sslcommerz'],
            ['name' => 'SSLCommerz', 'description' => 'Pay with Card/Mobile Banking', 'icon' => 'CreditCard', 'status' => true]
        );

        // 14. Create Custom CMS Pages (Privacy, Terms, Returns)
        \App\Models\CmsPage::firstOrCreate(
            ['slug' => 'privacy-policy'],
            ['title' => 'Privacy Policy', 'content' => '<p>Your privacy is important to us.</p>', 'status' => true]
        );
        \App\Models\CmsPage::firstOrCreate(
            ['slug' => 'terms-of-service'],
            ['title' => 'Terms of Service', 'content' => '<p>These are our terms.</p>', 'status' => true]
        );
        \App\Models\CmsPage::firstOrCreate(
            ['slug' => 'returns'],
            ['title' => 'Return Policy', 'content' => '<p>30 days hassle-free returns.</p>', 'status' => true]
        );
        
        $this->command->info('Custom Database Seeded: "Bangladeshi Traditional Girl Product" theme and System Requirements are ready!');
    }
}
