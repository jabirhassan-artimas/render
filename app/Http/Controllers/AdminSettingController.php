<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminSettingController extends Controller
{
    public function index()
    {
        $settings = Setting::all()->pluck('value', 'key')->toArray();
        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->except(['_token', '_method', 'site_logo', 'story_image', 'festival_image']);

        // Handle Text Inputs
        foreach ($data as $key => $value) {
            Setting::set($key, $value);
        }

        // Handle Image Uploads
        $images = ['site_logo', 'story_image', 'festival_image'];
        foreach ($images as $img) {
            if ($request->hasFile($img)) {
                $request->validate([
                    $img => 'image|max:2048',
                ]);

                // Delete old image if exists
                $oldImg = Setting::get($img);
                if ($oldImg && Storage::disk('public')->exists($oldImg)) {
                    Storage::disk('public')->delete($oldImg);
                }

                $path = $request->file($img)->store('settings', 'public');
                Setting::set($img, $path);
            }
        }

        return redirect()->back()->with('success', 'Settings updated successfully.');
    }
}
