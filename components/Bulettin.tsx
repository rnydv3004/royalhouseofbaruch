'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import { Bell, ArrowRight, Scroll, Crown, Feather, FileText, HeartHandshake, Loader2, AlertCircle, Sparkles } from "lucide-react";
import { montserrat, lato, cinzel, pinyon } from "@/app/fonts"; 
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// --- CONFIGURATION ---
const CATEGORIES = [
    { id: 'Announcement', label: 'Decrees', icon: Scroll },
    { id: 'Honours', label: 'Honours', icon: Crown },
    { id: 'Statements', label: 'Statements', icon: FileText },
    { id: 'Trust', label: 'Trust', icon: HeartHandshake },
];

export const RoyalBulletin = () => {
    // --- STATE ---
    const [activeTab, setActiveTab] = useState('Announcement');
    const [items, setItems] = useState<any[]>([]);
    
    // Pagination & Loading State
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false); // Initial tab load
    const [loadingMore, setLoadingMore] = useState(false); // Infinite scroll
    const [error, setError] = useState<string | null>(null);

    // --- INFINITE SCROLL OBSERVER ---
    const observer = useRef<IntersectionObserver | null>(null);
    
    const lastElementRef = useCallback((node: HTMLDivElement) => {
        if (loading || loadingMore) return;
        if (observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        
        if (node) observer.current.observe(node);
    }, [loading, loadingMore, hasMore]);


    // --- API FETCH LOGIC ---
    const fetchUpdates = async (currentPage: number, category: string, isLoadMore: boolean) => {
        try {
            if (isLoadMore) setLoadingMore(true);
            else setLoading(true);
            setError(null);

            // CALL API
            const res = await fetch('/api/royal-updates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    type: category, 
                    page: currentPage, 
                    limit: 6 
                })
            });

            if (!res.ok) throw new Error("Failed to fetch royal updates");

            const result = await res.json();
            const newItems = result.data || [];

            if (newItems.length === 0) {
                setHasMore(false);
            } else {
                setItems(prev => isLoadMore ? [...prev, ...newItems] : newItems);
                if (newItems.length < 6) setHasMore(false);
            }

        } catch (err) {
            console.error("Bulletin Error:", err);
            setError("The archives are temporarily closed.");
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    // --- EFFECT: TAB CHANGE (RESET & FETCH) ---
    useEffect(() => {
        setItems([]);
        setPage(1);
        setHasMore(true);
        fetchUpdates(1, activeTab, false);
    }, [activeTab]);

    // --- EFFECT: SCROLL (APPEND) ---
    useEffect(() => {
        if (page > 1) {
            fetchUpdates(page, activeTab, true);
        }
    }, [page]);


    // --- RENDER ---
    return (
        <section className="bg-[#051124] relative z-20 py-16 overflow-hidden border-y border-[#D4AF37]/20">
            
            {/* Custom Scrollbar Styles for this section */}
            <style jsx global>{`
                .royal-scroll::-webkit-scrollbar {
                    width: 6px;
                }
                .royal-scroll::-webkit-scrollbar-track {
                    background: rgba(11, 36, 71, 0.4);
                    border-radius: 4px;
                }
                .royal-scroll::-webkit-scrollbar-thumb {
                    background: rgba(212, 175, 55, 0.4); 
                    border-radius: 4px;
                }
                .royal-scroll::-webkit-scrollbar-thumb:hover {
                    background: rgba(212, 175, 55, 0.8); 
                }
            `}</style>

            {/* Background Texture (Subtle Pattern) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
            </div>

            <div className="container mx-auto px-4 lg:px-16 relative z-10">

                {/* --- 1. HEADER (Static) --- */}
                <div className="text-center mb-10">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex justify-center items-center gap-4 mb-3">
                            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
                            <Feather className="text-[#D4AF37] w-6 h-6" />
                            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
                        </div>
                        <h2 className={`${cinzel.className} text-3xl md:text-5xl text-white font-bold tracking-tight mb-2 drop-shadow-lg`}>
                            Royal <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]">Gazette</span>
                        </h2>
                        <p className={`${pinyon.className} text-[#D4AF37]/80 text-xl md:text-2xl`}>
                            Chronicles of the Realm
                        </p>
                    </motion.div>
                </div>

                {/* --- 2. MAGIC TABS (Static) --- */}
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                    {CATEGORIES.map((cat) => {
                        const isActive = activeTab === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className="relative px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300"
                            >
                                {/* Animated Background Slider */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-[#D4AF37] rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                
                                {/* Text Content */}
                                <span className={`relative z-10 flex items-center gap-2 ${isActive ? 'text-[#051124]' : 'text-[#D4AF37]/60 hover:text-[#D4AF37]'}`}>
                                    <cat.icon size={14} />
                                    <span className={cinzel.className}>{cat.label}</span>
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* --- 3. THE SCROLLABLE GRID CONTAINER --- */}
                {/* This container has a fixed height (h-[600px] on desktop) 
                    and overflow-y-auto to create the internal scroll. 
                */}
                <div className="max-w-6xl mx-auto h-[500px] md:h-[600px] overflow-y-auto royal-scroll pr-2 md:pr-4">
                    
                    {/* Error Message */}
                    {error && (
                        <div className="flex items-center justify-center p-6 bg-red-900/10 border border-red-500/30 text-red-200 rounded-lg">
                            <AlertCircle className="mr-3" /> {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pb-10">
                        <AnimatePresence mode="popLayout">
                            {items && items.map((item, index) => {
                                const isLastElement = items.length === index + 1;

                                return (
                                    <motion.div
                                        key={`${item.id}-${index}`} // Unique key
                                        ref={isLastElement ? lastElementRef : null}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }} // Stagger effect
                                        className="group relative"
                                    >
                                        {/* CARD CONTAINER */}
                                        <div className="h-full bg-[#0B2447]/60 backdrop-blur-md border border-[#D4AF37]/20 p-6 md:p-8 rounded-xl overflow-hidden hover:border-[#D4AF37]/60 transition-all duration-500 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] hover:-translate-y-1 cursor-default">
                                            
                                            {/* Glow Gradient on Hover */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                            {/* HEADER: Date & Badge */}
                                            <div className="relative flex justify-between items-start mb-6">
                                                <div className="flex flex-col">
                                                    <span className={`${montserrat.className} text-[10px] font-bold text-[#D4AF37]/60 uppercase tracking-[0.2em] mb-1`}>
                                                        {item.type}
                                                    </span>
                                                    <span className={`${lato.className} text-slate-400 text-sm italic`}>
                                                        {item.date}
                                                    </span>
                                                </div>
                                                
                                                {/* "NEW" WAX SEAL BADGE */}
                                                {item.isNew && (
                                                    <div className="flex items-center gap-1 bg-red-900/30 border border-red-500/30 px-3 py-1 rounded-full animate-pulse">
                                                        <Sparkles size={10} className="text-red-400" />
                                                        <span className={`${montserrat.className} text-[9px] font-bold text-red-300 uppercase tracking-widest`}>New</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* BODY */}
                                            <div className="relative z-10">
                                                <h3 className={`${cinzel.className} text-xl text-white mb-4 leading-snug group-hover:text-[#D4AF37] transition-colors duration-300`}>
                                                    {item.title}
                                                </h3>
                                                
                                                {item.content && (
                                                    <p className={`${lato.className} text-slate-400 leading-relaxed mb-6 line-clamp-3 text-sm group-hover:text-slate-300`}>
                                                        {item.content}
                                                    </p>
                                                )}

                                                {/* ACTION */}
                                                <div className="pt-6 border-t border-[#D4AF37]/10 flex justify-end">
                                                    {item.link ? (
                                                        <Link href={item.link} className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] group/btn">
                                                            <span>{item.actionText || 'Read Full Decree'}</span>
                                                            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                                        </Link>
                                                    ) : (
                                                        <div className="h-px w-8 bg-[#D4AF37]/30"></div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* DECORATIVE CORNER */}
                                            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-3xl"></div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {/* --- SCROLLABLE AREA LOADERS --- */}
                    
                    {/* Initial Skeleton (Inside scroll area) */}
                    {loading && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-64 bg-[#0B2447]/40 border border-[#D4AF37]/10 rounded-xl p-8 animate-pulse">
                                    <div className="flex justify-between mb-6">
                                        <div className="h-3 w-20 bg-[#D4AF37]/10 rounded"></div>
                                        <div className="h-3 w-12 bg-[#D4AF37]/10 rounded"></div>
                                    </div>
                                    <div className="h-6 w-3/4 bg-[#D4AF37]/10 rounded mb-4"></div>
                                    <div className="h-3 w-full bg-[#D4AF37]/5 rounded mb-2"></div>
                                    <div className="h-3 w-2/3 bg-[#D4AF37]/5 rounded"></div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Load More Spinner */}
                    {loadingMore && (
                        <div className="flex justify-center py-6">
                            <div className="flex flex-col items-center gap-2">
                                <Loader2 className="animate-spin text-[#D4AF37] w-6 h-6" />
                                <span className={`${cinzel.className} text-[#D4AF37] text-[10px] tracking-widest`}>Fetching Archives...</span>
                            </div>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && items.length === 0 && !error && (
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="text-center py-20 border border-dashed border-[#D4AF37]/20 rounded-xl bg-[#0B2447]/30"
                        >
                            <Bell className="w-12 h-12 text-[#D4AF37]/20 mx-auto mb-4" />
                            <h3 className={`${cinzel.className} text-white text-xl`}>No Updates Found</h3>
                            <p className={`${lato.className} text-slate-500 mt-2`}>The Royal Scribe has nothing to report for this category.</p>
                        </motion.div>
                    )}

                    {/* End of List */}
                    {!hasMore && !loading && items.length > 0 && (
                        <div className="text-center py-10 opacity-50">
                            <div className="flex items-center justify-center gap-4 mb-2">
                                <div className="h-px w-12 bg-[#D4AF37]"></div>
                                <Crown className="w-3 h-3 text-[#D4AF37]" />
                                <div className="h-px w-12 bg-[#D4AF37]"></div>
                            </div>
                            <p className={`${cinzel.className} text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase`}>End of Bulletin</p>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
};