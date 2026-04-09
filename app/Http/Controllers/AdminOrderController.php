<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderHistory;
use Inertia\Inertia;

class AdminOrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with('user');

        if ($request->has('search')) {
            $query->where('order_number', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('status')) {
            $query->where('order_status', $request->status);
        }

        $perPage = $request->get('per_page', 10);
        $orders = $query->latest()->paginate($perPage)->withQueryString();

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
            'filters' => $request->only(['search', 'status'])
        ]);
    }

    public function show(Order $order)
    {
        $order->load('items.product', 'user', 'history.user');
        return Inertia::render('Admin/Orders/Show', [
            'order' => $order
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'order_status' => 'required',
            'cancellation_reason' => 'nullable|string',
        ]);

        if ($order->order_status !== $request->order_status) {
            OrderHistory::create([
                'order_id' => $order->id,
                'user_id' => auth()->id(),
                'action' => 'status_updated',
                'description' => "Order status updated from {$order->order_status} to {$request->order_status}"
            ]);
        }

        $order->update([
            'order_status' => $request->order_status,
            'cancellation_reason' => $request->cancellation_reason
        ]);

        // Auto-send invoice ONLY on "confirmed"
        if ($request->order_status === 'confirmed') {
            \App\Jobs\SendInvoiceEmail::dispatch($order);
        }

        if ($request->order_status == 'delivered') {
            $order->update(['payment_status' => 'paid']);
        }

        return redirect()->back()->with('success', 'Order status updated successfully.');
    }

    public function downloadInvoice(Order $order)
    {
        $order->load('items.product', 'user');
        if (!$order->invoice_no) {
            $order->update([
                'invoice_no' => 'INV-' . date('Ymd') . '-' . strtoupper(\Illuminate\Support\Str::random(4))
            ]);
        }
        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.invoice', ['order' => $order]);
        return $pdf->download("invoice-{$order->invoice_no}.pdf");
    }

    public function resendInvoice(Order $order)
    {
        \App\Jobs\SendInvoiceEmail::dispatch($order, true);
        return redirect()->back()->with('success', 'Invoice email has been queued for resending.');
    }

    public function updateNotes(Request $request, Order $order)
    {
        $request->validate(['order_notes' => 'required|string']);
        $order->update(['order_notes' => $request->order_notes]);
        return redirect()->back()->with('success', 'Order notes updated.');
    }

    public function assignCourier(Request $request, Order $order)
    {
        $request->validate(['courier_id' => 'required|exists:couriers,id']);
        $order->update(['courier_id' => $request->courier_id]);
        return redirect()->back()->with('success', 'Courier assigned successfully.');
    }

    public function rateDelivery(Request $request, Order $order)
    {
        $request->validate(['rating' => 'required|integer|min:1|max:5']);
        $order->update(['delivery_partner_rating' => $request->rating]);
        return redirect()->back()->with('success', 'Delivery partner rated.');
    }

    public function invoice(Order $order)
    {
        $order->load('items.product', 'user');
        return Inertia::render('Admin/Orders/Invoice', [
            'order' => $order
        ]);
    }
}
