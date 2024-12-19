<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('data')->insert([
            [
                'vehicle_type' => 'Bus',
                'license_plate' => 'ABC123',
                'driver_name' => 'John Doe',
                'latitude' => 34.0522,
                'longitude' => -118.2437,
            ],
            [
                'vehicle_type' => 'Truck',
                'license_plate' => 'XYZ789',
                'driver_name' => 'Jane Smith',
                'latitude' => 40.7128,
                'longitude' => -74.0060,
            ],
            // Add more sample data here as needed
        ]);
    }
}
