'use client';

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { cinzel, lato } from '@/app/fonts';
import Image from 'next/image';
import { Calendar, Play, Loader2, X, AlertCircle } from 'lucide-react';

// --- HELPER: SECTION HEADING ---
const SectionHeading = ({ subtitle, title, align = "center", light = false }: { subtitle: string; title: string; align?: string; light?: boolean }) => (
    <div className={`flex flex-col ${align === "center" ? "items-center text-center" : "items-start text-left"} mb-12 relative z-10`}>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <span className={`${lato.className} text-xs tracking-[0.3em] uppercase font-bold mb-4 block ${light ? "text-[#D4AF37]" : "text-[#8B1E1E]"}`}>
                {subtitle}
            </span>
            <h2 className={`${cinzel.className} text-3xl md:text-5xl lg:text-6xl mb-6 ${light ? "text-white" : "text-[#0B2447]"}`}>
                {title}
            </h2>
            <div className={`h-[2px] w-24 bg-gradient-to-r from-transparent ${light ? "via-[#D4AF37]" : "via-[#0B2447]"} to-transparent mx-auto`}></div>
        </motion.div>
    </div>
);

// --- COMPONENT: VIDEO MODAL ---
const VideoModal = ({ src, onClose }: { src: string, onClose: () => void }) => {
    if (!src) return null;
    return (
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            onClick={onClose}
        >
            <button onClick={onClose} className="absolute top-6 right-6 text-[#D4AF37] hover:text-white transition-colors">
                <X size={40} />
            </button>
            <div className="relative w-full max-w-6xl aspect-video border border-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.2)]" onClick={(e) => e.stopPropagation()}>
                <video src={src} controls autoPlay className="w-full h-full object-contain" />
            </div>
        </motion.div>
    );
};

export default function RoyalChannel() {
    // --- STATE ---
    const [videoData, setVideoData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    
    // --- REF FOR SCROLL DETECTION ---
    const sectionRef = useRef<HTMLDivElement>(null);

    // --- FETCH LOGIC ---
    const fetchFeaturedVideo = async () => {
        try {
            setLoading(true);
            
            // Querying 'video' type to find the FVID inside it
            const res = await fetch(`/api/gallery?type=FVID&limit=10`);
            const json = await res.json();
            
            // FILTER: Find the specific 'FVID' (Featured Video)
            // Adjust 'file_type' if your DB column name is different
            const fvid = json.data.find((item: any) => item.file_type === 'FVID');

            if (fvid) {
                setVideoData(fvid);
            }
        } catch (error) {
            console.error("Failed to fetch featured video", error);
        } finally {
            setLoading(false);
            setHasFetched(true); // Ensure we don't fetch again
        }
    };

    // --- INTERSECTION OBSERVER ---
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            // If visible AND haven't fetched yet
            if (entry.isIntersecting && !hasFetched) {
                fetchFeaturedVideo();
            }
        }, { threshold: 0.3 }); // Trigger when 30% of component is visible

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, [hasFetched]);


    // --- RENDER ---
    return (
        <section ref={sectionRef} className="py-24 bg-[#081b36] relative overflow-hidden min-h-[600px]">
            
            {/* Modal */}
            <AnimatePresence>
                {isPlaying && videoData && (
                    <VideoModal 
                        src={videoData.file_url} 
                        onClose={() => setIsPlaying(false)} 
                    />
                )}
            </AnimatePresence>

            {/* Background accent */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
                style={{ backgroundImage: `radial-gradient(circle at 50% 50%, #D4AF37 0%, transparent 60%)` }}>
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <SectionHeading subtitle="The Royal Channel" title="Addresses & Documentaries" light={true} />

                {/* --- LOADING STATE --- */}
                {loading && (
                    <div className="w-full max-w-5xl mx-auto aspect-video bg-[#0B2447] border border-[#D4AF37]/20 flex flex-col items-center justify-center rounded-sm animate-pulse">
                        <Loader2 className="w-12 h-12 text-[#D4AF37] animate-spin mb-4" />
                        <span className={`${cinzel.className} text-[#D4AF37]/60`}>Retrieving Footage...</span>
                    </div>
                )}

                {/* --- VIDEO PLAYER UI --- */}
                {!loading && videoData ? (
                    <div 
                        onClick={() => setIsPlaying(true)}
                        className="relative aspect-video w-full max-w-5xl mx-auto shadow-2xl border border-[#D4AF37]/30 group cursor-pointer overflow-hidden rounded-sm"
                    >
                        {/* Thumbnail */}
                        <Image
                            src={videoData.thumbnail || "https://images.unsplash.com/photo-1576049519901-ef17971a3c48?w=1600&q=80"} // Fallback image if no thumbnail
                            alt={videoData.title}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-60"
                        />

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"></div>

                        {/* Custom Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="w-20 h-20 md:w-24 md:h-24 bg-[#D4AF37]/20 backdrop-blur-sm rounded-full border border-[#D4AF37] flex items-center justify-center relative"
                            >
                                <div className="absolute inset-0 border border-[#D4AF37] rounded-full animate-ping opacity-50"></div>
                                <Play fill="#D4AF37" className="text-[#D4AF37] ml-1 w-8 h-8 md:w-10 md:h-10" />
                            </motion.div>
                        </div>

                        {/* Video Info Overlay */}
                        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 bg-gradient-to-t from-black/90 to-transparent">
                            <div className="flex items-center gap-4 mb-2">
                                <span className="bg-[#8B1E1E] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest rounded-xs">
                                    Featured Address
                                </span>
                                {videoData.created_at && (
                                    <span className="text-white/60 text-xs flex items-center gap-2 font-mono">
                                        <Calendar size={12} /> 
                                        {new Date(videoData.created_at).toLocaleDateString()}
                                    </span>
                                )}
                            </div>
                            <h3 className={`${cinzel.className} text-2xl md:text-4xl text-white mb-2`}>
                                {videoData.title}
                            </h3>
                            <p className={`${lato.className} text-white/70 max-w-2xl text-sm md:text-base line-clamp-2`}>
                                {videoData.description || "Official coverage from the Royal Archives."}
                            </p>
                        </div>
                    </div>
                ) : (
                    // --- EMPTY STATE (If no FVID found) ---
                    !loading && hasFetched && (
                        <div className="w-full max-w-5xl mx-auto aspect-video bg-[#0B2447]/50 border border-dashed border-[#D4AF37]/20 flex flex-col items-center justify-center rounded-sm">
                            <AlertCircle className="w-10 h-10 text-[#D4AF37]/40 mb-2" />
                            <p className={`${cinzel.className} text-white/40`}>No Featured Address Available</p>
                        </div>
                    )
                )}

            </div>
        </section>
    );
}