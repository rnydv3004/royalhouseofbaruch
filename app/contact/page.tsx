"use client";

import { useState } from "react";
import { Cinzel, Lato, Pinyon_Script, Montserrat } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, MapPin, Send, Feather, CheckCircle2, Phone, Clock
} from "lucide-react";
import Navbar from "@/components/NavBar";

// --- FONTS ---
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: '--font-cinzel' });
const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"], variable: '--font-lato' });
const pinyon = Pinyon_Script({ weight: ["400"], subsets: ["latin"], variable: '--font-pinyon' });
const montserrat = Montserrat({ subsets: ["latin"], variable: '--font-montserrat' });

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
    }, 2000);
  };

  return (
    <main className={`min-h-screen bg-[#FDFBF7] selection:bg-[#D4AF37] selection:text-[#0B2447] overflow-x-hidden ${cinzel.variable} ${lato.variable} ${pinyon.variable} ${montserrat.variable}`}>
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-10 px-6 container mx-auto text-center">
        {/* Subtle Background Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230B2447' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <div className="inline-block p-4 border border-[#D4AF37] rounded-full mb-6 bg-white/50 backdrop-blur-sm">
            <Feather size={32} className="text-[#D4AF37]" />
          </div>

          <h1 className={`${cinzel.className} text-4xl md:text-6xl mb-6 text-[#0B2447]`}>
            The Royal Chancery
          </h1>

          <p className={`${lato.className} text-[#0B2447]/70 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto`}>
            Official correspondence for the Royal House of Bharuch. <br />
            Inquiries regarding protocol, press, and philanthropy.
          </p>
        </motion.div>
      </section>

      {/* --- MAIN CONTENT GRID --- */}
      <section className="py-24 max-w-7xl container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16">

          {/* LEFT COLUMN: CONTACT DETAILS */}
          <div className="lg:col-span-5 space-y-12">

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className={`${cinzel.className} text-2xl text-[#0B2447] mb-6 border-l-4 border-[#D4AF37] pl-4`}>
                Office of the Grand Chancellor
              </h3>
              <p className={`${lato.className} text-[#0B2447]/70 font-light leading-relaxed mb-8`}>
                The Chancery handles all official requests. Please allow up to 5 working days for a response to official communiqués.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <h4 className={`${montserrat.className} text-xs font-bold uppercase tracking-widest text-[#0B2447]`}>The Seat</h4>
                    <p className={`${lato.className} text-[#0B2447]/80`}>Bait-ul-Nawab, Palace Grounds,<br /> Bharuch, Gujarat, India.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <h4 className={`${montserrat.className} text-xs font-bold uppercase tracking-widest text-[#0B2447]`}>Electronic Mail</h4>
                    <p className={`${lato.className} text-[#0B2447]/80`}>chancery@royalhouseofbharuch.org</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <h4 className={`${montserrat.className} text-xs font-bold uppercase tracking-widest text-[#0B2447]`}>Hours of Operation</h4>
                    <p className={`${lato.className} text-[#0B2447]/80`}>Monday - Friday: 10:00 AM - 04:00 PM (IST)</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative Note */}
            <div className="p-8 bg-[#F9F8F6] border border-[#D4AF37]/20 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37]"></div>
              <p className={`${pinyon.className} text-2xl text-[#0B2447]/60 text-center`}>
                "Fidelitas et Fortitudo"
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: THE FORM */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 md:p-12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-[#D4AF37]/10 relative overflow-hidden">

              {/* Background Emblem */}
              <div className="absolute top-[-20%] right-[-20%] opacity-[0.03] pointer-events-none">
                <Feather size={400} />
              </div>

              <h3 className={`${cinzel.className} text-2xl text-[#0B2447] mb-8`}>Send a Communiqué</h3>

              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle2 size={64} className="text-[#D4AF37] mx-auto mb-6" />
                    <h4 className={`${cinzel.className} text-2xl text-[#0B2447] mb-2`}>Dispatched</h4>
                    <p className={`${lato.className} text-[#0B2447]/60`}>
                      Your message has been successfully transmitted to the Chancery. <br />
                      We shall review your correspondence shortly.
                    </p>
                    <button
                      onClick={() => setFormState('idle')}
                      className="mt-8 text-xs font-bold uppercase tracking-widest text-[#D4AF37] underline underline-offset-4"
                    >
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6 relative z-10"
                  >

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className={`${montserrat.className} text-[10px] font-bold uppercase tracking-widest text-[#0B2447]/50`}>Full Name</label>
                        <input
                          required
                          type="text"
                          placeholder="E.g. John Doe"
                          className={`${lato.className} w-full bg-[#FDFBF7] border-b-2 border-[#D4AF37]/20 p-4 focus:border-[#D4AF37] outline-none transition-colors placeholder:text-[#0B2447]/20 text-[#0B2447]`}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className={`${montserrat.className} text-[10px] font-bold uppercase tracking-widest text-[#0B2447]/50`}>Honorific / Title</label>
                        <select className={`${lato.className} w-full bg-[#FDFBF7] border-b-2 border-[#D4AF37]/20 p-4 focus:border-[#D4AF37] outline-none transition-colors text-[#0B2447]`}>
                          <option>Mr.</option>
                          <option>Ms.</option>
                          <option>Mrs.</option>
                          <option>Dr.</option>
                          <option>Prof.</option>
                          <option>Hon.</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className={`${montserrat.className} text-[10px] font-bold uppercase tracking-widest text-[#0B2447]/50`}>Email Address</label>
                      <input
                        required
                        type="email"
                        placeholder="email@example.com"
                        className={`${lato.className} w-full bg-[#FDFBF7] border-b-2 border-[#D4AF37]/20 p-4 focus:border-[#D4AF37] outline-none transition-colors placeholder:text-[#0B2447]/20 text-[#0B2447]`}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className={`${montserrat.className} text-[10px] font-bold uppercase tracking-widest text-[#0B2447]/50`}>Department</label>
                      <select className={`${lato.className} w-full bg-[#FDFBF7] border-b-2 border-[#D4AF37]/20 p-4 focus:border-[#D4AF37] outline-none transition-colors text-[#0B2447]`}>
                        <option>General Inquiry</option>
                        <option>Protocol & Ceremonial</option>
                        <option>Press & Media</option>
                        <option>Philanthropy (Royal Foundation)</option>
                        <option>Historical Archives</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className={`${montserrat.className} text-[10px] font-bold uppercase tracking-widest text-[#0B2447]/50`}>Message</label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Your correspondence..."
                        className={`${lato.className} w-full bg-[#FDFBF7] border-b-2 border-[#D4AF37]/20 p-4 focus:border-[#D4AF37] outline-none transition-colors placeholder:text-[#0B2447]/20 text-[#0B2447] resize-none`}
                      ></textarea>
                    </div>

                    <button
                      disabled={formState === 'submitting'}
                      type="submit"
                      className="w-full bg-[#0B2447] text-white py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#D4AF37] transition-colors duration-500 flex items-center justify-center gap-3 group"
                    >
                      {formState === 'submitting' ? (
                        <span>Transmitting...</span>
                      ) : (
                        <>
                          Dispatch Communiqué <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-8 text-center border-t border-[#D4AF37]/20">
        <p className={`${montserrat.className} text-[10px] uppercase tracking-[0.2em] text-[#0B2447] opacity-60`}>
          Secure Chancery Transmission
        </p>
      </footer>
    </main>
  );
}