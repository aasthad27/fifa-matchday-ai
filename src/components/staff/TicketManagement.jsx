import { motion } from "framer-motion";
import { Ticket, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function TicketManagement() {
    const { tickets } = useApp();

    const getIcon = (type) => {
        switch (type) {
            case "lost_item": return <AlertTriangle size={16} className="text-warning" />;
            case "missing_person": return <AlertTriangle size={16} className="text-danger" />;
            case "medical": return <AlertTriangle size={16} className="text-danger" />;
            default: return <Ticket size={16} className="text-accent" />;
        }
    };

    return (
        <div className="space-y-4">
            <h1 className="section-title">
                <Ticket size={24} className="text-accent" />
                Ticket Management
            </h1>

            <div className="flex gap-2 mb-2">
                <button className="btn-primary text-xs flex-1">All Tickets</button>
                <button className="btn-secondary text-xs flex-1">Open</button>
                <button className="btn-secondary text-xs flex-1">Resolved</button>
            </div>

            <div className="space-y-2">
                {tickets.map((ticket) => (
                    <div key={ticket.id} className="glass-card p-4">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${ticket.status === "open" ? "bg-danger/20" : "bg-success/20"
                                    }`}>
                                    {getIcon(ticket.type)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-medium">{ticket.title}</p>
                                        <span className={`badge ${ticket.type === "medical" ? "badge-danger" : ticket.type === "missing_person" ? "badge-danger" : "badge-warning"}`}>
                                            {ticket.type.replace("_", " ")}
                                        </span>
                                    </div>
                                    <p className="text-xs text-text-muted mt-0.5">{ticket.description}</p>
                                    <div className="flex items-center gap-3 mt-2">
                                        <span className="text-[10px] text-text-muted">{ticket.date}</span>
                                        <span className={`badge ${ticket.status === "open" ? "badge-danger" : "badge-success"}`}>
                                            {ticket.status}
                                        </span>
                                        <span className={`badge ${ticket.priority === "high" ? "badge-danger" : ticket.priority === "medium" ? "badge-warning" : "badge-success"}`}>
                                            {ticket.priority}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button className="btn-secondary text-[10px] py-1 px-2">Assign</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}