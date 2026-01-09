"use client";

import { useRef } from "react";
import { Cinzel, Lato, Pinyon_Script, Montserrat } from "next/font/google";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Crown, Scroll, Feather, Map, 
  Swords, Anchor, BookOpen, Quote, 
  ChevronDown
} from "lucide-react";

// --- FONTS ---
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500", "600", "700", "900"], variable: '--font-cinzel' });
const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"], variable: '--font-lato' });
const pinyon = Pinyon_Script({ weight: ["400"], subsets: ["latin"], variable: '--font-pinyon' });
const montserrat = Montserrat({ subsets: ["latin"], variable: '--font-montserrat' });

// --- COMPONENTS ---

// 1. Section Divider (The Royal Ornament)
const Divider = () => (
  <div className="flex justify-center items-center py-12 md:py-20 opacity-40">
    <div className="h-px w-12 md:w-24 bg-[#0B2447]"></div>
    <div className="mx-4 text-[#D4AF37] text-xl">✦ ✦ ✦</div>
    <div className="h-px w-12 md:w-24 bg-[#0B2447]"></div>
  </div>
);

// 2. Drop Cap Paragraph (First letter is big and gold)
const DropCapText = ({ children } : { children: any }) => (
  <p className={`${lato.className} text-lg md:text-xl text-[#0B2447]/80 leading-loose text-justify mb-6`}>
    <span className={`${cinzel.className} float-left text-6xl md:text-7xl text-[#D4AF37] pr-3 pt-2 leading-[0.8]`}>
      {children.charAt(0)}
    </span>
    {children.slice(1)}
  </p>
);

// 3. Regular Paragraph
const Paragraph = ({ children } : { children: React.ReactNode }) => (
  <p className={`${lato.className} text-lg md:text-xl text-[#0B2447]/80 leading-loose text-justify mb-6`}>
    {children}
  </p>
);

// 4. Chapter Heading
const ChapterTitle = ({ title, subtitle, date } : { title: string, subtitle?: string, date: string }) => (
  <div className="text-center mb-10 mt-4">
    <span className={`${montserrat.className} text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase block mb-2`}>
      {date}
    </span>
    <h2 className={`${cinzel.className} text-3xl md:text-4xl text-[#0B2447] mb-2`}>
      {title}
    </h2>
    {subtitle && (
      <span className={`${pinyon.className} text-2xl text-[#0B2447]/60`}>
        {subtitle}
      </span>
    )}
  </div>
);

export default function HistoryPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <main ref={containerRef} className={`min-h-screen bg-[#FDFBF7] selection:bg-[#D4AF37] selection:text-[#0B2447] overflow-x-hidden ${cinzel.variable} ${lato.variable} ${pinyon.variable} ${montserrat.variable}`}>

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


      {/* --- CONTENT CONTAINER --- */}
      <article className="max-w-3xl mx-auto px-6 py-20 relative">
        
        {/* Decorative Side Borders (Desktop Only) */}
        <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-px border-l border-dashed border-[#0B2447]/10 ml-12"></div>
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px border-r border-dashed border-[#0B2447]/10 mr-12"></div>

        {/* --- CHAPTER 1: THE FOUNDATION --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-4 text-[#D4AF37]"><Scroll className="w-6 h-6" /></div>
          
          <ChapterTitle 
            date="Circa 1726" 
            title="The First Nawab" 
            subtitle="Abdullah Beg Nek Alam Khan"
          />

          <DropCapText>
            Nizam-ul-Mulk appointed a capable and courageous commander, Abdullah Beg, as governor of Bharuch in 1726, and conferred upon him the title Nek Alam Khan. From this point onward, Abdullah Beg exercised effective autonomy in Bharuch, becoming the first Nawab of the state.¹ His rule marked the beginning of hereditary nawabi authority in Bharuch following the weakening of Mughal control in Gujarat.
          </DropCapText>

          <Paragraph>
            With the decline of Mughal authority in Gujarat, Abdullah Beg exercised effective autonomy and laid the foundation of hereditary nawabi rule in Bharuch. He ruled as the first Nawab until his death in 1736. Abdullah Beg’s eldest son, Mehmood Khan, had predeceased him in 1728, leaving behind a young son, Hamid Khan, who was still a minor at the time of Abdullah Beg’s death.
          </Paragraph>
        </motion.div>

        <Divider />

        {/* --- CHAPTER 2: MARATHA RELATIONS --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-4 text-[#D4AF37]"><Swords className="w-6 h-6" /></div>

          <ChapterTitle 
            date="1736 – 1741" 
            title="Diplomacy & Siege" 
            subtitle="The Reign of Mirza Beg"
          />
          

          <DropCapText>
            In 1736, Mirza Beg, the second son of Abdullah Beg, ascended the throne of Bharuch. Upon accession, he adopted the title Nek Alam Khan II, thereby becoming the second ruler to bear this designation. His reign coincided with growing Maratha influence in western India, although Bharuch continued to maintain a degree of political autonomy.
          </DropCapText>

          <Paragraph>
            In 1740, following the death of Bajirao Peshwa, Mirza Beg Nek Alam Khan II arranged the Peshwa’s cremation with full honors on the banks of the Narmada River at Rawal Khedi (present-day Madhya Pradesh), an act reflecting diplomatic prudence and political realism.
          </Paragraph>

          <div className="bg-[#F4F1EA] p-8 border-l-4 border-[#D4AF37] my-10 italic">
            <p className={`${cinzel.className} text-xl text-[#0B2447] mb-2`}>The Great Siege of 1741</p>
            <p className={`${lato.className} text-[#0B2447]/70`}>
              "Damaji Gaekwad laid siege to Bharuch owing to its strategic location. The Nizam informed Damaji that Bharuch was his personal possession and should not be disturbed. Consequently, Damaji withdrew the siege."
            </p>
          </div>
          

          <Paragraph>
            It is also recorded that Nek Alam Khan paid Damaji a share of the zakat collected in Bharuch, after which the Gaekwads began receiving a regular portion of this revenue.
          </Paragraph>
        </motion.div>

        <Divider />

        {/* --- CHAPTER 3: SOVEREIGNTY --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <ChapterTitle 
            date="1748"
            title="Minting Rights" subtitle={undefined}          />
          
          <DropCapText>
            In 1748, with the permission of Emperor Ahmad Shah, a mint was established at Bharuch, and coins were issued in the city’s name.⁴ This represented a significant assertion of sovereignty.
          </DropCapText>

          <Paragraph>
            Mirza Beg Nek Alam Khan II died in 1752. He was succeeded briefly by his younger brother Khar Talab Khan, who ruled for only three months. Following these events, the descendants of Nizam-ul-Mulk relinquished their claims over Bharuch, leaving the state largely independent.
          </Paragraph>
          
        </motion.div>

        <Divider />

        {/* --- CHAPTER 4: THE GOLDEN AGE & FALL --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
           <div className="flex justify-center mb-4 text-[#D4AF37]"><Map className="w-6 h-6" /></div>

           <ChapterTitle 
            date="1769 – 1772" 
            title="The Last Nawab" 
            subtitle="Muazzaz Khan & The Betrayal"
          />

          <DropCapText>
            Hamid Khan was succeeded by his son Muazzaz Khan, titled Imtiyaz-ud-Daula Muazzaz Khan Bahadur Dilerjung, the last independent Nawab of Bharuch. He added wells, tanks, fountains, reservoirs, and developed the gardens of Ahmed Bagh.
          </DropCapText>

          <Paragraph>
            However, the state was lost in 1772, primarily due to the betrayal of <strong>Diwan Lallubhai</strong>. Originally from Ankleshwar, Lallubhai entered the Nawab’s administration and concentrated power in his hands. When the British attacked Bharuch, Lallubhai deliberately aided them, guiding their forces to breach the fort at the Katopur Gate.
          </Paragraph>

          <Paragraph>
            Despite only 700 soldiers, Nawab Muazzaz Khan initially repelled the British and even killed Wedderburn during battle on 14 November 1772. However, acting on Lallubhai’s advice, the British eventually breached the fort. The Nawab defended the city for 36 hours, but treachery forced him to retreat. He passed away in exile, marking the end of independent Muslim rule in Bharuch.
          </Paragraph>
        </motion.div>

        <Divider />

        {/* --- EPILOGUE: BRITISH ERA --- */}
        <motion.div 
          className="bg-white p-8 md:p-12 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-[#D4AF37]/20 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-6">
             <Anchor className="text-[#0B2447] w-6 h-6" />
             <h3 className={`${cinzel.className} text-2xl text-[#0B2447]`}>The Titular Nawabs (Post-1803)</h3>
          </div>
          
          <Paragraph>
            After 1772, the British allowed the former Nawabs of Bharuch to retain their titles in a nominal capacity along with a Wazifa (allowance). They were recognized as titular and ex-Nawabs, meaning they retained noble status but had no political authority.
          </Paragraph>
          <Paragraph>
             Historical records indicate that Mirza Moazziz Khan, grandson of the last ruling Nawab Muazzaz Khan, was listed as Ex-Nawab of Bharuch in <em>The Indian Year Book</em>. This demonstrates the British practice of preserving titular status while consolidating administrative control.⁷
          </Paragraph>
        </motion.div>

      </article>

      {/* --- FOOTER / BIBLIOGRAPHY --- */}
      <footer className="bg-[#0B2447] text-[#FDFBF7] py-20 mt-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex flex-col items-center mb-12">
            <BookOpen className="text-[#D4AF37] w-8 h-8 mb-4" />
            <h4 className={`${cinzel.className} text-2xl`}>Bibliography & Footnotes</h4>
          </div>

          <div className="grid md:grid-cols-2 gap-8 text-sm opacity-70 leading-relaxed font-light">
            <div>
              <p className="mb-2">1. Bharuch District Gazetteer, vol. 2 (Bombay: Government Central Press, n.d.), 469.</p>
              <p className="mb-2">2. Bombay Gazetteer, vol. 1, pt. 1 (Bombay: Government Central Press, 1884), 324.</p>
              <p className="mb-2">3. Gujarat Gazetteer, vol. 1, pt. 1 (Ahmedabad: Government of Gujarat, n.d.), 324.</p>
              <p className="mb-2">4. Gujarat Gazetteer, vol. 1, pt. 1, 284.</p>
            </div>
            <div>
              <p className="mb-2">5. Bombay Gazetteer, vol. 1, pt. 1, 334; Bharuch District Gazetteer, vol. 2, 469–70.</p>
              <p className="mb-2">6. Gujarat Gazetteer, vol. 1, pt. 1, 345.</p>
              <p className="mb-2">7. The Indian Year Book, vol. 25 (1939), 1216.</p>
            </div>
          </div>

          <div className="border-t border-[#D4AF37]/20 mt-12 pt-8 text-center text-xs tracking-widest uppercase opacity-40">
            © {new Date().getFullYear()} The Royal House of Bharuch
          </div>
        </div>
      </footer>
    </main>
  );
}