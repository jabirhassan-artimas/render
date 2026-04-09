<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'subtitle', 'description', 'type', 'image', 'video_url', 'video_file', 'media_type', 'link', 'sort_order', 'status'];
}
