import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Bell, BellOff, CheckCircle } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { matches } from "../../data/matches";

export default function MatchSchedule() {
    const navigate = useNavigate();
    const { checkedInMatches, reminders, toggleCheckIn, toggleReminder } = useApp();

    return (
        <div className="page-container">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h1 className="section-title">
                    <Calendar size={24} className="text-accent" />
                    Match Schedule
                </h1>
                <p className="text-sm text-text-muted -mt-4 mb-4">FIFA World Cup 2026 • Group Stage</p>

                <div className="space-y-3">
                    {matches.map((match, index) => (
                        <motion.div
                            key={match.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="glass-card p-4 cursor-pointer"
                            onClick={() => navigate(`/fan/match/${match.id}`)}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="badge badge-accent">{match.stadiumZone}</span>
                                <div className="flex items-center gap-2">
                                    {checkedInMatches.includes(match.id) && (
                                        <span className="badge badge-success">Checked In</span>
                                    )}
                                    <span className="text-xs text-text-muted">{match.date}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{match.homeFlag}</span>
                                    <span className="font-semibold">{match.homeTeam}</span>
                                </div>
                                <div className="text-center px-4">
                                    <p className="text-xs text-text-muted">VS</p>
                                    <p className="text-sm font-bold text-accent">{match.time}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-semibold">{match.awayTeam}</span>
                                    <span className="text-2xl">{match.awayFlag}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-glass-border">
                                <div className="flex items-center gap-1.5 text-xs text-text-muted">
                                    <MapPin size={12} />
                                    <span>{match.stadium}</span>
                                </div>
                                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                    <button
                                        onClick={() => toggleReminder(match.id)}
                                        className={`p-1.5 rounded-lg transition-colors ${reminders.includes(match.id) ? "text-accent bg-accent/10" : "text-text-muted hover:text-text"}`}
                                    >
                                        {reminders.includes(match.id) ? <Bell size={14} /> : <BellOff size={14} />}
                                    </button>
                                    <button
                                        onClick={() => toggleCheckIn(match.id)}
                                        className={`p-1.5 rounded-lg transition-colors ${checkedInMatches.includes(match.id) ? "text-success bg-success/10" : "text-text-muted hover:text-text"}`}
                                    >
                                        <CheckCircle size={14} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}