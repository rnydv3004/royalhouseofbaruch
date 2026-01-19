"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Cinzel, Pinyon_Script, Montserrat } from "next/font/google";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

// --- FONTS ---
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "600", "800"] });
const pinyon = Pinyon_Script({ weight: ["400"], subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "700"] });

// --- ANIMATED FLOURISH SVG ---
const HoverFlourish = () => (
    <svg width="40" height="10" viewBox="0 0 40 10" className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[#D4AF37] pointer-events-none">
        <motion.path
            d="M20 10 C 10 10, 0 5, 0 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            exit={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        />
        <motion.path
            d="M20 10 C 30 10, 40 5, 40 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            exit={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        />
    </svg>
);

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const router = useRouter();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const shouldBeScrolled = latest > 50;
        if (shouldBeScrolled !== isScrolled) setIsScrolled(shouldBeScrolled);
    });

    // --- MENU DATA ---
    type MenuItem = {
        name: string;
        href: string;
        subItems?: { name: string; href: string }[];
    };

    const menuItems: MenuItem[] = [
        { name: "Home", href: "/" },
        // {
        //     name: "Gallery",
        //     href: "/gallery",
        //     subItems: [
        //         { name: "Events", href: "/gallery#events" },
        //         { name: "Portraits", href: "/gallery#portraits" },
        //         { name: "Estates", href: "/gallery#estates" },
        //     ]
        // },
        {
            name: "Honours",
            href: "/honours",
            subItems: [
                { name: "Nobility", href: "/honours#nobility" },
                { name: "Royal Order of the Lion", href: "/honours#lion" },
                { name: "Order of the Star of Barygaza", href: "/honours#barygaza" },
            ]
        },
        {
            name: "History",
            href: "/history",
            subItems: [
                { name: "Foundation", href: "/history#foundation" },
                { name: "Diplomacy", href: "/history#diplomacy" },
                { name: "Sovereignty", href: "/history#sovereignty" },
                { name: "The Betrayal", href: "/history#betrayal" },
                { name: "Titular Era", href: "/history#titular" },
            ]
        },
        { name: "Administration", href: "/administration" },
        {
            name: "About", href: "/about", subItems: [
                { name: "Coat of Arms", href: "/about#coat-of-arms" },
                { name: "Succession", href: "/about#succession" },
                { name: "Family Tree", href: "/about#family-tree" },
            ]
        },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center">
                {/* --- DYNAMIC NAV CONTAINER --- */}
                <motion.div
                    layout
                    className={`
            relative flex items-center justify-between px-6 md:px-12 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
            ${isScrolled
                            ? "w-[95%] md:w-[80%] mt-4 h-14 rounded-full bg-[#FDFBF7]/90 backdrop-blur-xl border border-[#D4AF37]/30 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]"
                            : "w-full h-16 bg-linear-to-b from-[#FDFBF7] to-[#FDFBF7]/0 border-b border-[#D4AF37]/0"
                        }
          `}
                >
                    {/* --- LEFT LINKS --- */}
                    <div className="hidden md:flex gap-8 flex-1 justify-start">
                        {menuItems.slice(0, 3).map((item) => (
                            <NavLink key={item.name} item={item} />
                        ))}
                    </div>

                    {/* --- CENTER: THE ROYAL CREST TAB --- */}
                    <div onClick={() => router.push("/")} className="absolute cursor-pointer left-1/2 top-0 -translate-x-1/2 z-20">
                        <motion.div
                            layout
                            className={`
                relative flex flex-col items-center justify-center bg-white shadow-lg
                transition-all duration-700 ease-spring border-b border-x border-[#D4AF37]/40
                ${isScrolled
                                    ? "w-16 h-16 rounded-full -mt-2 border-t border-[#D4AF37]/40"
                                    : "w-32 h-32 rounded-b-[3rem] pt-4"
                                }
              `}
                        >
                            <div className="relative w-full h-full p-2">
                                {/* Logo Image */}
                                <div className={`relative w-full h-full transition-all duration-500 ${isScrolled ? 'scale-75' : 'scale-100'}`}>
                                    <Image src="/logo.webp" alt="Logo" fill className="object-contain rounded-b-4xl" />
                                </div>
                            </div>

                            {/* Decorative "Since 1726" Badge - Only visible when big */}
                            <motion.div
                                animate={{ opacity: isScrolled ? 0 : 1, y: isScrolled ? -10 : 0 }}
                                className="absolute -bottom-3 bg-[#0B2447] text-[#D4AF37] px-3 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-bold whitespace-nowrap shadow-md"
                            >
                                Est. 1726
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* --- RIGHT LINKS --- */}
                    <div className="hidden md:flex gap-8 flex-1 justify-end">
                        {menuItems.slice(3, 6).map((item) => (
                            <NavLink key={item.name} item={item} />
                        ))}
                    </div>

                    {/* --- MOBILE HAMBURGER --- */}
                    <div className="md:hidden ml-auto">
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="group relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#D4AF37]/10 transition-colors"
                        >
                            <div className="flex flex-col gap-1.5 items-end">
                                <span className="w-6 h-[2px] bg-[#0B2447] group-hover:w-8 transition-all duration-300"></span>
                                <span className="w-4 h-[2px] bg-[#D4AF37] group-hover:w-8 transition-all duration-300 delay-75"></span>
                                <span className="w-8 h-[2px] bg-[#0B2447] group-hover:w-8 transition-all duration-300 delay-100"></span>
                            </div>
                        </button>
                    </div>
                </motion.div>
            </nav>

            {/* --- CINEMATIC DIAGONAL MOBILE MENU --- */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-60 md:hidden"
                    >
                        {/* Dark Overlay */}
                        <motion.div className="absolute inset-0 bg-[#0B2447]/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />

                        {/* Diagonal Slice Container */}
                        <motion.div
                            initial={{ x: "100%", clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)" }}
                            animate={{ x: "0%", clipPath: "polygon(0% 0, 100% 0, 100% 100%, -20% 100%)" }}
                            exit={{ x: "100%", clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 bottom-0 w-[90%] bg-[#FDFBF7] shadow-2xl flex flex-col pl-16 pr-6 pt-10 pb-20 overflow-y-auto overflow-x-hidden no-scrollbar"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="self-end p-2 rounded-full border-2 border-[#D4AF37] hover:bg-[#D4AF37] text-[#ba7e04] transition-all duration-300 mb-5"
                            >
                                <X size={24} />
                            </button>

                            {/* Menu Links */}
                            <div className="flex flex-col gap-8">
                                {menuItems.map((item, i) => (
                                    <div key={item.name} className="flex flex-col">
                                        <motion.a
                                            href={item.href}
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + (i * 0.1) }}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="group relative"
                                        >
                                            <span className={`${cinzel.className} text-3xl text-[#0B2447] font-medium group-hover:text-[#D4AF37] transition-colors`}>
                                                {item.name}
                                            </span>
                                            {/* Only show 'Explore' if no subitems, or keep it consistent? Let's remove it for cleaner look with subitems or keep straightforward */}
                                            {!item.subItems && (
                                                <span className="block text-[10px] uppercase tracking-[0.3em] text-gray-400 group-hover:text-[#D4AF37] mt-1 transition-colors">
                                                    Explore
                                                </span>
                                            )}
                                        </motion.a>

                                        {/* --- MOBILE SUB-ITEMS (ALWAYS VISIBLE) --- */}
                                        {item.subItems && (
                                            <div className="flex flex-col gap-3 mt-3 ml-4 border-l border-[#D4AF37]/30 pl-4">
                                                {item.subItems.map((sub, j) => (
                                                    <motion.a
                                                        key={sub.name}
                                                        href={sub.href}
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.3 + (i * 0.1) + (j * 0.05) }}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                        className={`${montserrat.className} text-sm font-medium text-gray-600 hover:text-[#D4AF37] hover:translate-x-1 transition-all uppercase tracking-wide`}
                                                    >
                                                        {sub.name}
                                                    </motion.a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Bottom Decoration */}
                            <div className="mt-auto">
                                <div className="w-12 h-[2px] bg-[#D4AF37] mb-4"></div>
                                <p className={`${pinyon.className} text-2xl text-[#0B2447]`}>House of Bharuch</p>
                            </div>

                            {/* Background Watermark */}
                            <div className="absolute bottom-0 right-0 w-64 h-64 opacity-[0.05] pointer-events-none translate-x-1/3 translate-y-1/3">
                                <Image src="/logo.webp" alt="Watermark" fill className="object-contain" />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

// --- FLOURISH LINK COMPONENT ---
const NavLink = ({ item }: { item: any }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative group h-full flex items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <a
                href={item.href}
                className="relative px-2 py-4 cursor-pointer block"
            >
                <div className="flex items-center gap-1">
                    <span className={`${montserrat.className} text-[11px] font-bold uppercase tracking-[0.2em] text-[#0B2447] group-hover:text-[#8B1E1E] transition-colors duration-300`}>
                        {item.name}
                    </span>
                    {/* Optional chevron if there are subitems */}
                    {item.subItems && (
                        <span className="text-[#0B2447] group-hover:text-[#8B1E1E] transition-colors duration-300 text-[10px]">▼</span>
                    )}
                </div>

                {/* Animated Gold Vine SVG */}
                <AnimatePresence>
                    {isHovered && <HoverFlourish />}
                </AnimatePresence>
            </a>

            {/* --- DESKTOP DROPDOWN --- */}
            {item.subItems && (
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-48 z-50"
                        >
                            <div className="bg-[#FDFBF7] border border-[#D4AF37]/20 shadow-xl rounded-sm p-2 flex flex-col gap-1 relative before:absolute before:top-[-6px] before:left-1/2 before:-translate-x-1/2 before:w-3 before:h-3 before:bg-[#FDFBF7] before:border-l before:border-t before:border-[#D4AF37]/20 before:rotate-45">
                                {item.subItems.map((sub: any) => (
                                    <a
                                        key={sub.name}
                                        href={sub.href}
                                        className={`${montserrat.className} block px-4 py-3 text-[11px] text-[#0B2447] hover:bg-[#D4AF37]/10 hover:text-[#8B1E1E] transition-colors uppercase tracking-widest text-center`}
                                    >
                                        {sub.name}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </div>
    );
};

export default Navbar;