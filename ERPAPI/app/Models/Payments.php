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
        'meta'
    ];

    function scopeLatest($query){
        return $query->orderBy('created_at')->get();
    }

    public function client(){
        return $this->belongsTo('App\Clients', 'client_id', 'id');
    }
}
