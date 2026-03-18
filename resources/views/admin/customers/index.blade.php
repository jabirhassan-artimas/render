@extends('layouts.admin')

@section('title', 'Registered Customers')

@section('content')
    <div class="product-dashboard">
        <div class="flex justify-between items-center mb-6">
            <h3 style="font-weight: 800; color: #2b3674; margin: 0;">Customer Base</h3>
            <div class="flex gap-2">
                <button class="btn"
                    style="background: white; border: 1px solid #eef2f6; color: #707eae; border-radius: 12px; padding: 0.75rem 1.5rem; font-weight: 700;">
                    <i class="fas fa-file-export mr-2"></i> EXPORT
                </button>
            </div>
        </div>

        <!-- Search & Filters -->
        <div class="filter-card mb-6">
            <form action="{{ route('admin.customers.index') }}" method="GET" class="flex flex-wrap items-center gap-4">
                <div class="search-wrapper">
                    <i class="fas fa-search"></i>
                    <input type="text" name="search" value="{{ request('search') }}" class="search-input"
                        placeholder="Search by name or email...">
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
                        <th>CUSTOMER</th>
                        <th>CONTACT INFO</th>
                        <th>JOIN DATE</th>
                        <th>STATUS</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($customers as $customer)
                        <tr>
                            <td>
                                <div class="flex items-center gap-4">
                                    <div
                                        style="width: 45px; height: 45px; border-radius: 12px; background: linear-gradient(135deg, #4361ee 0%, #4cc9f0 100%); color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.1rem; box-shadow: 0 4px 10px rgba(67, 97, 238, 0.2);">
                                        {{ substr($customer->name, 0, 1) }}
                                    </div>
                                    <div>
                                        <div style="font-weight: 700; color: #2b3674;">{{ $customer->name }}</div>
                                        <div style="font-size: 0.75rem; color: #a3aed0;">ID: #CUST-{{ $customer->id }}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div style="font-weight: 600; color: #2b3674; font-size: 0.9rem;">{{ $customer->email }}</div>
                                <div style="font-size: 0.8rem; color: #707eae;">{{ $customer->phone ?? 'No Phone' }}</div>
                            </td>
                            <td>
                                <div style="color: #707eae; font-weight: 600; font-size: 0.85rem;">
                                    {{ $customer->created_at->format('d M, Y') }}
                                </div>
                            </td>
                            <td>
                                <span class="premium-badge status-active">Verified</span>
                            </td>
                            <td>
                                <div class="flex gap-2">
                                    <a href="#" class="btn"
                                        style="width: 38px; height: 38px; border-radius: 10px; background: #f4f7fe; color: #4361ee; display: flex; align-items: center; justify-content: center; padding: 0;"
                                        title="View Profile">
                                        <i class="fas fa-user-edit"></i>
                                    </a>
                                    <button class="btn"
                                        style="width: 38px; height: 38px; border-radius: 10px; background: #fff1f2; color: #ee5d50; display: flex; align-items: center; justify-content: center; padding: 0; border: none;"
                                        title="Deactivate">
                                        <i class="fas fa-user-slash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <div class="pagination-wrapper mt-6">
            {{ $customers->links() }}
        </div>
    </div>
@endsection