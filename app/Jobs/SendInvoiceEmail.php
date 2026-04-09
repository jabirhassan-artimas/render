<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendInvoiceEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $order;
    public $resend;

    /**
     * Create a new job instance.
     */
    public function __construct(\App\Models\Order $order, $resend = false)
    {
        $this->order = $order;
        $this->resend = $resend;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $order = $this->order->load('items.product', 'user');

        // Allow manual resend or automatic switch
        if (!$this->resend && $order->order_status !== 'confirmed') {
            return;
        }

        // Prevent duplicate sending
        if (!$this->resend && $order->email_sent_status === 'sent') {
            return;
        }

        try {
            $recipient = $order->email ?? $order->user->email;
            if (!$recipient || !filter_var($recipient, FILTER_VALIDATE_EMAIL)) {
                $order->update(['email_sent_status' => 'failed']);
                \Illuminate\Support\Facades\Log::error("Invoice dispatch failed for order #{$order->order_number}: Invalid or missing email '{$recipient}'.");
                return;
            }

            // 1. Generate Invoice No if not exists
            if (!$order->invoice_no) {
                $order->update([
                    'invoice_no' => 'INV-' . date('Ymd') . '-' . strtoupper(\Illuminate\Support\Str::random(4))
                ]);
            }

            // 2. Generate PDF
            $pdfContent = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.invoice', ['order' => $order])->output();

            // 3. Send Email
            \Illuminate\Support\Facades\Mail::to($recipient)->send(new \App\Mail\OrderConfirmedMail($order, $pdfContent));

            // 4. Update status
            $order->update([
                'email_sent_status' => 'sent',
                'email_sent_at' => now(),
            ]);

        } catch (\Exception $e) {
            $order->update(['email_sent_status' => 'failed']);
            \Illuminate\Support\Facades\Log::error("FATAL: Invoice send error for #{$order->order_number}: " . $e->getMessage());
            throw $e;
        }
    }
}
