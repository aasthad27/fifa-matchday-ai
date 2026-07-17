import { motion } from "framer-motion";
import { Activity, Users, TrendingUp } from "lucide-react";
import { stadiumZones, amenities } from "../../data/stadium";
import { crowdPredictions } from "../../data/transport";

export default function CrowdFlow() {
    return (
        <div className="space-y-4">
            <h1 className="section-title">
                <Activity size={24} className="text-accent" />
                Crowd Flow Analysis
            </h1>

            <div className="glass-card p-4">
                <h3 className="text-sm font-semibold mb-3">Real-time Zone Heatmap</h3>
                <div className="grid grid-cols-3 gap-2">
                    {stadiumZones.map((zone) => {
                        const pct = Math.round((zone.currentOccupancy / zone.capacity) * 100);
                        return (
                            <div key={zone.id} className="p-3 rounded-xl text-center" style={{ background: `${zone.color}20`, border: `1px solid ${zone.color}40` }}>
                                <p className="text-xs font-medium">{zone.name}</p>
                                <p className="text-lg font-bold" style={{ color: zone.color }}>{pct}%</p>
                                <p className="text-[10px] text-text-muted">{zone.currentOccupancy}/{zone.capacity}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="glass-card p-4">
                <h3 className="text-sm font-semibold mb-3">Predicted Crowd Flow</h3>
                <div className="flex items-end gap-1 h-32">
                    {crowdPredictions.map((cp, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div
                                className="w-full rounded-t-lg transition-all"
                                style={{
                                    height: `${cp.crowdLevel}%`,
                                    background: cp.crowdLevel > 80 ? "var(--danger)" : cp.crowdLevel > 50 ? "var(--warning)" : "var(--success)",
                                }}
                            />
                            <span className="text-[8px] text-text-muted">{cp.time}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="glass-card p-4">
                <h3 className="text-sm font-semibold mb-3">Gate & Amenity Status</h3>
                <div className="space-y-2">
                    {amenities.map((amenity) => (
                        <div key={amenity.id} className="flex items-center justify-between p-2 rounded-xl bg-glass">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${amenity.status === "open" || amenity.status === "active" ? "bg-success" : "bg-danger"}`} />
                                <span className="text-xs">{amenity.name}</span>
                            </div>
                            <span className="text-[10px] text-text-muted">{amenity.location}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}