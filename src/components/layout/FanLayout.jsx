import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Calendar, MapPin, Camera, Trophy, User, Bell, Shield } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useState } from "react";

const navItems = [
    { path: "/fan", icon: Home, label: "Home" },
    { path: "/fan/matches", icon: Calendar, label: "Matches" },
    { path: "/fan/transport", icon: MapPin, label: "Transport" },
    { path: "/fan/photos", icon: Camera, label: "Photos" },
    { path: "/fan/updates", icon: Bell, label: "Updates" },
    { path: "/fan/predictions", icon: Trophy, label: "Predict" },
    { path: "/fan/accessibility", icon: User, label: "Access" },
    { path: "/fan/avatar", icon: Shield, label: "Avatar" },
];

export default function FanLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { notifications, user } = useApp();
    const [showMore, setShowMore] = useState(false);
    const unreadCount = notifications.filter((n) => !n.read).length;

    const moreItems = [
        { path: "/fan/lost-found", icon: Bell, label: "Lost & Found" },
        { path: "/fan/medbuddy", icon: Bell, label: "MedBuddy" },
        { path: "/fan/emergency", icon: Bell, label: "Emergency" },
        { path: "/login/staff", icon: Shield, label: "Staff Mode" },
    ];

    const isActive = (path) => {
        if (path === "/fan") return location.pathname === "/fan";
        return location.pathname.startsWith(path);
    };

    return (
        <div className="app-shell">
            <header className="top-bar">
                <div className="top-bar-brand">
                    <div className="top-bar-avatar">{user.name.charAt(0)}</div>
                    <div>
                        <h1>MatchDay AI</h1>
                        <p>FIFA World Cup 2026</p>
                    </div>
                </div>

                <div className="top-bar-actions">
                    <div className="points-pill">
                        <span>⭐</span>
                        <span>{user.points}</span>
                    </div>
                    <button className="icon-btn" onClick={() => navigate("/fan/updates")}>
                        <Bell size={18} />
                        {unreadCount > 0 && <span className="icon-badge">{unreadCount}</span>}
                    </button>
                </div>
            </header>

            <main className="page-shell">
                <Outlet />
            </main>

            <nav className="bottom-nav">
                <div className="nav-pill-wrap nav-pill-wrap-wide">
                    {navItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => {
                                setShowMore(false);
                                navigate(item.path);
                            }}
                            className={`nav-pill ${isActive(item.path) ? "active" : ""}`}
                        >
                            <item.icon size={17} />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
            </nav>

            {showMore && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="more-menu"
                >
                    <div className="more-grid">
                        {moreItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => {
                                    setShowMore(false);
                                    navigate(item.path);
                                }}
                                className="more-item"
                            >
                                <item.icon size={16} />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}