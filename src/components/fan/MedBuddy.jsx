import { motion } from "framer-motion";
import { Heart, Plus, Clock, CheckCircle, Ambulance } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useState } from "react";

export default function MedBuddy() {
    const { tickets, addTicket } = useApp();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ title: "", description: "" });

    const handleSubmit = () => {
        addTicket({
            id: `tk${Date.now()}`,
            type: "medical",
            status: "open",
            title: formData.title,
            description: formData.description,
            date: new Date().toISOString().split("T")[0],
            priority: "high",
        });
        setFormData({ title: "", description: "" });
        setShowForm(false);
    };

    return (
        <div className="page-container">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="section-title mb-0">
                        <Heart size={24} className="text-danger" />
                        MedBuddy
                    </h1>
                    <button onClick={() => setShowForm(!showForm)} className="btn-danger text-xs py-1.5 px-3">
                        <Plus size={14} /> Request
                    </button>
                </div>

                {/* First Aid Stations */}
                <div className="glass-card p-4">
                    <h3 className="text-sm font-semibold mb-3">Nearby First Aid Stations</h3>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 rounded-xl bg-success/5">
                            <div className="flex items-center gap-2">
                                <Ambulance size={16} className="text-success" />
                                <span className="text-xs">East Concourse - Station 1</span>
                            </div>
                            <span className="badge badge-success">Active</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-xl bg-success/5">
                            <div className="flex items-center gap-2">
                                <Ambulance size={16} className="text-success" />
                                <span className="text-xs">West Concourse - Station 2</span>
                            </div>
                            <span className="badge badge-success">Active</span>
                        </div>
                    </div>
                </div>

                {showForm && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4 space-y-3 border-danger/30">
                        <h3 className="text-sm font-semibold text-danger">Medical Assistance Request</h3>
                        <input className="input-field" placeholder="Describe your medical need" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                        <textarea className="input-field" placeholder="Additional details (location, symptoms...)" rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                        <div className="flex gap-2">
                            <button onClick={() => setShowForm(false)} className="btn-secondary flex-1 text-xs">Cancel</button>
                            <button onClick={handleSubmit} className="btn-danger flex-1 text-xs">Send Request</button>
                        </div>
                    </motion.div>
                )}

                <div className="space-y-2">
                    {tickets.filter(t => t.type === "medical").map((ticket) => (
                        <div key={ticket.id} className="glass-card p-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${ticket.status === "open" ? "bg-danger/20" : "bg-success/20"}`}>
                                        {ticket.status === "open" ? <Clock size={16} className="text-danger" /> : <CheckCircle size={16} className="text-success" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{ticket.title}</p>
                                        <p className="text-xs text-text-muted mt-0.5">{ticket.description}</p>
                                        <span className="text-[10px] text-text-muted mt-1 block">{ticket.date}</span>
                                    </div>
                                </div>
                                <span className={`badge ${ticket.status === "open" ? "badge-danger" : "badge-success"}`}>{ticket.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}