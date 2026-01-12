import Image from "next/image";
import { cinzel, lato, montserrat, pinyon } from "@/app/fonts";
import { Anchor, Scroll } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-[#0B2447] text-white pt-24 pb-12 border-t-8 border-[#D4AF37] relative">
            <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-4 gap-12 mb-20 relative z-10">

                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 relative grayscale opacity-80">
                            <Image src="/logo.webp" alt="Crest" fill className="object-contain" />
                        </div>
                        <div>
                            <h4 className={`${cinzel.className} text-2xl font-bold`}>House of Bharuch</h4>
                            <p className={`${pinyon.className} text-[#D4AF37] text-xl`}>Since 1726</p>
                        </div>
                    </div>
                    <p className={`${lato.className} text-white/50 text-sm leading-relaxed max-w-md font-light`}>
                        The Royal House is dedicated to the preservation of heritage, the promotion of education, and the welfare of the people through sustained philanthropic efforts.
                    </p>
                </div>

                <div>
                    <h5 className={`${montserrat.className} text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-8`}>The Household</h5>
                    <ul className={`space-y-4 text-sm text-white/60 ${lato.className} font-light`}>
                        {["The Royal Family", "Orders & Decorations", "Patronages", "History"].map(item => (
                            <li key={item}><a href="#" className="hover:text-white hover:translate-x-2 transition-all inline-block cursor-hover">{item}</a></li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h5 className={`${montserrat.className} text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-8`}>Chancery</h5>
                    <div className="space-y-4 text-sm text-white/60 font-light">
                        <p className="flex items-center gap-3"><Scroll size={14} className="text-[#D4AF37]" /> Office of the Grand Chancellor</p>
                        <p className="flex items-center gap-3"><Anchor size={14} className="text-[#D4AF37]" /> Palace Grounds, Bharuch</p>
                        <p className="flex items-center gap-3 text-white"><span className="w-2 h-2 rounded-full bg-green-500"></span> Open for Inquiries</p>
                    </div>
                </div>

            </div>

            <div className="container mx-auto px-6 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center opacity-40">
                <p className={`text-[10px] uppercase tracking-[0.2em] ${montserrat.className}`}>
                    © {new Date().getFullYear()} The Royal House of Bharuch.
                </p>
                <p className={`text-[10px] uppercase tracking-[0.2em] ${montserrat.className} mt-4 md:mt-0`}>
                    Noblesse Oblige
                </p>
            </div>
        </footer>
    );
};
