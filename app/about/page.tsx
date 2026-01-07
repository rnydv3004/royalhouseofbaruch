"use client";

import Link from "next/link";
import { Cinzel, Lato, Pinyon_Script, Montserrat } from "next/font/google";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Crown, Shield, Users, Scroll, ArrowRight, Globe, Star, 
  Landmark, Heart, BookOpen, Feather
} from "lucide-react";
import Navbar from "@/components/NavBar";
import { useRef } from "react";

// --- FONTS ---
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: '--font-cinzel' });
const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"], variable: '--font-lato' });
const pinyon = Pinyon_Script({ weight: ["400"], subsets: ["latin"], variable: '--font-pinyon' });
const montserrat = Montserrat({ subsets: ["latin"], variable: '--font-montserrat' });

// --- UTILS ---
const SectionHeading = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="text-center mb-16 relative z-10">
    <span className={`${montserrat.className} text-[#D4AF37] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase block mb-3`}>
      {subtitle}
    </span>
    <h2 className={`${cinzel.className} text-3xl md:text-5xl text-[#0B2447]`}>
      {title}
    </h2>
    <div className="h-px w-24 bg-[#D4AF37] mx-auto mt-6"></div>
  </div>
);

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <main className={`min-h-screen bg-[#FDFBF7] selection:bg-[#D4AF37] selection:text-[#0B2447] overflow-x-hidden ${cinzel.variable} ${lato.variable} ${pinyon.variable} ${montserrat.variable}`} ref={containerRef}>
      <Navbar />

      {/* --- HERO: INTRODUCTION --- */}
      <section className="relative pt-32 pb-24 px-6 container mx-auto text-center">
        {/* Abstract Background Element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] border border-[#D4AF37]/10 rounded-full opacity-50 pointer-events-none -z-10"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <div className="inline-block p-3 border border-[#D4AF37] rounded-full mb-8 opacity-60">
            <Crown size={24} className="text-[#0B2447]" />
          </div>

          <h1 className={`${cinzel.className} text-5xl md:text-7xl text-[#0B2447] mb-8 leading-tight`}>
            The Royal House <br/>
            <span className={`${pinyon.className} text-[#D4AF37] text-6xl md:text-8xl lowercase block mt-2`}>of</span> Bharuch
          </h1>
          
          <div className="relative">
            {/* Decorative Side Lines */}
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-[#D4AF37]/40 to-transparent"></div>
            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-[#D4AF37]/40 to-transparent"></div>

            <div className={`${lato.className} text-[#0B2447]/80 text-lg md:text-xl font-light leading-relaxed px-4 md:px-12`}>
              <p className="mb-6 first-letter:float-left first-letter:text-6xl first-letter:pr-4 first-letter:font-bold first-letter:text-[#D4AF37] first-letter:font-serif">
                The Royal House of Bharuch, a distinguished noble lineage from the historic city of Bharuch in Gujarat, India, carries a proud legacy of leadership, cultural preservation, and public service. 
              </p>
              <p>
                Rooted in centuries of princely tradition, the House has long stood as a symbol of dignity, justice, and royal responsibility, bridging the glorious past with a progressive future.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- NEW SECTION: THE PILLARS (Mission) --- */}
      <section className="py-20 bg-white border-y border-[#D4AF37]/10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Landmark, title: "Historical Preservation", text: "Safeguarding the architectural and written heritage of the dynasty for future generations." },
              { icon: Heart, title: "Community Welfare", text: "Dedicated to the upliftment of society through charitable initiatives and educational grants." },
              { icon: Globe, title: "Cultural Diplomacy", text: "Representing the values of the House on global platforms and fostering intercultural dialogue." }
            ].map((pillar, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="flex flex-col items-center text-center p-6 hover:bg-[#FDFBF7] transition-colors duration-500 rounded-sm"
              >
                <pillar.icon className="w-10 h-10 text-[#D4AF37] mb-6" strokeWidth={1} />
                <h3 className={`${cinzel.className} text-xl text-[#0B2447] mb-4`}>{pillar.title}</h3>
                <p className={`${lato.className} text-[#0B2447]/60 font-light leading-relaxed`}>{pillar.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- LEADERSHIP SECTION (Enhanced) --- */}
      <section className="py-24 bg-[#FDFBF7] relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%230B2447' stroke-width='1'/%3E%3C/svg%3E")` }}></div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <SectionHeading title="The Present Leadership" subtitle="Custodians of the Throne" />

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start max-w-6xl mx-auto">
            
            {/* 1. The Head of the House */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border-t-4 border-[#0B2447] relative group hover:shadow-2xl transition-all duration-500"
            >
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Crown size={80} />
              </div>

              <span className={`${montserrat.className} text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block`}>
                Head of the Royal House
              </span>
              
              <h3 className={`${cinzel.className} text-3xl text-[#0B2447] mb-6 leading-snug`}>
                H.R.H. Nawab Haji Mirza <br/> Wajahat Ali Khan Bahadur
              </h3>
              
              <p className={`${lato.className} text-[#0B2447]/70 leading-relaxed font-light mb-8`}>
                As the sovereign head, His Royal Highness upholds the royal family’s enduring values. He oversees all ceremonial duties, acts as the spiritual anchor of the family, and ensures the traditions of the ancestors remain inviolate in the modern age.
              </p>

              {/* Signature Area */}
              <div className="mt-auto pt-6 border-t border-dashed border-[#0B2447]/10">
                <p className={`${pinyon.className} text-4xl text-[#0B2447] opacity-80 rotate-[-2deg]`}>Mirza Wajahat Ali</p>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-2">Sovereign Sign Manual</p>
              </div>
            </motion.div>

            {/* 2. The Nawabzada */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border-t-4 border-[#D4AF37] relative group hover:shadow-2xl transition-all duration-500"
            >
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Star size={80} />
              </div>

              <span className={`${montserrat.className} text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block`}>
                Heir Apparent & Operational Head
              </span>
              
              <h3 className={`${cinzel.className} text-3xl text-[#0B2447] mb-6 leading-snug`}>
                H.H. Nawabzada <br/> Ali Adil Khan
              </h3>
              
              <p className={`${lato.className} text-[#0B2447]/70 leading-relaxed font-light mb-8`}>
                Serving as the central figure in the execution of royal initiatives, His Highness leads diplomatic relations, digital transformation, and social welfare efforts. The future planning and strategic vision of the House lie firmly in his hands.
              </p>

              {/* Signature Area */}
              <div className="mt-auto pt-6 border-t border-dashed border-[#0B2447]/10">
                <p className={`${pinyon.className} text-4xl text-[#0B2447] opacity-80 rotate-[-2deg]`}>Ali Adil Khan</p>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-2">Official Seal</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- QUOTE BREAK --- */}
      <section className="py-24 bg-[#0B2447] text-[#FDFBF7] relative overflow-hidden flex items-center justify-center text-center px-6">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
         <motion.div style={{ y: yParallax }} className="max-w-3xl relative z-10">
            <Feather className="w-12 h-12 text-[#D4AF37] mx-auto mb-6 opacity-80" />
            <h3 className={`${cinzel.className} text-2xl md:text-4xl leading-relaxed italic`}>
              "To be a guardian of heritage is not merely to look backward, but to carry the flame of our ancestors forward to light the way for generations to come."
            </h3>
         </motion.div>
      </section>

      {/* --- NAVIGATION GATEWAYS --- */}
      <section className="py-32 container mx-auto px-6">
        <SectionHeading title="The Royal Archives" subtitle="Explore the History" />

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {[
            { 
              title: "Coat of Arms", 
              link: "/coat-of-arms", 
              icon: Shield, 
              desc: "The heraldic symbols, the shield, and the motto that define the identity of the House.",
              label: "View Heraldry"
            },
            { 
              title: "Family Tree", 
              link: "/family-tree", 
              icon: Users, 
              desc: "Tracing the lineage from the first Nawab, Abdullah Beg, to the present generation.",
              label: "View Genealogy"
            },
            { 
              title: "Succession", 
              link: "/succession", 
              icon: Scroll, 
              desc: "The laws of primogeniture and the Royal Decrees governing leadership.",
              label: "Read Laws"
            }
          ].map((item, idx) => (
            <Link href={item.link} key={idx} className="group">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="h-full bg-white border border-[#D4AF37]/20 p-10 flex flex-col items-center text-center hover:border-[#D4AF37] transition-all duration-500 cursor-pointer relative overflow-hidden group-hover:-translate-y-2 shadow-sm group-hover:shadow-[0_20px_40px_-10px_rgba(212,175,55,0.2)]"
              >
                {/* Hover Background Effect */}
                <div className="absolute inset-0 bg-[#FDFBF7] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                
                <div className="w-16 h-16 border border-[#D4AF37] rotate-45 flex items-center justify-center mb-8 group-hover:rotate-0 transition-transform duration-500 bg-white">
                  <item.icon className="text-[#0B2447] w-8 h-8 group-hover:text-[#D4AF37] -rotate-45 group-hover:rotate-0 transition-all" strokeWidth={1} />
                </div>
                
                <h3 className={`${cinzel.className} text-xl text-[#0B2447] mb-4`}>{item.title}</h3>
                <div className="w-8 h-px bg-[#D4AF37]/50 mb-4 group-hover:w-16 transition-all duration-500"></div>
                
                <p className={`${lato.className} text-sm text-gray-500 mb-8 font-light leading-relaxed`}>
                  {item.desc}
                </p>
                
                <div className="mt-auto flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#0B2447] group-hover:text-[#D4AF37] transition-colors">
                  {item.label} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </Link>
          ))}

        </div>
      </section>

      {/* --- FOOTER STATEMENT --- */}
      <footer className="py-12 text-center opacity-40 border-t border-[#0B2447]/5">
        <p className={`${montserrat.className} text-[10px] uppercase tracking-[0.2em] text-[#0B2447]`}>
          © The Royal House of Bharuch
        </p>
      </footer>
    </main>
  );
}