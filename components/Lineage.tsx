import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { cinzel, montserrat, lato } from "@/app/fonts"; // Assuming these are your fonts

// --- 1. Decorative Background Component ---
const BackgroundDecoration = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">

    {/* 1. Subtle Paper Texture / Noise (Optional grain) */}
    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply"></div>

    {/* 2. Islamic/Mughal Geometric Grid Pattern */}
    <div className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: 'radial-gradient(#0B2447 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }}>
    </div>

    {/* 3. Large Ornamental Circle (Top Right) */}
    <div className="absolute -top-20 -right-20 w-[600px] h-[600px] opacity-[0.04]">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-[spin_60s_linear_infinite]">
        <path fill="#D4AF37" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.2,-19.2,95.8,-5.2C93.4,8.9,81.8,22.2,70.6,33.4C59.4,44.6,48.6,53.8,36.7,60.8C24.8,67.8,11.8,72.6,-0.8,74C-13.4,75.4,-26,73.4,-37.2,65.8C-48.4,58.2,-58.2,45,-65.4,30.8C-72.6,16.6,-77.2,1.4,-75.6,-13.2C-74,-27.8,-66.2,-41.8,-54.6,-50.2C-43,-58.6,-27.6,-61.4,-13.3,-63.3C1,-65.2,16,-66.2,30.5,-83.6L44.7,-76.4Z" transform="translate(100 100) scale(1.1)" />
      </svg>
    </div>

    {/* 4. Large Ornamental Circle (Bottom Left) */}
    <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] opacity-[0.04]">
      <div className="w-full h-full border-[40px] border-[#D4AF37] rounded-full border-dashed"></div>
    </div>

    {/* 5. Center Glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,#FDFBF7_70%)] z-10"></div>
  </div>
);

// --- 2. Main Component ---
const Lineage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const chronicle = [
    {
      year: "1726",
      ruler: "Abdullah Beg (Nek Alam Khan I)",
      title: "Founder of the Nawabi House of Bharuch",
      desc: "In 1726, Nizam-ul-Mulk, Asaf Jah I, appointed Abdullah Beg as Faujdar (Governor) of Bharuch and granted him the noble title Nek Alam Khan. With the weakening of Mughal authority in Gujarat, Abdullah Beg exercised effective autonomy, laying the foundation of hereditary Nawabi rule in Bharuch. His appointment and title were officially recorded, marking the beginning of the Royal House of Bharuch."
    },
    {
      year: "1736",
      ruler: "Mirza Beg (Nek Alam Khan II)",
      title: "Second Nawab of Bharuch",
      desc: "Following the death of Abdullah Beg, his second son Mirza Beg ascended the throne and adopted the title Nek Alam Khan II. His reign coincided with increasing Maratha influence, yet Bharuch retained its political autonomy."
    },
    {
      year: "1740",
      ruler: "Regional Balance",
      title: "Diplomacy with the Marathas",
      desc: "After the death of Bajirao Peshwa, Nek Alam Khan II arranged his cremation with full honours on the banks of the Narmada at Rawal Khedi, reflecting diplomatic prudence and regional balance."
    },
    {
      year: "1741",
      ruler: "The Great Defence",
      title: "The Siege of Bharuch",
      desc: "Damaji Gaekwad laid siege to Bharuch. Nek Alam Khan II appealed to the Nizam, who declared Bharuch his personal possession. The siege was withdrawn, preserving Bharuch’s autonomy."
    },
    {
      year: "1748",
      ruler: "Sovereign Authority",
      title: "The Royal Mint of Bharuch",
      desc: "With the permission of Emperor Ahmad Shah, a royal mint was established at Bharuch. Coins were struck in the city’s name — a formal symbol of sovereign authority."
    },
    {
      year: "1756-69",
      ruler: "Nawab Rafi-ud-Daula Hamid Neknam Khan Bahadur",
      title: "Restoration of Stability",
      desc: "Hamid Khan, the rightful heir, ascended the throne after a period of dispute. His reign restored stability, strengthened governance, and defended Bharuch against Maratha pressure, notably securing Jambusar in 1761."
    },
    {
      year: "1769-72",
      ruler: "Nawab Imtiyaz-ud-Daula Muazzaz Khan Bahadur",
      title: "The Last Ruling Nawab",
      desc: "He developed Bharuch through wells, fountains and the famous Ahmed Bagh gardens. In 1771, after defeating British forces, he was honoured with a 19-gun salute in Bombay. In 1772, Bharuch Nawabi was lost due to the betrayal of Diwan Lallubhai."
    },
    {
      year: "1803+",
      ruler: "Titular Nawabs of Bharuch",
      title: "Custodians of Heritage",
      desc: "The British recognised the family as Titular Nawabs, granting hereditary Wazifa (pensions) while preserving their noble status. The Royal House remained the custodian of Bharuch’s heritage and lineage."
    },
    {
      year: "Legacy",
      ruler: "The Royal House Today",
      title: "Preserving the Tradition",
      desc: "The descendants of the Nawabs of Bharuch continue as the Royal House of Bharuch, preserving history, heritage, titles, and cultural identity of one of Gujarat’s most distinguished noble houses."
    }
  ];

  // Placeholder for SectionHeading if not imported
  const SectionHeading = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <div className="text-center mb-16 relative z-20">
      <span className={`${montserrat.className} text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em]`}>{subtitle}</span>
      <h2 className={`${cinzel.className} text-4xl md:text-5xl text-[#0B2447] mt-3`}>{title}</h2>
    </div>
  );

  return (
    <section id="history" ref={containerRef} className="py-24 md:py-32 bg-[#FDFBF7] relative overflow-hidden">

      {/* --- ADDED BACKGROUND DECORATION --- */}
      <BackgroundDecoration />

      <SectionHeading subtitle="The Chronicle" title="History of the Nawabs" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* Animated Golden Thread (Progress Line) - Hidden on Mobile */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#0B2447]/10 transform -translate-x-1/2 h-full z-0">
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute top-0 left-0 w-full bg-[#D4AF37] origin-top h-full shadow-[0_0_10px_#D4AF37]"
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
                <div className="w-4 h-4 bg-[#FDFBF7] border border-[#D4AF37] rotate-45 flex items-center justify-center shadow-lg ring-4 ring-[#FDFBF7]">
                  <div className="w-1.5 h-1.5 bg-[#0B2447]"></div>
                </div>
              </div>

              {/* Spacer */}
              <div className="flex-1 hidden md:block"></div>

              {/* Content Card */}
              <div className="flex-1 w-full md:px-16">
                <div className={`
                    relative p-8 bg-white/80 backdrop-blur-sm border border-[#D4AF37]/20 shadow-[0_10px_30px_-10px_rgba(11,36,71,0.05)] 
                    hover:border-[#D4AF37]/50 hover:shadow-xl transition-all duration-500 group
                    ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'} text-center md:text-left
                    rounded-sm
                  `}>

                  {/* Decorative corner accents for the card */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37] opacity-30 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#D4AF37] opacity-30 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#D4AF37] opacity-30 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37] opacity-30 group-hover:opacity-100 transition-opacity"></div>

                  {/* Year */}
                  <div className={`flex items-center gap-4 mb-4 ${idx % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} justify-center`}>
                    <h3 className={`${cinzel.className} text-4xl md:text-5xl text-[#D4AF37] font-bold opacity-90`}>{event.year}</h3>
                    <div className="h-px w-12 bg-[#D4AF37]/50"></div>
                  </div>

                  <div className="relative z-10">
                    <span className={`${montserrat.className} text-[#0B2447]/60 font-bold text-[10px] tracking-[0.2em] uppercase mb-2 block`}>
                      {event.ruler}
                    </span>
                    <h3 className={`${cinzel.className} text-xl md:text-2xl text-[#0B2447] mb-4`}>{event.title}</h3>
                    <p className={`${lato.className} text-gray-600 font-light leading-relaxed text-sm`}>{event.desc}</p>
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

export default Lineage;