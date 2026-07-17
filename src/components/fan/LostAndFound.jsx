import { motion } from "framer-motion";
import { Search, Package, Plus, Clock, CheckCircle } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useState } from "react";

export default function LostAndFound() {
    const { tickets, addTicket } = useApp();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ title: "", description: "", type: "lost_item" });

    const handleSubmit = () => {
        addTicket({
            id: `tk${Date.now()}`,
            type: formData.type,
            status: "open",
            title: formData.title,
            description: formData.description,
            date: new Date().toISOString().split("T")[0],
            priority: "medium",
        });
        setFormData({ title: "", description: "", type: "lost_item" });
        setShowForm(false);
    };

    return (
        <div className="page-container">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="section-title mb-0">
                        <Search size={24} className="text-accent" />
                        Lost & Found
                    </h1>
                    <button onClick={() => setShowForm(!showForm)} className="btn-primary text-xs py-1.5 px-3">
                        <Plus size={14} /> Report
                    </button>
                </div>

                {showForm && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4 space-y-3">
                        <h3 className="text-sm font-semibold">Report Lost Item / Missing Person</h3>
                        <select className="input-field" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                            <option value="lost_item">Lost Item</option>
                            <option value="missing_person">Missing Person</option>
                        </select>
                        <input className="input-field" placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                        <textarea className="input-field" placeholder="Description (location, time, details...)" rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                        <div className="flex gap-2">
                            <button onClick={() => setShowForm(false)} className="btn-secondary flex-1 text-xs">Cancel</button>
                            <button onClick={handleSubmit} className="btn-primary flex-1 text-xs">Submit Report</button>
                        </div>
                    </motion.div>
                )}

                <div className="space-y-2">
                    {tickets.filter(t => t.type === "lost_item" || t.type === "missing_person").map((ticket) => (
                        <div key={ticket.id} className="glass-card p-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${ticket.status === "open" ? "bg-warning/20" : "bg-success/20"}`}>
                                        {ticket.status === "open" ? <Clock size={16} className="text-warning" /> : <CheckCircle size={16} className="text-success" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{ticket.title}</p>
                                        <p className="text-xs text-text-muted mt-0.5">{ticket.description}</p>
                                        <span className="text-[10px] text-text-muted mt-1 block">{ticket.date}</span>
                                    </div>
                                </div>
                                <span className={`badge ${ticket.status === "open" ? "badge-warning" : "badge-success"}`}>{ticket.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}