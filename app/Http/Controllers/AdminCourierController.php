<?php

namespace App\Http\Controllers;

use App\Models\Courier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminCourierController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Couriers/Index', [
            'couriers' => Courier::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'type' => 'required|string',
            'api_key' => 'nullable|string',
            'config' => 'nullable|array'
        ]);

        Courier::create($request->all());

        return redirect()->back()->with('success', 'Courier added successfully.');
    }

    public function update(Request $request, Courier $courier)
    {
        $request->validate([
            'name' => 'required|string',
            'type' => 'required|string',
            'api_key' => 'nullable|string',
            'config' => 'nullable|array'
        ]);

        $courier->update($request->all());

        return redirect()->back()->with('success', 'Courier updated successfully.');
    }

    public function destroy(Courier $courier)
    {
        $courier->delete();
        return redirect()->back()->with('success', 'Courier deleted successfully.');
    }
}
