import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Shield, Sparkles } from "lucide-react";

export default function StaffLogin() {
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
            navigate("/staff", { replace: true });
        }, 1200);
    };

    return (
        <div className="auth-shell">
            <div className="auth-orb orb-a" />
            <div className="auth-orb orb-c" />

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
                    <div className="auth-icon-wrap auth-icon-wrap-staff">
                        <Shield size={24} />
                    </div>
                    <h2>Staff console</h2>
                    <p>Secure access for operations, support, and match-day coordination.</p>
                </div>

                <div className="auth-demo-card auth-demo-card-staff">
                    <div className="auth-demo-title">
                        <Sparkles size={14} />
                        <span>Demo access</span>
                    </div>
                    <p>Email: staff@fifa2026.com</p>
                    <p>Password: staff123</p>
                </div>

                <form onSubmit={handleLogin} className="auth-form">
                    <label className="auth-field">
                        <span>Staff email</span>
                        <div className="auth-input-wrap">
                            <Mail size={16} className="auth-input-icon" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="staff@fifa2026.com"
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
                            <span>Keep me signed in</span>
                        </label>
                        <button type="button" className="auth-link-btn">Reset password</button>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="auth-btn-primary auth-btn-staff"
                    >
                        {loading ? (
                            <div className="auth-loading-row">
                                <div className="auth-spinner" />
                                <span>Authenticating...</span>
                            </div>
                        ) : (
                            "Access dashboard"
                        )}
                    </motion.button>
                </form>

                <div className="auth-footer">
                    <span>All access is monitored and logged.</span>
                </div>
            </motion.div>
        </div>
    );
}