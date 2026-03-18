<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Product;
use App\Models\CmsPage;
use App\Models\Banner;
use App\Models\Brand;

use App\Models\Service;
use App\Models\Testimonial;
use Inertia\Inertia;

class FrontendController extends Controller
{
    public function index()
    {
        $sliderBanners = Banner::where('status', true)->where('type', 'slider')->orderBy('sort_order')->get();
        $promoBanners = Banner::where('status', true)->where('type', 'promo_home')->orderBy('sort_order')->get();

        $featuredProducts = Product::where('featured', true)->where('status', true)->latest()->take(8)->get();
        $newArrivals = Product::where('status', true)->latest()->take(8)->get();
        $categories = Category::whereNull('parent_id')->where('status', true)->with('children')->take(6)->get();

        $services = Service::where('status', true)->orderBy('sort_order')->get();
        $testimonials = Testimonial::where('status', true)->latest()->get();

        return Inertia::render('Home', [
            'sliderBanners' => $sliderBanners,
            'promoBanners' => $promoBanners,
            'featuredProducts' => $featuredProducts,
            'newArrivals' => $newArrivals,
            'categories' => $categories,
            'services' => $services,
            'testimonials' => $testimonials
        ]);
    }

    public function shop(Request $request)
    {
        $query = Product::where('status', true);

        // Filter by Category
        if ($request->has('category') && $request->category) {
            $slug = $request->category;
            $category = Category::where('slug', $slug)->first();
            if ($category) {
                // Determine if we need to include children categories
                // For now just exact match, can be expanded to children
                $query->where('category_id', $category->id);
            }
        }

        // Filter by Brand
        if ($request->has('brand') && $request->brand) {
            $slug = $request->brand;
            $brand = Brand::where('slug', $slug)->first();
            if ($brand) {
                $query->where('brand_id', $brand->id);
            }
        }

        // Search
        if ($request->has('search') && $request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Sorting
        if ($request->has('sort')) {
            switch ($request->sort) {
                case 'price_low_high':
                    $query->orderBy('price', 'asc');
                    break;
                case 'price_high_low':
                    $query->orderBy('price', 'desc');
                    break;
                case 'newest':
                    $query->latest();
                    break;
                default:
                    $query->latest();
                    break;
            }
        } else {
            $query->latest();
        }

        $products = $query->paginate(12)->withQueryString();
        $categories = Category::where('status', true)->whereNull('parent_id')->with('children')->get();
        $brands = Brand::where('status', true)->get();

        return Inertia::render('Shop', [
            'products' => $products,
            'categories' => $categories,
            'brands' => $brands,
            'filters' => $request->only(['category', 'brand', 'search', 'sort']),
        ]);
    }

    public function categories()
    {
        $categories = Category::where('status', true)->whereNull('parent_id')->with('children')->get();
        return Inertia::render('Categories', [
            'categories' => $categories
        ]);
    }

    public function cmsPage($slug)
    {
        $page = CmsPage::where('slug', $slug)->where('status', true)->firstOrFail();

        $data = ['page' => $page];

        if ($slug == 'about-us') {
            $data['services'] = \App\Models\Service::orderBy('sort_order')->where('status', true)->get();
            $data['testimonials'] = \App\Models\Testimonial::where('status', true)->latest()->take(6)->get();
        }

        return Inertia::render('CMSPage', $data);
    }

    public function product($slug)
    {
        $product = Product::where('slug', $slug)->where('status', true)->with('images', 'category', 'brand')->firstOrFail();
        $relatedProducts = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->where('status', true)
            ->take(4)
            ->get();
        return Inertia::render('ProductDetail', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
        ]);
    }

    public function category($slug)
    {
        $category = Category::where('slug', $slug)->where('status', true)->firstOrFail();
        $products = Product::where('category_id', $category->id)->where('status', true)->latest()->paginate(12);
        
        return Inertia::render('Shop', [
            'products' => $products,
            'categories' => Category::where('status', true)->whereNull('parent_id')->with('children')->get(),
            'brands' => Brand::where('status', true)->get(),
            'filters' => ['category' => $slug],
        ]);
    }
}
