import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { 
    Plus, 
    Trash2, 
    Edit2, 
    Truck, 
    Settings, 
    ShieldCheck, 
    ExternalLink,
    Search,
    X,
    CheckCircle2
} from 'lucide-react';

function cn(...inputs) {
    return inputs.filter(Boolean).join(' ');
}

export default function Index({ couriers = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourier, setEditingCourier] = useState(null);

    const { data, setData, post, patch, processing, errors, reset } = useForm({
        name: '',
        type: 'local',
        api_key: '',
        config: {},
        status: true,
    });

    const openModal = (courier = null) => {
        if (courier) {
            setEditingCourier(courier);
            setData({
                name: courier.name,
                type: courier.type,
                api_key: courier.api_key || '',
                config: courier.config || {},
                status: !!courier.status,
            });
        } else {
            setEditingCourier(null);
            reset();
        }
        setIsModalOpen(true);
    };

    const submit = (e) => {
        e.preventDefault();
        if (editingCourier) {
            router.patch(route('admin.couriers.update', editingCourier.id), data, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                }
            });
        } else {
            router.post(route('admin.couriers.store'), data, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                }
            });
        }
    };

    const deleteCourier = (id) => {
        if (confirm('Are you sure you want to delete this courier?')) {
            router.delete(route('admin.couriers.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Courier Logistics" />

            <div className="space-y-12 animate-in fade-in duration-700 pb-20">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Logistics Hub</h1>
                        <p className="text-slate-500 font-medium tracking-tight">Manage fulfillment partners, API connectors, and automated delivery flows.</p>
                    </div>
                    <button 
                        onClick={() => openModal()}
                        className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-2xl flex items-center gap-2 group"
                    >
                        <Plus size={16} className="group-hover:rotate-90 transition-transform" /> Add Courier
                    </button>
                </div>

                {/* Courier Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {couriers.length === 0 && (
                        <div className="col-span-full bg-white rounded-[3rem] p-20 border border-slate-100 shadow-sm text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-3xl mx-auto flex items-center justify-center text-slate-200 mb-6">
                                <Truck size={40} />
                            </div>
                            <h3 className="text-xl font-black text-slate-800 mb-2">No Couriers Detected</h3>
                            <p className="text-slate-400 font-medium">Add your first delivery partner to start fulfilling orders.</p>
                        </div>
                    )}
                    {couriers.map((courier) => (
                        <div key={courier.id} className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm hover:shadow-2xl hover:border-emerald-100 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50/50 rounded-bl-[4rem] -mr-8 -mt-8 -z-0"></div>
                            
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-8">
                                    <div className={cn(
                                        "w-16 h-16 rounded-2xl flex items-center justify-center transition-all",
                                        courier.status ? "bg-emerald-50 text-emerald-600 shadow-lg shadow-emerald-50" : "bg-slate-100 text-slate-400"
                                    )}>
                                        <Truck size={28} />
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => openModal(courier)}
                                            className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-emerald-600 hover:border-emerald-100 rounded-xl transition-all shadow-sm"
                                        >
                                            <Edit2 size={14} />
                                        </button>
                                        <button 
                                            onClick={() => deleteCourier(courier.id)}
                                            className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-rose-600 hover:border-rose-100 rounded-xl transition-all shadow-sm"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-2xl font-black text-slate-800 tracking-tight">{courier.name}</h3>
                                        {courier.status && <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>}
                                    </div>
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest bg-slate-50 inline-block px-3 py-1 rounded-full mb-6">
                                        {courier.type} Integration
                                    </p>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-slate-500 font-bold text-sm">
                                            <ShieldCheck size={16} className="text-emerald-500" />
                                            <span>API Secure</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-500 font-bold text-sm">
                                            <Settings size={16} className="text-slate-300" />
                                            <span>Configured</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300">
                        <div className="bg-white w-full max-w-xl rounded-[3.5rem] p-12 shadow-2xl relative animate-in zoom-in-95 duration-500">
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-10 right-10 text-slate-300 hover:text-slate-900 transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-2">
                                {editingCourier ? 'Update Matrix' : 'New Logistics Port'}
                            </h2>
                            <p className="text-slate-400 font-medium mb-10">Define your courier connector parameters below.</p>

                            <form onSubmit={submit} className="space-y-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Courier Name</label>
                                    <input 
                                        type="text"
                                        className="w-full bg-slate-50 border-none rounded-2xl px-8 py-5 text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all"
                                        placeholder="e.g. RedX, Pathao, FedEx..."
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Integration Type</label>
                                        <select 
                                            className="w-full bg-slate-50 border-none rounded-2xl px-8 py-5 text-sm font-bold focus:ring-2 focus:ring-emerald-100 appearance-none"
                                            value={data.type}
                                            onChange={e => setData('type', e.target.value)}
                                        >
                                            <option value="local">Domestic Local</option>
                                            <option value="api">API Automated</option>
                                            <option value="hybrid">Hybrid System</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Status Port</label>
                                        <div 
                                            onClick={() => setData('status', !data.status)}
                                            className={cn(
                                                "w-full rounded-2xl p-1 flex items-center cursor-pointer transition-all duration-300",
                                                data.status ? "bg-emerald-500" : "bg-slate-200"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-12 h-12 bg-white rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center",
                                                data.status ? "translate-x-[calc(100%*2.8)]" : "translate-x-0"
                                            )}>
                                                {data.status ? <CheckCircle2 size={16} className="text-emerald-500" /> : <X size={16} className="text-slate-300" />}
                                            </div>
                                            <span className={cn(
                                                "absolute px-6 text-[10px] font-black uppercase tracking-widest transition-all",
                                                data.status ? "text-white" : "text-slate-400"
                                            )}>
                                                {data.status ? 'Online' : 'Offline'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Secure API Key (Optional)</label>
                                    <input 
                                        type="password"
                                        className="w-full bg-slate-50 border-none rounded-2xl px-8 py-5 text-sm font-bold focus:ring-2 focus:ring-emerald-100 transition-all font-mono"
                                        placeholder="************************"
                                        value={data.api_key}
                                        onChange={e => setData('api_key', e.target.value)}
                                    />
                                </div>

                                <button 
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95 disabled:opacity-50 mt-4"
                                >
                                    {editingCourier ? 'Override Configuration' : 'Initialize Connector'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
