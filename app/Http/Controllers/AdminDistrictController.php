<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\District;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminDistrictController extends Controller
{
    public function index(Request $request)
    {
        $query = District::query();

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $perPage = $request->get('per_page', 10);
        $districts = $query->orderBy('sort_order')->paginate($perPage)->withQueryString();

        return Inertia::render('Admin/Districts/Index', [
            'districts' => $districts,
            'filters' => $request->only(['search'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Districts/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:districts,name',
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('districts', 'public');
        }

        District::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'division' => $request->division,
            'image' => $imagePath,
            'status' => $request->status ?? true,
            'sort_order' => $request->sort_order ?? 0,
        ]);

        return redirect()->route('admin.districts.index')->with('success', 'District created successfully.');
    }

    public function edit(District $district)
    {
        return Inertia::render('Admin/Districts/Edit', [
            'district' => $district
        ]);
    }

    public function update(Request $request, District $district)
    {
        $request->validate([
            'name' => 'required|unique:districts,name,' . $district->id,
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imagePath = $district->image;
        if ($request->hasFile('image')) {
            if ($district->image) {
                Storage::disk('public')->delete($district->image);
            }
            $imagePath = $request->file('image')->store('districts', 'public');
        }

        $district->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'division' => $request->division,
            'image' => $imagePath,
            'status' => $request->status ?? true,
            'sort_order' => $request->sort_order ?? 0,
        ]);

        return redirect()->route('admin.districts.index')->with('success', 'District updated successfully.');
    }

    public function destroy(District $district)
    {
        if ($district->image) {
            Storage::disk('public')->delete($district->image);
        }
        $district->delete();
        return redirect()->route('admin.districts.index')->with('success', 'District deleted successfully.');
    }
}
