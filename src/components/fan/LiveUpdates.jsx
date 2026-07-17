import { motion } from "framer-motion";
import { Bell, Globe, Sparkles } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useState } from "react";

const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "de", name: "German", flag: "🇩🇪" },
    { code: "pt", name: "Portuguese", flag: "🇧🇷" },
    { code: "ja", name: "Japanese", flag: "🇯🇵" },
    { code: "ar", name: "Arabic", flag: "🇸🇦" },
    { code: "zh", name: "Chinese", flag: "🇨🇳" },
];

const mockUpdates = [
    { id: 1, time: "45'+2", type: "goal", message: "GOAL! USA takes the lead! Christian Pulisic scores a stunning volley! 🇺🇸⚽", isInjured: false },
    { id: 2, time: "38'", type: "yellow", message: "Yellow card for England's Declan Rice after a late challenge", isInjured: false },
    { id: 3, time: "32'", type: "substitution", message: "Substitution: Reyna replaces Aaronson for USA", isInjured: false },
    { id: 4, time: "25'", type: "chance", message: "Harry Kane hits the post! So close for England!", isInjured: false },
    { id: 5, time: "18'", type: "injury", message: "Play stopped - medical team on the field for England's Shaw", isInjured: true },
    { id: 6, time: "10'", type: "stat", message: "Possession: USA 55% - 45% England • Shots: 4-3", isInjured: false },
];

export default function LiveUpdates() {
    const { language, setLanguage, notifications, markNotificationRead } = useApp();
    const [showLangSelector, setShowLangSelector] = useState(false);

    return (
        <div className="page-container">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="section-title mb-0">
                        <Bell size={24} className="text-accent" />
                        Live Updates
                    </h1>
                    <button onClick={() => setShowLangSelector(!showLangSelector)} className="btn-secondary text-xs py-1.5 px-3">
                        <Globe size={14} />
                        {languages.find((l) => l.code === language)?.flag || "🇬🇧"}
                    </button>
                </div>

                {/* Language Selector */}
                {showLangSelector && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-3">
                        <div className="grid grid-cols-4 gap-2">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => { setLanguage(lang.code); setShowLangSelector(false); }}
                                    className={`p-2 rounded-xl text-center transition-all ${language === lang.code ? "bg-accent/10 border border-accent/30" : "hover:bg-glass"}`}
                                >
                                    <span className="text-lg">{lang.flag}</span>
                                    <p className="text-[10px] mt-0.5">{lang.name}</p>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* AI Translation Badge */}
                <div className="flex items-center gap-2 text-xs text-text-muted">
                    <Sparkles size={12} className="text-accent" />
                    <span>Updates translated to {languages.find((l) => l.code === language)?.name} via AI</span>
                </div>

                {/* Match Feed */}
                <div className="space-y-2">
                    {mockUpdates.map((update) => (
                        <motion.div
                            key={update.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`glass-card p-3 flex items-start gap-3 ${update.type === "goal" ? "border-accent/30 bg-accent/5" : ""
                                } ${update.isInjured ? "border-warning/30" : ""}`}
                        >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${update.type === "goal" ? "bg-accent/20 text-accent" :
                                    update.type === "yellow" ? "bg-warning/20 text-warning" :
                                        update.isInjured ? "bg-danger/20 text-danger" :
                                            "bg-glass text-text-muted"
                                }`}>
                                {update.time}
                            </div>
                            <div className="flex-1">
                                <p className="text-xs">{update.message}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Notifications */}
                <h2 className="section-title text-lg mt-4">Notifications</h2>
                <div className="space-y-2">
                    {notifications.map((n) => (
                        <div
                            key={n.id}
                            className={`glass-card p-3 flex items-start gap-3 cursor-pointer ${!n.read ? "border-accent/20" : ""}`}
                            onClick={() => markNotificationRead(n.id)}
                        >
                            <div className={`w-2 h-2 rounded-full mt-1.5 ${!n.read ? "bg-accent" : "bg-transparent"}`} />
                            <div className="flex-1">
                                <p className="text-xs">{n.message}</p>
                                <span className="text-[10px] text-text-muted mt-1 block">{n.type}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}