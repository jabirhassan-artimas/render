@extends('layouts.admin')

@section('title', 'Add Category')

@section('content')
    <div class="card" style="max-width: 600px;">
        <form action="{{ route('admin.categories.store') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="form-group">
                <label class="form-label">Name</label>
                <input type="text" name="name" class="form-control" required>
            </div>

            <div class="form-group">
                <label class="form-label">Parent Category (Optional)</label>
                <select name="parent_id" class="form-control">
                    <option value="">None</option>
                    @foreach($categories as $cat)
                        <option value="{{ $cat->id }}">{{ $cat->name }}</option>
                    @endforeach
                </select>
            </div>

            <div class="form-group">
                <label class="form-label">Image</label>
                <input type="file" name="image" class="form-control">
            </div>

            <div class="form-group">
                <label class="flex items-center gap-2">
                    <input type="checkbox" name="status" checked> Active
                </label>
            </div>

            <button type="submit" class="btn btn-primary">Save Category</button>
        </form>
    </div>
@endsection