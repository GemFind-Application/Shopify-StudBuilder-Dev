<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;

    protected $table = 'coupon';
    protected $fillable = [
        'shop',
        'discount_code',
        'discount_type',
        'discount_value',
    ];

    public $timestamps = false;

}
