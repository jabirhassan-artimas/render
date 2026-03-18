@extends('layouts.admin')

@section('title', 'Edit Brand')

@section('content')
    <div class="card" style="max-width: 600px;">
        <form action="{{ route('admin.brands.update', $brand->id) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')

            <div class="form-group">
                <label class="form-label">Name</label>
                <input type="text" name="name" class="form-control" value="{{ $brand->name }}" required>
            </div>

            <div class="form-group">
                <label class="form-label">Image</label>
                @if($brand->image)
                    <div class="mb-2">
                        <img src="{{ asset('storage/' . $brand->image) }}" style="height: 80px; border-radius: var(--radius);">
                    </div>
                @endif
                <input type="file" name="image" class="form-control">
            </div>

            <div class="form-group">
                <label class="flex items-center gap-2">
                    <input type="checkbox" name="status" {{ $brand->status ? 'checked' : '' }}> Active
                </label>
            </div>

            <button type="submit" class="btn btn-primary">Update Brand</button>
        </form>
    </div>
@endsection