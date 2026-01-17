"use client";

import { Cinzel, Lato, Pinyon_Script, Montserrat } from "next/font/google";
import { motion } from "framer-motion";
import {
    Building2, Users, Crown, Shield, Globe,
    Scroll, Gavel, Scale, Award, ChevronDown
} from "lucide-react";
import Navbar from "@/components/NavBar";
import Image from "next/image";

// --- FONTS ---
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: '--font-cinzel' });
const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"], variable: '--font-lato' });
const pinyon = Pinyon_Script({ weight: ["400"], subsets: ["latin"], variable: '--font-pinyon' });
const montserrat = Montserrat({ subsets: ["latin"], variable: '--font-montserrat' });

// --- INTERFACES ---
export interface AdminMember {
    id: number;
    name: string;
    role_title: string;
    category: string;
    display_order: number;
}

interface AdministrationContentProps {
    officers: AdminMember[];
    advisors: AdminMember[];
    delegates: AdminMember[];
}

// --- COMPONENTS ---
const SectionHeading = ({ subtitle, title }: { subtitle: string, title: string }) => (
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

const AdminCard = ({ title, role, icon: Icon, delay = 0 }: { title: string, role: string, icon?: any, delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="bg-white p-8 border border-[#D4AF37]/20 shadow-[0_5px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-xl hover:border-[#D4AF37]/50 transition-all duration-300 group text-center"
    >
        <div className="w-16 h-16 mx-auto bg-[#FDFBF7] rounded-full border border-[#D4AF37]/30 flex items-center justify-center mb-6 group-hover:bg-[#0B2447] transition-colors duration-300">
            {Icon ? <Icon className="w-8 h-8 text-[#D4AF37]" strokeWidth={1} /> : <Users className="w-8 h-8 text-[#D4AF37]" />}
        </div>

        <h3 className={`${cinzel.className} text-xl text-[#0B2447] mb-2`}>{role}</h3>
        <div className="h-px w-12 bg-[#D4AF37]/30 mx-auto my-4"></div>
        <p className={`${lato.className} text-[#0B2447]/60 text-sm font-light uppercase tracking-widest`}>
            {title}
        </p>
    </motion.div>
);

export default function AdministrationContent({ officers, advisors, delegates }: AdministrationContentProps) {

    // Icon mapping helper
    const getIconForRole = (role: string, category: string) => {
        const lowerRole = role.toLowerCase();
        if (category === 'OFFICER') {
            if (lowerRole.includes('chancellor') && !lowerRole.includes('vice')) return Scale;
            if (lowerRole.includes('vice')) return Gavel;
            if (lowerRole.includes('marshal')) return Shield;
            if (lowerRole.includes('chamberlain')) return Scroll;
        }
        if (category === 'ADVISOR') {
            if (lowerRole.includes('academic')) return Scroll;
            if (lowerRole.includes('heraldry')) return Shield;
            return Crown;
        }
        return Users;
    };

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
                        <Building2 size={32} className="text-[#D4AF37]" />
                    </div>

                    <h1 className={`${cinzel.className} text-4xl md:text-6xl mb-6 leading-tight`}>
                        Royal House <br /> <span className="text-[#D4AF37]">Administration</span>
                    </h1>

                    <p className={`${lato.className} text-white/70 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto`}>
                        Governance, Stewardship, and the Official Officers of the Royal Household
                    </p>
                </motion.div>
            </section>

            {/* --- HEAD OF THE HOUSE --- */}
            <section className="py-24 container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto bg-white border border-[#D4AF37]/30 shadow-2xl overflow-hidden"
                >
                    <div className="grid md:grid-cols-2">
                        <div className="relative h-[400px] md:h-auto bg-[#F0F0F0]">
                            {/* Placeholder for H.H. Image */}
                            <div className="absolute inset-0 flex items-center justify-center bg-[#0B2447]/5">
                                <Crown className="w-24 h-24 text-[#0B2447]/20" strokeWidth={1} />
                            </div>
                        </div>
                        <div className="p-12 flex flex-col justify-center text-center md:text-left">
                            <span className={`${montserrat.className} text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4`}>
                                Head of the Royal House
                            </span>
                            <h2 className={`${cinzel.className} text-3xl md:text-4xl text-[#0B2447] mb-2 leading-tight`}>
                                H.R.H. Nawab Haji Mirza Wajahat Ali Khan Bahadur
                            </h2>
                            <p className={`${pinyon.className} text-2xl text-[#0B2447]/60 mb-8`}>
                                Nawab of Bharuch
                            </p>
                            <div className="h-px w-24 bg-[#D4AF37] mb-8 mx-auto md:mx-0"></div>
                            <p className={`${lato.className} text-gray-600 text-lg leading-relaxed font-light italic`}>
                                “The Royal House of Bharuch is led by His Royal Highness the Nawab of Bharuch, who serves as the Custodian of the House, its traditions, honours, and international relations.”
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* --- OFFICERS OF THE ROYAL HOUSE --- */}
            <section className="py-20 bg-[#F4F1EA] relative">
                <div className="container mx-auto px-6 relative z-10">
                    <SectionHeading subtitle="The Household" title="Officers of the Royal House" />

                    <div className="flex flex-wrap justify-center gap-8">
                        {officers.length > 0 ? (
                            officers.map((officer, idx) => (
                                <div key={officer.id} className="w-full md:w-[calc(50%-2rem)] lg:w-[calc(25%-2rem)] min-w-[280px] max-w-sm grow-0 shrink-0">
                                    <AdminCard
                                        role={officer.role_title}
                                        title={officer.name}
                                        icon={getIconForRole(officer.role_title, 'OFFICER')}
                                        delay={idx * 0.1}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="w-full text-center text-gray-400 italic">Information pending...</div>
                        )}
                    </div>
                </div>
            </section>

            {/* --- ROYAL ADVISORS --- */}
            <section className="py-24 container mx-auto px-6">
                <SectionHeading subtitle="Counsel & Wisdom" title="Royal Advisors" />

                <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
                    {advisors.length > 0 ? (
                        advisors.map((advisor, idx) => (
                            <motion.div
                                key={advisor.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="w-full md:w-[calc(33.33%-2rem)] min-w-[280px] max-w-sm flex flex-col items-center text-center p-8 border border-dashed border-[#D4AF37]/30 rounded-sm hover:bg-white transition-colors"
                            >
                                {(() => {
                                    const Icon = getIconForRole(advisor.role_title, 'ADVISOR');
                                    return <Icon className="w-10 h-10 text-[#0B2447]/60 mb-4" strokeWidth={1} />
                                })()}
                                <h3 className={`${cinzel.className} text-lg text-[#0B2447] mb-1`}>{advisor.role_title}</h3>
                                <p className={`${lato.className} text-gray-400 text-sm`}>{advisor.name}</p>
                            </motion.div>
                        ))
                    ) : (
                        <div className="w-full text-center text-gray-400 italic">Information pending...</div>
                    )}
                </div>
            </section>

            {/* --- ROYAL DELEGATIONS --- */}
            <section className="py-24 bg-[#0B2447] text-white overflow-hidden relative">
                {/* Background Map Effect */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='white'/%3E%3C/svg%3E")` }}></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <Globe className="w-12 h-12 text-[#D4AF37] mx-auto mb-6" strokeWidth={1} />
                        <span className={`${montserrat.className} text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase block mb-3`}>
                            International Representation
                        </span>
                        <h2 className={`${cinzel.className} text-4xl md:text-5xl text-white`}>
                            Royal Delegations
                        </h2>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6">
                        {delegates.length > 0 ? (
                            delegates.map((delegate, idx) => (
                                <motion.div
                                    key={delegate.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="w-full md:w-[calc(50%-2rem)] lg:w-[calc(25%-2rem)] min-w-[280px] max-w-sm bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:border-[#D4AF37]/50 transition-colors group"
                                >
                                    <h3 className={`${cinzel.className} text-lg text-[#D4AF37] mb-4 h-12 flex items-center`}>
                                        {delegate.role_title}
                                    </h3>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                            <Users size={14} className="text-white/70" />
                                        </div>
                                        <span className={`${lato.className} text-white/60 text-sm`}>{delegate.name}</span>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="w-full text-center text-white/40 italic">Information pending...</div>
                        )}
                    </div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="py-12 bg-[#F9F8F6] text-center border-t border-[#D4AF37]/20">
                <div className="container mx-auto px-6">
                    <p className={`${montserrat.className} text-[10px] uppercase tracking-[0.2em] text-[#0B2447] opacity-60`}>
                        Official Administration of the Royal House of Bharuch
                    </p>
                </div>
            </footer>
        </main>
    );
}
