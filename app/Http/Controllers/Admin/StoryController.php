<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Story;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class StoryController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Stories/Index', [
            'stories' => Story::orderBy('sort_order')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Stories/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'image' => 'required|image|max:2048',
        ]);

        $data = $request->all();
        
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('stories', 'public');
        }

        // Handle points as JSON
        if (isset($data['points']) && is_array($data['points'])) {
            $data['points'] = array_filter($data['points']);
        }

        Story::create($data);

        return redirect()->route('admin.stories.index')->with('success', 'Story created successfully.');
    }

    public function edit(Story $story)
    {
        return Inertia::render('Admin/Stories/Edit', [
            'story' => $story
        ]);
    }

    public function update(Request $request, Story $story)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
        ]);

        $data = $request->all();

        if ($request->hasFile('image')) {
            if ($story->image) {
                Storage::disk('public')->delete($story->image);
            }
            $data['image'] = $request->file('image')->store('stories', 'public');
        } else {
            unset($data['image']);
        }

        if (isset($data['points']) && is_array($data['points'])) {
            $data['points'] = array_filter($data['points']);
        }

        $story->update($data);

        return redirect()->route('admin.stories.index')->with('success', 'Story updated successfully.');
    }

    public function destroy(Story $story)
    {
        if ($story->image) {
            Storage::disk('public')->delete($story->image);
        }
        $story->delete();

        return redirect()->back()->with('success', 'Story deleted successfully.');
    }
}
