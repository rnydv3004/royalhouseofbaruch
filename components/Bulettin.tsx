'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import { Bell, ArrowRight, Scroll, Crown, Feather, FileText, HeartHandshake, Loader2, AlertCircle, Sparkles } from "lucide-react";
import { montserrat, lato, cinzel, pinyon } from "@/app/fonts";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export const RoyalBulletin = () => {
    // --- STATE ---
    const [items, setItems] = useState<any[]>([]);

    // Pagination & Loading State
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false); // Initial load
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
    const fetchUpdates = async (currentPage: number, isLoadMore: boolean) => {
        try {
            if (isLoadMore) setLoadingMore(true);
            else setLoading(true);
            setError(null);

            // CALL API - Always fetch 'All'
            const res = await fetch('/api/royal-updates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'All',
                    page: currentPage,
                    limit: 8 // Slightly larger batch for a single feed
                })
            });

            if (!res.ok) throw new Error("Failed to fetch royal updates");

            const result = await res.json();
            const newItems = result.data || [];

            if (newItems.length === 0) {
                setHasMore(false);
            } else {
                setItems(prev => isLoadMore ? [...prev, ...newItems] : newItems);
                if (newItems.length < 8) setHasMore(false);
            }

        } catch (err) {
            console.error("Bulletin Error:", err);
            setError("The royal archives are temporarily unavailable.");
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    // --- EFFECT: INITIAL LOAD ---
    useEffect(() => {
        // Initial fetch
        setItems([]);
        setPage(1);
        setHasMore(true);
        fetchUpdates(1, false);
    }, []);

    // --- EFFECT: SCROLL (APPEND) ---
    useEffect(() => {
        if (page > 1) {
            fetchUpdates(page, true);
        }
    }, [page]);


    // --- ICONS MAPPING ---
    const getIcon = (type: string) => {
        switch (type) {
            case 'Announcement': return <Scroll size={16} />;
            case 'Honours': return <Crown size={16} />;
            case 'Statements': return <Feather size={16} />;
            case 'Trust': return <HeartHandshake size={16} />;
            default: return <FileText size={16} />;
        }
    };


    // --- RENDER ---
    return (
        <section className="bg-[#051124] relative z-20 py-24 overflow-hidden border-y border-[#D4AF37]/20">

            {/* Custom Scrollbar Styles */}
            <style jsx global>{`
                .royal-scroll::-webkit-scrollbar {
                    width: 4px;
                }
                .royal-scroll::-webkit-scrollbar-track {
                    background: rgba(11, 36, 71, 0.2);
                }
                .royal-scroll::-webkit-scrollbar-thumb {
                    background: rgba(212, 175, 55, 0.3); 
                    border-radius: 2px;
                }
                .royal-scroll::-webkit-scrollbar-thumb:hover {
                    background: rgba(212, 175, 55, 0.8); 
                }
            `}</style>

            {/* Background Texture - Royal Pattern */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M40 0l40 40-40 40L0 40z' opacity='0.5'/%3E%3Cpath d='M40 10l30 30-30 30L10 40z' opacity='0.3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
            </div>

            <div className="container mx-auto px-4 lg:px-16 relative z-10">

                {/* --- 1. HEADER (Redesigned) --- */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex justify-center items-center gap-6 mb-4">
                            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50"></div>
                            <Crown className="text-[#D4AF37] w-8 h-8 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" strokeWidth={1} />
                            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50"></div>
                        </div>

                        <h2 className={`${cinzel.className} text-4xl md:text-6xl text-white font-normal uppercase tracking-[0.1em] mb-4`}>
                            House <span className="text-[#D4AF37]">Announcements</span>
                        </h2>

                        <p className={`${montserrat.className} text-[#D4AF37]/70 text-sm md:text-base font-medium tracking-[0.2em] uppercase`}>
                            Official Communications of the Royal House of Bharuch
                        </p>
                    </motion.div>
                </div>


                {/* --- 2. THE FEED --- */}
                {/* Fixed height container for internal scrolling */}
                <div className="max-w-6xl mx-auto h-[600px] overflow-y-auto royal-scroll pr-4">

                    {/* Error Message */}
                    {error && (
                        <div className="flex items-center justify-center p-6 bg-red-900/10 border border-red-500/30 text-red-200 rounded-sm mb-8">
                            <AlertCircle className="mr-3" /> {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                        <AnimatePresence mode="popLayout">
                            {items && items.map((item, index) => {
                                const isLastElement = items.length === index + 1;

                                return (
                                    <motion.div
                                        key={`${item.id}-${index}`}
                                        ref={isLastElement ? lastElementRef : null}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                        className="relative group h-full"
                                    >
                                        {/* CARD */}
                                        <div className="bg-[#0B2447]/40 backdrop-blur-sm border border-[#D4AF37]/10 p-6 rounded-sm hover:border-[#D4AF37]/40 transition-all duration-500 hover:bg-[#0B2447]/60 group relative overflow-hidden h-full flex flex-col">

                                            {/* Decorative Corner */}
                                            <div className="absolute top-0 right-0 p-2 opacity-50">
                                                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                                                    <path d="M0 0H20V20" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.3" />
                                                </svg>
                                            </div>

                                            <div className="flex flex-col h-full">
                                                {/* Header: Type & Date */}
                                                <div className="flex justify-between items-start mb-4 border-b border-[#D4AF37]/10 pb-3">
                                                    <div className="flex items-center gap-2 text-[#D4AF37]/80">
                                                        {getIcon(item.type)}
                                                        <span className={`${montserrat.className} text-[10px] uppercase tracking-widest font-bold`}>
                                                            {item.type}
                                                        </span>
                                                    </div>
                                                    <span className={`${cinzel.className} text-white/40 text-xs`}>
                                                        {item.date}
                                                    </span>
                                                </div>

                                                {/* Title */}
                                                <h3 className={`${cinzel.className} text-xl text-white mb-3 group-hover:text-[#D4AF37] transition-colors leading-snug`}>
                                                    {item.title}
                                                </h3>

                                                {/* Content Preeview */}
                                                {item.content && (
                                                    <p className={`${lato.className} text-slate-400 font-light leading-relaxed text-sm mb-6 line-clamp-3 grow`}>
                                                        {item.content}
                                                    </p>
                                                )}

                                                {/* Footer: Action & New Badge */}
                                                <div className="mt-auto flex justify-between items-center pt-4 border-t border-[#D4AF37]/5">
                                                    {item.link ? (
                                                        <Link href={item.link} className="inline-flex items-center gap-2 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em] group/btn hover:text-white transition-colors">
                                                            <span>{item.actionText || 'Read'}</span>
                                                            <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                                                        </Link>
                                                    ) : (
                                                        <span></span>
                                                    )}

                                                    {item.isNew && (
                                                        <span className="bg-red-900/30 text-red-300 text-[9px] font-bold px-2 py-0.5 rounded border border-red-500/20 uppercase tracking-wider animate-pulse">
                                                            New
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {/* --- LOADERS --- */}

                    {/* Initial Skeleton */}
                    {loading && items.length === 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="bg-[#0B2447]/20 border border-[#D4AF37]/5 p-8 rounded-sm animate-pulse h-64"></div>
                            ))}
                        </div>
                    )}


                    {/* Load More Spinner */}
                    {loadingMore && (
                        <div className="flex justify-center py-12">
                            <div className="flex flex-col items-center gap-3 opacity-70">
                                <Loader2 className="animate-spin text-[#D4AF37] w-6 h-6" />
                            </div>
                        </div>
                    )}

                    {/* End of List */}
                    {!hasMore && !loading && items.length > 0 && (
                        <div className="text-center py-16 opacity-40">
                            <Feather className="w-6 h-6 text-[#D4AF37] mx-auto mb-4" />
                            <p className={`${cinzel.className} text-[#D4AF37] text-xs tracking-[0.3em] uppercase`}>End of Official Records</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
