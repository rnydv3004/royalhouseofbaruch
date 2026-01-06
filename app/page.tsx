"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Cinzel, Lato, Pinyon_Script, Montserrat } from "next/font/google";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Menu, X, Crown, Anchor, Swords, Landmark, Scroll, Heart, Leaf, BookOpen, ArrowRight
} from "lucide-react";
import Navbar from "@/components/NavBar";

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

const CornerFlourish = ({ className }: { className: string }) => (
  <svg className={className} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2V35C2 35 5 45 15 45C25 45 30 35 30 35V15H50C50 15 60 15 60 25" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M2 2H35C35 2 45 5 45 15C45 25 35 30 30 30H15V50C15 50 15 60 25 60" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
    {/* Decorative Dots */}
    <circle cx="5" cy="5" r="3" fill="#D4AF37" />
    <circle cx="60" cy="25" r="2" fill="#D4AF37" />
    <circle cx="25" cy="60" r="2" fill="#D4AF37" />
    {/* Inner curve */}
    <path d="M10 10C10 10 20 20 40 10" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.5" />
    <path d="M10 10C10 10 20 20 10 40" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.5" />
  </svg>
);

const Hero = () => {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white py-20 md:py-0">

      {/* 1. STATIC BACKGROUND TEXTURE (The "Jali" Screen) */}
      {/* This adds the texture of carved marble stone to the whole page */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23D4AF37' stroke-width='0.5'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' /%3E%3Ccircle cx='30' cy='30' r='10' /%3E%3Cpath d='M30 0 v60 M0 30 h60' stroke-opacity='0.3'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* 2. THE ROYAL FRAME - WITH ORNAMENTAL TRACK */}
      {/* DESKTOP RECTANGLE FRAME (Hidden on Mobile) */}
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
      {/* Resembles the honeycomb ceiling patterns in Islamic architecture */}
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
      {/* A dense floral sunburst found on royal manuscripts */}
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

      {/* 4. ANIMATED BACKGROUND LAYERS (More visible on mobile now) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.08] pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }} // Faster rotation for mobile appeal
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
              The Crown <br /> <span className="italic font-light opacity-80">Prince</span>
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
              <div className={`${pinyon.className} text-4xl md:text-5xl text-[#0B2447] mb-2`}>Nawab Mirza Wajahat Ali</div>
              <span className={`text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] ${montserrat.className} font-bold`}>Sovereign Head</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- FIX: LINEAGE WITH CLEAR HEADINGS ---
const Lineage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const chronicle = [
    {
      year: "1726",
      ruler: "Nawab Abdullah Beg",
      title: "The First Nawab",
      desc: "Appointed by Nizam-ul-Mulk, Abdullah Beg established hereditary rule in Bharuch. As Mughal control waned in Gujarat, he exercised effective autonomy."
    },
    {
      year: "1736",
      ruler: "Nawab Mirza Beg",
      title: "Diplomacy & Strength",
      desc: "Ascending the throne amidst growing Maratha power, Mirza Beg maintained political autonomy. He arranged the cremation of Bajirao Peshwa with full honors."
    },
    {
      year: "1741",
      ruler: "The Great Defence",
      title: "Siege of Bharuch",
      desc: "When Damaji Gaekwad laid siege to the city, the Nizam intervened, declaring Bharuch his personal possession. The siege was withdrawn."
    },
    {
      year: "1748",
      ruler: "Sovereignty Asserted",
      title: "The Royal Mint",
      desc: "With the permission of Emperor Ahmad Shah, a mint was established at Bharuch. Coins were issued in the city's name—a definitive symbol of sovereignty."
    },
    {
      year: "1756",
      ruler: "Nawab Hamid Khan",
      title: "Restoration of Order",
      desc: "After a succession dispute, Hamid Khan ascended the throne, bringing stability. He defeated Maratha forces near Jambusar in 1761."
    },
    {
      year: "1769",
      ruler: "Nawab Muazzaz Khan",
      title: "The Last Independent Ruler",
      desc: "A patron of development, he built the Ahmed Bagh gardens. His reign ended due to the betrayal of his Diwan, Lallubhai."
    },
    {
      year: "1803",
      ruler: "Titular Legacy",
      title: "The Hereditary Pensioners",
      desc: "The British recognized the descendants as Titular Nawabs. The family retained their noble status and served as custodians of heritage."
    }
  ];

  return (
    <section id="history" ref={containerRef} className="py-24 md:py-32 bg-[#FDFBF7] relative overflow-hidden">

      <SectionHeading subtitle="The Chronicle" title="History of the Nawabs" />

      <div className="container mx-auto px-6 md:px-12 relative">

        {/* Animated Golden Thread (Progress Line) - Hidden on Mobile */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#0B2447]/5 transform -translate-x-1/2 h-full z-0">
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute top-0 left-0 w-full bg-[#D4AF37] origin-top h-full"
          />
        </div>

        <div className="space-y-16 md:space-y-32">
          {chronicle.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className={`relative flex flex-col md:flex-row gap-8 md:gap-0 items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >

              {/* Central Jewel - Hidden on Mobile */}
              <div className="hidden md:flex absolute left-1/2 top-0 -translate-x-1/2 z-20 w-8 h-8 items-center justify-center">
                <div className="w-5 h-5 bg-[#FDFBF7] border-2 border-[#D4AF37] rotate-45 flex items-center justify-center shadow-lg">
                  <div className="w-2 h-2 bg-[#0B2447]"></div>
                </div>
              </div>

              {/* Spacer */}
              <div className="flex-1 hidden md:block"></div>

              {/* Content Card */}
              <div className="flex-1 w-full md:px-16">
                <div className={`
                    relative p-8 bg-white border border-[#D4AF37]/20 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] 
                    hover:border-[#D4AF37] transition-all duration-500 cursor-hover
                    ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'} text-center md:text-left
                 `}>

                  {/* FIXED YEAR: No longer overlapping. Displayed clearly at the top of the card. */}
                  <div className={`flex items-baseline gap-4 mb-4 ${idx % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} justify-center`}>
                    <h3 className={`${cinzel.className} text-4xl md:text-5xl text-[#D4AF37] font-bold`}>{event.year}</h3>
                    <div className="h-px w-12 bg-[#D4AF37]/50"></div>
                  </div>

                  <div className="relative z-10">
                    <span className={`${montserrat.className} text-[#0B2447]/60 font-bold text-[10px] tracking-[0.2em] uppercase mb-2 block`}>
                      {event.ruler}
                    </span>
                    <h3 className={`${cinzel.className} text-xl md:text-2xl text-[#0B2447] mb-4`}>{event.title}</h3>
                    <p className={`${lato.className} text-gray-500 font-light leading-relaxed text-sm`}>{event.desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
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

const Gazette = () => {
  return (
    <section id="gazette" className="py-24 md:py-32 bg-[#F9F8F6]">
      <SectionHeading subtitle="Official Communications" title="The Royal Gazette" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <article key={i} className="group bg-white p-2 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-hover">
              <div className="relative h-64 overflow-hidden mb-6">
                <Image
                  src={`https://images.unsplash.com/photo-1599940824399-b87987ce0799?w=800&q=80`}
                  alt="News" fill className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#0B2447]/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>

              <div className="px-6 pb-8">
                <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
                  <span className={`${montserrat.className} text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest`}>Decree</span>
                  <span className={`${lato.className} text-xs text-gray-400 italic`}>May 24, 2026</span>
                </div>

                <h3 className={`${cinzel.className} text-xl text-[#0B2447] mb-4 leading-snug group-hover:text-[#8B1E1E] transition-colors`}>
                  Restoration of the Coastal Fortifications
                </h3>

                <button className={`text-[10px] font-bold uppercase tracking-widest text-[#0B2447] group-hover:text-[#D4AF37] transition-colors flex items-center gap-2 ${montserrat.className}`}>
                  Read Entry <span className="w-8 h-px bg-current"></span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#0B2447] text-white pt-24 pb-12 border-t-8 border-[#D4AF37] relative">
      <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-4 gap-12 mb-20 relative z-10">

        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 relative grayscale opacity-80">
              <Image src="/logo.webp" alt="Crest" fill className="object-contain" />
            </div>
            <div>
              <h4 className={`${cinzel.className} text-2xl font-bold`}>House of Bharuch</h4>
              <p className={`${pinyon.className} text-[#D4AF37] text-xl`}>Since 1726</p>
            </div>
          </div>
          <p className={`${lato.className} text-white/50 text-sm leading-relaxed max-w-md font-light`}>
            The Royal House is dedicated to the preservation of heritage, the promotion of education, and the welfare of the people through sustained philanthropic efforts.
          </p>
        </div>

        <div>
          <h5 className={`${montserrat.className} text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-8`}>The Household</h5>
          <ul className={`space-y-4 text-sm text-white/60 ${lato.className} font-light`}>
            {["The Royal Family", "Orders & Decorations", "Patronages", "History"].map(item => (
              <li key={item}><a href="#" className="hover:text-white hover:translate-x-2 transition-all inline-block cursor-hover">{item}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className={`${montserrat.className} text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-8`}>Chancery</h5>
          <div className="space-y-4 text-sm text-white/60 font-light">
            <p className="flex items-center gap-3"><Scroll size={14} className="text-[#D4AF37]" /> Office of the Grand Chancellor</p>
            <p className="flex items-center gap-3"><Anchor size={14} className="text-[#D4AF37]" /> Palace Grounds, Bharuch</p>
            <p className="flex items-center gap-3 text-white"><span className="w-2 h-2 rounded-full bg-green-500"></span> Open for Inquiries</p>
          </div>
        </div>

      </div>

      <div className="container mx-auto px-6 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center opacity-40">
        <p className={`text-[10px] uppercase tracking-[0.2em] ${montserrat.className}`}>
          © {new Date().getFullYear()} The Royal House of Bharuch.
        </p>
        <p className={`text-[10px] uppercase tracking-[0.2em] ${montserrat.className} mt-4 md:mt-0`}>
          Noblesse Oblige
        </p>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <main className={`${cinzel.variable} ${lato.variable} ${pinyon.variable} ${montserrat.variable} bg-[#FDFBF7] selection:bg-[#D4AF37] selection:text-[#0B2447] overflow-x-hidden`}>
      <CustomCursor />
      <GrainOverlay />
      <Navbar />

      <Hero />
      <Sovereign />
      <Lineage />
      <Heraldry />
      <Philanthropy />
      <Gazette />
      <Footer />
    </main>
  );
}