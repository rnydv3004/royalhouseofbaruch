import { Camera, ArrowUpRight, Expand } from "lucide-react";
import { montserrat, lato, cinzel } from "@/app/fonts";

export const RoyalGallery = () => {

    // Grid Configuration:
    // Seamless Mosaic Layout (No gaps)
    const galleryItems = [
        {
            id: 1,
            title: "The Grand Ballroom",
            category: "Architecture",
            image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
            span: "md:col-span-2 md:row-span-2", // Big Hero Square
            height: "h-64 md:h-full"
        },
        {
            id: 2,
            title: "Royal Gardens",
            category: "Nature",
            image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2032&auto=format&fit=crop",
            span: "md:col-span-1 md:row-span-1",
            height: "h-64 md:h-full"
        },
        {
            id: 3,
            title: "The Golden Treasury",
            category: "Artifacts",
            image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2727&auto=format&fit=crop",
            span: "md:col-span-1 md:row-span-1",
            height: "h-64 md:h-full"
        },
        {
            id: 4,
            title: "Winter Solstice Banquet",
            category: "Events",
            image: "https://images.unsplash.com/photo-1514395465013-2dc0bebb29f3?q=80&w=2071&auto=format&fit=crop",
            span: "md:col-span-2 md:row-span-1", // Wide Rectangle
            height: "h-64 md:h-full"
        },
    ];

    return (
        <section className="bg-[#081b36] py-24 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px]"></div>

            <div className="container mx-auto px-6 relative z-10">

                {/* --- HEADER --- */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-3 mb-4 opacity-70">
                        <div className="h-[1px] w-8 bg-[#D4AF37]"></div>
                        <Camera size={14} className="text-[#D4AF37]" />
                        <div className="h-[1px] w-8 bg-[#D4AF37]"></div>
                    </div>
                    <h2 className={`${cinzel.className} text-4xl md:text-5xl text-white mb-4`}>
                        Visual <span className="text-[#D4AF37]">Archives</span>
                    </h2>
                    <p className={`${lato.className} text-slate-400 max-w-xl mx-auto font-light`}>
                        A seamless collection of moments from the estate.
                    </p>
                </div>

                {/* --- SEAMLESS BENTO GRID --- */}
                {/* gap-0 removes spacing. We use borders on items for definition. */}
                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 max-w-6xl mx-auto h-auto md:h-[600px] border border-[#D4AF37]/20 shadow-2xl shadow-black/50">
                    
                    {galleryItems.map((item) => (
                        <div
                            key={item.id}
                            className={`group relative overflow-hidden border-[0.5px] border-[#D4AF37]/20 ${item.span} ${item.height}`}
                        >
                            {/* 1. The Image (Slow Zoom Effect) */}
                            <img
                                src={item.image}
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1s] ease-out group-hover:scale-105"
                            />

                            {/* 2. Dark Gradient Overlay (Always present at bottom, stronger on hover) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B2447] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                            {/* 3. Golden Flash on Hover (Subtle shine) */}
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                            {/* 4. Top Right Icon (Slides in) */}
                            <div className="absolute top-4 right-4 translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
                                <div className="bg-[#D4AF37] p-2 text-[#0B2447]">
                                    <ArrowUpRight size={16} />
                                </div>
                            </div>

                            {/* 5. Content (Slides Up) */}
                            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
                                <span className={`${montserrat.className} text-[#D4AF37] text-[9px] font-bold uppercase tracking-[0.2em] mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100`}>
                                    {item.category}
                                </span>
                                <h3 className={`${cinzel.className} text-xl md:text-2xl text-white mb-2 leading-tight drop-shadow-md`}>
                                    {item.title}
                                </h3>
                                {/* Decorator Line */}
                                <div className="h-[2px] w-0 group-hover:w-12 bg-[#D4AF37] transition-all duration-500 delay-200"></div>
                            </div>

                        </div>
                    ))}

                </div>

                {/* --- BUTTON --- */}
                <div className="text-center mt-12">
                    <button className="group relative px-8 py-3 bg-transparent border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-colors duration-300">
                        <span className={`${montserrat.className} text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2`}>
                            View Full Gallery <Expand size={14} className="group-hover:scale-110 transition-transform"/>
                        </span>
                    </button>
                </div>

            </div>
        </section>
    );
};

export default RoyalGallery;