"use client";

import Link from "next/link";
import { Cinzel, Lato, Pinyon_Script, Montserrat } from "next/font/google";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Crown, Shield, Users, Scroll, ArrowRight, Globe, Star,
  Landmark, Heart, BookOpen, Feather, Ship, Anchor
} from "lucide-react";
import Navbar from "@/components/NavBar";
import { useRef } from "react";
import Image from "next/image";

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
          <div className="inline-block p-3 border mt-10 border-[#D4AF37] rounded-full mb-8 opacity-60">
            <Crown size={24} className="text-[#0B2447]" />
          </div>

          <h1 className={`${cinzel.className} text-5xl md:text-7xl text-[#0B2447] mb-8 leading-tight`}>
            The Royal House <br />
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
                Rooted in centuries of princely tradition, the House has long stood as a symbol of dignity, justice, and royal responsibility.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- LEADERSHIP SECTION --- */}
      <section className="py-24 bg-[#FDFBF7] relative overflow-hidden text-center">
        <SectionHeading title="Present Leadership" subtitle="Custodians of the Throne" />

        <div className="container mx-auto px-6 max-w-5xl">
          {/* HEAD */}
          <div className="mb-20">
            <h3 className={`${cinzel.className} text-2xl md:text-4xl text-[#0B2447] mb-2`}>
              H.R.H. Nawab Haji Mirza Wajahat Ali Khan Bahadur
            </h3>
            <p className={`${montserrat.className} text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-6`}>
              Head of the Royal House of Bharuch
            </p>
            <p className={`${lato.className} text-[#0B2447]/70 leading-relaxed font-light max-w-2xl mx-auto`}>
              Upholds the royal family’s enduring values and oversees its ceremonial and cultural responsibilities.
            </p>
          </div>

          <div className="w-px h-16 bg-[#D4AF37]/30 mx-auto mb-16"></div>

          {/* HEIR */}
          <div>
            <h3 className={`${cinzel.className} text-2xl md:text-4xl text-[#0B2447] mb-2`}>
              H.H. Nawabzada Ali Adil Khan
            </h3>
            <p className={`${montserrat.className} text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-6`}>
              Heir Apparent
            </p>
            <p className={`${lato.className} text-[#0B2447]/70 leading-relaxed font-light max-w-2xl mx-auto mb-6`}>
              Serves as the central figure in the execution of all activities and royal initiatives. His leadership is at the forefront of diplomatic relations, digital presence, social welfare efforts, and international royal engagements.
            </p>
            <p className={`${lato.className} text-[#0B2447]/70 leading-relaxed font-light max-w-3xl mx-auto italic`}>
              Together, this esteemed leadership works to uphold the legacy and responsibilities of the Royal House through cultural diplomacy, historical preservation, education, and community welfare.
            </p>
          </div>
        </div>
      </section>

      {/* --- COAT OF ARMS SECTION --- */}
      <section id="coat-of-arms" className="py-24 bg-white border-y border-[#D4AF37]/10 scroll-mt-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionHeading title="Coat of Arms" subtitle="Heraldic Symbols" />

          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Description Column */}
            <div className={`${lato.className} text-[#0B2447]/80 leading-relaxed space-y-8`}>

              {/* Blazon */}
              <div>
                <h3 className={`${cinzel.className} text-xl text-[#0B2447] mb-4 flex items-center gap-2`}>
                  <Shield className="text-[#D4AF37]" size={20} /> The Blazon
                </h3>
                <p className="italic pl-4 border-l-2 border-[#D4AF37]/30">
                  A Shield bordured Or and fimbriated Sable. <br /><br />
                  A Fess Argent in the form of a fortified stone seawall with three sloped battlements. Atop the fess, a three-arched hill Vert. Surmounting the hill, a castellated stone fortress Argent, with castellated stone towers dexter and sinister. <br /><br />
                  In Chief Azure. Dexter, a crescent Or, with horns open to chief. Sinister, an eight-pointed star Or.
                  In Base, narrow horizontal lines of Azure and Argent, fimbriated Sable, in imitation of a tranquil river. Below the fess, a reflection Argent of the three battlements. At middle base, a dexter facing kotiya trading ship Tawny of three sails Carnation and Argent. <br /><br />
                  Atop the shield, a five arched crown Or, capped Gules. Surmounting the arches is a crescent Or with horns open to the heavens, resting on a sphere Or. <br /><br />
                  Around the shield, the collar of the Order of the Lion of Gujarat, alternating with links of round stones Vert on round bezels Or, and eight pointed stars Or. Suspended from the chain is the medallion of the order Vert and Or. <br /><br />
                  For supporters, two combatant lions rampant Tawny, both holding talwars Argent, vertically in their paws affronte. <br /><br />
                  The supporters stand upon a motto scroll Argent of three folds, with text Sable, inscribed with the words, “Courage Service Equality”.
                </p>
              </div>

              {/* Symbolism */}
              <div>
                <h3 className={`${cinzel.className} text-xl text-[#0B2447] mb-4 flex items-center gap-2`}>
                  <Feather className="text-[#D4AF37]" size={20} /> Symbolism
                </h3>
                <ul className="space-y-4 list-disc pl-5 marker:text-[#D4AF37]">
                  <li><strong>The Seawall:</strong> Interpretation of the 19th-century seawall that protected the city. A symbol of security.</li>
                  <li><strong>Three-arched Hill:</strong> Derived from ancient coins of Barygaza. A symbol of the antiquity of Bharuch.</li>
                  <li><strong>Fortress:</strong> Based on the historic fortress of Bharuch. A symbol of strength and permanence.</li>
                  <li><strong>Crescent & Star:</strong> Found on ancient coins of Barygaza. Symbols of antiquity.</li>
                  <li><strong>River & Ship:</strong> Symbolic of the historic trade and economic importance of Bharuch.</li>
                  <li><strong>Lions:</strong> Longstanding historical symbols of Bharuch.</li>
                </ul>
              </div>

              {/* Herald Credit */}
              <div className="pt-6 border-t border-[#D4AF37]/10 text-sm">
                <p><strong>Heraldic Artist:</strong> H.E. Dr. Joseph M. Crews, persevante of the Cronista de Armas of Castilla y León.</p>
              </div>

            </div>

            {/* Visual Representation Placeholder */}
            <div className="bg-[#FDFBF7] border-4 border-double border-[#D4AF37]/20 rounded-lg p-8 min-h-[500px] flex flex-col items-center justify-center text-center">
              <Shield size={64} className="text-[#D4AF37]/40 mb-4" />
              <p className={`${cinzel.className} text-[#0B2447]/60`}>Coat of Arms Visual</p>
              <p className="text-xs text-gray-400 mt-2">(Image to be provided)</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SUCCESSION SECTION --- */}
      <section id="succession" className="py-24 bg-[#FDFBF7] relative scroll-mt-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionHeading title="Succession" subtitle="The Nawabs of Bharuch" />

          <div className="relative border-l-2 border-[#D4AF37]/30 ml-4 md:ml-12 space-y-12">

            {[
              { id: "1", name: "Mirza Abdullah Beg – Nek Alam Khan I", period: "1726–1739", desc: "Founder of the Bharuch Nawabi. Appointed Faujdar of Bharuch by Nizam-ul-Mulk. Granted the hereditary title “Nek Alam Khan.”" },
              { id: "2", name: "Mirza Beg – Nek Alam Khan II", period: "1739–1753", desc: "Middle Son of Abdullah Beg. Held power until the senior line’s rightful heir reached maturity." },
              { id: "3", name: "Khar Talab Khan", period: "1753–1754", desc: "Youngest brother. Short transitional reign (3 Months)." },
              { id: "4", name: "Hussain Ali Khan", period: "1754–1756", desc: "Son of Bibi Bholan (Wife of Abdullah Beg). After his short reign, rule returned to the eldest Abdullah Beg line." },
              { id: "5", name: "Nawab Rafi-ud-Daula Hamid Neknam Khan Bahadur", period: "1756–1769", desc: "Real name: Hamid Khan. Grandson of Mirza Abdullah Beg (eldest-line heir). Restored rightful succession of the senior-most line." },
              { id: "6", name: "Nawab Imtiyaz-ud-Daula Muazzaz Khan Bahadur Dilerjung", period: "1769–1772", desc: "Defended Bharuch against increasing British interference." },
              { id: "7", name: "Nawab Ahmed Khan (Amroodheen Khan)", period: "1772–1776", desc: "Sent to England on a political mission by the East India Company." },
              { id: "8", name: "Nawab Idhooden Khan", period: "1776–1825", desc: "Oversaw the Treaty of Salbai (1783), which restored peace in the region." },
              { id: "9", name: "Nawab Kalandar Khan", period: "1825–1838", desc: "Maintained authority during increasing British administrative control." },
              { id: "10", name: "Nawab Ali Bandi Khan", period: "1838–1850", desc: "Continued Nawabi customs and administrative responsibilities." },
              { id: "11", name: "Nawab Mirza Ahmed Beg", period: "1850–1912", desc: "Negotiated with British officers regarding recognition and pensions." },
              { id: "12", name: "Nawab Mirza Mohabbat Khan", period: "1912–1929", desc: "Upheld ceremonial and social duties of Bharuch nobility." },
              { id: "13", name: "Nawab Mirza Moazziz Khan", period: "1929–1955", desc: "Father of the current branches." },
              { id: "14", name: "Nawab Mirza Shujaat Ali Khan Chishti Nizami", period: "1955–2005", desc: "Eldest Branch.", sub: true },
              { id: "15", name: "Nawab Mirza Mohtesham Ali Khan", period: "2005–2024", desc: "Younger Branch.", sub: true },
              { id: "16", name: "Nawab Haji Mirza Wajahat Ali Khan Bahadur", period: "2024–Present", desc: "Current Head of the Royal House (Eldest Branch).", sub: true, current: true },
            ].map((nawab, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12 group">
                {/* Dot */}
                <div className={`absolute -left-[9px] top-2 w-5 h-5 rounded-full border-2 border-[#D4AF37] ${nawab.current ? 'bg-[#D4AF37]' : 'bg-[#FDFBF7]'} group-hover:scale-110 transition-transform`}></div>

                <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-1">
                  <h4 className={`${cinzel.className} text-xl ${nawab.current ? 'text-[#D4AF37] font-bold' : 'text-[#0B2447]'}`}>
                    {nawab.id}. {nawab.name}
                  </h4>
                  <span className={`${montserrat.className} text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-sm`}>
                    {nawab.period}
                  </span>
                </div>

                <p className={`${lato.className} text-[#0B2447]/70 text-sm max-w-xl`}>
                  {nawab.desc}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* --- FAMILY TREE SECTION --- */}
      <section id="family-tree" className="py-24 bg-white border-t border-[#D4AF37]/10 scroll-mt-20">
        <div className="container mx-auto px-6 text-center">
          <SectionHeading title="Family Tree" subtitle="Genealogy" />

          <div className="max-w-5xl w-full mx-auto bg-[#FDFBF7] border border-[#D4AF37]/20 p-4 md:p-12 flex items-center justify-center rounded-sm shadow-inner relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1h2v2H1V1zm4 0h2v2H5V1zm0 4h2v2H5V5zM1 5h2v2H1V5z' fill='%230B2447' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` }}></div>

            <div className="text-center z-10 w-full">
              <Image
                src="/familytree.webp"
                alt="Family Tree"
                width={2200}
                height={4600}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER STATEMENT --- */}
      <footer className="py-12 text-center opacity-40 border-t border-[#0B2447]/5 bg-[#FDFBF7]">
        <p className={`${montserrat.className} text-[10px] uppercase tracking-[0.2em] text-[#0B2447]`}>
          © The Royal House of Bharuch
        </p>
      </footer>
    </main>
  );
}