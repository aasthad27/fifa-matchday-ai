import { motion } from "framer-motion";
import { MessageSquare, Send, Sparkles } from "lucide-react";
import { useState } from "react";

const aiResponses = {
    "lost child": "A lost child report has been filed. Security team at Gate A has been notified. Please direct the parent to the Information Desk at Main Concourse.",
    "medical": "Medical team has been dispatched to your location. First Aid Station 1 (East Concourse) is closest. Estimated arrival: 2 minutes.",
    "broken": "Maintenance team has been notified about the broken escalator at West Concourse. Estimated repair time: 15 minutes. Please redirect foot traffic to the stairs or elevator.",
    "crowd": "Current occupancy is at 78%. Recommend opening additional concession stands at North Terrace to distribute crowd flow. Estimated wait time: 8 minutes.",
    "default": "I've analyzed the situation. Here are the recommended actions: 1) Notify the relevant team 2) Update the status in the system 3) Monitor the situation. Would you like me to proceed with any specific action?",
};

export default function StaffAssist() {
    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState([
        { id: 1, role: "ai", text: "Hello! I'm your AI Staff Assistant. How can I help you with stadium operations today?" },
    ]);

    const handleSend = () => {
        if (!query.trim()) return;
        const userMsg = { id: Date.now(), role: "user", text: query };
        const response = Object.entries(aiResponses).find(([key]) => query.toLowerCase().includes(key));
        const aiMsg = { id: Date.now() + 1, role: "ai", text: response ? response[1] : aiResponses.default };
        setMessages([...messages, userMsg, aiMsg]);
        setQuery("");
    };

    return (
        <div className="space-y-4">
            <h1 className="section-title">
                <MessageSquare size={24} className="text-accent" />
                Staff AI Assistant
            </h1>

            <div className="glass-card p-4 h-[500px] flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === "user" ? "bg-accent/10 border border-accent/20" : "bg-glass border border-glass-border"
                                }`}>
                                {msg.role === "ai" && (
                                    <div className="flex items-center gap-1 mb-1">
                                        <Sparkles size={12} className="text-accent" />
                                        <span className="text-[10px] text-accent font-medium">AI Assistant</span>
                                    </div>
                                )}
                                <p className="text-xs">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Ask about operations, incidents, or crowd management..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSend()}
                        className="input-field flex-1"
                    />
                    <button onClick={handleSend} className="btn-primary">
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}