<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Packages extends Model
{
    use HasFactory;

    protected $table = 'packages';

    protected $fillable = [
        'name',
        'frequency',
        'price',
        'description',
        'meta'
    ];

    function scopeLatest($query){
        return $query->orderBy('created_at')->get();
    }
}
