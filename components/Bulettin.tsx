import { Bell, Calendar, ChevronRight, Scroll, ArrowRight, Newspaper } from "lucide-react";
import { montserrat, lato, cinzel } from "@/app/fonts";

export const RoyalBulletin = () => {
    // Section 1: Quick List Data (Decrees)
    const announcements = [
        {
            date: "Oct 12",
            text: "Restoration of the Summer Palace Gardens to commence next month.",
            isNew: false
        },
        {
            date: "Nov 05",
            text: "His Highness to inaugurate the Annual Arts & Heritage Festival.",
            isNew: true
        },
        {
            date: "Nov 10",
            text: "Winter solstice banquet invitations to be dispatched.",
            isNew: false
        },
        {
            date: "Nov 15",
            text: "New trade routes established with the Northern Isles.",
            isNew: true
        }
    ];

    // Section 2: Multiple News Items
    const newsItems = [
        {
            category: "Press Release",
            date: "Today",
            title: "The Royal Foundation announces 50 new scholarships.",
            excerpt: "A historic move to foster education in arts and sciences across the kingdom.",
            readTime: "3 min read"
        },
        {
            category: "International",
            date: "Yesterday",
            title: "Delegates from the Eastern Empire arrive for the summit.",
            excerpt: "Discussions on trade tariffs and maritime security are expected to last three days.",
            readTime: "5 min read"
        },
        {
            category: "Culture",
            date: "Oct 28",
            title: "The Grand Museum unveils the 'Crown of Ages' exhibit.",
            excerpt: "Public viewing of the ancient artifacts begins this weekend at the capital.",
            readTime: "2 min read"
        },
        {
            category: "Infrastructure",
            date: "Oct 25",
            title: "Completion of the Great Bridge ahead of schedule.",
            excerpt: "The majestic structure connecting the twin cities opens to carriages tomorrow.",
            readTime: "4 min read"
        }
    ];

    return (
        <section className="bg-[#0B2447] border-y-4 border-double border-[#D4AF37] relative z-20 overflow-hidden">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">

                    {/* --- LEFT SECTION: ANNOUNCEMENTS LIST (4 Columns - approx 1/3) --- */}
                    <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[#D4AF37]/30 bg-[#081b36] p-6 md:p-8 flex flex-col">
                        {/* Section Header */}
                        <div className="flex items-center gap-3 mb-6">
                            <Scroll className="text-[#D4AF37] w-5 h-5" />
                            <h3 className={`${cinzel.className} text-[#D4AF37] text-lg font-bold tracking-wider`}>
                                Official Decrees
                            </h3>
                        </div>

                        {/* Vertical List - Scrollable if content overflows */}
                        <div className="flex flex-col gap-6 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                            {announcements.map((item, idx) => (
                                <div key={idx} className="group flex gap-4 items-start cursor-pointer">
                                    {/* Date Box */}
                                    <div className="flex flex-col items-center min-w-[50px] pt-1">
                                        <span className={`${montserrat.className} text-[10px] font-bold text-[#D4AF37]/60 uppercase`}>
                                            {item.date.split(' ')[0]}
                                        </span>
                                        <span className={`${cinzel.className} text-xl font-bold text-white`}>
                                            {item.date.split(' ')[1]}
                                        </span>
                                    </div>

                                    {/* Text Content */}
                                    <div className="flex flex-col gap-1 border-l border-[#D4AF37]/20 pl-4 transition-all group-hover:border-[#D4AF37]">
                                        {item.isNew && (
                                            <span className={`${montserrat.className} text-[9px] font-bold text-red-400 uppercase tracking-widest mb-1`}>
                                                New
                                            </span>
                                        )}
                                        <p className={`${lato.className} text-sm text-slate-300 leading-snug group-hover:text-white transition-colors`}>
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto pt-6 border-t border-[#D4AF37]/10">
                            <button className={`${montserrat.className} text-[10px] font-bold text-[#D4AF37] hover:text-white flex items-center gap-2 transition-colors`}>
                                ARCHIVE <ArrowRight size={12} />
                            </button>
                        </div>
                    </div>

                    {/* --- RIGHT SECTION: NEWS GRID (8 Columns - approx 2/3) --- */}
                    <div className="lg:col-span-8 p-6 md:p-8 bg-[#0B2447]">
                        
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <Newspaper className="text-[#D4AF37] w-5 h-5" />
                                <h3 className={`${cinzel.className} text-white text-lg font-bold tracking-wider`}>
                                    The Royal Chronicle
                                </h3>
                            </div>
                            <button className={`${montserrat.className} text-[#D4AF37]/60 hover:text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-colors`}>
                                View All News <ChevronRight size={12} />
                            </button>
                        </div>

                        {/* News Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {newsItems.map((news, idx) => (
                                <article 
                                    key={idx} 
                                    className="group relative flex flex-col p-5 border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 bg-[#ffffff]/[0.02] hover:bg-[#ffffff]/[0.05] transition-all duration-300"
                                >
                                    {/* Top Meta */}
                                    <div className="flex items-center justify-between mb-3 text-[#D4AF37]/60">
                                        <div className="flex items-center gap-2">
                                            <Bell size={12} />
                                            <span className={`${montserrat.className} text-[9px] font-bold uppercase tracking-wider`}>
                                                {news.category}
                                            </span>
                                        </div>
                                        <span className={`${lato.className} text-xs italic opacity-70`}>{news.date}</span>
                                    </div>

                                    {/* Content */}
                                    <h4 className={`${cinzel.className} text-lg text-white mb-2 leading-tight group-hover:text-[#D4AF37] transition-colors`}>
                                        {news.title}
                                    </h4>
                                    <p className={`${lato.className} text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2`}>
                                        {news.excerpt}
                                    </p>

                                    {/* Footer */}
                                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-dashed border-[#D4AF37]/20">
                                        <span className={`${lato.className} text-[10px] text-slate-500`}>{news.readTime}</span>
                                        <div className="flex items-center gap-1 text-[#D4AF37] opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                            <span className={`${montserrat.className} text-[9px] font-bold uppercase`}>Read</span>
                                            <ArrowRight size={10} />
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default RoyalBulletin;