@extends('layouts.admin')

@section('title', 'Brands')

@section('content')
    <div class="product-dashboard">
        <div class="flex justify-between items-center mb-6">
            <h3 style="font-weight: 800; color: #2b3674; margin: 0;">Partner Brands</h3>
            <a href="{{ route('admin.brands.create') }}" class="btn"
                style="background: linear-gradient(135deg, #4361ee 0%, #4cc9f0 100%); color: white; border-radius: 12px; padding: 0.75rem 1.5rem; font-weight: 700; border: none; box-shadow: 0 4px 15px rgba(67, 97, 238, 0.3);">
                <i class="fas fa-plus mr-2"></i> ADD BRAND
            </a>
        </div>

        <!-- Search & Filters -->
        <div class="filter-card mb-6">
            <form action="{{ route('admin.brands.index') }}" method="GET" class="flex flex-wrap items-center gap-4">
                <div class="search-wrapper">
                    <i class="fas fa-search"></i>
                    <input type="text" name="search" value="{{ request('search') }}" class="search-input"
                        placeholder="Search brands by name...">
                </div>

                <select name="per_page" class="premium-select" onchange="this.form.submit()">
                    <option value="10" {{ request('per_page') == 10 ? 'selected' : '' }}>10 Per Page</option>
                    <option value="25" {{ request('per_page') == 25 ? 'selected' : '' }}>25 Per Page</option>
                    <option value="50" {{ request('per_page') == 50 ? 'selected' : '' }}>50 Per Page</option>
                </select>
            </form>
        </div>

        <div class="card-premium" style="overflow-x: auto;">
            <table class="premium-table">
                <thead>
                    <tr>
                        <th>BRAND</th>
                        <th>SLUG</th>
                        <th>STATUS</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($brands as $brand)
                        <tr>
                            <td>
                                <div class="flex items-center gap-4">
                                    @if($brand->image)
                                        <img src="{{ asset('storage/' . $brand->image) }}"
                                            style="width: 45px; height: 45px; border-radius: 10px; object-fit: cover; background: #f4f7fe; padding: 5px;">
                                    @else
                                        <div
                                            style="width: 45px; height: 45px; border-radius: 10px; background: #f4f7fe; display: flex; align-items: center; justify-content: center; color: #a3aed0;">
                                            <i class="fas fa-star"></i>
                                        </div>
                                    @endif
                                    <div style="font-weight: 700; color: #2b3674;">{{ $brand->name }}</div>
                                </div>
                            </td>
                            <td>
                                <span
                                    style="color: #707eae; font-weight: 600; font-family: monospace;">{{ $brand->slug }}</span>
                            </td>
                            <td>
                                <span class="premium-badge {{ $brand->status ? 'status-active' : 'status-inactive' }}"
                                    style="background: {{ $brand->status ? '#eefdf5' : '#fff1f2' }}; color: {{ $brand->status ? '#05cd99' : '#ee5d50' }};">
                                    {{ $brand->status ? 'Active' : 'Inactive' }}
                                </span>
                            </td>
                            <td>
                                <div class="flex gap-2">
                                    <a href="{{ route('admin.brands.edit', $brand->id) }}" class="btn"
                                        style="width: 38px; height: 38px; border-radius: 10px; background: #f4f7fe; color: #4361ee; display: flex; align-items: center; justify-content: center; padding: 0;">
                                        <i class="fas fa-pen-nib"></i>
                                    </a>
                                    <form action="{{ route('admin.brands.destroy', $brand->id) }}" method="POST"
                                        onsubmit="return confirm('Archive this brand?')">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn"
                                            style="width: 38px; height: 38px; border-radius: 10px; background: #fff1f2; color: #ee5d50; display: flex; align-items: center; justify-content: center; padding: 0; border: none;">
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <div class="pagination-wrapper mt-6">
            {{ $brands->links() }}
        </div>
    </div>
@endsection