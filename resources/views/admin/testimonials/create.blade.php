@extends('layouts.admin')

@section('title', 'Add Testimonial')

@section('content')
    <div class="card" style="max-width: 600px;">
        <form action="{{ route('admin.testimonials.store') }}" method="POST" enctype="multipart/form-data">
            @csrf

            <div class="form-group">
                <label class="form-label">Name</label>
                <input type="text" name="name" class="form-control" required value="{{ old('name') }}">
            </div>

            <div class="form-group">
                <label class="form-label">Designation / Role</label>
                <input type="text" name="designation" class="form-control" value="{{ old('designation') }}"
                    placeholder="CEO, TechCorp">
            </div>

            <div class="form-group">
                <label class="form-label">Content</label>
                <textarea name="content" class="form-control" rows="4" required>{{ old('content') }}</textarea>
            </div>

            <div class="form-group">
                <label class="form-label">Rating (1-5)</label>
                <input type="number" name="rating" class="form-control" min="1" max="5" value="5">
            </div>

            <div class="form-group">
                <label class="form-label">Image (Avatar)</label>
                <input type="file" name="image" class="form-control">
            </div>

            <div class="form-group">
                <label class="flex items-center gap-2">
                    <input type="checkbox" name="status" checked> Active
                </label>
            </div>

            <button type="submit" class="btn btn-primary">Create Testimonial</button>
        </form>
    </div>
@endsection