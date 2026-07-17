import { motion } from "framer-motion";
import { Users, Search } from "lucide-react";
import { players } from "../../data/teams";
import { useState } from "react";

export default function PlayerRegistry() {
    const [search, setSearch] = useState("");

    const filtered = players.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.team.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <h1 className="section-title">
                <Users size={24} className="text-accent" />
                Player Registry
            </h1>

            <div className="glass-card p-3">
                <div className="flex gap-2">
                    <Search size={18} className="text-text-muted mt-3 ml-2" />
                    <input
                        type="text"
                        placeholder="Search players or teams..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input-field"
                    />
                </div>
            </div>

            <div className="space-y-2">
                {filtered.map((player) => (
                    <div key={player.id} className="glass-card p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-xs font-bold text-accent">
                                #{player.jersey}
                            </div>
                            <div>
                                <p className="text-sm font-medium">{player.name}</p>
                                <p className="text-xs text-text-muted">{player.team} • {player.position}</p>
                            </div>
                        </div>
                        <span className="text-xs text-text-muted">{player.age} yrs</span>
                    </div>
                ))}
            </div>
        </div>
    );
}