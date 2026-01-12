"use client";

import { useEffect, useState } from "react";
import { Camera, ArrowUpRight, Expand, Play } from "lucide-react";
import { montserrat, lato, cinzel } from "@/app/fonts";
import Link from "next/link";

interface MediaItem {
    id: number;
    file_type: "IMAGE" | "VIDEO";
    file_url: string;
    title: string | null;
    category?: string; // If not in DB, we can default it
    description: string | null;
}

export const RoyalGallery = () => {
    const [items, setItems] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                // Fetch only 4 latest items
                const res = await fetch("/api/gallery?limit=4&page=1&type=image");
                const data = await res.json();
                console.log("Gallery Data:", data);
                setItems(data.data || []);
            } catch (error) {
                console.error("Failed to load gallery:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    // Helper to maintain the Bento Layout based on index
    const getSpanClass = (index: number) => {
        // 0: Big Box, 1 & 2: Small Box, 3: Wide Rectangle
        if (index === 0) return "md:col-span-2 md:row-span-2 h-64 md:h-full";
        if (index === 3) return "md:col-span-2 md:row-span-1 h-64 md:h-full";
        return "md:col-span-1 md:row-span-1 h-64 md:h-full";
    };

    return (
        <section className="bg-[#081b36] py-24 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] bg-size-[20px_20px]"></div>

            <div className="container mx-auto px-6 relative z-10">

                {/* --- HEADER --- */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-3 mb-4 opacity-70">
                        <div className="h-px w-8 bg-[#D4AF37]"></div>
                        <Camera size={14} className="text-[#D4AF37]" />
                        <div className="h-px w-8 bg-[#D4AF37]"></div>
                    </div>
                    <h2 className={`${cinzel.className} text-4xl md:text-5xl text-white mb-4`}>
                        Visual <span className="text-[#D4AF37]">Archives</span>
                    </h2>
                    <p className={`${lato.className} text-slate-400 max-w-xl mx-auto font-light`}>
                        A seamless collection of moments from the estate.
                    </p>
                </div>

                {/* --- GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 max-w-6xl mx-auto h-auto md:h-[600px] border border-[#D4AF37]/20 shadow-2xl shadow-black/50">

                    {loading ? (
                        // --- SKELETON LOADER ---
                        <>
                            <div className="md:col-span-2 md:row-span-2 bg-[#D4AF37]/5 animate-pulse border border-[#D4AF37]/10 h-64 md:h-full"></div>
                            <div className="md:col-span-1 md:row-span-1 bg-[#D4AF37]/5 animate-pulse border border-[#D4AF37]/10 h-64 md:h-full"></div>
                            <div className="md:col-span-1 md:row-span-1 bg-[#D4AF37]/5 animate-pulse border border-[#D4AF37]/10 h-64 md:h-full"></div>
                            <div className="md:col-span-2 md:row-span-1 bg-[#D4AF37]/5 animate-pulse border border-[#D4AF37]/10 h-64 md:h-full"></div>
                        </>
                    ) : (
                        items.map((item, index) => (
                            <div
                                key={item.id}
                                className={`group relative overflow-hidden border-[0.5px] border-[#D4AF37]/20 ${getSpanClass(index)}`}
                            >
                                {/* 1. Media (Image or Video) */}
                                {(
                                    <img
                                        src={item.file_url}
                                        alt={item.title || "Gallery Image"}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                                    />
                                )}

                                {/* Video Indicator Icon if Video */}
                                {item.file_type === 'VIDEO' && (
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 opacity-70 group-hover:scale-110 transition-transform">
                                        <div className="bg-black/30 backdrop-blur-sm p-3 rounded-full border border-[#D4AF37]/50">
                                            <Play size={24} className="fill-[#D4AF37] text-[#D4AF37] ml-1" />
                                        </div>
                                    </div>
                                )}

                                {/* 2. Overlays */}
                                <div className="absolute inset-0 bg-linear-to-t from-[#0B2447] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                                {/* 3. Icon */}
                                <div className="absolute top-4 right-4 translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
                                    <div className="bg-[#D4AF37] p-2 text-[#0B2447]">
                                        <ArrowUpRight size={16} />
                                    </div>
                                </div>

                                {/* 4. Content */}
                                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
                                    <span className={`${montserrat.className} text-[#D4AF37] text-[9px] font-bold uppercase tracking-[0.2em] mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100`}>
                                        {item.file_type}
                                    </span>
                                    <h3 className={`${cinzel.className} text-xl md:text-2xl text-white mb-2 leading-tight drop-shadow-md`}>
                                        {item.title || "Untitled"}
                                    </h3>
                                    <div className="h-[2px] w-0 group-hover:w-12 bg-[#D4AF37] transition-all duration-500 delay-200"></div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* --- BUTTON --- */}
                <div className="text-center mt-12">
                    <Link href="/gallery">
                        <button className="group relative px-8 py-3 bg-transparent border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-colors duration-300">
                            <span className={`${montserrat.className} text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2`}>
                                View Full Gallery <Expand size={14} className="group-hover:scale-110 transition-transform" />
                            </span>
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default RoyalGallery;