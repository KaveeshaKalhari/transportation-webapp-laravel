<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Data extends Model
{
    use HasFactory;

    // Define the table if it's not the default (optional)
    // protected $table = 'data';

    // If you want to specify which fields are mass assignable
    protected $fillable = [
        'vehicle_type',
        'license_plate',
        'driver_name',
        'latitude',
        'longitude',
    ];
}
