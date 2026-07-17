import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Activity, Heart, Leaf, MessageSquare, Ticket, ArrowLeft } from "lucide-react";

const sidebarItems = [
    { path: "/staff", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/staff/players", icon: Users, label: "Players" },
    { path: "/staff/crowd", icon: Activity, label: "Crowd Flow" },
    { path: "/staff/sentiment", icon: Heart, label: "Sentiment" },
    { path: "/staff/sustainability", icon: Leaf, label: "Sustainability" },
    { path: "/staff/assist", icon: MessageSquare, label: "Staff Assist" },
    { path: "/staff/tickets", icon: Ticket, label: "Tickets" },
];

export default function StaffLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="staff-shell">
            <aside className="staff-sidebar">
                <div className="staff-sidebar-header">
                    <div className="staff-logo">S</div>
                    <div>
                        <h2>Staff Console</h2>
                        <p>FIFA World Cup 2026</p>
                    </div>
                </div>

                <nav className="staff-nav">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`staff-sidebar-item ${location.pathname === item.path ? "active" : ""}`}
                        >
                            <item.icon size={18} />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="staff-sidebar-footer">
                    <button onClick={() => navigate("/")} className="staff-switch-btn">
                        <ArrowLeft size={16} />
                        <span>Switch to fan mode</span>
                    </button>
                </div>
            </aside>

            <div className="staff-mobile-topbar">
                <button onClick={() => navigate("/")} className="staff-mobile-back">
                    <ArrowLeft size={18} />
                    <span>Fan mode</span>
                </button>
                <h2>Staff Console</h2>
                <div className="staff-mobile-spacer" />
            </div>

            <nav className="staff-mobile-nav">
                {sidebarItems.map((item) => (
                    <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className={`staff-mobile-item ${location.pathname === item.path ? "active" : ""}`}
                    >
                        <item.icon size={16} />
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            <main className="staff-main">
                <div className="staff-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}