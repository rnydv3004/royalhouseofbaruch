"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Cinzel, Lato, Pinyon_Script, Montserrat } from "next/font/google";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Crown, Anchor, Swords, Landmark, Heart, Leaf, BookOpen, ArrowRight,
  Bell
} from "lucide-react";
import RoyalGallery from "@/components/RoyalGallery";
import Lineage from "@/components/Lineage";
import { RoyalBulletin } from "@/components/Bulettin";
import RoyalChannel from "@/components/RoyalChannel";

// --- FONTS ---
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: '--font-cinzel'
});

const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: '--font-lato'
});

const pinyon = Pinyon_Script({
  weight: ["400"],
  subsets: ["latin"],
  variable: '--font-pinyon'
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: '--font-montserrat'
});

// --- UTILS ---

const GrainOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-100 opacity-[0.03] mix-blend-multiply"
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
  </div>
);

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: { clientX: any; clientY: any; target: any; }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      const target = e.target;
      setIsHovering(
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('.cursor-hover')
      );
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-100 hidden md:block mix-blend-difference"
      animate={{
        x: mousePosition.x - (isHovering ? 24 : 8),
        y: mousePosition.y - (isHovering ? 24 : 8),
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <div
        className={`rounded-full border border-[#D4AF37] transition-all duration-300 ${isHovering ? "w-12 h-12 bg-[#D4AF37]/20 border-2" : "w-4 h-4 bg-[#D4AF37]"
          }`}
      />
    </motion.div>
  );
};

const SectionHeading = ({ subtitle, title, align = "center", light = false }: { subtitle: string; title: string; align?: string; light?: boolean }) => (
  <div className={`flex flex-col ${align === "center" ? "items-center text-center" : "items-start text-left"} mb-20 relative z-10`}>
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
      <div className={`h-[2px] w-24 bg-linear-to-r from-transparent ${light ? "via-[#D4AF37]" : "via-[#0B2447]"} to-transparent mx-auto`}></div>
    </motion.div>
  </div>
);

// --- NEW COMPONENT: HERO ANNOUNCEMENT (Floats inside Hero) ---
const HeroAnnouncement = () => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 2, duration: 0.8 }}
    className="absolute bottom-8 right-4 md:bottom-12 md:right-12 z-40 max-w-xs md:max-w-sm hidden md:block"
  >
    <div className="bg-white/10 backdrop-blur-md border border-[#D4AF37]/30 p-5 rounded-sm shadow-2xl relative overflow-hidden group cursor-pointer hover:bg-white/20 transition-all duration-300">
      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#D4AF37]"></div>

      <div className="flex items-start gap-4">
        <div className="bg-[#D4AF37] p-2 rounded-full text-[#0B2447] shadow-lg">
          <Bell size={16} fill="currentColor" />
        </div>
        <div>
          <p className={`${montserrat.className} text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-1`}>
            Latest Decree
          </p>
          <p className={`${cinzel.className} text-[#0B2447] text-sm leading-relaxed font-semibold`}>
            The Golden Jubilee celebrations to commence this October at the Summer Palace.
          </p>
          <div className="flex items-center gap-2 mt-3 text-[#0B2447]/60 text-xs group-hover:text-[#8B1E1E] transition-colors">
            <span>Read Announcement</span> <ArrowRight size={12} />
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- NEW COMPONENT: OFFICIAL TICKER (News Bar) ---
const OfficialTicker = () => {
  return (
    <div className="bg-[#0B2447] border-y-4 border-double border-[#D4AF37] py-3 overflow-hidden relative z-20 shadow-xl">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          className="flex items-center gap-12 pr-12"
        >
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-12">
              <span className={`${montserrat.className} text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-4`}>
                <Crown size={14} fill="currentColor" /> Royal Press Office
              </span>
              <span className={`${lato.className} text-white/80 text-sm font-light tracking-wide`}>
                His Highness to visit the Cultural Center on June 15th • Applications for the 2026 Arts Grant are now open • Palace Gardens open to public this Sunday
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// --- MODIFIED HERO COMPONENT ---
const Hero = () => {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white py-20 md:py-0">

      {/* 1. STATIC BACKGROUND TEXTURE (The "Jali" Screen) */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23D4AF37' stroke-width='0.5'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' /%3E%3Ccircle cx='30' cy='30' r='10' /%3E%3Cpath d='M30 0 v60 M0 30 h60' stroke-opacity='0.3'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* 2. THE ROYAL FRAME - WITH ORNAMENTAL TRACK */}
      <div className="hidden md:block absolute inset-0 border border-[#D4AF37]/30">
        <div className="absolute inset-[6px] border border-[#D4AF37]/20 border-dashed"></div>
        {/* Desktop Corner Flourishes */}
        {[0, 90, 180, 270].map((deg, i) => (
          <div key={i} className="absolute w-36 h-36 text-[#D4AF37]"
            style={{
              top: deg < 180 ? 0 : 'auto',
              bottom: deg >= 180 ? 0 : 'auto',
              left: deg === 0 || deg === 270 ? 0 : 'auto',
              right: deg === 90 || deg === 180 ? 0 : 'auto',
              transform: `rotate(${deg}deg)`
            }}>
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
              <path d="M5 5 V40 Q5 50 15 50 T25 40 V25 H40 Q50 25 50 15 T40 5 H5" stroke="currentColor" strokeWidth="1" />
              <circle cx="5" cy="5" r="3" fill="currentColor" />
            </svg>
          </div>
        ))}
      </div>

      {/* --- LAYER 1: THE MUQARNAS DOME (Outer, Slow) --- */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.06] pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 300, repeat: Infinity, ease: "linear" }}
          className="w-[140vw] h-[140vw] md:w-[1300px] md:h-[1300px]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23D4AF37' stroke-width='0.3'%3E%3Ccircle cx='100' cy='100' r='99' stroke-width='0.5'/%3E%3C!-- Hexagon Pattern --%3E%3Cpath d='M100 5 L120 15 L120 35 L100 45 L80 35 L80 15 Z' /%3E%3Cpath d='M100 5 L120 15 L120 35 L100 45 L80 35 L80 15 Z' transform='rotate(60 100 100)' /%3E%3Cpath d='M100 5 L120 15 L120 35 L100 45 L80 35 L80 15 Z' transform='rotate(120 100 100)' /%3E%3Cpath d='M100 5 L120 15 L120 35 L100 45 L80 35 L80 15 Z' transform='rotate(180 100 100)' /%3E%3Cpath d='M100 5 L120 15 L120 35 L100 45 L80 35 L80 15 Z' transform='rotate(240 100 100)' /%3E%3Cpath d='M100 5 L120 15 L120 35 L100 45 L80 35 L80 15 Z' transform='rotate(300 100 100)' /%3E%3C!-- Interlaced Rings --%3E%3Ccircle cx='100' cy='100' r='80' stroke-dasharray='5 5'/%3E%3Ccircle cx='100' cy='100' r='60' stroke-width='0.1'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
          }}
        />
      </div>

      {/* --- LAYER 2: THE SHAMSA ROSETTE (Middle, Counter-Rotating) --- */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.095] pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
          className="w-[110vw] h-[110vw] md:w-[600px] md:h-[600px]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23D4AF37' stroke-width='0.3'%3E%3C!-- Petal Radiance --%3E%3Cpath d='M100 20 Q110 50 100 80 Q90 50 100 20 Z' /%3E%3Cpath d='M100 20 Q110 50 100 80 Q90 50 100 20 Z' transform='rotate(22.5 100 100)' /%3E%3Cpath d='M100 20 Q110 50 100 80 Q90 50 100 20 Z' transform='rotate(45 100 100)' /%3E%3Cpath d='M100 20 Q110 50 100 80 Q90 50 100 20 Z' transform='rotate(67.5 100 100)' /%3E%3Cpath d='M100 20 Q110 50 100 80 Q90 50 100 20 Z' transform='rotate(90 100 100)' /%3E%3Cpath d='M100 20 Q110 50 100 80 Q90 50 100 20 Z' transform='rotate(112.5 100 100)' /%3E%3Cpath d='M100 20 Q110 50 100 80 Q90 50 100 20 Z' transform='rotate(135 100 100)' /%3E%3Cpath d='M100 20 Q110 50 100 80 Q90 50 100 20 Z' transform='rotate(157.5 100 100)' /%3E%3Cpath d='M100 20 Q110 50 100 80 Q90 50 100 20 Z' transform='rotate(180 100 100)' /%3E%3Cpath d='M100 20 Q110 50 100 80 Q90 50 100 20 Z' transform='rotate(202.5 100 100)' /%3E%3Cpath d='M100 20 Q110 50 100 80 Q90 50 100 20 Z' transform='rotate(225 100 100)' /%3E%3Cpath d='M100 20 Q110 50 100 80 Q90 50 100 20 Z' transform='rotate(247.5 100 100)' /%3E%3Cpath d='M100 20 Q110 50 100 80 Q90 50 100 20 Z' transform='rotate(270 100 100)' /%3E%3Cpath d='M100 20 Q110 50 100 80 Q90 50 100 20 Z' transform='rotate(292.5 100 100)' /%3E%3Cpath d='M100 20 Q110 50 100 80 Q90 50 100 20 Z' transform='rotate(315 100 100)' /%3E%3Cpath d='M100 20 Q110 50 100 80 Q90 50 100 20 Z' transform='rotate(337.5 100 100)' /%3E%3C!-- Inner Rings --%3E%3Ccircle cx='100' cy='100' r='80' stroke-width='0.5'/%3E%3Ccircle cx='100' cy='100' r='20' stroke-width='0.5'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
          }}
        />
      </div>

      {/* --- LAYER 3: THE ASTROLABE CORE (Inner, Clockwise) --- */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.14] pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
          className="w-[80vw] h-[80vw] md:w-[600px] md:h-[600px]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23D4AF37' stroke-width='0.4'%3E%3C!-- Degree Ticks --%3E%3Cpath d='M100 0 L100 10 M100 190 L100 200 M0 100 L10 100 M190 100 L200 100' /%3E%3Ccircle cx='100' cy='100' r='70' stroke-dasharray='2 4'/%3E%3C!-- The 8-Point Star (Rub el Hizb) --%3E%3Crect x='60' y='60' width='80' height='80' stroke-width='0.5'/%3E%3Crect x='60' y='60' width='80' height='80' transform='rotate(45 100 100)' stroke-width='0.5'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
          }}
        />
      </div>

      {/* 4. ANIMATED BACKGROUND LAYERS */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.08] pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="w-[180vw] h-[180vw] md:w-[1300px] md:h-[1300px]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23D4AF37' stroke-width='0.4'%3E%3Ccircle cx='100' cy='100' r='99' stroke-width='0.5'/%3E%3Cpath d='M100 5 L120 15 L120 35 L100 45 L80 35 L80 15 Z' /%3E%3C/g%3E%3C/svg%3E")`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
        />
      </div>

      {/* 5. MAIN CONTENT */}
      <motion.div
        style={{ y: yText }}
        className="container mx-auto px-6 relative z-30 flex flex-col items-center text-center mt-12 md:mt-0"
      >

        {/* CROWN: Pulsing Glow Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 md:mb-8 relative"
        >
          {/* Glow behind crown */}
          <div className="inset-0 bg-[#D4AF37] blur-[30px] opacity-20 animate-pulse rounded-full md:mt-20"></div>
          <Crown size={36} strokeWidth={1} className="text-[#D4AF37] relative z-10 md:w-[42px] md:h-[42px]" />
        </motion.div>

        {/* Est. Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-4"
        >
          <span className={`${montserrat.className} text-[#D4AF37] font-bold text-[10px] md:text-sm tracking-[0.5em] uppercase`}>Est. 1726</span>
        </motion.div>

        {/* Title */}
        <h1 className={`${cinzel.className} text-[#0B2447] leading-[0.9] tracking-tight mb-8 drop-shadow-sm`}>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="block text-4xl md:text-6xl lg:text-7xl"
          >
            Royal House
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className={`block ${pinyon.className} text-[#C5A059] text-5xl md:text-6xl lg:text-7xl my-3 md:my-2 tracking-normal`}
          >
            of
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="block text-4xl md:text-6xl lg:text-7xl"
          >
            Bharuch
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <p className={`${lato.className} text-[#0B2447]/70 text-sm md:text-lg font-light italic tracking-wide max-w-[260px] md:max-w-lg mx-auto leading-relaxed`}>
            Custodians of Heritage • Defenders of Faith
          </p>

          <div className="flex flex-col items-center gap-1 opacity-60">
            <div className="w-px h-12 bg-linear-to-b from-[#D4AF37] to-transparent"></div>
          </div>
        </motion.div>
      </motion.div>

      {/* --- INSERT HERO ANNOUNCEMENT --- */}
      <HeroAnnouncement />

    </section>
  );
};

const Sovereign = () => {
  return (
    <section id="sovereign" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className={`absolute top-20 right-0 text-[100px] md:text-[200px] leading-none text-black/2 ${cinzel.className} pointer-events-none select-none z-0`}>
        H.R.H.
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative group cursor-hover order-2 md:order-1"
          >
            <div className="absolute -inset-4 border border-[#D4AF37]/40 z-0"></div>
            <div className="relative h-[400px] md:h-[600px] w-full bg-[#f0f0f0] overflow-hidden z-10 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                alt="Head of House"
                fill
                className="object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-[0.5]"
              />
              <div className="absolute inset-4 border border-white/20 pointer-events-none"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <span className={`${montserrat.className} text-[#D4AF37] font-bold text-xs tracking-[0.3em] uppercase mb-4 block`}>
              The Head of the House
            </span>
            <h2 className={`${cinzel.className} text-4xl md:text-6xl text-[#0B2447] mb-8 leading-none`}>
              Nawab of <br /> <span className="italic font-light opacity-80">Bharuch</span>
            </h2>

            <div className="space-y-6 text-[#0B2447]/70 text-base md:text-lg font-light leading-relaxed font-serif">
              <p>
                As the current custodian of the Royal House of Bharuch, His Royal Highness is dedicated to modernizing the role of the monarchy while strictly adhering to the traditions of the ancestors.
              </p>
              <p>
                "Our duty is not to govern, but to serve. To be a beacon of continuity in a world of constant change."
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-[#D4AF37]/20">
              <div className={`${pinyon.className} text-4xl md:text-5xl text-[#0B2447] mb-2`}>H.H. Nawab Haji Mirza Wajahat Ali Khan</div>
              <span className={`text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] ${montserrat.className} font-bold`}>Sovereign Head</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


const Heraldry = () => {
  const symbols = [
    { title: "The Fortress", icon: Landmark, desc: "Ancestral seat of power" },
    { title: "The Dhow", icon: Anchor, desc: "Command over trade routes" },
    { title: "The Lion", icon: Swords, desc: "Courage and defense" }
  ];

  return (
    <section id="heraldry" className="py-24 md:py-32 bg-[#0B2447] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading subtitle="Symbols of Sovereignty" title="Royal Heraldry" align="center" light={true} />

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {symbols.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="group relative bg-[#ffffff]/5 backdrop-blur-sm border border-[#ffffff]/10 p-10 text-center hover:bg-[#ffffff]/10 transition-all duration-500 cursor-hover"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#0B2447] border border-[#D4AF37] flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-500">
                <item.icon className="w-8 h-8 text-[#D4AF37] -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
              </div>
              <h3 className={`${cinzel.className} text-2xl mt-8 mb-4 text-[#FDFBF7]`}>{item.title}</h3>
              <p className={`${lato.className} text-white/60 font-light`}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Philanthropy = () => {
  return (
    <section id="foundation" className="py-24 md:py-32 bg-white relative">
      <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-12">

        <div className="md:col-span-4 relative">
          <div className="md:sticky md:top-32">
            <span className={`${montserrat.className} text-[#D4AF37] text-xs font-bold uppercase tracking-widest`}>The Royal Foundation</span>
            <h2 className={`${cinzel.className} text-4xl md:text-5xl text-[#0B2447] mt-4 mb-8 leading-tight`}>A Legacy of <br />Service</h2>
            <p className={`${lato.className} text-[#0B2447]/70 text-lg leading-relaxed mb-8`}>
              The Royal House is committed to the welfare of the people, focusing on three core pillars: Health, Education, and Heritage.
            </p>
            <button className="flex items-center gap-3 text-[#0B2447] uppercase tracking-widest text-xs font-bold group cursor-hover">
              Annual Report <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>

        <div className="md:col-span-8 grid gap-8">
          {[
            { icon: Heart, title: "Healthcare Initiatives", text: "Funding mobile clinics and specialized care units for rural districts." },
            { icon: BookOpen, title: "Educational Grants", text: "Scholarships for 500+ students annually in the fields of science and arts." },
            { icon: Leaf, title: "Heritage Conservation", text: "Restoring 18th-century monuments and digitizing ancient manuscripts." }
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col md:flex-row gap-6 p-8 border-l-2 border-gray-100 hover:border-[#D4AF37] hover:bg-[#FDFBF7] transition-all duration-300 group cursor-hover"
            >
              <div className="mt-1 text-gray-400 group-hover:text-[#D4AF37] transition-colors">
                <card.icon size={32} strokeWidth={1} />
              </div>
              <div>
                <h3 className={`${cinzel.className} text-xl md:text-2xl text-[#0B2447] mb-2`}>{card.title}</h3>
                <p className={`${lato.className} text-gray-500 font-light leading-relaxed`}>{card.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default function Home() {
  return (
    <main className={`${cinzel.variable} ${lato.variable} ${pinyon.variable} ${montserrat.variable} bg-[#FDFBF7] selection:bg-[#D4AF37] selection:text-[#0B2447] overflow-x-hidden`}>
      <CustomCursor />
      <GrainOverlay />

      <Hero />
      <RoyalBulletin />
      <Sovereign />
      <RoyalGallery />

      <Lineage />
      <RoyalChannel />
      <Philanthropy />
      <Heraldry />
    </main>
  );
}