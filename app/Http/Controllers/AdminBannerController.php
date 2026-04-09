<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Banner;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminBannerController extends Controller
{
    public function index(Request $request)
    {
        $query = Banner::query();

        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        $perPage = $request->get('per_page', 20);
        $banners = $query->orderBy('sort_order', 'asc')->paginate($perPage)->withQueryString();

        return Inertia::render('Admin/Banners/Index', [
            'banners' => $banners,
            'filters' => $request->only(['search'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Banners/Create');
    }

    public function store(Request $request)
    {
        $mediaType = $request->input('media_type', 'image');

        $request->validate([
            'title'      => 'required|string|max:255',
            'type'       => 'required|in:slider,promo_home,promo_sidebar',
            'media_type' => 'required|in:image,video_embed,video_upload',
            'image'      => $mediaType === 'image' ? 'required|image|max:5120' : 'nullable|image|max:5120',
            'video_url'  => $mediaType === 'video_embed'  ? 'required|string|max:1000' : 'nullable|string|max:1000',
            'video_file' => $mediaType === 'video_upload' ? 'required|mimes:mp4,webm,ogg,mov|max:102400' : 'nullable|mimes:mp4,webm,ogg,mov|max:102400',
        ]);

        $data = [
            'title'       => $request->title,
            'subtitle'    => $request->subtitle,
            'description' => $request->description,
            'type'        => $request->type,
            'media_type'  => $mediaType,
            'link'        => $request->link,
            'sort_order'  => $request->sort_order ?? 0,
            'status'      => $request->has('status'),
        ];

        // Only store image if actually uploaded
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('banners', 'public');
        }

        if ($mediaType === 'video_embed') {
            $data['video_url'] = $request->video_url;
        }

        if ($mediaType === 'video_upload' && $request->hasFile('video_file')) {
            $data['video_file'] = $request->file('video_file')->store('banner-videos', 'public');
        }

        Banner::create($data);

        return redirect()->route('admin.banners.index')->with('success', 'Banner created successfully.');
    }

    public function edit(Banner $banner)
    {
        return Inertia::render('Admin/Banners/Edit', [
            'banner' => $banner
        ]);
    }

    public function update(Request $request, Banner $banner)
    {
        $mediaType = $request->input('media_type', $banner->media_type ?? 'image');

        $request->validate([
            'title'      => 'required|string|max:255',
            'type'       => 'required|in:slider,promo_home,promo_sidebar',
            'media_type' => 'required|in:image,video_embed,video_upload',
            'image'      => 'nullable|image|max:5120',
            'video_url'  => 'nullable|string|max:1000',
            'video_file' => 'nullable|mimes:mp4,webm,ogg,mov|max:102400',
        ]);

        $data = [
            'title'       => $request->title,
            'subtitle'    => $request->subtitle,
            'description' => $request->description,
            'type'        => $request->type,
            'media_type'  => $mediaType,
            'link'        => $request->link,
            'sort_order'  => $request->sort_order ?? 0,
            'status'      => $request->has('status'),
        ];

        // Handle image
        if ($request->hasFile('image')) {
            if ($banner->image) {
                Storage::disk('public')->delete($banner->image);
            }
            $data['image'] = $request->file('image')->store('banners', 'public');
        }

        // Handle embed URL
        if ($mediaType === 'video_embed') {
            $data['video_url'] = $request->video_url;
            // Clear old video file if switching
            if ($banner->video_file) {
                Storage::disk('public')->delete($banner->video_file);
                $data['video_file'] = null;
            }
        }

        // Handle uploaded video
        if ($mediaType === 'video_upload' && $request->hasFile('video_file')) {
            if ($banner->video_file) {
                Storage::disk('public')->delete($banner->video_file);
            }
            $data['video_file'] = $request->file('video_file')->store('banner-videos', 'public');
            // Clear embed URL if switching
            $data['video_url'] = null;
        }

        // Switching back to image – clear video data
        if ($mediaType === 'image') {
            $data['video_url'] = null;
        }

        $banner->update($data);

        return redirect()->route('admin.banners.index')->with('success', 'Banner updated successfully.');
    }

    public function destroy(Banner $banner)
    {
        if ($banner->image)      Storage::disk('public')->delete($banner->image);
        if ($banner->video_file) Storage::disk('public')->delete($banner->video_file);
        $banner->delete();
        return redirect()->route('admin.banners.index')->with('success', 'Banner deleted successfully.');
    }
}
