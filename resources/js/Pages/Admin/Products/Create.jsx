import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    ChevronLeft, 
    Save, 
    Image as ImageIcon, 
    Type, 
    Layers, 
    Hash, 
    DollarSign, 
    Package, 
    Check, 
    Star,
    X,
    Upload
} from 'lucide-react';

export default function Create({ categories, brands }) {
    const [previews, setPreviews] = useState([]);
    
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category_id: '',
        brand_id: '',
        price: '',
        discount_price: '',
        stock_qty: 0,
        sku: '',
        description: '',
        thumbnail: null,
        images: [],
        status: true,
        featured: false,
    });

    const handleSearch = (e) => {
        // Not used here but often useful
    };

    const handleMultipleImages = (e) => {
        const files = Array.from(e.target.files);
        setData('images', [...data.images, ...files]);
        
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews([...previews, ...newPreviews]);
    };

    const removeImage = (index) => {
        const newImages = [...data.images];
        newImages.splice(index, 1);
        setData('images', newImages);

        const newPreviews = [...previews];
        newPreviews.splice(index, 1);
        setPreviews(newPreviews);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.products.store'));
    };

    return (
        <AdminLayout>
            <Head title="Inventory: New Product" />

            <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link 
                        href={route('admin.products.index')}
                        className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-blue-600 rounded-2xl transition-all shadow-sm group"
                    >
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">New Product Entry</h1>
                        <p className="text-slate-500 text-sm font-medium">Add a new item to your global marketplace inventory.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Main Info */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Basic Details */}
                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    <Type size={12} /> Product Name
                                </label>
                                <input 
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all"
                                    placeholder="e.g. UltraBoost 22 Sneakers"
                                />
                                {errors.name && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-1">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    Description
                                </label>
                                <textarea 
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all min-h-[200px]"
                                    placeholder="Write compelling product details..."
                                ></textarea>
                            </div>
                        </div>

                        {/* Media Section */}
                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-800 ml-1">Gallery & Presentation</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                        Cover Image
                                    </label>
                                    <label className="flex flex-col items-center justify-center w-full aspect-square bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer overflow-hidden group">
                                        {data.thumbnail ? (
                                            <img src={URL.createObjectURL(data.thumbnail)} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-center p-4">
                                                <ImageIcon className="mx-auto text-slate-300 mb-2" size={32} />
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upload Cover</p>
                                            </div>
                                        )}
                                        <input type="file" className="hidden" onChange={e => setData('thumbnail', e.target.files[0])} />
                                    </label>
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                        Gallery Images
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {previews.map((src, i) => (
                                            <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-slate-100 group">
                                                <img src={src} className="w-full h-full object-cover" />
                                                <button 
                                                    type="button"
                                                    onClick={() => removeImage(i)}
                                                    className="absolute top-1 right-1 bg-rose-500 text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}
                                        <label className="aspect-square bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-400 flex flex-col items-center justify-center cursor-pointer transition-all">
                                            <Upload size={16} className="text-slate-300" />
                                            <input type="file" multiple className="hidden" onChange={handleMultipleImages} />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Organization & Price */}
                    <div className="space-y-8">
                        {/* Categorization */}
                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
                             <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    <Layers size={12} /> Primary Category
                                </label>
                                <select 
                                    value={data.category_id}
                                    onChange={e => setData('category_id', e.target.value)}
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                {errors.category_id && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-1">{errors.category_id}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                    <Hash size={12} /> Manufacturer / Brand
                                </label>
                                <select 
                                    value={data.brand_id}
                                    onChange={e => setData('brand_id', e.target.value)}
                                    className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all"
                                >
                                    <option value="">No Specific Brand</option>
                                    {brands.map(brand => (
                                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Pricing & Stock */}
                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                        Base Price
                                    </label>
                                    <input 
                                        type="number"
                                        value={data.price}
                                        onChange={e => setData('price', e.target.value)}
                                        className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all font-mono"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                        Discount (৳)
                                    </label>
                                    <input 
                                        type="number"
                                        value={data.discount_price}
                                        onChange={e => setData('discount_price', e.target.value)}
                                        className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all font-mono"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                        Inventory Qty
                                    </label>
                                    <input 
                                        type="number"
                                        value={data.stock_qty}
                                        onChange={e => setData('stock_qty', e.target.value)}
                                        className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                                        SKU ID
                                    </label>
                                    <input 
                                        type="text"
                                        value={data.sku}
                                        onChange={e => setData('sku', e.target.value)}
                                        className="w-full bg-slate-50 border-none px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-blue-100 transition-all"
                                        placeholder="AUTOGEN"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Visibility & Actions */}
                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-8">
                             <div className="flex items-center justify-between group cursor-pointer" onClick={() => setData('status', !data.status)}>
                                <div>
                                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Status</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Visible to customers</p>
                                </div>
                                <div className={cn("w-12 h-7 rounded-full transition-all relative", data.status ? "bg-emerald-500" : "bg-slate-200")}>
                                    <div className={cn("absolute top-1 left-1 bg-white w-5 h-5 rounded-full transition-all", data.status ? "translate-x-5" : "translate-x-0")}></div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between group cursor-pointer" onClick={() => setData('featured', !data.featured)}>
                                <div>
                                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Featured</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pin to highlight section</p>
                                </div>
                                <Star className={cn("transition-all", data.featured ? "fill-amber-400 text-amber-400" : "text-slate-200")} />
                            </div>

                            <button 
                                type="submit"
                                disabled={processing}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-100 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                            >
                                <Save size={18} /> {processing ? 'Uploading...' : 'Deploy Product'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

function cn(...inputs) {
    return inputs.filter(Boolean).join(' ');
}
