<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class District extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'image', 'division', 'status', 'sort_order'];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
