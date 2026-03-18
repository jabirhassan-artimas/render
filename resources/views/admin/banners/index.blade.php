@extends('layouts.admin')

@section('title', 'Marketing Banners')

@section('content')
    <div class="product-dashboard">
        <div class="flex justify-between items-center mb-6">
            <h3 style="font-weight: 800; color: #2b3674; margin: 0;">Promotion Banners</h3>
            <a href="{{ route('admin.banners.create') }}" class="btn"
                style="background: linear-gradient(135deg, #4361ee 0%, #4cc9f0 100%); color: white; border-radius: 12px; padding: 0.75rem 1.5rem; font-weight: 700; border: none; box-shadow: 0 4px 15px rgba(67, 97, 238, 0.3);">
                <i class="fas fa-plus mr-2"></i> ADD BANNER
            </a>
        </div>

        <!-- Search & Filters -->
        <div class="filter-card mb-6">
            <form action="{{ route('admin.banners.index') }}" method="GET" class="flex flex-wrap items-center gap-4">
                <div class="search-wrapper">
                    <i class="fas fa-search"></i>
                    <input type="text" name="search" value="{{ request('search') }}" class="search-input"
                        placeholder="Search banners by title...">
                </div>

                <select name="per_page" class="premium-select" onchange="this.form.submit()">
                    <option value="10" {{ request('per_page') == 10 ? 'selected' : '' }}>10 Per Page</option>
                    <option value="20" {{ (request('per_page') == 20 || !request('per_page')) ? 'selected' : '' }}>20 Per Page
                    </option>
                    <option value="50" {{ request('per_page') == 50 ? 'selected' : '' }}>50 Per Page</option>
                </select>
            </form>
        </div>

        <div class="card-premium" style="overflow-x: auto;">
            <table class="premium-table">
                <thead>
                    <tr>
                        <th>PREVIEW</th>
                        <th>CONTENT</th>
                        <th>PLACEMENT</th>
                        <th>ORDER</th>
                        <th>STATUS</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($banners as $banner)
                        <tr>
                            <td>
                                <div
                                    style="width: 120px; border-radius: 10px; overflow: hidden; border: 2px solid #f4f7fe; background: #f4f7fe;">
                                    <img src="{{ asset('storage/' . $banner->image) }}" alt="Banner"
                                        style="width: 100%; height: auto; display: block; object-fit: cover;">
                                </div>
                            </td>
                            <td>
                                <div style="font-weight: 700; color: #2b3674; font-size: 0.95rem;">{{ $banner->title }}</div>
                                <div style="font-size: 0.75rem; color: #a3aed0; font-family: monospace;">{{ $banner->link }}
                                </div>
                            </td>
                            <td>
                                <span
                                    style="background: #eef2ff; padding: 4px 12px; border-radius: 8px; font-size: 0.75rem; color: #4361ee; font-weight: 700; text-transform: uppercase;">
                                    {{ $banner->type }}
                                </span>
                            </td>
                            <td>
                                <div style="font-weight: 700; color: #2b3674;">{{ $banner->sort_order }}</div>
                            </td>
                            <td>
                                <span class="premium-badge {{ $banner->status ? 'status-active' : 'status-inactive' }}"
                                    style="background: {{ $banner->status ? '#eefdf5' : '#fff1f2' }}; color: {{ $banner->status ? '#05cd99' : '#ee5d50' }};">
                                    {{ $banner->status ? 'Active' : 'Hidden' }}
                                </span>
                            </td>
                            <td>
                                <div class="flex gap-2">
                                    <a href="{{ route('admin.banners.edit', $banner->id) }}" class="btn"
                                        style="width: 38px; height: 38px; border-radius: 10px; background: #f4f7fe; color: #4361ee; display: flex; align-items: center; justify-content: center; padding: 0;">
                                        <i class="fas fa-pen-nib"></i>
                                    </a>
                                    <form action="{{ route('admin.banners.destroy', $banner->id) }}" method="POST"
                                        onsubmit="return confirm('Archive this banner?')">
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
            {{ $banners->links() }}
        </div>
    </div>
@endsection