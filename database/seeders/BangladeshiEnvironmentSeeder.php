<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Brand;
use App\Models\Product;
use App\Models\User;
use App\Models\Courier;
use App\Models\ShippingMethod;
use App\Models\PaymentGateway;
use Illuminate\Support\Str;

class BangladeshiEnvironmentSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Categories
        $catTraditional = Category::updateOrCreate(['slug' => 'traditional-fabrics'], ['name' => 'Traditional Fabrics', 'status' => true]);
        $catHandicraft = Category::updateOrCreate(['slug' => 'handmade-crafts'], ['name' => 'Handmade Crafts', 'status' => true]);
        $catJewelry = Category::updateOrCreate(['slug' => 'heritage-jewelry'], ['name' => 'Heritage Jewelry', 'status' => true]);
        $catFood = Category::updateOrCreate(['slug' => 'authentic-desi-food'], ['name' => 'Authentic Desi Food', 'status' => true]);

        // 2. Brands
        $brandHeritage = Brand::updateOrCreate(['slug' => 'deshi-heritage'], ['name' => 'Deshi Heritage', 'status' => true]);
        $brandArtisan = Brand::updateOrCreate(['slug' => 'rural-artisans'], ['name' => 'Rural Artisans', 'status' => true]);
        $brandBogra = Brand::updateOrCreate(['slug' => 'bogura-royal-sweets'], ['name' => 'Bogura Royal Sweets', 'status' => true]);

        // 3. Products
        $products = [
            [
                'name' => 'Traditional Nokshi Katha - Rural Blossom',
                'category_id' => $catHandicraft->id,
                'brand_id' => $brandArtisan->id,
                'price' => 4500,
                'discount_price' => 3800,
                'description' => 'A master-piece of Bangladeshi embroidery. Hand-stitched by skilled rural women, this Nokshi Katha represents the story of life in rural Bengal.',
                'thumbnail' => 'products/nokshi_katha.png',
                'stock_qty' => 10,
                'featured' => true
            ],
            [
                'name' => 'Bogurar Authentic Shahi Doi (Harite)',
                'category_id' => $catFood->id,
                'brand_id' => $brandBogra->id,
                'price' => 450,
                'discount_price' => 420,
                'description' => 'The world-famous Bogurar Doi, served in a traditional clay pot for that authentic earthy flavor and creamy texture.',
                'thumbnail' => 'products/bogurar_doi.png',
                'stock_qty' => 50,
                'featured' => true
            ],
            [
                'name' => 'Handmade Silk Thread Curi (Set of 24)',
                'category_id' => $catJewelry->id,
                'brand_id' => $brandHeritage->id,
                'price' => 1200,
                'discount_price' => 950,
                'description' => 'Elegant and colorful silk thread bangles (Curi), meticulously handcrafted to complement your traditional attire.',
                'thumbnail' => 'products/silk_curi.png',
                'stock_qty' => 25,
                'featured' => true
            ],
            [
                'name' => 'Antique Filigree Gold-Plated Jewelry Set',
                'category_id' => $catJewelry->id,
                'brand_id' => $brandHeritage->id,
                'price' => 8500,
                'discount_price' => 7200,
                'description' => 'Representing the royal heritage of Bangladesh, this intricate filigree work jewelry set is perfect for special heritage occasions.',
                'thumbnail' => 'products/deshi_jewelry.png',
                'stock_qty' => 5,
                'featured' => true
            ],
            [
                'name' => 'Rickshaw-Art Painted Clay Pottery Set',
                'category_id' => $catHandicraft->id,
                'brand_id' => $brandArtisan->id,
                'price' => 1800,
                'discount_price' => 1500,
                'description' => 'Add a splash of Bangladeshi urban folk art to your home with this Rickshaw-art style painted clay pottery tea set.',
                'thumbnail' => 'products/clay_pottery.png',
                'stock_qty' => 12,
                'featured' => true
            ],
        ];

        foreach ($products as $prod) {
            Product::updateOrCreate(
                ['slug' => Str::slug($prod['name'])],
                array_merge($prod, ['sku' => 'BD-' . strtoupper(Str::random(6)), 'status' => true])
            );
        }

        // 4. Couriers (Operational environment)
        Courier::updateOrCreate(['name' => 'Pathao Courier'], ['type' => 'third_party', 'api_key' => 'mock_pathao_key', 'status' => true, 'config' => ['phone' => '09610003030']]);
        Courier::updateOrCreate(['name' => 'RedX Logistics'], ['type' => 'third_party', 'api_key' => 'mock_redx_key', 'status' => true, 'config' => ['phone' => '09610007339']]);
        Courier::updateOrCreate(['name' => 'Steadfast Courier'], ['type' => 'third_party', 'api_key' => 'mock_sf_key', 'status' => true, 'config' => ['phone' => '09610001010']]);

        // 5. Shipping Methods
        ShippingMethod::updateOrCreate(['name' => 'Express Dhaka'], ['cost' => 60, 'description' => 'Same day or next day delivery in Dhaka city.', 'status' => true]);
        ShippingMethod::updateOrCreate(['name' => 'Nationwide Standard'], ['cost' => 130, 'description' => 'Reliable delivery across all districts of Bangladesh.', 'status' => true]);

        // 6. Payment Gateways
        PaymentGateway::updateOrCreate(['code' => 'bkash'], ['name' => 'bKash Payment', 'description' => 'Pay instantly with your bKash wallet.', 'icon' => 'Smartphone', 'status' => true]);
        PaymentGateway::updateOrCreate(['code' => 'nagad'], ['name' => 'Nagad', 'description' => 'Secured payment with Nagad.', 'icon' => 'ShieldCheck', 'status' => true]);
    }
}
