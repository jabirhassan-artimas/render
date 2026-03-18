@extends('layouts.admin')

@section('title', 'Edit Product')

@section('content')
    <style>
        .form-card {
            max-width: 1000px;
            margin: 0 auto;
        }

        .form-label {
            color: #2b3674;
            font-weight: 700;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
            display: block;
        }

        .premium-input,
        .premium-select,
        .premium-textarea {
            background: #f4f7fe;
            border: 2px solid transparent;
            border-radius: 12px;
            padding: 0.85rem 1rem;
            width: 100%;
            color: #2b3674;
            font-weight: 500;
            transition: all 0.3s;
        }

        .premium-input:focus,
        .premium-select:focus,
        .premium-textarea:focus {
            background: white;
            border-color: #4361ee;
            box-shadow: 0 4px 20px rgba(67, 97, 238, 0.1);
            outline: none;
        }

        .image-preview-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }

        .preview-box {
            position: relative;
            border-radius: 15px;
            overflow: hidden;
            aspect-ratio: 1;
            border: 2px solid #eef2f6;
            background: #f4f7fe;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        }

        .preview-box:hover {
            border-color: #4361ee;
        }

        #thumbPreview {
            width: 140px;
            /* Smaller main thumbnail */
            height: 140px;
        }

        .preview-box img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .upload-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(67, 97, 238, 0.8);
            color: white;
            padding: 4px;
            text-align: center;
            font-size: 0.65rem;
            font-weight: 700;
            text-transform: uppercase;
        }

        .btn-update {
            background: linear-gradient(135deg, #4361ee 0%, #4cc9f0 100%);
            color: white;
            border: none;
            border-radius: 12px;
            padding: 0.85rem 2rem;
            font-weight: 700;
            box-shadow: 0 4px 15px rgba(67, 97, 238, 0.3);
            transition: all 0.3s;
            cursor: pointer;
        }

        .btn-update:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(67, 97, 238, 0.4);
        }

        .toggle-group {
            display: flex;
            gap: 2rem;
            background: #f4f7fe;
            padding: 1rem 1.5rem;
            border-radius: 15px;
        }

        .custom-checkbox {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            font-weight: 600;
            color: #2b3674;
        }

        .custom-checkbox input[type="checkbox"] {
            width: 20px;
            height: 20px;
            border-radius: 6px;
            accent-color: #4361ee;
        }

        .section-title {
            font-size: 1.1rem;
            font-weight: 800;
            color: #2b3674;
            margin-bottom: 1.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #f4f7fe;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .section-title i {
            color: #4361ee;
        }
    </style>

    <div class="form-card">
        <div class="flex justify-between items-center mb-6">
            <h2 style="font-weight: 800; color: #2b3674; margin: 0;">Update Product Details</h2>
            <a href="{{ route('admin.products.index') }}" class="btn"
                style="background: white; border: 1px solid #eef2f6; color: #707eae; border-radius: 12px; padding: 0.75rem 1.5rem; font-weight: 700;">
                <i class="fas fa-arrow-left mr-2"></i> BACK TO LIST
            </a>
        </div>

        @if ($errors->any())
            <div class="card-premium mb-6" style="background: #fff1f2; border-left: 5px solid #ee5d50; color: #991b1b;">
                <ul class="m-0" style="padding-left: 1.25rem;">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('admin.products.update', $product->id) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Left Side: Basic Info -->
                <div class="md:col-span-2">
                    <div class="card-premium">
                        <div class="section-title">
                            <i class="fas fa-info-circle"></i> Basic Information
                        </div>

                        <div class="mb-5">
                            <label class="form-label">Product Full Name</label>
                            <input type="text" name="name" class="premium-input" value="{{ old('name', $product->name) }}"
                                required placeholder="e.g. Handmade Silk Scarf">
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                            <div>
                                <label class="form-label">Category</label>
                                <select name="category_id" class="premium-select" required>
                                    <option value="">Select Category</option>
                                    @foreach($categories as $category)
                                        <option value="{{ $category->id }}" {{ $product->category_id == $category->id ? 'selected' : '' }}>
                                            {{ $category->name }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                            <div>
                                <label class="form-label">Brand (Optional)</label>
                                <select name="brand_id" class="premium-select">
                                    <option value="">Select Brand</option>
                                    @foreach($brands as $brand)
                                        <option value="{{ $brand->id }}" {{ $product->brand_id == $brand->id ? 'selected' : '' }}>
                                            {{ $brand->name }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="mb-5">
                            <label class="form-label">Product Description</label>
                            <textarea name="description" class="premium-textarea" rows="6"
                                placeholder="Describe the product features, materials, etc.">{{ old('description', $product->description) }}</textarea>
                        </div>

                        <div class="section-title mt-8">
                            <i class="fas fa-tags"></i> Pricing & Inventory
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                            <div>
                                <label class="form-label">Regular Price (৳)</label>
                                <input type="number" name="price" class="premium-input" step="0.01"
                                    value="{{ old('price', $product->price) }}" required placeholder="0.00">
                            </div>
                            <div>
                                <label class="form-label">Discount Price (৳)</label>
                                <input type="number" name="discount_price" class="premium-input" step="0.01"
                                    value="{{ old('discount_price', $product->discount_price) }}" placeholder="0.00">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label class="form-label">Stock Quantity</label>
                                <input type="number" name="stock_qty" class="premium-input"
                                    value="{{ old('stock_qty', $product->stock_qty) }}" required placeholder="0">
                            </div>
                            <div>
                                <label class="form-label">SKU Code</label>
                                <input type="text" name="sku" class="premium-input" value="{{ old('sku', $product->sku) }}"
                                    placeholder="e.g. SKU12345">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Side: Media & Settings -->
                <div class="md:col-span-1">
                    <div class="card-premium">
                        <div class="section-title">
                            <i class="fas fa-image"></i> Media
                        </div>

                        <div class="mb-5">
                            <label class="form-label">Main Thumbnail</label>
                            <div class="preview-box mb-3" id="thumbPreview">
                                @if($product->thumbnail)
                                    <img src="{{ asset('storage/' . $product->thumbnail) }}" alt="Main image">
                                    <div class="upload-overlay">Current Image</div>
                                @else
                                    <i class="fas fa-cloud-upload-alt text-4xl text-light"></i>
                                @endif
                            </div>
                            <input type="file" name="thumbnail" class="premium-input" accept="image/*"
                                style="font-size: 0.8rem; padding: 0.5rem;">
                        </div>

                        <div class="mb-5">
                            <label class="form-label">Gallery Images</label>
                            <div class="image-preview-container mb-3">
                                @foreach($product->images as $img)
                                    <div class="preview-box">
                                        <img src="{{ asset('storage/' . $img->image_path) }}">
                                    </div>
                                @endforeach
                                <div class="preview-box" style="border-style: dashed; background: transparent;">
                                    <i class="fas fa-plus text-light"></i>
                                </div>
                            </div>
                            <input type="file" name="images[]" class="premium-input" multiple accept="image/*"
                                style="font-size: 0.8rem; padding: 0.5rem;">
                            <small style="color: #a3aed0; display: block; margin-top: 0.5rem;">Upload new images to expand
                                the gallery.</small>
                        </div>

                        <div class="section-title mt-8">
                            <i class="fas fa-sliders-h"></i> Settings
                        </div>

                        <div class="toggle-group flex-col mb-6">
                            <label class="custom-checkbox">
                                <input type="checkbox" name="status" {{ $product->status ? 'checked' : '' }}>
                                <span>Active Status</span>
                            </label>
                            <label class="custom-checkbox mt-3">
                                <input type="checkbox" name="featured" {{ $product->featured ? 'checked' : '' }}>
                                <span>Featured Product</span>
                            </label>
                        </div>

                        <button type="submit" class="btn-update w-full mb-3">
                            <i class="fas fa-save mr-2"></i> UPDATE PRODUCT
                        </button>
                        <a href="{{ route('admin.products.index') }}" class="btn w-full"
                            style="background: #f4f7fe; color: #707eae; border-radius: 12px; padding: 0.85rem; font-weight: 700; text-align: center; display: block;">
                            CANCEL
                        </a>
                    </div>
                </div>
            </div>
        </form>
    </div>
@endsection