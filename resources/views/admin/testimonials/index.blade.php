@extends('layouts.admin')

@section('title', 'Testimonials')

@section('content')
    <div class="product-dashboard">
        <div class="flex justify-between items-center mb-6">
            <h3 style="font-weight: 800; color: #2b3674; margin: 0;">Client Feedback</h3>
            <a href="{{ route('admin.testimonials.create') }}" class="btn"
                style="background: linear-gradient(135deg, #4361ee 0%, #4cc9f0 100%); color: white; border-radius: 12px; padding: 0.75rem 1.5rem; font-weight: 700; border: none; box-shadow: 0 4px 15px rgba(67, 97, 238, 0.3);">
                <i class="fas fa-plus mr-2"></i> ADD TESTIMONIAL
            </a>
        </div>

        <!-- Search & Filters -->
        <div class="filter-card mb-6">
            <form action="{{ route('admin.testimonials.index') }}" method="GET" class="flex flex-wrap items-center gap-4">
                <div class="search-wrapper">
                    <i class="fas fa-search"></i>
                    <input type="text" name="search" value="{{ request('search') }}" class="search-input"
                        placeholder="Search testimonials by name...">
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
                        <th>CLIENT</th>
                        <th>FEEDBACK</th>
                        <th>RATING</th>
                        <th>STATUS</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($testimonials as $item)
                        <tr>
                            <td>
                                <div class="flex items-center gap-4">
                                    @if($item->image)
                                        <img src="{{ asset('storage/' . $item->image) }}"
                                            style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid #eff6ff;">
                                    @else
                                        <div
                                            style="width: 50px; height: 50px; border-radius: 50%; background: #eff6ff; color: #4361ee; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.2rem;">
                                            {{ substr($item->name, 0, 1) }}
                                        </div>
                                    @endif
                                    <div>
                                        <div style="font-weight: 700; color: #2b3674;">{{ $item->name }}</div>
                                        <div style="font-size: 0.75rem; color: #a3aed0;">
                                            {{ $item->designation ?? 'Verified Customer' }}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div style="color: #707eae; font-size: 0.85rem; font-style: italic; max-width: 300px;">
                                    "{{ Str::limit($item->comment, 80) }}"
                                </div>
                            </td>
                            <td>
                                <div style="color: #ffb547;">
                                    @for($i = 1; $i <= 5; $i++)
                                        <i class="{{ $i <= $item->rating ? 'fas' : 'far' }} fa-star"></i>
                                    @endfor
                                </div>
                            </td>
                            <td>
                                <span class="premium-badge {{ $item->status ? 'status-active' : 'status-inactive' }}"
                                    style="background: {{ $item->status ? '#eefdf5' : '#fff1f2' }}; color: {{ $item->status ? '#05cd99' : '#ee5d50' }};">
                                    {{ $item->status ? 'Visible' : 'Hidden' }}
                                </span>
                            </td>
                            <td>
                                <div class="flex gap-2">
                                    <a href="{{ route('admin.testimonials.edit', $item->id) }}" class="btn"
                                        style="width: 38px; height: 38px; border-radius: 10px; background: #f4f7fe; color: #4361ee; display: flex; align-items: center; justify-content: center; padding: 0;">
                                        <i class="fas fa-pen-nib"></i>
                                    </a>
                                    <form action="{{ route('admin.testimonials.destroy', $item->id) }}" method="POST"
                                        onsubmit="return confirm('Archive this testimonial?')">
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
            {{ $testimonials->links() }}
        </div>
    </div>
@endsection