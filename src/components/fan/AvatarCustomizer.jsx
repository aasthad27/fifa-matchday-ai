import { motion } from "framer-motion";
import { User, Shirt, Shield } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { jerseyOptions } from "../../data/teams";
import { useState } from "react";

export default function AvatarCustomizer() {
    const { user, setUser } = useApp();
    const [selectedTeam, setSelectedTeam] = useState(user.team);
    const [jerseyNum, setJerseyNum] = useState(user.jerseyNumber);

    const currentJersey = jerseyOptions.find((j) => j.team === selectedTeam);

    return (
        <div className="page-container">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h1 className="section-title">
                    <User size={24} className="text-accent" />
                    My Avatar
                </h1>

                {/* Avatar Preview */}
                <div className="glass-card p-6 text-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent to-accent3 mx-auto mb-4 flex items-center justify-center relative">
                        <span className="text-4xl font-bold text-primary">{user.name.charAt(0)}</span>
                        {currentJersey && (
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full" style={{ background: currentJersey.homeColor }} />
                        )}
                    </div>
                    <h2 className="text-lg font-bold">{user.name}</h2>
                    <div className="flex items-center justify-center gap-2 mt-1">
                        <span className="text-xs text-text-muted">#{jerseyNum}</span>
                        <span className="text-xs text-accent">• {selectedTeam}</span>
                    </div>
                </div>

                {/* Jersey Selection */}
                <div className="glass-card p-4">
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <Shirt size={16} className="text-accent" />
                        Choose Your Jersey
                    </h3>
                    <div className="grid grid-cols-4 gap-2">
                        {jerseyOptions.slice(0, 12).map((jersey) => (
                            <button
                                key={jersey.id}
                                onClick={() => setSelectedTeam(jersey.team)}
                                className={`p-2 rounded-xl text-center transition-all ${selectedTeam === jersey.team ? "ring-2 ring-accent bg-accent/10" : "hover:bg-glass"
                                    }`}
                            >
                                <div className="w-8 h-8 rounded-lg mx-auto mb-1" style={{ background: jersey.homeColor }} />
                                <span className="text-[9px] font-medium">{jersey.team}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Jersey Number */}
                <div className="glass-card p-4">
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <Shield size={16} className="text-accent" />
                        Jersey Number
                    </h3>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setJerseyNum(Math.max(1, jerseyNum - 1))} className="btn-secondary text-xs px-3">-</button>
                        <input
                            type="number"
                            value={jerseyNum}
                            onChange={(e) => setJerseyNum(Math.min(99, Math.max(1, parseInt(e.target.value) || 1)))}
                            className="input-field text-center w-20"
                            min={1}
                            max={99}
                        />
                        <button onClick={() => setJerseyNum(Math.min(99, jerseyNum + 1))} className="btn-secondary text-xs px-3">+</button>
                    </div>
                </div>

                <button
                    onClick={() => setUser({ ...user, team: selectedTeam, jerseyNumber: jerseyNum })}
                    className="btn-primary w-full"
                >
                    Save Avatar
                </button>
            </motion.div>
        </div>
    );
}