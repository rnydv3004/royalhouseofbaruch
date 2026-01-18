"use client";

import { Cinzel, Lato, Pinyon_Script, Montserrat } from "next/font/google";
import { motion } from "framer-motion";
import {
    Building2, Users, Crown, Shield, Globe,
    Scroll, Gavel, Scale, Award
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
    bio?: string;
    image_url?: string;
}

interface AdministrationContentProps {
    officers: AdminMember[];
    advisors: AdminMember[];
    delegates: AdminMember[];
}

// --- COMPONENTS ---
const SectionHeading = ({ subtitle, title, light = false }: { subtitle: string, title: string, light?: boolean }) => (
    <div className="text-center mb-16 relative z-10">
        <span className={`${montserrat.className} ${light ? 'text-[#D4AF37]' : 'text-[#D4AF37]'} text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase block mb-3`}>
            {subtitle}
        </span>
        <h2 className={`${cinzel.className} text-3xl md:text-5xl ${light ? 'text-white' : 'text-[#0B2447]'}`}>
            {title}
        </h2>
        <div className="h-px w-24 bg-[#D4AF37] mx-auto mt-6"></div>
    </div>
);

const ChancellorCard = ({ member, isVice = false }: { member: AdminMember, isVice?: boolean }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex flex-col bg-white border border-[#D4AF37]/20 shadow-xl overflow-hidden h-full hover:border-[#D4AF37]/50 transition-all duration-500 group"
    >
        <div className="w-full relative h-[400px] bg-[#0B2447] overflow-hidden">
            {member.image_url ? (
                <Image
                    src={member.image_url}
                    alt={member.name}
                    fill
                    className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-[#0B2447]">
                    <Crown className="w-20 h-20 text-[#D4AF37]/20" strokeWidth={1} />
                </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-[#0B2447] to-transparent text-center">
                <span className={`${montserrat.className} text-[#D4AF37] text-xs font-bold tracking-widest uppercase`}>
                    {member.role_title}
                </span>
            </div>
        </div>
        <div className="w-full p-8 md:p-10 flex flex-col items-center text-center grow">
            <h3 className={`${cinzel.className} text-3xl text-[#0B2447] mb-2`}>{member.name}</h3>
            <div className="h-px w-16 bg-[#D4AF37] mb-6"></div>
            <p className={`${lato.className} text-[#0B2447]/70 text-base leading-relaxed whitespace-pre-line`}>
                {member.bio || "Biography awaiting update..."}
            </p>
        </div>
    </motion.div>
);

const OfficerCard = ({ member }: { member: AdminMember }) => (
    <div className="bg-white p-8 border border-[#D4AF37]/10 border-l-2 border-l-[#D4AF37] shadow-sm hover:shadow-md transition-all duration-300 text-center flex flex-col items-center h-full">
        <div className="mb-4 text-[#D4AF37]/40">
            <Shield size={24} strokeWidth={1} />
        </div>
        <h3 className={`${cinzel.className} text-xl text-[#0B2447] mb-2`}>{member.name}</h3>
        <p className={`${pinyon.className} text-xl text-[#D4AF37] mb-4`}>{member.role_title}</p>
        <p className={`${lato.className} text-gray-600 text-sm leading-relaxed`}>
            {member.bio || "Officer of the Royal Household."}
        </p>
    </div>
);

const AdvisorCard = ({ member }: { member: AdminMember }) => (
    <div className="text-center p-8 border-b border-[#D4AF37]/20 last:border-0 md:border-0 md:bg-[#FDFBF7] md:hover:bg-white md:transition-colors md:p-10">
        <div className="mb-4 flex justify-center">
            <Scale className="w-8 h-8 text-[#D4AF37]/60" strokeWidth={1} />
        </div>
        <h3 className={`${cinzel.className} text-lg text-[#0B2447] mb-2 min-h-[56px] flex items-center justify-center`}>
            {member.name}
        </h3>
        <p className={`${montserrat.className} text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-4`}>
            {member.role_title}
        </p>
        <p className={`${lato.className} text-gray-500 text-sm leading-relaxed max-w-xs mx-auto`}>
            {member.bio || "Royal Advisor."}
        </p>
    </div>
);

const DelegateCard = ({ member }: { member: AdminMember }) => (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:border-[#D4AF37]/40 transition-all duration-300 group text-center flex flex-col items-center">
        <div className="flex flex-col items-center gap-2 mb-4">
            <Globe className="w-8 h-8 text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors" strokeWidth={1} />
            <span className={`${montserrat.className} text-[10px] text-white/40 tracking-widest uppercase`}>Delegate</span>
        </div>
        <h3 className={`${cinzel.className} text-2xl text-white mb-2`}>{member.name}</h3>
        <p className={`${lato.className} text-[#D4AF37] text-sm mb-6 uppercase tracking-widest`}>{member.role_title}</p>
        <p className={`${lato.className} text-white/60 text-sm leading-relaxed font-light border-t border-white/10 pt-4 w-full`}>
            {member.bio || "International Representative of the Royal House."}
        </p>
    </div>
);

export default function AdministrationContent({ officers, advisors, delegates }: AdministrationContentProps) {

    // Filter Officers
    const highChancellery = officers.filter(o =>
        o.role_title.toLowerCase().includes('chancellor')
    ).sort((a, b) => {
        // Chancellor first, then Vice Chancellor
        if (a.role_title.toLowerCase() === 'chancellor') return -1;
        if (b.role_title.toLowerCase() === 'chancellor') return 1;
        return 0;
    });

    const houseOfficers = officers.filter(o =>
        !o.role_title.toLowerCase().includes('chancellor')
    );

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
                        Chancellery, Advisory Council, and Official Delegations
                    </p>
                </motion.div>
            </section>

            {/* --- CHANCELLERY SECTION --- */}
            <section className="py-24 container mx-auto px-6">
                <SectionHeading subtitle="The Highest Office" title="Chancellery of the Royal House" />

                {/* High Chancellery (Photos) */}
                <div className="mb-20 max-w-6xl mx-auto">
                    {highChancellery.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                            {highChancellery.map((member) => (
                                <ChancellorCard key={member.id} member={member} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-400 italic mb-12">Chancellery appointments pending...</div>
                    )}
                </div>

                {/* Other Officers (No Photos) */}
                {houseOfficers.length > 0 && (
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <span className={`${montserrat.className} text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase`}>
                                Officers of the House
                            </span>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {houseOfficers.map(officer => (
                                <OfficerCard key={officer.id} member={officer} />
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/* --- ADVISORY COUNCIL SECTION --- */}
            <section className="py-24 bg-[#F4F1EA] border-t border-[#D4AF37]/10">
                <div className="container mx-auto px-6">
                    <SectionHeading subtitle="Wisdom & Counsel" title="Royal Advisory Council" />

                    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-y-12 md:gap-x-12 md:gap-y-16">
                        {advisors.length > 0 ? (
                            advisors.map(advisor => (
                                <AdvisorCard key={advisor.id} member={advisor} />
                            ))
                        ) : (
                            <div className="col-span-3 text-center text-gray-400 italic">Council appointments pending...</div>
                        )}
                    </div>
                </div>
            </section>

            {/* --- DELEGATIONS SECTION --- */}
            <section className="py-24 bg-[#0B2447] text-white overflow-hidden relative">
                {/* Background Map Effect */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='white'/%3E%3C/svg%3E")` }}></div>

                <div className="container mx-auto px-6 relative z-10">
                    <SectionHeading subtitle="International Representation" title="Royal Delegations" light={true} />

                    <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {delegates.length > 0 ? (
                            delegates.map(delegate => (
                                <DelegateCard key={delegate.id} member={delegate} />
                            ))
                        ) : (
                            <div className="col-span-3 text-center text-white/40 italic">Delegations pending...</div>
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
