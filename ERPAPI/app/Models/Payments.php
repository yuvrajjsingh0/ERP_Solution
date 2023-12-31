<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payments extends Model
{
    use HasFactory;

    protected $table = 'payments';

    protected $fillable = [
        'client_id',
        'mode',
        'amount',
        'meta',
        'package_id',
        'fee',
        'tax',
        'total',
        'late_fee',
        'from',
        'to',
        'due'
    ];

    function scopeLatest($query){
        return $query->orderBy('created_at')->get();
    }

    public function client(){
        return $this->belongsTo('App\Models\Clients', 'client_id', 'id');
    }

    public function package(){
        return $this->belongsTo('App\Models\Packages', 'package_id', 'id');
    }
}
