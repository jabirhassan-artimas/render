@extends('layouts.admin')

@section('title', 'Add Banner')

@section('content')
    <div class="card" style="max-width: 600px;">
        <form action="{{ route('admin.banners.store') }}" method="POST" enctype="multipart/form-data">
            @csrf

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
                <input type="text" name="title" class="form-control" value="{{ old('title') }}">
            </div>

            <div class="form-group">
                <label class="form-label">Subtitle (Badge Text)</label>
                <input type="text" name="subtitle" class="form-control" value="{{ old('subtitle') }}"
                    placeholder="e.g. New Arrival, 50% Off">
            </div>

            <div class="form-group">
                <label class="form-label">Description</label>
                <textarea name="description" class="form-control" rows="3">{{ old('description') }}</textarea>
            </div>

            <div class="form-group">
                <label class="form-label">Type</label>
                <select name="type" class="form-control">
                    <option value="slider" selected>Hero Slider</option>
                    <option value="promo_home">Home Promo Grid</option>
                    <option value="promo_sidebar">Sidebar/Other</option>
                </select>
            </div>

            <div class="form-group">
                <label class="form-label">Link URL (Optional)</label>
                <input type="url" name="link" class="form-control">
            </div>

            <div class="form-group">
                <label class="form-label">Sort Order</label>
                <input type="number" name="sort_order" class="form-control" value="0">
            </div>

            <div class="form-group">
                <label class="form-label">Banner Image</label>
                <input type="file" name="image" class="form-control" required>
            </div>

            <div class="form-group">
                <label class="flex items-center gap-2">
                    <input type="checkbox" name="status" checked> Active
                </label>
            </div>

            <button type="submit" class="btn btn-primary">Upload Banner</button>
        </form>
    </div>
@endsection