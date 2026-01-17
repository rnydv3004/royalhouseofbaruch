"use client";

import Image from "next/image";
import { Cinzel, Lato, Pinyon_Script, Montserrat } from "next/font/google";
import { motion } from "framer-motion";
import {
  Medal, Star, Scroll, Crown, Shield, Anchor, Feather, Award, ChevronDown
} from "lucide-react";
import Navbar from "@/components/NavBar";

// --- FONTS ---
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: '--font-cinzel' });
const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"], variable: '--font-lato' });
const pinyon = Pinyon_Script({ weight: ["400"], subsets: ["latin"], variable: '--font-pinyon' });
const montserrat = Montserrat({ subsets: ["latin"], variable: '--font-montserrat' });

// --- UTILS ---
const SectionHeading = ({ subtitle, title, icon: Icon }: { subtitle: string, title: string, icon?: any }) => (
  <div className="text-center mb-16 relative z-10">
    {Icon && <Icon className="w-8 h-8 text-[#D4AF37] mx-auto mb-4" strokeWidth={1} />}
    <span className={`${montserrat.className} text-[#D4AF37] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase block mb-3`}>
      {subtitle}
    </span>
    <h2 className={`${cinzel.className} text-3xl md:text-5xl text-[#0B2447]`}>
      {title}
    </h2>
    <div className="h-px w-24 bg-[#D4AF37] mx-auto mt-6"></div>
  </div>
);

const RankItem = ({ rank, abbr, isLast = false }: { rank: string, abbr: string, isLast?: boolean }) => (
  <li className={`flex items-center justify-between py-4 ${!isLast ? 'border-b border-[#D4AF37]/20' : ''}`}>
    <span className={`${cinzel.className} text-[#0B2447] text-lg`}>{rank}</span>
    <span className={`${montserrat.className} text-[#D4AF37] text-xs font-bold tracking-widest bg-[#0B2447]/5 px-2 py-1`}>
      {abbr}
    </span>
  </li>
);

export default function HonoursPage() {
  return (
    <main className={`min-h-screen bg-[#FDFBF7] selection:bg-[#D4AF37] selection:text-[#0B2447] overflow-x-hidden ${cinzel.variable} ${lato.variable} ${pinyon.variable} ${montserrat.variable}`}>
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-24 mt-16 px-6 container mx-auto text-center bg-[#0B2447] text-white">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <div className="inline-block p-4 border border-[#D4AF37] rounded-full mb-8">
            <Medal size={32} className="text-[#D4AF37]" />
          </div>

          <h1 className={`${cinzel.className} text-5xl md:text-7xl mb-6`}>
            Royal Honours <br /> & Decorations
          </h1>

          <p className={`${lato.className} text-white/70 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto`}>
            Recognizing excellence, loyalty, and service to the House, the State, and the World through the conferment of Nobility and Chivalric Orders.
          </p>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-[#FDFBF7] to-transparent"></div>
      </section>

      {/* --- SECTION 1: NOBILITY --- */}
      <section id="nobility" className="py-24 container mx-auto px-6 scroll-mt-20">
        <SectionHeading icon={Crown} subtitle="The Peerage" title="System of Nobility" />

        <div className="grid md:grid-cols-12 gap-12 items-start">

          {/* Intro Text */}
          <div className="md:col-span-5 space-y-6 text-[#0B2447]/80 font-light leading-relaxed text-lg">
            <p>
              The Royal House of Bharuch maintains a system of nobility to recognize its supporters and those who have made lasting contributions to Gujarat and India.
            </p>
            <div className="p-6 bg-[#D4AF37]/10 border-l-4 border-[#D4AF37]">
              <h4 className={`${cinzel.className} text-[#0B2447] text-lg mb-2`}>The Royal Titles</h4>
              <p className="text-sm">
                Members of the Royal Family, including the Nawab and Nawabzada, are styled <strong className="font-bold">Nek Alam Khan</strong> and <strong className="font-bold">Khan Bahadur</strong>. These are inherited in succession by the Head of the House.
              </p>
            </div>
          </div>

          {/* The 3 Titles Cards */}
          <div className="md:col-span-7 grid gap-6">
            {[
              { title: "Sardar", female: "Sardarni", meaning: "Chief / Leader", style: "Excellency" },
              { title: "Jahandar", female: "Jahanara", meaning: "Glorious / Magnificent", style: "Excellency" },
              { title: "Amir", female: "Amira", meaning: "Leader / Commander", style: "Excellency" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-[#D4AF37]/20 p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 shrink-0 bg-[#0B2447] flex items-center justify-center text-[#D4AF37]">
                  <span className={`${pinyon.className} text-3xl`}>{item.title.charAt(0)}</span>
                </div>
                <div className="text-center sm:text-left w-full">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                    <h3 className={`${cinzel.className} text-2xl text-[#0B2447]`}>{item.title} <span className="text-base text-gray-400 font-normal">({item.female})</span></h3>
                    <span className={`${montserrat.className} text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold`}>HE {item.title} Surname</span>
                  </div>
                  <p className={`${lato.className} text-gray-600 italic mb-2`}>Meaning: "{item.meaning}"</p>
                  <div className="h-px w-full bg-gray-100"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Letters Patent Note */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <div className="relative p-8 md:p-12 bg-[#FFFDF5] border border-[#D4AF37]/30 shadow-sm">
            <Scroll className="w-12 h-12 text-[#D4AF37]/50 absolute top-4 left-4" />
            <Scroll className="w-12 h-12 text-[#D4AF37]/50 absolute bottom-4 right-4 rotate-180" />

            <h4 className={`${cinzel.className} text-xl text-[#0B2447] mb-4`}>Conferment by Letters Patent</h4>
            <p className={`${lato.className} text-[#0B2447]/70 mb-6`}>
              H.R.H. the Nawab confers these Honours via a Letters Patent stating the Title and whether it is a <strong className="text-[#0B2447]">Lifetime</strong> or <strong className="text-[#0B2447]">Hereditary</strong> Title. Hereditary titles pass to the eldest legitimate male child following primogeniture.
            </p>
            <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
              Note: Recipients of the highest Chivalric Orders (GCLG/GCOB) are considered untitled nobility.
            </p>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: ORDER OF THE LION --- */}
      <section id="lion" className="py-24 bg-[#0B2447] text-white relative overflow-hidden scroll-mt-20">
        {/* Background Lion Watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none translate-x-1/4">
          <Shield size={600} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Visual Side */}
            <div className="order-2 md:order-1 relative">
              <div className="aspect-4/5 bg-white/5 border border-[#D4AF37]/20 backdrop-blur-xs flex items-center justify-center p-8 relative">
                {/* Decorative Corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]"></div>

                {/* Placeholder for Medal Image */}
                <div className="text-center">
                  <Shield size={80} className="mx-auto text-[#D4AF37] mb-4" strokeWidth={1} />
                  <h3 className={`${cinzel.className} text-2xl text-[#D4AF37]`}>Insignia</h3>
                  <p className="text-white/40 text-sm mt-2">The Royal Order of the Lion</p>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-4 mb-6">
                <Award className="text-[#D4AF37] w-8 h-8" />
                <span className={`${montserrat.className} text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase`}>Regional Chivalry</span>
              </div>

              <h2 className={`${cinzel.className} text-4xl md:text-5xl mb-6`}>Order of the <br /> <span className="text-[#D4AF37]">Lion of Gujarat</span></h2>

              <p className={`${lato.className} text-white/70 leading-relaxed mb-8 font-light text-lg`}>
                Named for the majestic Indian lion found only in the Gujarat region near Bharuch. This order is awarded to those who have achieved distinction in academics, charitable endeavors, or rendered service to the Royal House.
              </p>

              <div className="bg-white/5 border border-white/10 p-8 rounded-sm">
                <h4 className={`${cinzel.className} text-xl mb-4 border-b border-[#D4AF37]/30 pb-4`}>Classes of the Order</h4>
                <ul className="space-y-2">
                  <RankItem rank="Knight / Dame Grand Commander" abbr="GCLG" />
                  <RankItem rank="Knight / Dame Commander" abbr="KCLG / DCLG" />
                  <RankItem rank="Companion" abbr="CLG" isLast />
                </ul>
              </div>
              <p className="mt-4 text-xs text-white/40 italic">* Brevets indicate Hereditary or Lifetime status.</p>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 3: STAR OF BARYGAZA --- */}
      <section id="barygaza" className="py-24 container mx-auto px-6 scroll-mt-20">
        <SectionHeading icon={Anchor} subtitle="Global Recognition" title="Order of the Star of Barygaza" />

        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className={`${lato.className} text-[#0B2447]/80 text-lg leading-relaxed font-light`}>
            Acknowledging chivalric and charitable service on a global scale. The city of Bharuch, known to the Greeks and Romans as <strong className="text-[#0B2447] font-bold">Barygaza</strong> (Βαρύγαζα), meaning "deep treasure," has long been a hub of civilization. This Order honours that enduring mercantile legacy.
          </p>
        </div>

        {/* The 3 Photos Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: item * 0.2 }}
              className="relative aspect-3/4 bg-gray-100 group overflow-hidden border border-[#D4AF37]/20 shadow-lg"
            >
              {/* Placeholder for user images */}
              {/* <Image src={`/path/to/barygaza-photo-${item}.jpg`} fill className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" alt="Order Ceremony" /> */}

              <div className="absolute inset-0 flex items-center justify-center bg-[#0B2447]/10 group-hover:bg-transparent transition-colors">
                <div className="text-center opacity-50">
                  <Star className="mx-auto mb-2 text-[#0B2447]" />
                  <span className="text-xs uppercase tracking-widest font-bold">Image {item}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ranks List */}
        <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border-t-4 border-[#0B2447]">
          <h4 className={`${cinzel.className} text-2xl text-[#0B2447] mb-8 text-center`}>The Five Classes</h4>
          <ul className="space-y-2">
            <RankItem rank="Knight / Dame Grand Commander" abbr="GCOB" />
            <RankItem rank="Knight / Dame Commander" abbr="KCOB / DCOB" />
            <RankItem rank="Commander" abbr="COB" />
            <RankItem rank="Officer" abbr="OOB" />
            <RankItem rank="Member" abbr="MOB" isLast />
          </ul>
        </div>

      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 bg-[#F9F8F6] text-center border-t border-[#D4AF37]/20">
        <div className="container mx-auto px-6">
          <p className={`${montserrat.className} text-[10px] uppercase tracking-[0.2em] text-[#0B2447] opacity-60`}>
            Honours are bestowed at the sole discretion of the Head of the Royal House
          </p>
        </div>
      </footer>
    </main>
  );
}