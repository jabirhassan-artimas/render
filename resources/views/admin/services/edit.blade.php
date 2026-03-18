@extends('layouts.admin')

@section('title', 'Edit Service')

@section('content')
    <div class="card" style="max-width: 600px;">
        <form action="{{ route('admin.services.update', $service->id) }}" method="POST">
            @csrf
            @method('PUT')

            <div class="form-group">
                <label class="form-label">Title</label>
                <input type="text" name="title" class="form-control" required value="{{ $service->title }}">
            </div>

            <div class="form-group">
                <label class="form-label">Icon Class (FontAwesome)</label>
                <input type="text" name="icon" class="form-control" required value="{{ $service->icon }}"
                    placeholder="fas fa-truck">
            </div>

            <div class="form-group">
                <label class="form-label">Description</label>
                <textarea name="description" class="form-control" rows="3">{{ $service->description }}</textarea>
            </div>

            <div class="form-group">
                <label class="form-label">Sort Order</label>
                <input type="number" name="sort_order" class="form-control" value="{{ $service->sort_order }}">
            </div>

            <div class="form-group">
                <label class="flex items-center gap-2">
                    <input type="checkbox" name="status" {{ $service->status ? 'checked' : '' }}> Active
                </label>
            </div>

            <button type="submit" class="btn btn-primary">Update Service</button>
        </form>
    </div>
@endsection