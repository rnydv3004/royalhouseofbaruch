"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Cinzel, Lato, Pinyon_Script } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence for smooth modal
import { Play, Crown, Loader2, AlertCircle, X } from "lucide-react"; // Added X for close button

// --- FONTS ---
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500", "700"], variable: '--font-cinzel' });
const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"], variable: '--font-lato' });
const pinyon = Pinyon_Script({ weight: ["400"], subsets: ["latin"], variable: '--font-pinyon' });

// --- ORNAMENTS ---
const Divider = () => (
    <div className="flex justify-center items-center py-8 opacity-60">
        <div className="h-px w-16 bg-[#0B2447]"></div>
        <div className="mx-4 text-[#D4AF37] text-lg">✦</div>
        <div className="h-px w-16 bg-[#0B2447]"></div>
    </div>
);

// --- NEW COMPONENT: ROYAL VIDEO MODAL ---
const VideoModal = ({ src, onClose }: { src: string, onClose: () => void }) => {
    if (!src) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B2447]/95 backdrop-blur-md p-4 md:p-10"
            onClick={onClose} // Close when clicking background
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-[#D4AF37] hover:text-white transition-colors duration-300 z-50"
            >
                <X size={40} strokeWidth={1} />
            </button>

            {/* Video Container with Gold Border */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-6xl aspect-video bg-black border border-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.2)]"
                onClick={(e) => e.stopPropagation()} // Prevent close when clicking video
            >
                <video
                    src={src}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                >
                    Your browser does not support the video tag.
                </video>

                {/* Decorative Corner (Royal Touch) */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37] -mt-2 -ml-2"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37] -mb-2 -mr-2"></div>
            </motion.div>
        </motion.div>
    );
};

export default function RoyalGalleryLive() {
    // --- STATE ---
    const [featuredVideo, setFeaturedVideo] = useState<any>(null);
    const [featuredImages, setFeaturedImages] = useState<any>([]);
    const [vaultItems, setVaultItems] = useState<any>([]);

    // NEW: State for the Modal
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState<any>(true);
    const [error, setError] = useState<any>(null);

    // --- INFINITE SCROLL OBSERVER ---
    const observer: any = useRef<any>(null);

    const lastElementRef = useCallback((node: any) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, hasMore]);


    // --- API CALL & EXTRACTION LOGIC ---
    useEffect(() => {
        const fetchGallery = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/gallery?page=${page}&limit=20`);

                if (!response.ok) throw new Error('Failed to fetch royal archives');

                const data = await response.json();
                const items = Array.isArray(data) ? data : (data.data || []);
                console.log(items);

                if (items.length === 0) {
                    setHasMore(false);
                    setLoading(false);
                    return;
                }

                if (page === 1) {
                    // --- SMART EXTRACTION (FIRST LOAD) ---
                    let processList = [...items];

                    setFeaturedVideo(processList.filter((item: any) => item.file_type === 'FVID')[0] || null);
                    setFeaturedImages(processList.filter((item: any) => item.file_type === 'FIMG') || []);

                    setVaultItems(items);

                } else {
                    setVaultItems((prev: any) => [...prev, ...items]);
                }

            } catch (err) {
                console.error("Gallery Error:", err);
                setError("The archives are currently inaccessible.");
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, [page]);


    return (
        <div className={`min-h-screen bg-white pt-24 pb-20 px-4 md:px-12 ${cinzel.variable} ${lato.variable} ${pinyon.variable}`}>

            {/* --- VIDEO MODAL (Rendered conditionally) --- */}
            <AnimatePresence>
                {selectedVideo && (
                    <VideoModal src={selectedVideo} onClose={() => setSelectedVideo(null)} />
                )}
            </AnimatePresence>


            {/* HEADER */}
            <div className="max-w-[1600px] mx-auto mb-10 border-b border-[#0B2447]/10 pb-6 flex flex-col md:flex-row justify-between items-end">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Crown className="text-[#D4AF37] w-6 h-6" strokeWidth={1.5} />
                        <span className={`${pinyon.className} text-[#D4AF37] text-3xl md:text-4xl translate-y-1`}>
                            Est. 1726
                        </span>
                    </div>
                    <h1 className={`${cinzel.className} text-5xl md:text-6xl text-[#0B2447] font-bold tracking-tight`}>
                        Royal <span className="text-[#D4AF37]">Chronicles</span>
                    </h1>
                </div>
                <div className={`${pinyon.className} hidden md:block text-[#0B2447]/60 text-3xl mt-4 md:mt-0`}>
                    Curated by the House of Bharuch
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto">

                {/* ERROR STATE */}
                {error && (
                    <div className="flex items-center justify-center p-12 text-red-800 bg-red-50 mb-10 border border-red-100">
                        <AlertCircle className="mr-2" /> {error}
                    </div>
                )}

                {/* LOADING INITIAL STATE */}
                {loading && page === 1 && (
                    <div className="h-[600px] flex flex-col items-center justify-center bg-[#FDFBF7] border border-[#0B2447]/5 mb-24">
                        <Loader2 className="animate-spin text-[#D4AF37] w-12 h-12 mb-4" />
                        <span className={`${cinzel.className} text-[#0B2447] tracking-widest`}>Opening the Royal Vault...</span>
                    </div>
                )}

                {/* ================================================================
           SECTION A: FEATURED BLOCK
           ================================================================ 
        */}
                {!loading && featuredVideo && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-1 h-auto lg:h-[600px] mb-24 bg-[#0B2447] p-1 border border-[#0B2447] shadow-2xl"
                    >

                        {/* 1. FEATURED VIDEO (CLICKABLE) */}
                        <div
                            className="lg:col-span-2 relative group overflow-hidden bg-black h-[400px] lg:h-auto cursor-pointer"
                            onClick={() => setSelectedVideo(featuredVideo.file_url || featuredVideo.url)} // OPEN MODAL HERE
                        >
                            <img
                                src={featuredVideo.img || featuredVideo.thumbnail}
                                alt={featuredVideo.title}
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-75 transition-opacity duration-700"
                            />

                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="w-24 h-24 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0B2447] transition-all duration-500 cursor-pointer mb-8 backdrop-blur-sm">
                                    <Play fill="currentColor" size={32} className="ml-1" />
                                </div>

                                <span className={`${pinyon.className} text-[#D4AF37] text-3xl md:text-4xl mb-2 drop-shadow-md`}>
                                    {featuredVideo.subtitle || "Featured Cinema"}
                                </span>

                                <h2 className={`${cinzel.className} text-white text-3xl md:text-5xl tracking-wide uppercase font-bold text-center px-4`}>
                                    {featuredVideo.title}
                                </h2>
                            </div>
                        </div>

                        {/* 2. FEATURED IMAGES GRID */}
                        <div className="lg:col-span-1 grid grid-cols-2 gap-1 h-full">
                            {featuredImages.map((item: any) => (
                                <div key={item.id} className="relative group overflow-hidden cursor-pointer bg-[#FDFBF7] h-[200px] lg:h-auto">
                                    <img
                                        src={item.img || item.file_url}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 saturate-[.8] group-hover:saturate-100"
                                    />
                                    <div className="absolute inset-0 bg-[#D4AF37]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="absolute inset-0 flex items-center justify-center bg-[#0B2447]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className={`${pinyon.className} text-[#D4AF37] text-2xl text-center px-2`}>
                                            {item.title}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}


                {/* ================================================================
           SECTION B: THE VAULT (Videos + Images)
           ================================================================ 
        */}
                {(vaultItems.length > 0) && (
                    <div>
                        <div className="text-center mb-12">
                            <h3 className={`${cinzel.className} text-[#0B2447] text-3xl font-bold uppercase tracking-widest`}>
                                The <span className="text-[#D4AF37]">Vault</span>
                            </h3>
                            <Divider />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

                            {vaultItems.map((item: any, idx: any) => {
                                const isLastElement = vaultItems.length === idx + 1;
                                // Check if item is video
                                const isVideo = item.file_type === 'video' || item.file_type === 'VIDEO' || item.isVideo || item.mimetype?.includes('video');

                                return (
                                    <motion.div
                                        ref={isLastElement ? lastElementRef : null}
                                        key={item.id || idx}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 }}
                                        className="group cursor-pointer"
                                        onClick={() => {
                                            // IF VIDEO, OPEN MODAL
                                            if (isVideo) {
                                                setSelectedVideo(item.file_url || item.url);
                                            }
                                        }}
                                    >
                                        {/* IMAGE FRAME */}
                                        <div className="relative p-2 bg-white border border-[#0B2447]/10 shadow-[0_5px_20px_rgba(0,0,0,0.05)] group-hover:shadow-[0_10px_30px_rgba(212,175,55,0.2)] transition-shadow duration-500">
                                            <div className="absolute top-0 left-0 w-full h-full border-[0.5px] border-[#D4AF37] m-1 pointer-events-none opacity-50"></div>

                                            <div className="aspect-4/3 overflow-hidden relative">
                                                <img
                                                    src={item.file_url}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                                />

                                                {/* VIDEO INDICATOR OVERLAY (If Vault item is video) */}
                                                {isVideo && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                                                        <div className="w-16 h-16 rounded-full border border-white/50 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-[#0B2447] group-hover:border-[#D4AF37] transition-all duration-300">
                                                            <Play fill="currentColor" size={24} className="ml-1" />
                                                        </div>
                                                    </div>
                                                )}

                                                {item.date && (
                                                    <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 backdrop-blur-sm border border-[#D4AF37]/50">
                                                        <span className={`${cinzel.className} text-[#0B2447] text-xs font-bold`}>{item.date}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* TEXT CONTENT */}
                                        <div className="text-center mt-6">
                                            <h4 className={`${cinzel.className} text-[#0B2447] text-xl font-bold group-hover:text-[#D4AF37] transition-colors duration-300`}>
                                                {item.title}
                                            </h4>
                                            <div className="flex items-center justify-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                                                <span className={`${pinyon.className} text-[#0B2447]/60 text-xl`}>
                                                    {isVideo ? "Play Video" : "View Artifact"}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* LOADING MORE */}
                        {loading && page > 1 && (
                            <div className="flex justify-center items-center py-12 mt-8">
                                <Loader2 className="animate-spin text-[#D4AF37] w-8 h-8" />
                                <span className={`${cinzel.className} ml-3 text-[#0B2447] tracking-widest`}>Unearthing History...</span>
                            </div>
                        )}

                        {/* END OF LIST */}
                        {!hasMore && !loading && (
                            <div className="mt-24 text-center opacity-40">
                                <Crown className="w-6 h-6 mx-auto mb-4 text-[#D4AF37]" />
                                <p className={`${pinyon.className} text-2xl text-[#0B2447]`}>End of Collection</p>
                            </div>
                        )}

                    </div>
                )}

            </div>
        </div>
    );
}