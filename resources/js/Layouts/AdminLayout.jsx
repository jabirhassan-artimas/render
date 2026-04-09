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
    BarChart3,
    MapPin,
    Mail,
    Sparkles
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
            "flex items-center py-3 px-4 transition-all duration-300 group relative rounded-2xl mx-3 mb-1",
            active
                ? "bg-dark text-primary shadow-lg shadow-dark/10"
                : "text-dark/50 hover:bg-dark/5 hover:text-dark"
        )}
    >
        <div className={cn("flex items-center", collapsed ? "justify-center w-full" : "")}>
            <Icon size={20} className={cn("shrink-0", !collapsed && "mr-3")} />
            {!collapsed && <span className="font-black tracking-tight whitespace-nowrap overflow-hidden transition-all">{children}</span>}
        </div>
        {collapsed && (
            <div className="absolute left-full ml-2 px-3 py-1.5 bg-dark text-primary text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-2xl">
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

    const menuGroups = [
        {
            title: 'Overview',
            items: [
                { label: 'Dashboard', icon: LayoutDashboard, href: route('admin.dashboard') },
                { label: 'Analytics', icon: BarChart3, href: route('admin.reports.index') },
            ]
        },
        {
            title: 'Store',
            items: [
                { label: 'Products', icon: Package, href: route('admin.products.index') },
                { label: 'Categories', icon: Tags, href: route('admin.categories.index') },
                { label: 'Brands', icon: Star, href: route('admin.brands.index') },
                { label: 'Districts', icon: MapPin, href: route('admin.districts.index') },
            ]
        },
        {
            title: 'Orders',
            items: [
                { label: 'Bookings', icon: ShoppingCart, href: route('admin.orders.index') },
                { label: 'Customers', icon: Users, href: route('admin.customers.index') },
                { label: 'Shipping', icon: Truck, href: route('admin.couriers.index') },
                { label: 'Coupons', icon: Ticket, href: route('admin.coupons.index') },
            ]
        },
        {
            title: 'Content',
            items: [
                { label: 'Banners', icon: ImageIcon, href: route('admin.banners.index') },
                { label: 'Campaigns', icon: Sparkles, href: route('admin.campaign-items.index') },
                { label: 'Stories', icon: FileText, href: route('admin.stories.index') },
                { label: 'Newsletter', icon: Mail, href: route('admin.newsletter.index') },
            ]
        },
        {
            title: 'Config',
            items: [
                { label: 'CMS Pages', icon: FileText, href: route('admin.pages.index') },
                { label: 'Services', icon: ConciergeBell, href: route('admin.services.index') },
                { label: 'Reviews', icon: MessageSquare, href: route('admin.testimonials.index') },
                { label: 'Settings', icon: Settings, href: route('admin.settings.index') },
            ]
        }
    ];

    return (
        <div className="min-h-screen flex text-dark font-sans selection:bg-primary/30 selection:text-dark relative overflow-x-hidden"
            style={{ background: 'linear-gradient(150deg, #F5F0E2 0%, #EDE5C8 35%, #DFC98A 70%, #C9A84C 100%) fixed' }}>
            {/* Ambient Background Decorative Elements */}
            <div className="fixed top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none blur-[100px]"
                style={{ background: 'radial-gradient(circle, #C9A84C, transparent 70%)' }} />
            <div className="fixed bottom-[-100px] right-[-100px] w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none blur-[120px]"
                style={{ background: 'radial-gradient(circle, #1B5E20, transparent 70%)' }} />

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 bg-heritage-paper/95 backdrop-blur-2xl border-r border-dark/5 transition-all duration-300 flex flex-col shadow-2xl overflow-visible",
                    collapsed ? "w-16" : "w-60",
                    mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                {/* Collapse Toggle Switch on Sidebar Border */}
                <button 
                    onClick={toggleSidebar}
                    className="absolute -right-3 top-24 w-6 h-6 bg-dark text-primary rounded-full hidden lg:flex items-center justify-center shadow-xl z-50 hover:scale-110 transition-all border border-primary/20"
                >
                    {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
                </button>

                <div className="h-16 flex items-center px-4 border-b border-dark/5 overflow-hidden shrink-0">
                    <Link href="/" className="flex items-center gap-2.5 w-full">
                        {settings.site_logo ? (
                            <img
                                src={`/uploads/${settings.site_logo}`}
                                className={cn(
                                    "transition-all duration-300 object-contain",
                                    collapsed ? "h-6 w-6 rounded-lg mx-auto" : "h-7 w-auto max-w-[120px]"
                                )}
                                alt="Logo"
                            />
                        ) : (
                            <>
                                <div className="w-8 h-8 bg-dark rounded-lg flex items-center justify-center text-primary shrink-0 shadow-lg shadow-dark/10">
                                    <Sparkles size={16} />
                                </div>
                                {!collapsed && settings.site_title && (
                                    <span className="font-black text-base tracking-tighter text-dark whitespace-nowrap">
                                        {settings.site_title}
                                    </span>
                                )}
                            </>
                        )}
                    </Link>
                </div>

                <nav className="flex-1 py-4 overflow-y-auto no-scrollbar scroll-smooth">
                    {menuGroups.map((group, idx) => (
                        <div key={group.title} className={cn("mb-5", idx === 0 ? "mt-1" : "")}>
                            {!collapsed && (
                                <p className="px-6 mb-2 text-[7px] font-black uppercase tracking-[0.3em] text-dark/30">
                                    {group.title}
                                </p>
                            )}
                            {group.items.map((item) => (
                                <SidebarLink
                                    key={item.label}
                                    href={item.href}
                                    icon={item.icon}
                                    active={url === item.href || url?.startsWith(item.href + '/')}
                                    collapsed={collapsed}
                                >
                                    {item.label}
                                </SidebarLink>
                            ))}
                        </div>
                    ))}
                </nav>

                <div className="p-3 border-t border-dark/5 shrink-0">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className={cn(
                            "flex items-center w-full py-2.5 px-4 text-dark/40 hover:text-accent-red hover:bg-accent-red/5 rounded-xl transition-all group relative",
                            collapsed ? "justify-center" : ""
                        )}
                    >
                        <LogOut size={18} className={cn("shrink-0", !collapsed && "mr-3")} />
                        {!collapsed && <span className="text-[11px] font-black tracking-widest uppercase">Logout</span>}
                        {collapsed && (
                            <div className="absolute left-full ml-2 px-3 py-1.5 bg-accent-red text-white text-[9px] font-black uppercase tracking-widest rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-2xl">
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
                <header className="h-20 bg-white/40 backdrop-blur-xl border-b border-dark/5 px-8 flex items-center justify-between sticky top-0 z-40 transition-colors">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleSidebar}
                            className="p-3 text-dark/40 hover:bg-dark/5 hover:text-dark rounded-2xl transition-all lg:flex hidden shadow-minimal"
                        >
                            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                        </button>
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="p-3 text-dark/40 hover:bg-dark/5 hover:text-dark rounded-2xl transition-all lg:hidden shadow-minimal"
                        >
                            <Menu size={20} />
                        </button>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="relative group lg:flex hidden items-center border border-dark/5 rounded-[1.25rem] px-5 py-2.5 transition-all bg-dark/5 focus-within:bg-white focus-within:shadow-2xl focus-within:border-primary">
                            <Search size={18} className="text-dark/20 mr-3" />
                            <input
                                type="text"
                                placeholder="Search everything..."
                                className="bg-transparent border-none focus:ring-0 p-0 text-sm font-black tracking-tight placeholder:text-dark/20 w-64"
                            />
                        </div>

                        <button className="p-3 text-dark/20 hover:text-dark hover:bg-dark/5 rounded-2xl transition-all relative">
                            <Bell size={20} />
                            <span className="absolute top-3 right-3 w-2 h-2 bg-accent-red rounded-full"></span>
                        </button>

                        <div className="h-8 w-px bg-dark/10"></div>

                        <div className="flex items-center gap-4 pl-2">
                            <div className="text-right lg:block hidden">
                                <p className="text-sm font-black text-dark leading-tight truncate max-w-[150px]">{auth.user.name}</p>
                                <p className="text-[10px] font-black text-dark/30 uppercase tracking-[0.2em]">{auth.user.role}</p>
                            </div>
                            <div className="w-12 h-12 bg-dark rounded-2xl flex items-center justify-center text-primary font-black text-xl shadow-xl shadow-dark/10">
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
