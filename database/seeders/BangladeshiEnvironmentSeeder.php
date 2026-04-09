<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Brand;
use App\Models\Product;
use App\Models\District;
use App\Models\Banner;
use App\Models\Service;
use App\Models\Testimonial;
use App\Models\Courier;
use App\Models\ShippingMethod;
use App\Models\PaymentGateway;
use App\Models\Story;
use App\Models\CampaignItem;
use Illuminate\Support\Str;

class BangladeshiEnvironmentSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Categories (৫টি বিভাগ)
        $categories = [
            ['name' => 'ঐতিহ্যবাহী পোশাক', 'slug' => 'traditional-fabrics', 'image' => 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'হস্তশিল্প ও কারুপণ্য', 'slug' => 'handmade-crafts', 'image' => 'https://images.unsplash.com/photo-1590736704028-74c775a7b457?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'রাজকীয় গহনা', 'slug' => 'heritage-jewelry', 'image' => 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'খাঁটি দেশি খাবার', 'slug' => 'authentic-desi-food', 'image' => 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'লোকশিল্প ও সাজসজ্জা', 'slug' => 'folk-art-decor', 'image' => 'https://images.unsplash.com/photo-1506806732259-39c2d4ad6863?auto=format&fit=crop&q=80&w=800'],
            ['name' => 'সুন্দরবনের মধু ও মশলা', 'slug' => 'sundarban-honey-spices', 'image' => 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800']
        ];
        $catIds = [];
        foreach ($categories as $cat) {
            $category = Category::updateOrCreate(['slug' => $cat['slug']], ['name' => $cat['name'], 'image' => $cat['image'], 'status' => true]);
            $catIds[] = $category->id;
        }

        // 2. Brands (৫টি ব্র্যান্ড)
        $brands = [
            ['name' => 'দেশি হেরিটেজ', 'slug' => 'deshi-heritage'],
            ['name' => 'পল্লী কারিগর', 'slug' => 'rural-artisans'],
            ['name' => 'বগুড়ার শাহী ঘরানা', 'slug' => 'bogura-royal-sweets'],
            ['name' => 'নকশী ঘর', 'slug' => 'nakshi-kantha-crafts'],
            ['name' => 'জামদানি এম্পোরিয়াম', 'slug' => 'jamdani-emporium']
        ];
        $brandIds = [];
        foreach ($brands as $brand) {
            $b = Brand::updateOrCreate(['slug' => $brand['slug']], ['name' => $brand['name'], 'status' => true]);
            $brandIds[] = $b->id;
        }

        // 3. Districts (৫টি জেলা)
        $districts = [
            ['name' => 'রাজশাহী', 'slug' => 'rajshahi', 'division' => 'রাজশাহী', 'image' => 'https://images.unsplash.com/photo-1623862211477-d95a898436cd?auto=format&fit=crop&q=80&w=800', 'sort_order' => 1],
            ['name' => 'বগুড়া', 'slug' => 'bogura', 'division' => 'রাজশাহী', 'image' => 'https://images.unsplash.com/photo-1627443163351-91a10619582d?auto=format&fit=crop&q=80&w=800', 'sort_order' => 2],
            ['name' => 'ঢাকা', 'slug' => 'dhaka', 'division' => 'ঢাকা', 'image' => 'https://images.unsplash.com/photo-1624314138470-5a2f24623f10?auto=format&fit=crop&q=80&w=800', 'sort_order' => 3],
            ['name' => 'কুমিল্লা', 'slug' => 'cumilla', 'division' => 'চট্টগ্রাম', 'image' => 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=800', 'sort_order' => 4],
            ['name' => 'সিলেট', 'slug' => 'sylhet', 'division' => 'সিলেট', 'image' => 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800', 'sort_order' => 5],
            ['name' => 'বরিশাল', 'slug' => 'barishal', 'division' => 'বরিশাল', 'image' => 'https://images.unsplash.com/photo-1616781296062-878ec9044952?auto=format&fit=crop&q=80&w=800', 'sort_order' => 6],
            ['name' => 'খুলনা', 'slug' => 'khulna', 'division' => 'খুলনা', 'image' => 'https://images.unsplash.com/photo-1623862211477-d95a898436cd?auto=format&fit=crop&q=80&w=800', 'sort_order' => 7]
        ];
        foreach ($districts as $dist) {
            District::updateOrCreate(['slug' => $dist['slug']], ['name' => $dist['name'], 'division' => $dist['division'], 'image' => $dist['image'], 'status' => true, 'sort_order' => $dist['sort_order']]);
        }

        // 4. Products (৫টি পণ্য)
        $productList = [
            [
                'name' => 'ঐতিহ্যবাহী নকশী কাঁথা - গ্রামীণ উৎসব',
                'category_id' => $catIds[1],
                'brand_id' => $brandIds[3],
                'price' => 4500,
                'discount_price' => 3800,
                'description' => 'পেশাদার শিল্পীদের নিপুণ হাতের ছোঁয়ায় তৈরি এই নকশী কাঁথা বাংলার গ্রামীণ সংস্কৃতির গল্প বলে।',
                'thumbnail' => 'https://images.unsplash.com/photo-1590736704028-74c775a7b457?auto=format&fit=crop&q=80&w=800',
                'stock_qty' => 10,
                'featured' => true
            ],
            [
                'name' => 'বগুড়ার খাঁটি শাহী দই (মাটির হাঁড়ি)',
                'category_id' => $catIds[3],
                'brand_id' => $brandIds[2],
                'price' => 450,
                'discount_price' => 420,
                'description' => 'বিশ্ববিখ্যাত বগুড়ার শাহী দই, মাটির হাঁড়ির প্রাকৃতিক সুবাসে ভরপুর।',
                'thumbnail' => 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=800',
                'stock_qty' => 50,
                'featured' => true
            ],
            [
                'name' => 'হাতে তৈরি রেশম সুতার চুড়ি (২৪টি সেট)',
                'category_id' => $catIds[2],
                'brand_id' => $brandIds[0],
                'price' => 1200,
                'discount_price' => 950,
                'description' => 'অভিজাত সিল্ক সুতার কাজ করা এই চুড়িগুলো আপনার উৎসবের সাজে দেবে রাজকীয় ছোঁয়া।',
                'thumbnail' => 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800',
                'stock_qty' => 25,
                'featured' => true
            ],
            [
                'name' => 'খাঁটি হাতের কাজ করা জামদানি শাড়ি (সাদা-লাল)',
                'category_id' => $catIds[0],
                'brand_id' => $brandIds[4],
                'price' => 12500,
                'discount_price' => 11200,
                'description' => 'ঢাকাই জামদানির ঐতিহ্য এবং আভিজাত্যের মিশেলে এই শাড়িটি বাংলার ঐতিহ্যের প্রতীক।',
                'thumbnail' => 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800',
                'stock_qty' => 5,
                'featured' => true
            ],
            [
                'name' => 'শীতল পাটি - নকশী বুনন (সিলেট)',
                'category_id' => $catIds[1],
                'brand_id' => $brandIds[1],
                'price' => 3500,
                'discount_price' => 2800,
                'description' => 'সিলেটের জলার বিশেষ বুননের শীতল পাটি, যা প্রাকৃতিকভাবে শীতল এবং দীর্ঘস্থায়ী।',
                'thumbnail' => 'https://images.unsplash.com/photo-1506806732259-39c2d4ad6863?auto=format&fit=crop&q=80&w=800',
                'stock_qty' => 8,
                'featured' => true
            ],
            [
                'name' => 'সুন্দরবনের খাঁটি খলিশা ফুলের মধু (১ কেজি)',
                'category_id' => $catIds[5],
                'brand_id' => $brandIds[0],
                'price' => 1500,
                'discount_price' => 1350,
                'description' => 'সুন্দরবনের গভীর জঙ্গল থেকে সংগৃহীত প্রাকৃতিক মধু, কোনো রকমের ভেজাল মুক্ত।',
                'thumbnail' => 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800',
                'stock_qty' => 100,
                'featured' => true
            ],
            [
                'name' => 'টাঙ্গাইলের রাজকীয় তাঁত শাড়ি (সফট সিল্ক)',
                'category_id' => $catIds[0],
                'brand_id' => $brandIds[4],
                'price' => 6500,
                'discount_price' => 5800,
                'description' => 'টাঙ্গাইলের বিখ্যাত তাঁতের শাড়ি, যা এর সূক্ষ্ম বুনন এবং আরামদায়ক কাপড়ের জন্য পরিচিত।',
                'thumbnail' => 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800',
                'stock_qty' => 15,
                'featured' => false
            ]
        ];

        foreach ($productList as $prod) {
            Product::updateOrCreate(
                ['slug' => Str::slug($prod['name'])],
                array_merge($prod, ['sku' => 'BD-' . strtoupper(Str::random(6)), 'status' => true])
            );
        }

        // 5. Banners (৫টি ব্যানার) - Image URLs Included
        $banners = [
            [
                'title' => 'ঐতিহ্যের নতুন দিগন্ত', 
                'subtitle' => 'বাংলার শ্রেষ্ঠ কারুকাজ এখন আপনার হাতের নাগালে', 
                'image' => 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600',
                'type' => 'slider', 
                'sort_order' => 1
            ],
            [
                'title' => 'জামদানির আভিজাত্য', 
                'subtitle' => 'সরাসরি তাঁতিদের ঘর থেকে সেরা শাড়ি সংগ্রহ করুন', 
                'image' => 'https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?auto=format&fit=crop&q=80&w=1600',
                'type' => 'slider', 
                'sort_order' => 2
            ],
            [
                'title' => 'বগুড়ার দই উৎসব', 
                'subtitle' => 'খাঁটি শাহী দইয়ের স্বাদে মাতুন এখনই', 
                'image' => 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=800',
                'type' => 'promo', 
                'sort_order' => 3
            ],
            [
                'title' => 'হস্তশিল্পের ম্যাজিক', 
                'subtitle' => 'নিপুণ হাতে তৈরি নকশী পণ্য দিয়ে সাজান বাড়ি', 
                'image' => 'https://images.unsplash.com/photo-1590736704028-74c775a7b457?auto=format&fit=crop&q=80&w=800',
                'type' => 'promo', 
                'sort_order' => 4
            ],
            [
                'title' => 'রাজকীয় গহনা', 
                'subtitle' => 'বাংলার রানীদের ব্যবহৃত ডিজাইনের নকশা করা গহনা', 
                'image' => 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1600',
                'type' => 'slider', 
                'sort_order' => 5
            ]
        ];
        foreach ($banners as $banner) {
            Banner::updateOrCreate(['title' => $banner['title']], array_merge($banner, ['status' => true]));
        }

        // 6. Services (৫টি সেবা)
        $services = [
            ['title' => 'দ্রুত ডেলিভারি', 'description' => 'সারা বাংলাদেশে দ্রুততম সময়ে পণ্য পৌঁছে দেওয়া হয়।', 'icon' => 'Truck'],
            ['title' => 'খাঁটি মানের নিশ্চয়তা', 'description' => '১০০% অরিজিনাল এবং হাতে তৈরি পণ্যের নির্ভরযোগ্য গ্যারান্টি।', 'icon' => 'ShieldCheck'],
            ['title' => 'কারিগরদের সহায়তা', 'description' => 'প্রতিটি কেনাকাটা গ্রামের কারিগরদের জীবনমান উন্নত করতে সাহায্য করে।', 'icon' => 'Users'],
            ['title' => 'নিরাপদ পেমেন্ট', 'description' => 'বিকাশ, নগদ এবং ক্যাশ অন ডেলিভারি সুবিধা।', 'icon' => 'CreditCard'],
            ['title' => 'সহজ রিটার্ন পলিসি', 'description' => 'পছন্দ না হলে ৩ দিনের মধ্যে পণ্য পরিবর্তনের সুযোগ।', 'icon' => 'RefreshCcw']
        ];
        foreach ($services as $service) {
            Service::updateOrCreate(['title' => $service['title']], array_merge($service, ['status' => true]));
        }

        // 7. Testimonials (৫টি প্রশংসা)
        $testimonials = [
            ['name' => 'হাসান আসিফ', 'designation' => 'ঢাকা', 'content' => 'জামদানি শাড়িটির মান অসাধারণ! ডেলিভারিও খুব দ্রুত হয়েছে।', 'rating' => 5],
            ['name' => 'নুসরাত জাহান', 'designation' => 'রাজশাহী', 'content' => 'বগুড়ার দইয়ের স্বাদ একেবারে খাঁটি গ্রাম বাংলার মতো।', 'rating' => 5],
            ['name' => 'আব্দুর রব', 'designation' => 'সিলেট', 'content' => 'নকশী কাঁথাটি আমার ঘরকে এক ভিন্ন মাত্রা দিয়েছে। ধন্যবাদ ঐতিহ্যের বাহার।', 'rating' => 4],
            ['name' => 'শারমিন আকতার', 'designation' => 'কুমিল্লা', 'content' => 'গহনাগুলোর ডিজাইন একেবারে অরিজিনাল এবং মনমুগ্ধকর।', 'rating' => 5],
            ['name' => 'তানভীর ইসলাম', 'designation' => 'চট্টগ্রাম', 'content' => 'তাদের সার্ভিস এবং কারিগরদের প্রতি দায়িত্ববোধ দেখে খুব ভালো লাগলো।', 'rating' => 5]
        ];
        foreach ($testimonials as $testimonial) {
            Testimonial::updateOrCreate(['name' => $testimonial['name']], array_merge($testimonial, ['status' => true]));
        }

        // 8. Couriers
        Courier::updateOrCreate(['name' => 'পাঠাও কুরিয়ার'], ['type' => 'third_party', 'api_key' => 'mock_pathao_key', 'status' => true, 'config' => ['phone' => '09610003030']]);
        Courier::updateOrCreate(['name' => 'রেডেক্স লজিস্টিকস'], ['type' => 'third_party', 'api_key' => 'mock_redx_key', 'status' => true, 'config' => ['phone' => '09610007339']]);
        Courier::updateOrCreate(['name' => 'স্টিডফাস্ট কুরিয়ার'], ['type' => 'third_party', 'api_key' => 'mock_sf_key', 'status' => true, 'config' => ['phone' => '09610001010']]);

        // 9. Shipping Methods
        ShippingMethod::updateOrCreate(['name' => 'ঢাকা সিটি এক্সপ্রেস'], ['cost' => 60, 'description' => 'ঢাকার ভিতরে ২৪ ঘণ্টায় ডেলিভারি।', 'status' => true]);
        ShippingMethod::updateOrCreate(['name' => 'সারা বাংলাদেশ ডেলিভারি'], ['cost' => 130, 'description' => 'দেশের যেকোনো প্রান্তে ৩-৫ দিনের মধ্যে ডেলিভারি।', 'status' => true]);

        // 10. Payment Gateways
        PaymentGateway::updateOrCreate(['code' => 'bkash'], ['name' => 'বিকাশ পেমেন্ট', 'description' => 'বিকাশের মাধ্যমে পেমেন্ট করুন।', 'icon' => 'Smartphone', 'status' => true]);
        PaymentGateway::updateOrCreate(['code' => 'nagad'], ['name' => 'নগদ পেমেন্ট', 'description' => 'নগদ এর মাধ্যমে নিরাপদ পেমেন্ট।', 'icon' => 'ShieldCheck', 'status' => true]);

        // 11. Stories (ঐতিহ্যের গল্প)
        $stories = [
            [
                'title' => 'জামদানির বুনন শৈলী',
                'subtitle' => 'সোনারগাঁয়ের ঐতিহ্য',
                'description' => 'ইউনেস্কো স্বীকৃত সাংস্কৃতিক ঐতিহ্য জামদানি তৈরির পেছনের কারিগরদের নিরলস পরিশ্রমের গল্প। জামদানি বুনন একটি অত্যন্ত সূক্ষ্ম কাজ। একজন কারিগর দিনে মাত্র ২ থেকে ৩ ইঞ্চি কাপড় বুনতে পারেন। সোনারগাঁয়ের শীতলক্ষ্যা নদীর তীরের বিশেষ আবহাওয়া জামদানি বুননের জন্য আদর্শ।',
                'image' => 'https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?auto=format&fit=crop&q=80&w=1600',
                'button_text' => 'গল্পটি দেখুন',
            ],
            [
                'title' => 'নকশী কাঁথার জীবন গাঁথা',
                'subtitle' => 'গ্রামীন কারুশিল্প',
                'description' => 'কাঁথার প্রতি প্রতিটি সুঁইয়ের ফোঁড়ে লুকিয়ে থাকে গ্রাম বাংলার মা-বোনদের না বলা সহস্র কথা। নকশী কাঁথা কেবল একটি চাদর নয়, এটি একটি শিল্পকর্ম। প্রতিটি নকশায় লুকিয়ে থাকে জীবনের গভীর অর্থ।',
                'image' => 'https://images.unsplash.com/photo-1590736704028-74c775a7b457?auto=format&fit=crop&q=80&w=1600',
                'button_text' => 'আমাদের ভিডিও দেখুন',
            ]
        ];
        foreach ($stories as $story) {
            Story::updateOrCreate(['title' => $story['title']], array_merge($story, ['status' => true]));
        }

        // 12. Campaign Items (উৎসব অফার)
        $campaigns = [
            [
                'title' => 'বৈশাখী নকশী কাঁথা',
                'price' => '৳১,৫০০',
                'image' => 'https://images.unsplash.com/photo-1590736704028-74c775a7b457?auto=format&fit=crop&q=80',
                'link' => '/shop',
            ],
            [
                'title' => 'লাল-সাদা জামদানি',
                'price' => '৳৫,৫০০',
                'image' => 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80',
                'link' => '/shop',
            ],
            [
                'title' => 'শীতল পাটি সেট',
                'price' => '৳২,৪৫০',
                'image' => 'https://images.unsplash.com/photo-1506806732259-39c2d4ad6863?auto=format&fit=crop&q=80',
                'link' => '/shop',
            ]
        ];
        foreach ($campaigns as $camp) {
            CampaignItem::updateOrCreate(['title' => $camp['title']], $camp);
        }
    }
}
