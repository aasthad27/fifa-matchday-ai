import { motion } from "framer-motion";
import { AlertTriangle, Phone, MapPin, Shield } from "lucide-react";
import { useState } from "react";

export default function EmergencyAlert() {
    const [activated, setActivated] = useState(false);

    return (
        <div className="page-container">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h1 className="section-title">
                    <AlertTriangle size={24} className="text-danger" />
                    Emergency Alert
                </h1>

                {!activated ? (
                    <div className="text-center space-y-4">
                        <div className="glass-card p-8">
                            <div className="w-24 h-24 rounded-full bg-danger/10 border-2 border-danger flex items-center justify-center mx-auto mb-4 animate-pulse">
                                <AlertTriangle size={48} className="text-danger" />
                            </div>
                            <h2 className="text-lg font-bold mb-2">Emergency?</h2>
                            <p className="text-sm text-text-muted mb-6">Press the button below to alert stadium security and medical staff immediately.</p>
                            <button
                                onClick={() => setActivated(true)}
                                className="btn-danger text-lg px-8 py-4 rounded-2xl animate-glow"
                            >
                                🚨 ACTIVATE ALERT
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="glass-card p-4 text-center">
                                <Phone size={24} className="text-accent mx-auto mb-2" />
                                <p className="text-xs font-medium">Emergency Hotline</p>
                                <p className="text-lg font-bold text-accent">911</p>
                            </div>
                            <div className="glass-card p-4 text-center">
                                <Shield size={24} className="text-accent mx-auto mb-2" />
                                <p className="text-xs font-medium">Stadium Security</p>
                                <p className="text-lg font-bold text-accent">Ext. 5500</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="glass-card p-8 text-center border-danger/50 bg-danger/5">
                        <div className="w-16 h-16 rounded-full bg-danger/20 flex items-center justify-center mx-auto mb-4">
                            <Shield size={32} className="text-danger" />
                        </div>
                        <h2 className="text-lg font-bold text-danger mb-2">Alert Activated!</h2>
                        <p className="text-sm text-text-muted mb-4">Security and medical staff have been notified. Help is on the way.</p>
                        <div className="flex items-center justify-center gap-2 text-xs text-text-muted mb-6">
                            <MapPin size={14} />
                            <span>Your location has been shared with stadium security</span>
                        </div>
                        <button
                            onClick={() => setActivated(false)}
                            className="btn-secondary"
                        >
                            Cancel Alert
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}