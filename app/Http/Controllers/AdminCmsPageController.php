<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CmsPage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminCmsPageController extends Controller
{
    public function index(Request $request)
    {
        $query = CmsPage::query();

        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        $perPage = $request->get('per_page', 20);
        $pages = $query->latest()->paginate($perPage)->withQueryString();

        return Inertia::render('Admin/CmsPages/Index', [
            'pages' => $pages,
            'filters' => $request->only(['search'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/CmsPages/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'slug' => 'nullable|unique:cms_pages,slug',
            'content' => 'required',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('pages', 'public');
        }

        CmsPage::create([
            'title' => $request->title,
            'slug' => $request->slug ? Str::slug($request->slug) : Str::slug($request->title),
            'image' => $imagePath,
            'content' => $request->input('content'),
            'meta' => $request->input('meta'), // Should be a JSON array
            'status' => $request->has('status'),
        ]);

        return redirect()->route('admin.pages.index')->with('success', 'Page created successfully.');
    }

    public function edit(CmsPage $cms_page)
    {
        return Inertia::render('Admin/CmsPages/Edit', [
            'page' => $cms_page
        ]);
    }

    public function update(Request $request, CmsPage $cms_page)
    {
        $page = $cms_page;
        $request->validate([
            'title' => 'required',
            'slug' => 'nullable|unique:cms_pages,slug,' . $page->id,
            'content' => 'required',
        ]);

        $data = [
            'title' => $request->title,
            'slug' => $request->slug ? Str::slug($request->slug) : Str::slug($request->title),
            'content' => $request->input('content'),
            'meta' => $request->input('meta'),
            'status' => $request->has('status'),
        ];

        if ($request->hasFile('image')) {
            if ($page->image) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($page->image);
            }
            $data['image'] = $request->file('image')->store('pages', 'public');
        }

        $page->update($data);

        return redirect()->route('admin.pages.index')->with('success', 'Page updated successfully.');
    }

    public function destroy(CmsPage $cms_page)
    {
        $cms_page->delete();
        return redirect()->route('admin.pages.index')->with('success', 'Page deleted successfully.');
    }
}
