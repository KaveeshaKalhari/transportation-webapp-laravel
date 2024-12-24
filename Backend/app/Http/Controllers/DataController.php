<?php

namespace App\Http\Controllers;

use App\Models\Data;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DataController extends Controller
{
    /**
     * Fetch all records from the data table.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $data = Data::all(); // Get all data records
        return response()->json($data); // Return the data as JSON
    }

    /**
     * Store new data into the database.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validate incoming data
        $validator = Validator::make($request->all(), [
            'vehicle_type' => 'required|string|max:255',
            'license_plate' => 'required|string|max:255',
            'driver_name' => 'required|string|max:255',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        // Return validation errors if any
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Create new data entry
        $data = Data::create([
            'vehicle_type' => $request->vehicle_type,
            'license_plate' => $request->license_plate,
            'driver_name' => $request->driver_name,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
        ]);

        // Return success response with the created data
        return response()->json(['message' => 'Data created successfully!', 'data' => $data], 201);
    }

    /**
     * Update an existing data entry by ID.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        // Find the data by ID
        $data = Data::find($id);

        // If the data doesn't exist, return a 404 error
        if (!$data) {
            return response()->json(['message' => 'Data not found'], 404);
        }

        // Validate the incoming data
        $validator = Validator::make($request->all(), [
            'vehicle_type' => 'required|string|max:255',
            'license_plate' => 'required|string|max:255',
            'driver_name' => 'required|string|max:255',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        // Return validation errors if any
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Update the data entry
        $data->update($request->only([
            'vehicle_type',
            'license_plate',
            'driver_name',
            'latitude',
            'longitude',
        ]));

        // Return success response with the updated data
        return response()->json(['message' => 'Data updated successfully!', 'data' => $data], 200);
    }

    /**
     * Delete a data entry by ID.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        // Find the data by ID
        $data = Data::find($id);

        // If the data doesn't exist, return a 404 error
        if (!$data) {
            return response()->json(['message' => 'Data not found'], 404);
        }

        // Delete the data entry
        $data->delete();

        // Return success response
        return response()->json(['message' => 'Data deleted successfully!'], 200);
    }
}
