@extends('layouts.admin')

@section('title', 'Create Page')

@section('content')
    <div class="card" style="max-width: 800px;">
        <form action="{{ route('admin.pages.store') }}" method="POST" enctype="multipart/form-data">
            @csrf

            <div class="form-group">
                <label class="form-label">Title</label>
                <input type="text" name="title" class="form-control" value="{{ old('title') }}">
            </div>

            <div class="form-group">
                <label class="form-label">Slug (URL)</label>
                <input type="text" name="slug" class="form-control" value="{{ old('slug') }}"
                    placeholder="Leave empty to auto-generate from title">
            </div>

            <div class="form-group">
                <label class="form-label">Page Featured Image (Optional)</label>
                <input type="file" name="image" class="form-control">
            </div>

            <div class="form-group"
                style="background: #f8fafc; padding: 1rem; border-radius: 8px; border: 1px solid #e2e8f0;">
                <label class="form-label" style="display: flex; align-items: center; gap: 0.5rem;"><i
                        class="fas fa-info-circle"></i> Special Metadata (For About Us only)</label>
                <div class="grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div>
                        <label style="font-size: 0.8rem; color: var(--text-light);">Experience Number (e.g. 10+)</label>
                        <input type="text" name="meta[experience_years]" class="form-control"
                            value="{{ old('meta.experience_years') }}">
                    </div>
                    <div>
                        <label style="font-size: 0.8rem; color: var(--text-light);">Experience Label</label>
                        <input type="text" name="meta[experience_label]" class="form-control"
                            value="{{ old('meta.experience_label', 'Years of Experience') }}">
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">Content</label>
                <textarea name="content" class="form-control" rows="10"
                    style="min-height: 300px;">{{ old('content') }}</textarea>
            </div>

            <div class="form-group">
                <label class="flex items-center gap-2">
                    <input type="checkbox" name="status" checked> Active
                </label>
            </div>

            <button type="submit" class="btn btn-primary">Create Page</button>
        </form>
    </div>
@endsection