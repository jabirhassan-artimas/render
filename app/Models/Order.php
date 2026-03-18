<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'subtotal',
        'discount',
        'shipping_cost',
        'total',
        'payment_method',
        'payment_status',
        'order_status',
        'shipping_address',
        'order_number',
        'cancellation_reason',
        'order_notes',
        'order_source',
        'courier_id',
        'delivery_partner_rating',
        'advance_payment_amount',
        'discount_on_advance',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function courier()
    {
        return $this->belongsTo(Courier::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function history()
    {
        return $this->hasMany(OrderHistory::class)->orderBy('created_at', 'desc');
    }
}
