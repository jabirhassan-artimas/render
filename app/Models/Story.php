<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Story extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'subtitle',
        'description',
        'points',
        'image',
        'button_text',
        'button_url',
        'status',
        'sort_order',
    ];

    protected $casts = [
        'points' => 'array',
        'status' => 'boolean',
    ];
}
