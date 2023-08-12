<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkerPayouts extends Model
{
    use HasFactory;

    protected $table = 'worker_payouts';

    protected $fillable = [
        'worker_id',
        'mode',
        'amount',
        'meta'
    ];

    function scopeLatest($query){
        return $query->orderBy('created_at')->get();
    }
}
