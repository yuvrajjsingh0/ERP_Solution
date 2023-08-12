<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clients extends Model
{
    use HasFactory;

    protected $table = 'clients';

    protected $fillable = [
        'name',
        'phone_num',
        'email',
        'package_id'
    ];

    function scopeLatest($query){
        return $query->orderBy('created_at')->get();
    }

    public function payments(){
        return $this->hasMany('App\Payments', 'client_id', 'id');
    }

    public function package(){
        return $this->belongsTo('App\Packages', 'package_id', 'id');
    }
}
