import React from 'react';
import { Head } from '@inertiajs/react';

export default function Invoice({ order }) {
    const printInvoice = () => {
        window.print();
    };

    return (
        <div className="bg-slate-50 min-h-screen p-4 md:p-12 font-sans text-slate-900">
            <Head title={`Invoice #${order.order_number}`} />
            
            <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-[2rem] overflow-hidden border border-slate-100 print:shadow-none print:border-none print:rounded-none">
                {/* Invoice Header */}
                <div className="bg-slate-900 text-white p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full -mr-32 -mt-32"></div>
                    <div className="relative">
                        <h1 className="text-4xl font-black tracking-tighter mb-2">INVOICE</h1>
                        <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Tax Compliant Document</p>
                    </div>
                    <div className="text-right relative">
                        <div className="text-2xl font-black mb-1">Modern Shop</div>
                        <p className="text-slate-400 text-xs font-medium">123 Commerce Avenue, Digital City</p>
                        <p className="text-slate-400 text-xs font-medium">VAT: 987654321</p>
                    </div>
                </div>

                {/* Meta Info */}
                <div className="p-12 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-slate-50">
                    <div>
                        <h3 className="text-[10px] font-black uppercase text-slate-300 tracking-widest mb-4">Billed To</h3>
                        <p className="font-black text-lg text-slate-800">{order.user?.name || order.name}</p>
                        <p className="text-slate-500 text-sm font-medium mt-1">{order.user?.email || order.email}</p>
                        <p className="text-slate-500 text-sm font-medium">{order.phone || order.user?.phone}</p>
                    </div>
                    <div>
                        <h3 className="text-[10px] font-black uppercase text-slate-300 tracking-widest mb-4">Ship Destination</h3>
                        <p className="text-slate-700 text-sm font-bold leading-relaxed italic">
                            {order.shipping_address || order.address}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-[10px] font-black uppercase text-slate-300 tracking-widest mb-4">Invoice Meta</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-400 font-bold">Number:</span>
                                <span className="text-slate-800 font-black">#{order.order_number}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-400 font-bold">Date:</span>
                                <span className="text-slate-800 font-black">{new Date(order.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-400 font-bold">Courier:</span>
                                <span className="text-slate-800 font-black uppercase">{order.courier?.name || 'Standard'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Items Table */}
                <div className="p-12">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="text-left py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Product Insight</th>
                                <th className="text-center py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Pricing</th>
                                <th className="text-center py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Qty</th>
                                <th className="text-right py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Segment Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {order.items?.map((item) => (
                                <tr key={item.id}>
                                    <td className="py-8">
                                        <p className="font-black text-slate-800 text-sm">{item.product_name || item.product?.name}</p>
                                        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">SKU: {item.product?.sku || 'N/A'}</p>
                                    </td>
                                    <td className="py-8 text-center text-sm font-bold text-slate-600">৳{parseFloat(item.price).toLocaleString()}</td>
                                    <td className="py-8 text-center text-sm font-bold text-slate-600">{item.qty}</td>
                                    <td className="py-8 text-right text-sm font-black text-slate-900">৳{(item.price * item.qty).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Total Summary */}
                <div className="bg-slate-50/50 p-12 flex justify-end">
                    <div className="w-full md:w-80 space-y-4">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                            <span>Manifest Subtotal</span>
                            <span className="text-slate-700">৳{parseFloat(order.subtotal || 0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                            <span>Logistics Fee</span>
                            <span className="text-slate-700">৳{parseFloat(order.shipping_cost || 0).toLocaleString()}</span>
                        </div>
                        {order.discount_on_advance > 0 && (
                            <div className="flex justify-between items-center text-xs font-bold text-emerald-500">
                                <span>Advance Discount</span>
                                <span>-৳{parseFloat(order.discount_on_advance).toLocaleString()}</span>
                            </div>
                        )}
                        <div className="pt-6 border-t border-slate-200 flex justify-between items-end">
                            <span className="text-xl font-black text-slate-800 tracking-tight">Net Amount</span>
                            <div className="text-right">
                                <p className="text-3xl font-black text-slate-900 tracking-tighter">৳{parseFloat(order.total).toLocaleString()}</p>
                                <p className="text-[10px] font-black uppercase text-blue-600 tracking-widest mt-1">Paid via {order.payment_method}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Notes */}
                <div className="p-12 text-center border-t border-slate-50">
                    <p className="text-xs font-bold text-slate-400 leading-relaxed italic">
                        Thank you for your patronage. This is a computer generated document and requires no physical signature.
                        For any disputes, please contact support@modernshop.com
                    </p>
                </div>
            </div>

            {/* Print FAB */}
            <button 
                onClick={printInvoice}
                className="fixed bottom-12 right-12 bg-slate-900 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all print:hidden"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            </button>

            <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                    body { background: white !important; padding: 0 !important; margin: 0 !important; }
                    .print\\:hidden { display: none !important; }
                    .print\\:shadow-none { shadow: none !important; box-shadow: none !important; }
                    .print\\:border-none { border: none !important; }
                    .print\\:rounded-none { border-radius: 0 !important; }
                }
            ` }} />
        </div>
    );
}
