@extends('layouts.admin')

@section('title', 'Add Service')

@section('content')
    <div class="card" style="max-width: 600px;">
        <form action="{{ route('admin.services.store') }}" method="POST">
            @csrf

            <div class="form-group">
                <label class="form-label">Title</label>
                <input type="text" name="title" class="form-control" required value="{{ old('title') }}">
            </div>

            <div class="form-group">
                <label class="form-label">Icon Class (FontAwesome)</label>
                <input type="text" name="icon" class="form-control" required value="{{ old('icon', 'fas fa-star') }}"
                    placeholder="fas fa-truck">
                <small class="text-light">Example: fas fa-truck, fas fa-headset, fas fa-undo</small>
            </div>

            <div class="form-group">
                <label class="form-label">Description</label>
                <textarea name="description" class="form-control" rows="3">{{ old('description') }}</textarea>
            </div>

            <div class="form-group">
                <label class="form-label">Sort Order</label>
                <input type="number" name="sort_order" class="form-control" value="0">
            </div>

            <div class="form-group">
                <label class="flex items-center gap-2">
                    <input type="checkbox" name="status" checked> Active
                </label>
            </div>

            <button type="submit" class="btn btn-primary">Create Service</button>
        </form>
    </div>
@endsection