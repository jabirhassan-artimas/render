@extends('layouts.admin')

@section('title', 'Content Management')

@section('content')
    <div class="product-dashboard">
        <div class="flex justify-between items-center mb-6">
            <h3 style="font-weight: 800; color: #2b3674; margin: 0;">Static Pages</h3>
            <a href="{{ route('admin.pages.create') }}" class="btn"
                style="background: linear-gradient(135deg, #4361ee 0%, #4cc9f0 100%); color: white; border-radius: 12px; padding: 0.75rem 1.5rem; font-weight: 700; border: none; box-shadow: 0 4px 15px rgba(67, 97, 238, 0.3);">
                <i class="fas fa-plus mr-2"></i> CREATE PAGE
            </a>
        </div>

        <!-- Search & Filters -->
        <div class="filter-card mb-6">
            <form action="{{ route('admin.pages.index') }}" method="GET" class="flex flex-wrap items-center gap-4">
                <div class="search-wrapper">
                    <i class="fas fa-search"></i>
                    <input type="text" name="search" value="{{ request('search') }}" class="search-input"
                        placeholder="Search pages by title...">
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
                        <th>PAGE TITLE</th>
                        <th>URL SLUG</th>
                        <th>STATUS</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($pages as $page)
                        <tr>
                            <td>
                                <div class="flex items-center gap-3">
                                    <div
                                        style="width: 40px; height: 40px; border-radius: 10px; background: #f4f7fe; color: #4361ee; display: flex; align-items: center; justify-content: center; font-size: 1.1rem;">
                                        <i class="fas fa-file-alt"></i>
                                    </div>
                                    <div style="font-weight: 700; color: #2b3674;">{{ $page->title }}</div>
                                </div>
                            </td>
                            <td>
                                <span
                                    style="color: #707eae; font-weight: 600; font-family: monospace;">/{{ $page->slug }}</span>
                            </td>
                            <td>
                                <span class="premium-badge {{ $page->status ? 'status-active' : 'status-inactive' }}"
                                    style="background: {{ $page->status ? '#eefdf5' : '#fff1f2' }}; color: {{ $page->status ? '#05cd99' : '#ee5d50' }};">
                                    {{ $page->status ? 'Published' : 'Draft' }}
                                </span>
                            </td>
                            <td>
                                <div class="flex gap-2">
                                    <a href="{{ route('admin.pages.edit', $page->id) }}" class="btn"
                                        style="width: 38px; height: 38px; border-radius: 10px; background: #f4f7fe; color: #4361ee; display: flex; align-items: center; justify-content: center; padding: 0;">
                                        <i class="fas fa-pen-nib"></i>
                                    </a>
                                    <form action="{{ route('admin.pages.destroy', $page->id) }}" method="POST"
                                        onsubmit="return confirm('Archive this page?')">
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
            {{ $pages->links() }}
        </div>
    </div>
@endsection