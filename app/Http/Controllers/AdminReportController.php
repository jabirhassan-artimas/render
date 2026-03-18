<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use App\Models\Cart;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use DB;

class AdminReportController extends Controller
{
    public function index(Request $request)
    {
        $startDate = $request->input('start_date', now()->subMonths(3)->startOfDay());
        $endDate = $request->input('end_date', now()->endOfDay());

        // 1. Geospatial Intelligence
        $locationStats = User::where('role', 'customer')
            ->select('city', DB::raw('count(*) as count'))
            ->whereNotNull('city')
            ->groupBy('city')
            ->orderBy('count', 'desc')
            ->limit(5)
            ->get();

        // 2. Behavioral Dynamics (Abandoned Carts)
        $abandonedCarts = Cart::where('status', 'abandoned')
            ->with(['user', 'product'])
            ->orderBy('updated_at', 'desc')
            ->get()
            ->groupBy(function($cart) {
                return $cart->user_id ?: $cart->session_id;
            })
            ->map(function($group) {
                $first = $group->first();
                return [
                    'user' => $first->user,
                    'items_count' => $group->count(),
                    'total' => $group->sum(function($item) {
                        return $item->qty * ($item->product->discount_price ?? $item->product->price);
                    }),
                    'updated_at' => $first->updated_at,
                ];
            })
            ->values()
            ->take(5);

        $abandonedTotal = Cart::where('status', 'abandoned')
            ->with('product')
            ->get()
            ->sum(function($item) {
                return $item->qty * ($item->product->discount_price ?? $item->product->price);
            });

        // 3. Channel Segmentation (Real Data)
        $channelStats = Order::select('order_source', DB::raw('count(*) as count'))
            ->groupBy('order_source')
            ->get()
            ->mapWithKeys(function ($item) {
                return [$item->order_source ?: 'web' => $item->count];
            });

        $totalOrders = $channelStats->sum();
        $channelDistribution = [
            'web' => $totalOrders > 0 ? round(($channelStats->get('web', 0) / $totalOrders) * 100) : 0,
            'mobile' => $totalOrders > 0 ? round(($channelStats->get('mobile', 0) / $totalOrders) * 100) : 0,
            'manual' => $totalOrders > 0 ? round(($channelStats->get('manual', 0) / $totalOrders) * 100) : 0,
        ];

        // 4. Operational KPIs
        $currentRevenue = Order::where('order_status', 'delivered')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->sum('total');
            
        $previousRevenue = Order::where('order_status', 'delivered')
            ->whereBetween('created_at', [Carbon::parse($startDate)->sub(Carbon::parse($endDate)->diffAsCarbonInterval(Carbon::parse($startDate))), $startDate])
            ->sum('total');

        $growth = $previousRevenue > 0 ? (($currentRevenue - $previousRevenue) / $previousRevenue) * 100 : 100;

        $stats = [
            'revenue_growth' => round($growth, 1),
            'revenue_total' => $currentRevenue,
            'active_pipeline' => Order::whereIn('order_status', ['pending', 'processing', 'shipped'])->count(),
            'vip_engagement' => User::where('is_vip', true)->count(),
            'recovery_rate' => Cart::where('status', 'recovered')->count() > 0 
                ? round((Cart::where('status', 'recovered')->count() / (Cart::where('status', 'abandoned')->count() ?: 1)) * 100, 1) 
                : 0,
        ];

        // 5. Daily Recovery Trends (Last 14 Days)
        $trends = collect(range(13, 0))->map(function($days) {
            $date = now()->subDays($days);
            return [
                'date' => $date->format('M d'),
                'abandoned' => Cart::where('status', 'abandoned')->whereDate('created_at', $date)->count(),
                'recovered' => Cart::where('status', 'recovered')->whereDate('created_at', $date)->count(),
            ];
        });

        // 6. Top High-Value Consumers
        $topCustomers = User::where('role', 'customer')
            ->withCount(['orders' => function($query) {
                $query->where('order_status', 'delivered');
            }])
            ->withSum(['orders' => function($query) {
                $query->where('order_status', 'delivered');
            }], 'total')
            ->orderBy('orders_sum_total', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('Admin/Report/Index', [
            'stats' => $stats,
            'locationStats' => $locationStats,
            'abandonedCarts' => $abandonedCarts,
            'abandonedTotal' => $abandonedTotal,
            'channelDistribution' => $channelDistribution,
            'trends' => $trends,
            'topCustomers' => $topCustomers,
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ]
        ]);
    }
}
