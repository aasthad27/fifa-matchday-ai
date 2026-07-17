import { motion } from "framer-motion";
import { MapPin, Clock, Users, Car, Bus, Train, Footprints, AlertTriangle, ArrowRight } from "lucide-react";
import { useState } from "react";
import { transportOptions, crowdPredictions, trafficData } from "../../data/transport";
import { exitRoutes } from "../../data/stadium";

export default function TransportPlanner() {
    const [selectedTransport, setSelectedTransport] = useState(null);
    const [address, setAddress] = useState("");

    return (
        <div className="page-container">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h1 className="section-title">
                    <MapPin size={24} className="text-accent" />
                    Transport Planner
                </h1>

                {/* Address Input */}
                <div className="glass-card p-4">
                    <label className="text-xs text-text-muted mb-2 block">Your Location</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Enter your address..."
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="input-field flex-1"
                        />
                        <button className="btn-primary text-xs whitespace-nowrap">Find Routes</button>
                    </div>
                </div>

                {/* Crowd Prediction */}
                <div className="glass-card p-4">
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <Users size={16} className="text-accent" />
                        Estimated Crowd at Stadium
                    </h3>
                    <div className="flex items-end gap-1 h-20">
                        {crowdPredictions.map((cp, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                <div
                                    className="w-full rounded-t-lg transition-all"
                                    style={{
                                        height: `${cp.crowdLevel}%`,
                                        background: cp.crowdLevel > 80 ? "var(--danger)" : cp.crowdLevel > 50 ? "var(--warning)" : "var(--success)",
                                        opacity: 0.8,
                                    }}
                                />
                                <span className="text-[8px] text-text-muted">{cp.time}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-text-muted mt-2">Peak crowd at 20:00 (match time). Arrive early!</p>
                </div>

                {/* Transport Options */}
                <h3 className="text-sm font-semibold">Available Transport</h3>
                <div className="space-y-2">
                    {transportOptions.map((option) => (
                        <div
                            key={option.id}
                            className={`glass-card p-4 cursor-pointer transition-all ${selectedTransport === option.id ? "border-accent" : ""
                                }`}
                            onClick={() => setSelectedTransport(selectedTransport === option.id ? null : option.id)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{option.icon}</span>
                                    <div>
                                        <p className="text-sm font-semibold">{option.type}</p>
                                        <p className="text-xs text-text-muted">{option.route}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-accent">{option.estimatedTime} min</p>
                                    <p className="text-xs text-text-muted">${option.cost}</p>
                                </div>
                            </div>
                            {selectedTransport === option.id && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="mt-3 pt-3 border-t border-glass-border space-y-2">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-text-muted">Frequency</span>
                                        <span>{option.frequency}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-text-muted">Exit Route</span>
                                        <span>{option.exitRoute}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-text-muted">CO₂ Emission</span>
                                        <span>{option.co2} kg</span>
                                    </div>
                                    <button className="btn-primary w-full text-xs mt-2">Select This Route</button>
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Traffic Alert */}
                <div className="glass-card p-4 border-warning/30">
                    <div className="flex items-start gap-3">
                        <AlertTriangle size={18} className="text-warning mt-0.5" />
                        <div>
                            <p className="text-sm font-semibold text-warning">Traffic Alert</p>
                            <p className="text-xs text-text-muted mt-1">{trafficData.incidents[0].description}</p>
                            <p className="text-xs text-text-muted">Estimated delay: {trafficData.estimatedDelay} min</p>
                        </div>
                    </div>
                </div>

                {/* Exit Routes */}
                <h3 className="text-sm font-semibold">Exit Routes from Stadium</h3>
                <div className="space-y-2">
                    {exitRoutes.map((exit) => (
                        <div key={exit.id} className="glass-card p-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${exit.crowdLevel === "high" ? "bg-danger" : exit.crowdLevel === "medium" ? "bg-warning" : "bg-success"
                                    }`} />
                                <div>
                                    <p className="text-xs font-medium">{exit.name}</p>
                                    <p className="text-[10px] text-text-muted">{exit.transport}</p>
                                </div>
                            </div>
                            <span className="text-xs text-accent">{exit.estimatedTime} min</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}