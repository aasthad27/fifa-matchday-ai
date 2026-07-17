import { motion } from "framer-motion";
import { Users, Activity, Heart, AlertTriangle, TrendingUp } from "lucide-react";
import { stadiumZones } from "../../data/stadium";

export default function StaffDashboard() {
    const totalCapacity = stadiumZones.reduce((sum, z) => sum + z.capacity, 0);
    const totalOccupancy = stadiumZones.reduce((sum, z) => sum + z.currentOccupancy, 0);
    const occupancyPercent = Math.round((totalOccupancy / totalCapacity) * 100);

    const kpis = [
        { label: "Total Fans", value: totalOccupancy.toLocaleString(), icon: Users, color: "accent", change: "+12%" },
        { label: "Occupancy", value: `${occupancyPercent}%`, icon: Activity, color: "success", change: "+5%" },
        { label: "Alerts", value: "3", icon: AlertTriangle, color: "danger", change: "-2" },
        { label: "Sentiment", value: "8.4/10", icon: Heart, color: "gold", change: "+0.3" },
    ];

    return (
        <div className="space-y-4">
            <h1 className="section-title">
                <TrendingUp size={24} className="text-accent" />
                Staff Dashboard
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {kpis.map((kpi) => (
                    <div key={kpi.label} className="glass-card p-4">
                        <div className="flex items-center justify-between mb-2">
                            <kpi.icon size={18} className={`text-${kpi.color}`} />
                            <span className={`text-xs ${kpi.change.startsWith("+") ? "text-success" : "text-danger"}`}>{kpi.change}</span>
                        </div>
                        <p className="text-2xl font-bold">{kpi.value}</p>
                        <p className="text-xs text-text-muted">{kpi.label}</p>
                    </div>
                ))}
            </div>

            <div className="glass-card p-4">
                <h3 className="text-sm font-semibold mb-3">Stadium Zone Occupancy</h3>
                <div className="space-y-2">
                    {stadiumZones.map((zone) => {
                        const pct = Math.round((zone.currentOccupancy / zone.capacity) * 100);
                        return (
                            <div key={zone.id} className="flex items-center gap-3">
                                <span className="text-xs font-medium w-24 truncate">{zone.name}</span>
                                <div className="flex-1 h-2 rounded-full bg-glass overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all"
                                        style={{ width: `${pct}%`, background: zone.color }}
                                    />
                                </div>
                                <span className="text-xs text-text-muted w-16 text-right">{pct}%</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}