import { motion } from "framer-motion";
import { Trophy, Star, ArrowUp, Gift } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { predictions, leaderboard, rewards } from "../../data/predictions";

export default function Predictions() {
    const { userPredictions, addPrediction, user } = useApp();

    return (
        <div className="page-container">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h1 className="section-title">
                    <Trophy size={24} className="text-gold" />
                    Predictions & Rewards
                </h1>

                {/* Points Banner */}
                <div className="glass-card p-4 bg-gradient-to-r from-accent/10 to-gold/10 border-gold/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-text-muted">Your Points</p>
                            <p className="text-2xl font-bold gradient-text-gold">⭐ {user.points}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-text-muted">Rank</p>
                            <p className="text-lg font-bold text-accent">#5</p>
                        </div>
                    </div>
                </div>

                {/* Predictions */}
                <h2 className="text-sm font-semibold">Match Predictions</h2>
                <div className="space-y-3">
                    {predictions.map((pred) => (
                        <div key={pred.id} className="glass-card p-4">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-sm font-medium">{pred.question}</p>
                                <span className="badge badge-accent">{pred.pointsAwarded} pts</span>
                            </div>
                            <div className="space-y-2">
                                {pred.options.map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() => !userPredictions[pred.id] && addPrediction(pred.id, opt.id)}
                                        disabled={!!userPredictions[pred.id]}
                                        className={`w-full p-3 rounded-xl border text-left transition-all ${userPredictions[pred.id] === opt.id
                                                ? "border-accent bg-accent/10"
                                                : "border-glass-border hover:border-accent/30"
                                            } ${userPredictions[pred.id] && userPredictions[pred.id] !== opt.id ? "opacity-50" : ""}`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">{opt.label}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-text-muted">{opt.votes.toLocaleString()} votes</span>
                                                <span className="badge badge-gold">{opt.odds}x</span>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                            {userPredictions[pred.id] && (
                                <p className="text-xs text-success mt-2 flex items-center gap-1">
                                    <Star size={12} /> Prediction locked in! +10 pts
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Leaderboard */}
                <h2 className="text-sm font-semibold mt-4">Leaderboard</h2>
                <div className="glass-card overflow-hidden">
                    {leaderboard.map((entry) => (
                        <div
                            key={entry.rank}
                            className={`flex items-center justify-between p-3 border-b border-glass-border last:border-b-0 ${entry.isUser ? "bg-accent/5" : ""
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${entry.rank <= 3 ? "bg-gold/20 text-gold" : "bg-glass text-text-muted"
                                    }`}>{entry.rank}</span>
                                <span className="text-sm">{entry.avatar}</span>
                                <span className="text-sm font-medium">{entry.username}</span>
                            </div>
                            <div className="text-right">
                                <span className="text-sm font-bold text-accent">{entry.points}</span>
                                <span className="text-xs text-text-muted ml-2">({entry.predictionsCorrect})</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Rewards Shop */}
                <h2 className="text-sm font-semibold">Rewards Shop</h2>
                <div className="grid grid-cols-2 gap-3">
                    {rewards.map((reward) => (
                        <div key={reward.id} className={`glass-card p-4 text-center ${!reward.available ? "opacity-50" : ""}`}>
                            <span className="text-2xl">{reward.icon}</span>
                            <p className="text-xs font-semibold mt-2">{reward.name}</p>
                            <p className="text-xs text-accent mt-1">{reward.points} pts</p>
                            {reward.available ? (
                                <button className="btn-primary text-xs py-1 px-3 mt-2 w-full">Redeem</button>
                            ) : (
                                <span className="text-xs text-text-muted mt-2 block">Coming soon</span>
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}