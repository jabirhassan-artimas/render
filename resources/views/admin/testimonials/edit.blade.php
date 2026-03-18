@extends('layouts.admin')

@section('title', 'Edit Testimonial')

@section('content')
    <div class="card" style="max-width: 600px;">
        <form action="{{ route('admin.testimonials.update', $testimonial->id) }}" method="POST"
            enctype="multipart/form-data">
            @csrf
            @method('PUT')

            <div class="form-group">
                <label class="form-label">Name</label>
                <input type="text" name="name" class="form-control" required value="{{ $testimonial->name }}">
            </div>

            <div class="form-group">
                <label class="form-label">Designation / Role</label>
                <input type="text" name="designation" class="form-control" value="{{ $testimonial->designation }}">
            </div>

            <div class="form-group">
                <label class="form-label">Content</label>
                <textarea name="content" class="form-control" rows="4" required>{{ $testimonial->content }}</textarea>
            </div>

            <div class="form-group">
                <label class="form-label">Rating (1-5)</label>
                <input type="number" name="rating" class="form-control" min="1" max="5" value="{{ $testimonial->rating }}">
            </div>

            <div class="form-group">
                <label class="form-label">Image (Avatar)</label>
                @if($testimonial->image)
                    <div class="mb-2">
                        <img src="{{ asset('storage/' . $testimonial->image) }}"
                            style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">
                    </div>
                @endif
                <input type="file" name="image" class="form-control">
            </div>

            <div class="form-group">
                <label class="flex items-center gap-2">
                    <input type="checkbox" name="status" {{ $testimonial->status ? 'checked' : '' }}> Active
                </label>
            </div>

            <button type="submit" class="btn btn-primary">Update Testimonial</button>
        </form>
    </div>
@endsection