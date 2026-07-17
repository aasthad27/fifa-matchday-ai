import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Sparkles, Shield, Compass, BellRing } from "lucide-react";

const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    delay: Math.random() * 3,
    duration: Math.random() * 3 + 2,
}));

export default function SplashPage() {
    const navigate = useNavigate();
    const [showContent, setShowContent] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        const t1 = setTimeout(() => setShowContent(true), 400);
        const t2 = setTimeout(() => setShowOptions(true), 1800);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    return (
        <div className="auth-shell splash-shell">
            <div className="auth-orb orb-a" />
            <div className="auth-orb orb-b" />
            <div className="auth-orb orb-c" />

            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="splash-particle"
                    style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
                    animate={{ y: [0, -24, 0], opacity: [0.2, 0.8, 0.2] }}
                    transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
                />
            ))}

            <div className="splash-card-wrap">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={showContent ? { scale: 1, opacity: 1 } : {}}
                    transition={{ type: "spring", stiffness: 220, damping: 20, duration: 0.8 }}
                    className="auth-card splash-card"
                >
                    <div className="splash-badge">
                        <Sparkles size={13} />
                        <span>AI-powered matchday control center</span>
                    </div>

                    <div className="splash-hero">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                            className="splash-ball"
                        >
                            <svg viewBox="0 0 100 100" className="splash-ball-svg">
                                <circle cx="50" cy="50" r="48" fill="url(#ballGrad)" stroke="#1d2335" strokeWidth="2" />
                                <path d="M50 2 L50 98" stroke="#1d2335" strokeWidth="1.5" opacity="0.3" />
                                <path d="M2 50 L98 50" stroke="#1d2335" strokeWidth="1.5" opacity="0.3" />
                                <polygon points="50,10 60,30 50,25 40,30" fill="#1d2335" opacity="0.45" />
                                <polygon points="50,90 60,70 50,75 40,70" fill="#1d2335" opacity="0.45" />
                            </svg>
                        </motion.div>

                        <div>
                            <h1>MatchDay AI</h1>
                            <p>FIFA World Cup 2026 • Your smart stadium companion</p>
                        </div>
                    </div>

                    <div className="splash-grid">
                        <div className="splash-tile">
                            <Compass size={18} />
                            <span>Live navigation</span>
                        </div>
                        <div className="splash-tile">
                            <BellRing size={18} />
                            <span>Instant alerts</span>
                        </div>
                        <div className="splash-tile">
                            <Shield size={18} />
                            <span>Secure access</span>
                        </div>
                    </div>

                    <AnimatePresence>
                        {showOptions && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="splash-actions"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate("/login/fan")}
                                    className="auth-btn-primary splash-btn-primary"
                                >
                                    I’m a fan
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate("/login/staff")}
                                    className="auth-btn-primary auth-btn-staff splash-btn-staff"
                                >
                                    I’m staff
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}