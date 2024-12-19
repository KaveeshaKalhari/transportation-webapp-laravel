<?php

namespace App\Http\Controllers;

use App\Models\Data;
use Illuminate\Http\Request;

class DataController extends Controller
{
    public function index()
    {
        // Fetch all records from the data table
        $data = Data::all();

        // Return the data as JSON
        return response()->json($data);
    }
}
