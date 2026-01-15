"use client";

import { motion } from "framer-motion";
import { Instagram, Twitter, Facebook, Youtube, ExternalLink } from "lucide-react";
import { Cinzel, Lato } from "next/font/google";

// Reusing fonts to ensure consistency if not passed as props, 
// though ideal would be to import from a shared config or pass them down.
// Since page.tsx defines them, we'll assume they are global or imported here.
const cinzel = Cinzel({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    variable: '--font-cinzel'
});

const lato = Lato({
    weight: ["300", "400", "700"],
    subsets: ["latin"],
    variable: '--font-lato'
});

const SectionHeading = ({ subtitle, title, align = "center", light = false }: { subtitle: string; title: string; align?: string; light?: boolean }) => (
    <div className={`flex flex-col ${align === "center" ? "items-center text-center" : "items-start text-left"} mb-20 relative z-10`}>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <span className={`${lato.className} text-xs tracking-[0.3em] uppercase font-bold mb-4 block ${light ? "text-[#D4AF37]" : "text-[#8B1E1E]"}`}>
                {subtitle}
            </span>
            <h2 className={`${cinzel.className} text-3xl md:text-5xl lg:text-6xl mb-6 ${light ? "text-white" : "text-[#0B2447]"}`}>
                {title}
            </h2>
            <div className={`h-[2px] w-24 bg-linear-to-r from-transparent ${light ? "via-[#D4AF37]" : "via-[#0B2447]"} to-transparent mx-auto`}></div>
        </motion.div>
    </div>
);

const SocialConnect = () => {
    const socials = [
        { title: "Instagram", icon: Instagram, handle: "@RoyalHouseBharuch", link: "#" },
        { title: "Twitter", icon: Twitter, handle: "@HouseOfBharuch", link: "#" },
        { title: "Facebook", icon: Facebook, handle: "/RoyalHouseBharuch", link: "#" },
        { title: "YouTube", icon: Youtube, handle: "Royal Archives", link: "#" }
    ];

    return (
        <section id="social-connect" className="py-24 md:py-32 bg-[#051020] text-white relative overflow-hidden">
            {/* Pattern Overlay matching the theme */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>

            {/* Radial Gradient for depth */}
            <div className="absolute inset-0 bg-radial-at-c from-[#D4AF37]/5 to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <SectionHeading subtitle="The Digital Court" title="Connect With Us" align="center" light={true} />

                <div className="grid md:grid-cols-4 gap-6 mt-16 max-w-6xl mx-auto">
                    {socials.map((item, idx) => (
                        <motion.a
                            key={idx}
                            href={item.link}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.15 }}
                            className="group relative bg-[#ffffff]/5 backdrop-blur-sm border border-[#ffffff]/10 p-8 flex flex-col items-center text-center hover:bg-[#ffffff]/10 hover:border-[#D4AF37]/50 transition-all duration-500 cursor-pointer overflow-hidden"
                        >
                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-linear-to-t from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative w-16 h-16 mb-6">
                                {/* Rotating Border */}
                                <div className="absolute inset-0 border border-[#D4AF37] opacity-30 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-700"></div>
                                <div className="absolute inset-2 border border-[#D4AF37] opacity-60 group-hover:rotate-90 transition-all duration-700"></div>

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <item.icon className="w-6 h-6 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300" />
                                </div>
                            </div>

                            <h3 className={`${cinzel.className} text-lg text-[#FDFBF7] mb-2`}>{item.title}</h3>
                            <p className={`${lato.className} text-[#D4AF37] text-xs uppercase tracking-widest mb-4 opacity-80`}>{item.handle}</p>

                            <div className="mt-auto opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                <ExternalLink className="w-4 h-4 text-white/50 hover:text-white" />
                            </div>
                        </motion.a>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 text-center"
                >
                    <p className={`${lato.className} text-white/40 font-light text-sm tracking-widest uppercase`}>
                        Official Updates • Royal Directives • Cultural Events
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default SocialConnect;
