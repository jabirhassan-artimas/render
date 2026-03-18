@extends('layouts.admin')

@section('title', 'Add New Product')

@section('content')
    <div class="card" style="max-width: 800px;">
        @if ($errors->any())
            <div class="mb-4" style="color: var(--danger);">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('admin.products.store') }}" method="POST" enctype="multipart/form-data">
            @csrf

            <div class="form-group">
                <label class="form-label">Product Name</label>
                <input type="text" name="name" class="form-control" value="{{ old('name') }}" required>
            </div>

            <div class="grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                    <label class="form-label">Category</label>
                    <select name="category_id" class="form-control" required>
                        <option value="">Select Category</option>
                        @foreach($categories as $category)
                            <option value="{{ $category->id }}">{{ $category->name }}</option>
                        @endforeach
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Brand</label>
                    <select name="brand_id" class="form-control">
                        <option value="">Select Brand</option>
                        @foreach($brands as $brand)
                            <option value="{{ $brand->id }}">{{ $brand->name }}</option>
                        @endforeach
                    </select>
                </div>
            </div>

            <div class="grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                    <label class="form-label">Price (৳)</label>
                    <input type="number" name="price" class="form-control" step="0.01" value="{{ old('price') }}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Discount Price (৳)</label>
                    <input type="number" name="discount_price" class="form-control" step="0.01"
                        value="{{ old('discount_price') }}">
                </div>
            </div>

            <div class="grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                    <label class="form-label">Stock Quantity</label>
                    <input type="number" name="stock_qty" class="form-control" value="{{ old('stock_qty', 0) }}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">SKU (Optional)</label>
                    <input type="text" name="sku" class="form-control" value="{{ old('sku') }}">
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">Description</label>
                <textarea name="description" class="form-control" rows="5">{{ old('description') }}</textarea>
            </div>

            <div class="form-group mb-4">
                <label class="form-label" style="font-weight: 600;">Main Thumbnail</label>
                <input type="file" name="thumbnail" class="form-control" accept="image/*">
            </div>

            <div class="form-group mb-4">
                <label class="form-label" style="font-weight: 600;">Gallery Images (Multiple)</label>
                <input type="file" name="images[]" class="form-control" multiple accept="image/*">
                <small class="text-muted">You can select multiple images by holding Ctrl/Cmd.</small>
            </div>

            <div class="flex gap-4 mb-4">
                <label class="flex items-center gap-2">
                    <input type="checkbox" name="status" checked> Active
                </label>
                <label class="flex items-center gap-2">
                    <input type="checkbox" name="featured"> Featured
                </label>
            </div>

            <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Save Product</button>
            <a href="{{ route('admin.products.index') }}" class="btn btn-outline">Cancel</a>
        </form>
    </div>
@endsection