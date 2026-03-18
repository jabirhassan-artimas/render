@extends('layouts.admin')

@section('title', 'Edit Banner')

@section('content')
    <div class="card" style="max-width: 600px;">
        <form action="{{ route('admin.banners.update', $banner->id) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')

            @if ($errors->any())
                <div class="alert alert-danger"
                    style="background: #fee2e2; color: #991b1b; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                    <ul style="margin: 0; padding-left: 1rem;">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <div class="form-group">
                <label class="form-label">Title</label>
                <input type="text" name="title" class="form-control" value="{{ $banner->title }}">
            </div>

            <div class="form-group">
                <label class="form-label">Subtitle (Badge Text)</label>
                <input type="text" name="subtitle" class="form-control" value="{{ $banner->subtitle }}"
                    placeholder="e.g. New Arrival, 50% Off">
            </div>

            <div class="form-group">
                <label class="form-label">Description</label>
                <textarea name="description" class="form-control" rows="3">{{ $banner->description }}</textarea>
            </div>

            <div class="form-group">
                <label class="form-label">Type</label>
                <select name="type" class="form-control">
                    <option value="slider" {{ $banner->type == 'slider' ? 'selected' : '' }}>Hero Slider</option>
                    <option value="promo_home" {{ $banner->type == 'promo_home' ? 'selected' : '' }}>Home Promo Grid</option>
                    <option value="promo_sidebar" {{ $banner->type == 'promo_sidebar' ? 'selected' : '' }}>Sidebar/Other
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label class="form-label">Current Image</label>
                <div class="mb-2">
                    <img src="{{ asset('storage/' . $banner->image) }}" alt="Banner"
                        style="height: 100px; width: auto; object-fit: cover; border-radius: 4px;">
                </div>
                <label class="form-label">Upload New Image (Optional)</label>
                <input type="file" name="image" class="form-control">
            </div>

            <div class="form-group">
                <label class="form-label">Link URL</label>
                <input type="url" name="link" class="form-control" value="{{ $banner->link }}"
                    placeholder="https://example.com/promo">
            </div>

            <div class="form-group">
                <label class="form-label">Sort Order</label>
                <input type="number" name="sort_order" class="form-control" value="{{ $banner->sort_order }}">
            </div>

            <div class="form-group">
                <label class="flex items-center gap-2">
                    <input type="checkbox" name="status" {{ $banner->status ? 'checked' : '' }}> Active
                </label>
            </div>

            <button type="submit" class="btn btn-primary">Update Banner</button>
        </form>
    </div>
@endsection