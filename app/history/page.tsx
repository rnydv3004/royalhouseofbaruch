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
const DropCapText = ({ children }: { children: any }) => (
  <p className={`${lato.className} text-lg md:text-xl text-[#0B2447]/80 leading-loose text-justify mb-6`}>
    <span className={`${cinzel.className} float-left text-6xl md:text-7xl text-[#D4AF37] pr-3 pt-2 leading-[0.8]`}>
      {children.charAt(0)}
    </span>
    {children.slice(1)}
  </p>
);

// 3. Regular Paragraph
const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className={`${lato.className} text-lg md:text-xl text-[#0B2447]/80 leading-loose text-justify mb-6`}>
    {children}
  </p>
);

// 4. Chapter Heading
const ChapterTitle = ({ title, subtitle, date }: { title: string, subtitle?: string, date: string }) => (
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="w-px h-16 bg-linear-to-b from-transparent to-[#0B2447]"></div>
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
          id="foundation"
          className="scroll-mt-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-4 text-[#D4AF37]"><Scroll className="w-6 h-6" /></div>

          <ChapterTitle
            date="Circa 1726"
            title="The Nawabs of Bharuch"
            subtitle=""
          />

          <DropCapText>
            Nizam-ul-Mulk appointed a capable and courageous commander, Abdullah Beg, as governor of Bharuch in 1726, and conferred upon him the title Nek Alam Khan. From this point onward, Abdullah Beg exercised effective autonomy in Bharuch, becoming the first Nawab of the state.¹ His rule marked the beginning of hereditary nawabi authority in Bharuch following the weakening of Mughal control in Gujarat.
          </DropCapText>

          <Paragraph>
            In 1726, Nizam-ul-Mulk appointed Abdullah Beg as governor of Bharuch and conferred upon him the title Nek Alam Khan. With the decline of Mughal authority in Gujarat, Abdullah Beg exercised effective autonomy and laid the foundation of hereditary nawabi rule in Bharuch. He ruled as the first Nawab until his death in 1736.¹
          </Paragraph>

          <Paragraph>
            Abdullah Beg&apos;s eldest son, Mehmood Khan, had predeceased him in 1728, leaving behind a young son, Hamid Khan, who was still a minor at the time of Abdullah Beg&apos;s death.
          </Paragraph>

        </motion.div>

        <Divider />

        {/* --- CHAPTER 2: MARATHA RELATIONS --- */}
        <motion.div
          id="diplomacy"
          className="scroll-mt-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-4 text-[#D4AF37]"><Swords className="w-6 h-6" /></div>

          <ChapterTitle
            date="1736 – 1741"
            title="Diplomacy & Siege"
            subtitle="Mirza Beg and the Second Nek Alam Khan"
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
        </motion.div>

        <Divider />

        {/* --- CHAPTER 3: SOVEREIGNTY --- */}
        <motion.div
          id="sovereignty"
          className="scroll-mt-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <ChapterTitle
            date="1748"
            title="The Siege of Bharuch" subtitle={'Relations with the Gaekwads'} />

          <DropCapText>
            In 1741, during the rule of Mirza Beg Nek Alam Khan II, Damaji Gaekwad, accompanied by his father Pilaji Gaekwad, laid siege to Bharuch owing to its strategic location, strong fortifications, and riverine access via the Narmada.² As the Maratha forces advanced, Nek Alam Khan II prepared the city’s defenses and appealed to the Nizam for assistance.
          </DropCapText>

          <Paragraph>
            In response, the Nizam informed Damaji Gaekwad that Bharuch was his personal possession and should not be disturbed. Consequently, Damaji withdrew the siege and marched toward Songadh. It is also recorded that Nek Alam Khan paid Damaji a share of the zakat collected in Bharuch, after which the Gaekwads began receiving a regular portion of this revenue.
          </Paragraph>

        </motion.div>

        <Divider />

        {/* --- CHAPTER 4: THE MINTING RIGHTS --- */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <ChapterTitle
            date="1752"
            title="The Minting Rights" subtitle={'The Decline of External Claims'} />

          <DropCapText>
            In 1748, with the permission of Emperor Ahmad Shah, a mint was established at Bharuch, and coins were issued in the city’s name.⁴ This represented a significant assertion of sovereignty. Mirza Beg Nek Alam Khan II died in 1752.
          </DropCapText>

          <Paragraph>
            He was succeeded briefly by his younger brother Khar Talab Khan, who ruled for only three months before his untimely death. During this short period, Hamid Khan, the grandson of Abdullah Beg through Mehmood Khan, was sent to Surat, owing to his youth and the unstable political situation.
          </Paragraph>

          <Paragraph>
            Following these events, the descendants of Nizam-ul-Mulk relinquished their claims over Bharuch, except for the Gaekwads’ entitlement to a share of zakat, leaving the state largely independent.
          </Paragraph>

        </motion.div>

        <Divider />

        {/* --- CHAPTER 5: Nawab Rafi ud Daula --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <ChapterTitle
            date="1756–1769"
            title="Nawab Rafi-ud-Daula" subtitle={'Hamid Neknam Khan Bahadur'} />

          <DropCapText>
            Hamid Khan assumed the title Nawab Rafi-ud-Daula Hamid Neknam Khan Bahadur and ruled Bharuch from 1756 to 1769. His reign brought relative political stability after decades of internal strife. During this period, British influence also began to take root following the British capture of Surat in 1759, through which the British inherited the Nawab of Surat’s share of Bharuch’s zakat.
          </DropCapText>

          <Paragraph>
            Between 1758 and 1759, Bharuch witnessed unrest caused by large groups of Gosains, who disturbed public order in and around the city. In 1761, Hamid Khan, with the assistance of Nawab Momin Khan of Khambhat, defeated Maratha forces near Jambusar and secured control of the town.
          </Paragraph>

          <Paragraph>
            Hamid Khan died in 1769.
          </Paragraph>

        </motion.div>

        <Divider />

        {/* --- CHAPTER 6: Nawab Imtiyaz-ud-Daula --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <ChapterTitle
            date="1769–1772"
            title="Nawab Imtiyaz-ud-Daula" subtitle={'Muazzaz Khan Bahadur Dilerjung'} />

          <DropCapText>
            Hamid Khan was succeeded by his son Muazzaz Khan, titled Imtiyaz-ud-Daula Muazzaz Khan Bahadur Dilerjung, the last independent Nawab of Bharuch.
          </DropCapText>

          <Paragraph>
            He added wells, tanks, fountains, reservoirs, and developed the gardens of Ahmed Bagh.
            In 1771, after defeating British forces once, he was summoned to Bombay and honored with a 19-gun salute.
            However, the state was lost in 1772, primarily due to the betrayal of Diwan Lallubhai, a clever administrator whose influence had grown considerably.
          </Paragraph>

          <Paragraph>
            Hamid Khan died in 1769.
          </Paragraph>

        </motion.div>

        <Divider />

        {/* --- CHAPTER 7: Lallubhai and the Betrayal --- */}
        <motion.div
          id="betrayal"
          className="scroll-mt-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-4 text-[#D4AF37]"><Map className="w-6 h-6" /></div>

          <ChapterTitle
            date="1773"
            title="The Betrayal"
            subtitle="Lallubhai"
          />

          <DropCapText>
            Lallubhai, originally from Ankleshwar, inherited vast estates from his maternal uncle Bhaidas in 1767. He entered the Nawab’s administration as a Mutsaddi and eventually became Diwan, concentrating power in his hands by 1773.
          </DropCapText>

          <Paragraph>
            When the British attacked Bharuch, Lallubhai deliberately aided them, guiding their forces to breach the fort at the Katopur Gate. Despite only 700 soldiers, Nawab Muazzaz Khan initially repelled the British and even killed Wedderburn during battle on 14 November 1772.
          </Paragraph>

          <Paragraph>
            However, acting on Lallubhai’s advice, the British eventually breached the fort. The Nawab defended the city for 36 hours, but Lallubhai’s treachery forced him to retreat. Unable to maintain control, Muazzaz Khan fled toward Amod and later sought refuge near Dehewan, a small Koli princely state. Overburdened and heartbroken, he passed away in exile, marking the end of independent Muslim rule in Bharuch.
          </Paragraph>
        </motion.div>

        <Divider />

        {/* --- EPILOGUE: BRITISH ERA --- */}
        <motion.div
          id="titular"
          className="bg-white p-8 md:p-12 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-[#D4AF37]/20 mt-8 scroll-mt-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-6">
            <Anchor className="text-[#0B2447] w-6 h-6" />
            <h3 className={`${cinzel.className} text-2xl text-[#0B2447]`}>The Titular Nawabs (Post-1803)</h3>
          </div>

          <DropCapText>
            After 1772, the British allowed the former Nawabs of Bharuch to retain their titles in a nominal capacity along with a Wazifa (allowance). They were recognized as titular and ex-Nawabs, meaning they retained noble status but had no political authority.
          </DropCapText>
          <Paragraph>
            At the time of the acquisition of the District of Broach (Bharuch) by the East India Company in 1794, the Nawab owned approximately 1,621 bighas of garden land, known as wazifa land, situated near the town. To enable the Nawab’s four sons to discharge their debts, the Government of Bombay, with sanction from the Court of Directors of the East India Company, decided to distribute the revenues of these lands among them, rather than alienating the property. These revenues were termed wazifa allowances and were later treated as political pensions under British administration.
          </Paragraph>

          <Paragraph>
            Following the Maratha War of 1803, when Bharuch formally became a British possession, the descendants of the last Nawab were formally granted hereditary pensions by the British Government. Biographical references such as Who’s Who – Indian Nobles note the continuation of these pensions well into the twentieth century
          </Paragraph>

          <Paragraph>
            Historical records indicate that Mirza Moazziz Khan, grandson of the last ruling Nawab Muazzaz Khan, was listed as Ex-Nawab of Bharuch in The Indian Year Book. This demonstrates the British practice of preserving titular status while consolidating administrative control.
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