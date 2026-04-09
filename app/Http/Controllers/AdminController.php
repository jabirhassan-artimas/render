<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Product;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\NewsletterSubscriber;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        // General Stats
        $stats = [
            'products' => Product::count(),
            'orders' => Order::count(),
            'users' => User::where('role', 'customer')->count(),
            'revenue' => Order::where('order_status', 'delivered')->sum('total'),
            'pending_courier' => Order::whereNull('courier_id')->whereNotIn('order_status', ['cancelled', 'delivered'])->count(),
            'blocked_users' => User::where('is_blocked', true)->count(),
        ];

        // Today's Stats
        $today = Carbon::today();
        $salesToday = Order::whereDate('created_at', $today)->where('order_status', '!=', 'cancelled')->sum('total');
        $ordersToday = Order::whereDate('created_at', $today)->count();
        $avgOrderValue = $ordersToday > 0 ? $salesToday / $ordersToday : 0;

        // Monthly Revenue Visualization (Zero-filled for perfect chart lines)
        $months = collect();
        for ($i = 5; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $months->put($date->format('M'), [
                'month_name' => $date->format('F'),
                'revenue' => 0,
            ]);
        }

        $orderData = Order::select(
            DB::raw('sum(total) as revenue'),
            DB::raw("DATE_FORMAT(created_at, '%M') as full_month")
        )
            ->where('created_at', '>=', Carbon::now()->subMonths(6))
            ->where('order_status', '!=', 'cancelled')
            ->groupBy('full_month')
            ->get();

        foreach ($orderData as $item) {
            $short = substr($item->full_month, 0, 3);
            if ($months->has($short)) {
                $months->put($short, [
                    'month_name' => $item->full_month,
                    'revenue' => (float)$item->revenue
                ]);
            }
        }
        $monthlyRevenue = $months->values();

        // Top Selling Products
        $topProducts = DB::table('order_items')
            ->join('products', 'order_items.product_id', '=', 'products.id')
            ->select('products.name', 'products.thumbnail', 'products.price', DB::raw('SUM(order_items.qty) as total_sold'))
            ->groupBy('products.id', 'products.name', 'products.thumbnail', 'products.price')
            ->orderByDesc('total_sold')
            ->limit(5)
            ->get();

        // Recent Activity (Latest Orders)
        $recentActivity = Order::with('user')->latest()->take(10)->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'salesToday' => $salesToday,
            'ordersToday' => $ordersToday,
            'avgOrderValue' => $avgOrderValue,
            'monthlyRevenue' => $monthlyRevenue,
            'topProducts' => $topProducts,
            'recentActivity' => $recentActivity
        ]);
    }

    public function newsletter()
    {
        $subscribers = NewsletterSubscriber::latest()->paginate(20);
        return Inertia::render('Admin/Newsletter/Index', [
            'subscribers' => $subscribers
        ]);
    }

    public function newsletterDestroy(NewsletterSubscriber $subscriber)
    {
        $subscriber->delete();
        return redirect()->back()->with('success', 'Subscriber removed successfully.');
    }
}
