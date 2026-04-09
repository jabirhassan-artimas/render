<?php

namespace App\Http\Controllers;

use App\Models\CampaignItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminCampaignItemController extends Controller
{
    public function index()
    {
        $items = CampaignItem::orderBy('sort_order')->get();
        return Inertia::render('Admin/CampaignItems/Index', [
            'items' => $items
        ]);
    }

    public function create()
    {
        // Get existing images from campaigns folder to allow reuse
        $existingImages = [];
        if (Storage::disk('public')->exists('campaigns')) {
            $existingImages = Storage::disk('public')->files('campaigns');
        }

        return Inertia::render('Admin/CampaignItems/Create', [
            'existingImages' => $existingImages
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'nullable|string|max:255',
            'image_file' => 'nullable|image|max:2048',
            'image_path' => 'nullable|string',
            'link' => 'nullable|string|max:255',
            'sort_order' => 'integer',
        ]);

        $imagePath = $request->image_path;

        if ($request->hasFile('image_file')) {
            $imagePath = $request->file('image_file')->store('campaigns', 'public');
        }

        CampaignItem::create([
            'title' => $request->title,
            'price' => $request->price,
            'image' => $imagePath,
            'link' => $request->link,
            'sort_order' => $request->sort_order ?? 0,
            'status' => $request->has('status'),
        ]);

        return redirect()->route('admin.campaign-items.index')->with('success', 'Campaign item created successfully.');
    }

    public function edit(CampaignItem $campaignItem)
    {
        $existingImages = [];
        if (Storage::disk('public')->exists('campaigns')) {
            $existingImages = Storage::disk('public')->files('campaigns');
        }

        return Inertia::render('Admin/CampaignItems/Edit', [
            'item' => $campaignItem,
            'existingImages' => $existingImages
        ]);
    }

    public function update(Request $request, CampaignItem $campaignItem)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'nullable|string|max:255',
            'image_file' => 'nullable|image|max:2048',
            'image_path' => 'nullable|string',
            'link' => 'nullable|string|max:255',
            'sort_order' => 'integer',
        ]);

        $imagePath = $request->image_path ?? $campaignItem->image;

        if ($request->hasFile('image_file')) {
            // Note: We don't delete to allow multi-use as per user request
            $imagePath = $request->file('image_file')->store('campaigns', 'public');
        }

        $campaignItem->update([
            'title' => $request->title,
            'price' => $request->price,
            'image' => $imagePath,
            'link' => $request->link,
            'sort_order' => $request->sort_order ?? 0,
            'status' => $request->has('status'),
        ]);

        return redirect()->route('admin.campaign-items.index')->with('success', 'Campaign item updated successfully.');
    }

    public function destroy(CampaignItem $campaignItem)
    {
        // Don't delete physical image because it might be reused by others
        $campaignItem->delete();
        return redirect()->route('admin.campaign-items.index')->with('success', 'Campaign item deleted successfully.');
    }
}
