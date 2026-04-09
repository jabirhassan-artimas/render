<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CampaignItem extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'price', 'image', 'link', 'sort_order', 'status'];
    protected $casts = [
        'status' => 'boolean',
    ];
}
