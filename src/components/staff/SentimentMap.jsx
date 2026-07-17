import { motion } from "framer-motion";
import { Heart, Smile, Meh, Frown } from "lucide-react";

const sentimentData = [
    { zone: "VIP Lounge", score: 9.2, trend: "up", emoji: "😍" },
    { zone: "East Stand", score: 8.5, trend: "up", emoji: "😊" },
    { zone: "West Stand", score: 7.8, trend: "stable", emoji: "🙂" },
    { zone: "North Terrace", score: 9.0, trend: "up", emoji: "🔥" },
    { zone: "South Terrace", score: 6.5, trend: "down", emoji: "😐" },
    { zone: "Family Zone", score: 8.8, trend: "up", emoji: "🎉" },
    { zone: "Fan Zone", score: 9.5, trend: "up", emoji: "⚡" },
    { zone: "Concourse East", score: 7.2, trend: "stable", emoji: "🙂" },
    { zone: "Concourse West", score: 6.8, trend: "down", emoji: "😕" },
];

export default function SentimentMap() {
    const avgSentiment = (sentimentData.reduce((sum, s) => sum + s.score, 0) / sentimentData.length).toFixed(1);

    return (
        <div className="space-y-4">
            <h1 className="section-title">
                <Heart size={24} className="text-danger" />
                Sentiment Map
            </h1>

            <div className="glass-card p-4 text-center">
                <p className="text-xs text-text-muted">Overall Stadium Sentiment</p>
                <p className="text-4xl font-bold gradient-text">{avgSentiment}/10</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                    <Smile size={20} className="text-success" />
                    <span className="text-xs text-text-muted">Positive atmosphere</span>
                </div>
            </div>

            <div className="space-y-2">
                {sentimentData.map((item) => (
                    <div key={item.zone} className="glass-card p-3">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">{item.emoji}</span>
                                <span className="text-sm font-medium">{item.zone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold">{item.score}</span>
                                <span className={`text-xs ${item.trend === "up" ? "text-success" : item.trend === "down" ? "text-danger" : "text-text-muted"}`}>
                                    {item.trend === "up" ? "↑" : item.trend === "down" ? "↓" : "→"}
                                </span>
                            </div>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-glass overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all"
                                style={{
                                    width: `${(item.score / 10) * 100}%`,
                                    background: item.score >= 8 ? "var(--success)" : item.score >= 7 ? "var(--warning)" : "var(--danger)",
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}