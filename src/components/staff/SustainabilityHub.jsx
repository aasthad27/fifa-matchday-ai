import { motion } from "framer-motion";
import { Leaf, Zap, Recycle, Trophy } from "lucide-react";

const ecoData = {
    totalCO2Saved: 12450,
    recyclingRate: 78,
    energySaving: 3400,
    greenCommute: 4560,
};

const challenges = [
    { id: "c1", name: "Zero Waste Champion", target: "Recycle 5 items", progress: 3, points: 100, icon: "♻️" },
    { id: "c2", name: "Green Commuter", target: "Use eco-transport 3 times", progress: 2, points: 150, icon: "🚲" },
    { id: "c3", name: "Carbon Saver", target: "Save 10kg CO2", progress: 6.5, points: 200, icon: "🌱" },
    { id: "c4", name: "Energy Watcher", target: "Visit 3 eco-stations", progress: 1, points: 75, icon: "💡" },
];

export default function SustainabilityHub() {
    return (
        <div className="space-y-4">
            <h1 className="section-title">
                <Leaf size={24} className="text-success" />
                Sustainability Hub
            </h1>

            <div className="grid grid-cols-2 gap-3">
                <div className="glass-card p-4 text-center">
                    <Leaf size={24} className="text-success mx-auto mb-2" />
                    <p className="text-lg font-bold">{ecoData.totalCO2Saved.toLocaleString()} kg</p>
                    <p className="text-xs text-text-muted">CO₂ Saved</p>
                </div>
                <div className="glass-card p-4 text-center">
                    <Recycle size={24} className="text-accent mx-auto mb-2" />
                    <p className="text-lg font-bold">{ecoData.recyclingRate}%</p>
                    <p className="text-xs text-text-muted">Recycling Rate</p>
                </div>
                <div className="glass-card p-4 text-center">
                    <Zap size={24} className="text-gold mx-auto mb-2" />
                    <p className="text-lg font-bold">{ecoData.energySaving} kWh</p>
                    <p className="text-xs text-text-muted">Energy Saved</p>
                </div>
                <div className="glass-card p-4 text-center">
                    <Trophy size={24} className="text-accent2 mx-auto mb-2" />
                    <p className="text-lg font-bold">{ecoData.greenCommute.toLocaleString()}</p>
                    <p className="text-xs text-text-muted">Green Commutes</p>
                </div>
            </div>

            <div className="glass-card p-4">
                <h3 className="text-sm font-semibold mb-3">Active Eco-Challenges</h3>
                <div className="space-y-3">
                    {challenges.map((ch) => (
                        <div key={ch.id} className="p-3 rounded-xl bg-glass">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">{ch.icon}</span>
                                    <div>
                                        <p className="text-xs font-medium">{ch.name}</p>
                                        <p className="text-[10px] text-text-muted">{ch.target}</p>
                                    </div>
                                </div>
                                <span className="badge badge-gold">{ch.points} pts</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-glass overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-success transition-all"
                                    style={{ width: `${(ch.progress / parseInt(ch.target)) * 100}%` }}
                                />
                            </div>
                            <p className="text-[10px] text-text-muted mt-1">{ch.progress}/{ch.target}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}