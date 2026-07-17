import { motion } from "framer-motion";
import { Camera, Upload, Sparkles, Trash2 } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useState } from "react";

const mockCaptions = [
    "What a stunning view from the stands! The energy is electric tonight! ⚡",
    "Game day vibes! Nothing beats the roar of the crowd at a World Cup match! 🏆",
    "The atmosphere is absolutely incredible! So grateful to be here! 🌟",
    "From this angle, you can really appreciate the beautiful game! ⚽",
    "Memories made tonight that will last a lifetime! ✨",
    "The stadium is alive with passion and excitement! 🔥",
];

export default function PhotoGallery() {
    const { photos, addPhoto } = useApp();
    const [uploading, setUploading] = useState(false);

    const handleUpload = () => {
        setUploading(true);
        setTimeout(() => {
            const newPhoto = {
                id: Date.now(),
                url: null,
                caption: mockCaptions[Math.floor(Math.random() * mockCaptions.length)],
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            };
            addPhoto(newPhoto);
            setUploading(false);
        }, 1500);
    };

    return (
        <div className="page-container">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h1 className="section-title">
                    <Camera size={24} className="text-accent" />
                    Photo Gallery
                </h1>

                {/* Upload Button */}
                <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="glass-card w-full p-6 flex flex-col items-center gap-3 hover:border-accent/30 transition-all"
                >
                    {uploading ? (
                        <div className="w-12 h-12 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                    ) : (
                        <>
                            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                                <Upload size={24} className="text-accent" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-semibold">Upload Match Photo</p>
                                <p className="text-xs text-text-muted mt-1">AI will generate a caption ✨</p>
                            </div>
                        </>
                    )}
                </button>

                {/* Photo Grid */}
                {photos.length === 0 ? (
                    <div className="glass-card p-8 text-center">
                        <Camera size={40} className="text-text-muted mx-auto mb-3 opacity-50" />
                        <p className="text-sm text-text-muted">No photos yet</p>
                        <p className="text-xs text-text-muted mt-1">Upload your match day moments!</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {photos.map((photo) => (
                            <motion.div
                                key={photo.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-card p-4"
                            >
                                {/* Placeholder Image */}
                                <div className="w-full h-48 rounded-xl bg-gradient-to-br from-accent/20 to-accent3/20 flex items-center justify-center mb-3">
                                    <Camera size={32} className="text-accent/50" />
                                </div>
                                {/* AI Caption */}
                                <div className="flex items-start gap-2 mb-2">
                                    <Sparkles size={14} className="text-accent mt-0.5" />
                                    <p className="text-xs text-text-muted italic">"{photo.caption}"</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-text-muted">{photo.date} • {photo.time}</span>
                                    <button className="p-1.5 rounded-lg hover:bg-danger/10 text-text-muted hover:text-danger transition-all">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
}