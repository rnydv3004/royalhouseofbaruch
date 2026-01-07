"use client";

import { useRef } from "react";
import Image from "next/image";
import { Cinzel, Lato, Pinyon_Script, Montserrat } from "next/font/google";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Crown, Swords, Scroll, Coins, ShieldAlert, Landmark, Feather, 
  Map, Skull, Scale, History as HistoryIcon, ChevronDown 
} from "lucide-react";
import Navbar from "@/components/NavBar"; 

// --- FONTS ---
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: '--font-cinzel' });
const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"], variable: '--font-lato' });
const pinyon = Pinyon_Script({ weight: ["400"], subsets: ["latin"], variable: '--font-pinyon' });
const montserrat = Montserrat({ subsets: ["latin"], variable: '--font-montserrat' });

// --- DATA ---
const historyData = [
  {
    year: "1726",
    era: "The Foundation",
    title: "The First Nawab",
    ruler: "Nawab Abdullah Beg",
    icon: Crown,
    content: "Nizam-ul-Mulk appointed the courageous commander Abdullah Beg as governor. He exercised effective autonomy, becoming the first Nawab of the state and establishing hereditary rule.",
    stat: "Est. 1726"
  },
  {
    year: "1736",
    era: "The Succession",
    title: "Diplomacy & Strength",
    ruler: "Nawab Mirza Beg",
    icon: Scroll,
    content: "Ascending amidst growing Maratha power, Mirza Beg maintained autonomy. In a display of supreme diplomatic prudence, he arranged the cremation of Bajirao Peshwa with full honors in 1740.",
    stat: "Reign: 4 Years"
  },
  {
    year: "1741",
    era: "The Defence",
    title: "The Great Siege",
    ruler: "The City Defended",
    icon: ShieldAlert,
    content: "Damaji Gaekwad laid siege to the city. The Nizam intervened, declaring Bharuch his personal possession. The siege was withdrawn, proving the strategic importance of the fortress.",
    stat: "Victory"
  },
  {
    year: "1748",
    era: "Sovereignty",
    title: "The Royal Mint",
    ruler: "Economic Independence",
    icon: Coins,
    content: "With Emperor Ahmad Shah's permission, a mint was established. Coins were issued in the city's name—the ultimate symbol of sovereignty in the 18th century.",
    stat: "Mint Established"
  },
  {
    year: "1756",
    era: "Stability",
    title: "Restoration of Order",
    ruler: "Nawab Hamid Khan",
    icon: Swords,
    content: "After a succession dispute, Hamid Khan ascended the throne. A warrior king, he defeated Maratha forces near Jambusar in 1761, securing the state's borders.",
    stat: "Battle of Jambusar"
  },
  {
    year: "1769",
    era: "The Golden Age",
    title: "The Builder King",
    ruler: "Nawab Muazzaz Khan",
    icon: Landmark,
    content: "The last independent ruler. He built the Ahmed Bagh gardens and was honored with a 19-gun salute by the British in Bombay, reflecting the state's prestige.",
    stat: "19-Gun Salute"
  },
  {
    year: "1772",
    era: "The Betrayal",
    title: "The Fall of Bharuch",
    ruler: "End of Independence",
    icon: Skull,
    content: "Betrayed by his Diwan Lallubhai, the Nawab defended the city for 36 hours against British forces before being forced to retreat. He died in exile, heartbroken.",
    stat: "Nov 18, 1772"
  },
  {
    year: "1803",
    era: "The Legacy",
    title: "The Titular Nawabs",
    ruler: "Custodians of Heritage",
    icon: Scale,
    content: "Recognized as Hereditary Pensioners, the family retained their noble status. The British continued to list them as Ex-Nawabs well into the 20th century.",
    stat: "Hereditary Title"
  }
];

// --- UTILS ---
const SectionDivider = () => (
  <div className="flex justify-center items-center py-16 opacity-30">
    <div className="h-px w-16 bg-[#0B2447]"></div>
    <div className="mx-4 text-[#D4AF37]">✦</div>
    <div className="h-px w-16 bg-[#0B2447]"></div>
  </div>
);

// --- MAIN COMPONENT ---
export default function HistoryPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <main className={`min-h-screen bg-[#FDFBF7] selection:bg-[#D4AF37] selection:text-[#0B2447] overflow-x-hidden ${cinzel.variable} ${lato.variable} ${pinyon.variable} ${montserrat.variable}`}>
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Subtle Grain Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
        </div>
        
        {/* Background Radial Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent"></div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="w-px h-16 bg-gradient-to-b from-transparent to-[#0B2447]"></div>
            <Crown className="text-[#D4AF37] w-8 h-8" strokeWidth={1} />
          </div>
          
          <h1 className={`${cinzel.className} text-5xl md:text-7xl lg:text-8xl text-[#0B2447] tracking-tight mb-4`}>
            Royal <span className="text-[#D4AF37]">Chronicle</span>
          </h1>
          <p className={`${pinyon.className} text-2xl md:text-4xl text-[#0B2447]/60`}>
            The History of the House of Bharuch
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 animate-bounce text-[#0B2447]/40"
        >
          <ChevronDown />
        </motion.div>
      </section>

      {/* --- SYMMETRICAL TIMELINE --- */}
      <section ref={containerRef} className="relative py-20 md:py-32 container mx-auto px-4 md:px-0">
        
        {/* The Central Spine (Desktop) / Left Spine (Mobile) */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[#0B2447]/10 transform md:-translate-x-1/2 h-full z-0">
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute top-0 left-0 w-full bg-[#D4AF37] origin-top h-full shadow-[0_0_15px_rgba(212,175,55,0.4)]"
          />
        </div>

        <div className="space-y-24 md:space-y-32">
          {historyData.map((item, index) => {
            const isRight = index % 2 !== 0; // Alternating layout

            return (
              <div key={index} className="relative flex flex-col md:flex-row items-center w-full">
                
                {/* 1. LEFT SIDE (Content on Even, Date on Odd) */}
                <div className={`flex-1 w-full md:w-auto flex ${isRight ? 'md:justify-start pl-16 md:pl-24' : 'md:justify-end pr-0 md:pr-24'} pl-16 mb-8 md:mb-0 order-2 md:order-1`}>
                  
                  {/* If it's the LEFT side item (Desktop) */}
                  {!isRight ? (
                    <motion.div 
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="text-left md:text-right"
                    >
                       <span className={`${montserrat.className} text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-2 block`}>{item.era}</span>
                       <h3 className={`${cinzel.className} text-3xl md:text-4xl text-[#0B2447] mb-4`}>{item.title}</h3>
                       <p className={`${lato.className} text-[#0B2447]/70 leading-relaxed font-light mb-6 max-w-md ml-auto`}>{item.content}</p>
                       
                       <div className="flex items-center md:justify-end gap-3 opacity-60">
                         <div className="h-px w-12 bg-[#0B2447]"></div>
                         <span className={`${pinyon.className} text-xl`}>{item.ruler}</span>
                       </div>
                    </motion.div>
                  ) : (
                    // If it's the RIGHT side, this Left block holds the YEAR (Desktop Only)
                    <div className="hidden md:block text-right pr-12">
                      <span className={`${cinzel.className} text-6xl text-[#0B2447]/10 font-bold`}>{item.year}</span>
                    </div>
                  )}
                </div>

                {/* 2. CENTER NODE */}
                <div className="absolute left-8 md:left-1/2 top-0 md:top-1/2 transform -translate-x-1/2 md:-translate-y-1/2 z-10 order-1 md:order-2">
                  <div className="relative group">
                    <div className="w-4 h-4 bg-[#FDFBF7] border-2 border-[#D4AF37] rotate-45 transition-all duration-500 group-hover:scale-150 group-hover:bg-[#D4AF37]"></div>
                    {/* Icon Tooltip on Hover */}
                    <div className="absolute left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:hidden bg-[#0B2447] text-[#D4AF37] p-2 rounded text-xs whitespace-nowrap">
                        {item.year}
                    </div>
                  </div>
                </div>

                {/* 3. RIGHT SIDE (Date on Even, Content on Odd) */}
                <div className={`flex-1 w-full md:w-auto flex ${isRight ? 'md:justify-end pr-0 md:pr-24' : 'md:justify-start pl-16 md:pl-24'} pl-16 order-3`}>
                   
                   {/* If it's the RIGHT side item (Desktop) */}
                   {isRight ? (
                    <motion.div 
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="text-left"
                    >
                       <span className={`${montserrat.className} text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-2 block`}>{item.era}</span>
                       <h3 className={`${cinzel.className} text-3xl md:text-4xl text-[#0B2447] mb-4`}>{item.title}</h3>
                       <p className={`${lato.className} text-[#0B2447]/70 leading-relaxed font-light mb-6 max-w-md mr-auto`}>{item.content}</p>
                       
                       <div className="flex items-center justify-start gap-3 opacity-60">
                         <span className={`${pinyon.className} text-xl`}>{item.ruler}</span>
                         <div className="h-px w-12 bg-[#0B2447]"></div>
                       </div>
                    </motion.div>
                  ) : (
                    // If it's the LEFT side, this Right block holds the YEAR (Desktop Only)
                    <div className="hidden md:block text-left pl-12">
                      <span className={`${cinzel.className} text-6xl text-[#0B2447]/10 font-bold`}>{item.year}</span>
                    </div>
                  )}

                  {/* MOBILE ONLY: YEAR DISPLAY (Since we hide the big symmetric year on mobile) */}
                  <div className="md:hidden absolute -top-8 left-16">
                      <span className={`${cinzel.className} text-4xl text-[#D4AF37]`}>{item.year}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      <SectionDivider />

      {/* --- FOOTER / CITATIONS --- */}
      <footer className="pb-24 pt-12 text-center container mx-auto px-6">
        <div className="max-w-2xl mx-auto border border-[#D4AF37]/20 p-8 md:p-12 relative bg-white">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FDFBF7] px-4">
             <Landmark className="text-[#D4AF37] w-6 h-6" />
          </div>
          
          <h4 className={`${cinzel.className} text-xl text-[#0B2447] mb-6`}>Historical Bibliography</h4>
          <div className={`grid md:grid-cols-2 gap-4 text-xs ${lato.className} text-[#0B2447]/60 text-left`}>
             <p>1. Bombay Gazetteer, Vol. 1, Part 1 (1884)</p>
             <p>2. Bharuch District Gazetteer, Vol. 2</p>
             <p>3. Gujarat Gazetteer, Vol. 1, Part 1</p>
             <p>4. The Indian Year Book, Vol. 25 (1939)</p>
          </div>
          
          <div className="mt-8 pt-8 border-t border-[#0B2447]/5">
             <p className={`${pinyon.className} text-xl text-[#D4AF37]`}>Veritas et Honos</p>
          </div>
        </div>
        
        <div className="mt-12 text-[10px] uppercase tracking-widest opacity-40">
           © {new Date().getFullYear()} The Royal House of Bharuch
        </div>
      </footer>

    </main>
  );
}