<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class AdminCustomerController extends Controller
{
    public function index(Request $request)
    {
        $query = User::where('role', 'customer');

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%')
                    ->orWhere('phone', 'like', '%' . $search . '%');
            });
        }

        if ($request->filled('vip')) {
            $query->where('is_vip', $request->vip == 'true');
        }

        if ($request->filled('blocked')) {
            $query->where('is_blocked', $request->blocked == 'true');
        }

        $perPage = $request->get('per_page', 20);
        $customers = $query->latest()->paginate($perPage)->withQueryString();

        // Location stats for reporting
        $locationStats = User::where('role', 'customer')
            ->select('city', \DB::raw('count(*) as count'))
            ->groupBy('city')
            ->orderBy('count', 'desc')
            ->limit(10)
            ->get();

        return Inertia::render('Admin/Customers/Index', [
            'customers' => $customers,
            'filters' => $request->only(['search', 'vip', 'blocked']),
            'locationStats' => $locationStats
        ]);
    }

    public function toggleVip(User $user)
    {
        $user->update(['is_vip' => !$user->is_vip]);
        return redirect()->back()->with('success', 'Customer VIP status updated.');
    }

    public function toggleBlock(User $user)
    {
        $user->update(['is_blocked' => !$user->is_blocked]);
        return redirect()->back()->with('success', 'Customer block status updated.');
    }

    public function updateTags(Request $request, User $user)
    {
        $request->validate(['tags' => 'array']);
        $user->update(['tags' => $request->tags]);
        return redirect()->back()->with('success', 'Customer tags updated.');
    }

    public function sendSms(Request $request, User $user)
    {
        $request->validate(['message' => 'required|string']);
        // Mock SMS logic
        // \Log::info("Sending SMS to {$user->phone}: {$request->message}");
        return redirect()->back()->with('success', 'SMS sent successfully.');
    }
}
