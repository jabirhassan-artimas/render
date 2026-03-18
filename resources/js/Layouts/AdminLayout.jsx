import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    Package, 
    Tags, 
    Star, 
    ShoppingCart, 
    Users, 
    Ticket, 
    Image as ImageIcon, 
    FileText, 
    ConciergeBell, 
    MessageSquare, 
    Settings, 
    LogOut,
    Menu,
    ChevronLeft,
    ChevronRight,
    Bell,
    Search,
    User,
    Truck,
    BarChart3
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const SidebarLink = ({ href, icon: Icon, children, active, collapsed }) => (
    <Link
        href={href}
        className={cn(
            "flex items-center py-3 px-4 transition-all duration-200 group relative",
            active 
                ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600" 
                : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
        )}
    >
        <div className={cn("flex items-center", collapsed ? "justify-center w-full" : "")}>
            <Icon size={20} className={cn("shrink-0", !collapsed && "mr-3")} />
            {!collapsed && <span className="font-medium whitespace-nowrap overflow-hidden transition-all">{children}</span>}
        </div>
        {collapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                {children}
            </div>
        )}
    </Link>
);

export default function AdminLayout({ children }) {
    const { auth, settings } = usePage().props;
    const { url } = usePage();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('admin-sidebar-collapsed');
        if (saved) setCollapsed(saved === 'true');
    }, []);

    const toggleSidebar = () => {
        const newState = !collapsed;
        setCollapsed(newState);
        localStorage.setItem('admin-sidebar-collapsed', String(newState));
    };

    const menuItems = [
        { label: 'Dashboard', icon: LayoutDashboard, href: route('admin.dashboard') },
        { label: 'Reports', icon: BarChart3, href: route('admin.reports.index') },
        { label: 'Products', icon: Package, href: route('admin.products.index') },
        { label: 'Categories', icon: Tags, href: route('admin.categories.index') },
        { label: 'Brands', icon: Star, href: route('admin.brands.index') },
        { label: 'Orders', icon: ShoppingCart, href: route('admin.orders.index') },
        { label: 'Customers', icon: Users, href: route('admin.customers.index') },
        { label: 'Couriers', icon: Truck, href: route('admin.couriers.index') },
        { label: 'Coupons', icon: Ticket, href: route('admin.coupons.index') },
        { label: 'Banners', icon: ImageIcon, href: route('admin.banners.index') },
        { label: 'CMS Pages', icon: FileText, href: route('admin.pages.index') },
        { label: 'Services', icon: ConciergeBell, href: route('admin.services.index') },
        { label: 'Testimonials', icon: MessageSquare, href: route('admin.testimonials.index') },
        { label: 'Settings', icon: Settings, href: route('admin.settings.index') },
    ];

    return (
        <div className="min-h-screen bg-[#F4F7FE] flex text-slate-900 font-sans">
            {/* Sidebar */}
            <aside 
                className={cn(
                    "fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200 transition-all duration-300 flex flex-col shadow-sm",
                    collapsed ? "w-20" : "w-64",
                    mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                <div className="h-20 flex items-center px-6 border-b border-slate-50 overflow-hidden shrink-0">
                    <Link href="/" className="flex items-center gap-3 w-full">
                        {settings.site_logo ? (
                            <img 
                                src={`/storage/${settings.site_logo}`} 
                                className={cn(
                                    "transition-all duration-300 object-contain",
                                    collapsed ? "h-8 w-8 rounded-lg" : "h-10 w-auto max-w-[180px]"
                                )} 
                                alt="Logo" 
                            />
                        ) : (
                            <>
                                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-100">
                                    <ShoppingCart size={20} />
                                </div>
                                {!collapsed && settings.site_title && (
                                    <span className="font-bold text-xl tracking-tight text-blue-600 whitespace-nowrap">
                                        {settings.site_title}
                                    </span>
                                )}
                            </>
                        )}
                    </Link>
                </div>

                <nav className="flex-1 py-4 overflow-y-auto no-scrollbar">
                    {menuItems.map((item) => (
                        <SidebarLink 
                            key={item.label}
                            href={item.href}
                            icon={item.icon}
                            active={url?.startsWith(item.href)}
                            collapsed={collapsed}
                        >
                            {item.label}
                        </SidebarLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-50 shrink-0">
                    <Link 
                        href={route('logout')} 
                        method="post" 
                        as="button"
                        className={cn(
                            "flex items-center w-full py-3 px-4 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all group relative",
                            collapsed ? "justify-center" : ""
                        )}
                    >
                        <LogOut size={20} className={cn("shrink-0", !collapsed && "mr-3")} />
                        {!collapsed && <span className="font-medium">Logout</span>}
                        {collapsed && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-red-600 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                                Logout
                            </div>
                        )}
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className={cn(
                "flex-1 flex flex-col transition-all duration-300 min-w-0",
                collapsed ? "lg:ml-20" : "lg:ml-64"
            )}>
                {/* Header */}
                <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={toggleSidebar}
                            className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors lg:flex hidden"
                        >
                            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                        </button>
                        <button 
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors lg:hidden"
                        >
                            <Menu size={20} />
                        </button>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative group lg:flex hidden items-center border border-slate-200 rounded-xl px-3 py-1.5 focus-within:border-blue-500 transition-all bg-slate-50 focus-within:bg-white focus-within:shadow-sm">
                            <Search size={18} className="text-slate-400 mr-2" />
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                className="bg-transparent border-none focus:ring-0 p-0 text-sm font-medium placeholder:text-slate-400 w-48"
                            />
                        </div>

                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
                        </button>

                        <div className="h-8 w-px bg-slate-200"></div>

                        <div className="flex items-center gap-3 pl-2">
                            <div className="text-right lg:block hidden">
                                <p className="text-sm font-bold text-slate-700 leading-tight truncate max-w-[150px]">{auth.user.name}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{auth.user.role}</p>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">
                                {auth.user.name.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Body */}
                <main className="flex-1 p-6 lg:p-10 max-w-[1600px] mx-auto w-full">
                    {children}
                </main>
            </div>
            
            {/* Mobile Overlay */}
            {mobileOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setMobileOpen(false)}
                ></div>
            )}
        </div>
    );
}
