import { createContext, useContext, useState, useCallback } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
    const [user, setUser] = useState({
        name: "Alex Fan",
        email: "alex.fan@email.com",
        avatar: null,
        team: "USA",
        jerseyNumber: 10,
        points: 720,
        tickets: [1, 3],
        language: "en",
        isStaff: false,
    });

    const [language, setLanguage] = useState("en");
    const [theme, setTheme] = useState("dark");
    const [notifications, setNotifications] = useState([
        { id: "n1", message: "Match reminder: USA vs England tomorrow!", read: false, type: "match" },
        { id: "n2", message: "Your prediction for Argentina vs France is locked in!", read: false, type: "prediction" },
        { id: "n3", message: "Traffic alert: Heavy congestion on I-95 near stadium", read: true, type: "alert" },
    ]);
    const [checkedInMatches, setCheckedInMatches] = useState([3]);
    const [reminders, setReminders] = useState([2]);
    const [mealPreorders, setMealPreorders] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [userPredictions, setUserPredictions] = useState({ 3: "p3a", 6: "p6b" });
    const [tickets, setTickets] = useState([
        { id: "tk1", type: "lost_item", status: "open", title: "Lost blue backpack", description: "Left near Section B2", date: "2026-06-14", priority: "medium" },
        { id: "tk2", type: "medical", status: "resolved", title: "First aid request", description: "Minor headache at concourse", date: "2026-06-13", priority: "low" },
    ]);

    const toggleCheckIn = useCallback((matchId) => {
        setCheckedInMatches((prev) =>
            prev.includes(matchId) ? prev.filter((id) => id !== matchId) : [...prev, matchId]
        );
    }, []);

    const toggleReminder = useCallback((matchId) => {
        setReminders((prev) =>
            prev.includes(matchId) ? prev.filter((id) => id !== matchId) : [...prev, matchId]
        );
    }, []);

    const addPhoto = useCallback((photo) => {
        setPhotos((prev) => [photo, ...prev]);
    }, []);

    const addPrediction = useCallback((predictionId, optionId) => {
        setUserPredictions((prev) => ({ ...prev, [predictionId]: optionId }));
        setUser((prev) => ({ ...prev, points: prev.points + 10 }));
    }, []);

    const addTicket = useCallback((ticket) => {
        setTickets((prev) => [ticket, ...prev]);
    }, []);

    const addMealPreorder = useCallback((matchId, meal) => {
        setMealPreorders((prev) => [...prev, { matchId, ...meal, orderId: Date.now() }]);
    }, []);

    const markNotificationRead = useCallback((id) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    }, []);

    const value = {
        user,
        setUser,
        language,
        setLanguage,
        theme,
        setTheme,
        notifications,
        setNotifications,
        checkedInMatches,
        reminders,
        mealPreorders,
        photos,
        userPredictions,
        tickets,
        toggleCheckIn,
        toggleReminder,
        addPhoto,
        addPrediction,
        addTicket,
        addMealPreorder,
        markNotificationRead,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) throw new Error("useApp must be used within AppProvider");
    return context;
}