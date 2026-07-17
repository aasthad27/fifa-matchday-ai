import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Clock, Ticket, ShoppingCart, CheckCircle } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { matches } from "../../data/matches";
import { useState } from "react";

export default function MatchDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const match = matches.find((m) => m.id === Number(id));
    const { checkedInMatches, toggleCheckIn, addMealPreorder, mealPreorders } = useApp();
    const [selectedMeal, setSelectedMeal] = useState(null);

    if (!match) return <div className="page-container"><p>Match not found</p></div>;

    const isCheckedIn = checkedInMatches.includes(match.id);

    return (
        <div className="page-container">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-text-muted mb-4">
                <ArrowLeft size={18} />
                <span className="text-sm">Back</span>
            </button>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                {/* Match Header */}
                <div className="glass-card p-6 text-center">
                    <span className="badge badge-accent mb-3">{match.stadiumZone}</span>
                    <div className="flex items-center justify-center gap-6 py-4">
                        <div>
                            <span className="text-4xl">{match.homeFlag}</span>
                            <p className="font-bold mt-1">{match.homeTeam}</p>
                        </div>
                        <div>
                            <p className="text-xs text-text-muted">VS</p>
                            <p className="text-2xl font-bold text-accent">{match.time}</p>
                            <p className="text-xs text-text-muted">{match.date}</p>
                        </div>
                        <div>
                            <span className="text-4xl">{match.awayFlag}</span>
                            <p className="font-bold mt-1">{match.awayTeam}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xs text-text-muted">
                        <MapPin size={12} />
                        <span>{match.stadium}</span>
                    </div>
                </div>

                {/* Check In */}
                <div className="glass-card p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Ticket size={20} className="text-accent" />
                            <div>
                                <p className="text-sm font-semibold">Match Check-In</p>
                                <p className="text-xs text-text-muted">Confirm your attendance</p>
                            </div>
                        </div>
                        <button
                            onClick={() => toggleCheckIn(match.id)}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${isCheckedIn ? "bg-success/20 text-success border border-success/30" : "btn-primary text-xs"
                                }`}
                        >
                            {isCheckedIn ? "✓ Checked In" : "Check In"}
                        </button>
                    </div>
                </div>

                {/* Ticket Prices */}
                <div className="glass-card p-4">
                    <h3 className="text-sm font-semibold mb-3">Ticket Prices</h3>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-text-muted">From</span>
                        <span className="text-lg font-bold gradient-text">${match.ticketPrice.min}</span>
                        <span className="text-xs text-text-muted">to</span>
                        <span className="text-lg font-bold gradient-text-gold">${match.ticketPrice.max}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-text-muted">{match.availableTickets.toLocaleString()} tickets available</span>
                        <button className="btn-primary text-xs py-1.5 px-3">View Seats</button>
                    </div>
                </div>

                {/* Meal Pre-order */}
                <div className="glass-card p-4">
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <ShoppingCart size={16} className="text-accent" />
                        Pre-Order Meals & Beverages
                    </h3>
                    <div className="space-y-2">
                        {match.meals.map((meal) => (
                            <div
                                key={meal.id}
                                className={`p-3 rounded-xl border cursor-pointer transition-all ${selectedMeal === meal.id
                                        ? "border-accent bg-accent/5"
                                        : "border-glass-border hover:border-accent/30"
                                    }`}
                                onClick={() => setSelectedMeal(selectedMeal === meal.id ? null : meal.id)}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium">{meal.name}</p>
                                        <span className="text-xs text-text-muted">{meal.category}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-accent">${meal.price}</p>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addMealPreorder(match.id, meal);
                                            }}
                                            className="text-xs text-accent hover:underline"
                                        >
                                            {mealPreorders.some((m) => m.orderId && m.name === meal.name) ? "✓ Added" : "Add"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}