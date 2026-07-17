import { motion } from "framer-motion";
import { Ear, Eye, Accessibility, Volume2, Mic, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function AccessibilityHub() {
    const [audioDesc, setAudioDesc] = useState(false);
    const [signLang, setSignLang] = useState(false);

    return (
        <div className="page-container">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h1 className="section-title">
                    <Accessibility size={24} className="text-accent" />
                    Accessibility Hub
                </h1>

                <div className="grid-2">
                    {/* Audio Description */}
                    <div className="glass-card p-5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                                <Volume2 size={20} className="text-accent" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold">Audio Description</h3>
                                <p className="text-xs text-text-muted">For visually impaired</p>
                            </div>
                        </div>
                        <p className="text-xs text-text-muted mb-4">Real-time AI narration of formations, player emotions, and crowd reactions.</p>
                        <button
                            onClick={() => setAudioDesc(!audioDesc)}
                            className={`w-full py-2 rounded-xl text-xs font-semibold transition-all ${audioDesc ? "bg-accent/20 text-accent border border-accent/30" : "btn-secondary text-xs"}`}
                        >
                            {audioDesc ? "🔊 Active" : "Enable Audio"}
                        </button>
                    </div>

                    {/* Sign Language */}
                    <div className="glass-card p-5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-accent3/10 flex items-center justify-center">
                                <Mic size={20} className="text-accent3" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold">Sign Language Avatar</h3>
                                <p className="text-xs text-text-muted">For hearing impaired</p>
                            </div>
                        </div>
                        <p className="text-xs text-text-muted mb-4">3D AI avatar provides real-time sign language interpretation for stadium announcements.</p>
                        <button
                            onClick={() => setSignLang(!signLang)}
                            className={`w-full py-2 rounded-xl text-xs font-semibold transition-all ${signLang ? "bg-accent3/20 text-accent3 border border-accent3/30" : "btn-secondary text-xs"}`}
                        >
                            {signLang ? "🤟 Active" : "Enable Sign Language"}
                        </button>
                    </div>

                    {/* Mobility Assistance */}
                    <div className="glass-card p-5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                                <Accessibility size={20} className="text-success" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold">Mobility Assistance</h3>
                                <p className="text-xs text-text-muted">For mobility impaired</p>
                            </div>
                        </div>
                        <p className="text-xs text-text-muted mb-4">AI predicts elevator/scooter demand and reserves access slots proactively.</p>
                        <div className="space-y-2">
                            <button className="btn-primary w-full text-xs">Request Scooter</button>
                            <button className="btn-secondary w-full text-xs">Reserve Elevator</button>
                        </div>
                    </div>

                    {/* Real-time Translation */}
                    <div className="glass-card p-5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                                <MessageSquare size={20} className="text-gold" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold">Real-time Translation</h3>
                                <p className="text-xs text-text-muted">Multilingual support</p>
                            </div>
                        </div>
                        <p className="text-xs text-text-muted mb-4">All stadium announcements translated to your preferred language in real-time.</p>
                        <button className="btn-secondary w-full text-xs">Select Language</button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}