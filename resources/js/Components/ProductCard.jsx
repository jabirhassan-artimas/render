import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Heart, ArrowUpRight } from 'lucide-react';

export default function ProductCard({ product }) {
    const imageUrl = product.thumbnail
        ? (product.thumbnail.startsWith('http') ? product.thumbnail : `/uploads/${product.thumbnail.replace(/^\//, '')}`)
        : 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&q=80';

    const discountPercentage = product.discount_percentage || (product.old_price ? Math.round(((product.old_price - product.price) / product.old_price) * 100) : 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="group bg-white overflow-hidden rounded-xl border border-dark/5 hover:border-primary/20 transition-all duration-500 shadow-minimal hover:shadow-luxury relative flex flex-col h-full"
        >
            {/* Ultra-Compact Image Container */}
            <div className="relative aspect-square overflow-hidden bg-heritage-cream/10">
                <Link href={route('product.details', product.slug)} className="block w-full h-full">
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                </Link>

                {/* Badges - Smaller */}
                <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                    {discountPercentage > 0 && (
                        <div className="bg-primary text-dark px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider">
                            -{discountPercentage}%
                        </div>
                    )}
                </div>

                {/* Quick Actions - Shrunk */}
                <div className="absolute top-2 right-2 flex flex-col gap-1.5 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 z-10">
                    <button className="w-7 h-7 rounded-lg bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-dark hover:text-primary transition-colors">
                        <Heart size={14} />
                    </button>
                    <Link href={route('product.details', product.slug)} className="w-7 h-7 rounded-lg bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-dark hover:text-primary transition-colors">
                        <ArrowUpRight size={14} />
                    </Link>
                </div>
            </div>

            {/* Content Area - Tighter padding */}
            <div className="p-3 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-[8px] font-black text-primary uppercase tracking-[0.2em]">
                        {product.category?.name || 'কালেকশন'}
                    </span>
                    <div className="flex items-center gap-0.5">
                        <Star size={8} className="fill-primary text-primary" />
                        <span className="text-[9px] font-bold text-dark/30">4.9</span>
                    </div>
                </div>

                <Link href={route('product.details', product.slug)} className="block mb-3 group-hover:text-primary transition-colors">
                    <h3 className="font-black text-dark text-[13px] leading-tight line-clamp-1 tracking-tight">
                        {product.name}
                    </h3>
                </Link>

                <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                        {product.old_price && (
                            <span className="text-[9px] text-dark/20 line-through font-bold">
                                ৳{parseFloat(product.old_price).toLocaleString()}
                            </span>
                        )}
                        <span className="text-sm font-black text-dark tracking-tighter">
                            ৳{parseFloat(product.price).toLocaleString()}
                        </span>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 rounded-lg bg-dark text-primary flex items-center justify-center hover:bg-primary hover:text-dark transition-all duration-300 shadow-sm"
                    >
                        <ShoppingBag size={14} />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
