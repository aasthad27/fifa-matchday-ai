import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Camera, Trophy, ArrowRight, Bell, AlertTriangle, Sparkles } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { matches } from "../../data/matches";

export default function Dashboard() {
    const navigate = useNavigate();
    const { user } = useApp();
    const nextMatch = matches[0];

    const quickActions = [
        { icon: Calendar, label: "Check In", path: "/fan/match/1", color: "from-cyan-500 to-blue-600" },
        { icon: MapPin, label: "Transport", path: "/fan/transport", color: "from-violet-500 to-fuchsia-600" },
        { icon: Camera, label: "Photos", path: "/fan/photos", color: "from-emerald-500 to-cyan-600" },
        { icon: Trophy, label: "Predict", path: "/fan/predictions", color: "from-amber-500 to-orange-500" },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.08 } },
    };

    const item = {
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
    };

    return (
        <div className="page-container">
            <motion.div variants={container} initial="hidden" animate="show" className="mx-auto flex max-w-5xl flex-col gap-6 px-1 sm:px-0">
                <motion.div variants={item} className="overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white via-cyan-50/70 to-violet-50/70 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)] sm:p-6">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-700">
                                <Sparkles size={12} />
                                Your matchday hub
                            </div>
                            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Welcome back {user.name}</h1>
                            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-[15px]">
                                Everything you need for the match is right here — from check-in to updates, transport, and predictions.
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Live status</p>
                            <div className="mt-2 flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                                <span className="text-sm font-medium text-slate-700">Match mode on</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-3">
                        <div className="rounded-full bg-slate-900 px-3.5 py-2 text-sm font-medium text-white">Team USA 🇺🇸</div>
                        <div className="rounded-full border border-slate-200 bg-white/80 px-3.5 py-2 text-sm text-slate-600">Live updates enabled</div>
                    </div>
                </motion.div>

                <motion.div variants={item} whileHover={{ y: -2, scale: 1.01 }} className="cursor-pointer overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-cyan-50 via-white to-violet-50 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)] sm:p-6" onClick={() => navigate(`/fan/match/${nextMatch.id}`)}>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="rounded-full border border-cyan-200 bg-cyan-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-700">Up Next</span>
                        <span className="rounded-full bg-white/80 px-3 py-1 text-xs text-slate-500">{nextMatch.date}</span>
                    </div>

                    <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-4">
                        <div className="text-center">
                            <span className="text-4xl sm:text-5xl">{nextMatch.homeFlag}</span>
                            <p className="mt-2 text-sm font-semibold text-slate-800">{nextMatch.homeTeam}</p>
                        </div>

                        <div className="rounded-xl border border-white/70 bg-white/70 px-4 py-3 text-center shadow-sm">
                            <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Kick-off</p>
                            <p className="mt-1 text-lg font-bold text-cyan-700">{nextMatch.time}</p>
                        </div>

                        <div className="text-center">
                            <span className="text-4xl sm:text-5xl">{nextMatch.awayFlag}</span>
                            <p className="mt-2 text-sm font-semibold text-slate-800">{nextMatch.awayTeam}</p>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                            <MapPin size={14} />
                            <span>{nextMatch.stadium}</span>
                        </div>
                        <span className="flex items-center gap-1 text-sm font-semibold text-cyan-700">
                            View details <ArrowRight size={14} />
                        </span>
                    </div>
                </motion.div>

                <motion.div variants={item} className="mt-1">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Quick Actions</h2>
                        <span className="text-sm text-slate-400">One tap away</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                        {quickActions.map((action) => (
                            <button
                                key={action.label}
                                onClick={() => navigate(action.path)}
                                className="group rounded-xl border border-slate-200 bg-white/95 p-4 text-left shadow-[0_8px_20px_rgba(15,23,42,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)]"
                            >
                                <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${action.color}`}>
                                    <action.icon size={18} className="text-white" />
                                </div>
                                <span className="text-sm font-semibold text-slate-800">{action.label}</span>
                                <p className="mt-1 text-xs text-slate-500">Open now</p>
                            </button>
                        ))}
                    </div>
                </motion.div>

                <motion.div variants={item} className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_10px_24px_rgba(15,23,42,0.05)] sm:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-800">Your Stats</h3>
                        <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">⭐ {user.points} pts</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center sm:gap-4">
                        <div className="rounded-xl bg-slate-50 p-3">
                            <p className="text-2xl font-semibold text-cyan-600">{matches.length}</p>
                            <p className="mt-1 text-xs text-slate-500">Matches</p>
                        </div>
                        <div className="rounded-xl bg-slate-50 p-3">
                            <p className="text-2xl font-semibold text-violet-600">8</p>
                            <p className="mt-1 text-xs text-slate-500">Predictions</p>
                        </div>
                        <div className="rounded-xl bg-slate-50 p-3">
                            <p className="text-2xl font-semibold text-emerald-600">5th</p>
                            <p className="mt-1 text-xs text-slate-500">Rank</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={item} className="mt-1">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Latest Updates</h2>
                        <span className="text-sm text-slate-400">Fresh now</span>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                            <Bell size={16} className="mt-0.5 text-cyan-600" />
                            <div>
                                <p className="text-sm font-semibold text-slate-800">Match Reminder</p>
                                <p className="mt-1 text-xs leading-5 text-slate-500">USA vs England kicks off tomorrow at 20:00</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                            <AlertTriangle size={16} className="mt-0.5 text-amber-600" />
                            <div>
                                <p className="text-sm font-semibold text-slate-800">Traffic Alert</p>
                                <p className="mt-1 text-xs leading-5 text-slate-500">Heavy congestion on I-95 near MetLife Stadium</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}