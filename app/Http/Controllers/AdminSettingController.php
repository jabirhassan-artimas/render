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
        $data = $request->except(['_token', '_method', 'site_logo']);

        // Handle Text Inputs
        foreach ($data as $key => $value) {
            Setting::set($key, $value);
        }

        // Handle Logo Upload
        if ($request->hasFile('site_logo')) {
            $request->validate([
                'site_logo' => 'image|max:2048', // Max 2MB
            ]);

            // Delete old logo if exists
            $oldLogo = Setting::get('site_logo');
            if ($oldLogo && Storage::disk('public')->exists($oldLogo)) {
                Storage::disk('public')->delete($oldLogo);
            }

            $path = $request->file('site_logo')->store('settings', 'public');
            Setting::set('site_logo', $path);
        }

        return redirect()->back()->with('success', 'Settings updated successfully.');
    }
}
