import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Sparkles, ShieldCheck } from "lucide-react";

export default function FanLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        if (!email || !password) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate("/fan", { replace: true });
        }, 1200);
    };

    return (
        <div className="auth-shell">
            <div className="auth-orb orb-a" />
            <div className="auth-orb orb-b" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="auth-card"
            >
                <button onClick={() => navigate("/")} className="auth-back-btn">
                    <ArrowLeft size={18} />
                    <span>Back</span>
                </button>

                <div className="auth-hero">
                    <div className="auth-icon-wrap">
                        <ShieldCheck size={24} />
                    </div>
                    <h2>Fan portal</h2>
                    <p>Jump into your match-day experience with a sleek, personalized dashboard.</p>
                </div>

                <div className="auth-demo-card">
                    <div className="auth-demo-title">
                        <Sparkles size={14} />
                        <span>Demo access</span>
                    </div>
                    <p>Email: fan@fifa2026.com</p>
                    <p>Password: fan123</p>
                </div>

                <form onSubmit={handleLogin} className="auth-form">
                    <label className="auth-field">
                        <span>Email</span>
                        <div className="auth-input-wrap">
                            <Mail size={16} className="auth-input-icon" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="fan@fifa2026.com"
                                className="auth-input"
                                required
                            />
                        </div>
                    </label>

                    <label className="auth-field">
                        <span>Password</span>
                        <div className="auth-input-wrap">
                            <Lock size={16} className="auth-input-icon" />
                            <input
                                type={showPw ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="auth-input"
                                required
                            />
                            <button type="button" onClick={() => setShowPw(!showPw)} className="auth-eye-btn">
                                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </label>

                    <div className="auth-option-row">
                        <label className="auth-check-row">
                            <input type="checkbox" className="auth-checkbox" />
                            <span>Remember me</span>
                        </label>
                        <button type="button" className="auth-link-btn">Forgot password?</button>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="auth-btn-primary"
                    >
                        {loading ? (
                            <div className="auth-loading-row">
                                <div className="auth-spinner" />
                                <span>Signing in...</span>
                            </div>
                        ) : (
                            "Enter Fan Hub"
                        )}
                    </motion.button>
                </form>

                <div className="auth-footer">
                    <span>New to MatchDay AI?</span>
                    <button type="button" className="auth-link-btn">Create account</button>
                </div>
            </motion.div>
        </div>
    );
}