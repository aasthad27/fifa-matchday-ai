import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import SplashPage from "./components/SplashPage";
import FanLogin from "./components/FanLogin";
import StaffLogin from "./components/StaffLogin";
import FanLayout from "./components/layout/FanLayout";
import StaffLayout from "./components/layout/StaffLayout";
import Dashboard from "./components/fan/Dashboard";
import MatchSchedule from "./components/fan/MatchSchedule";
import MatchDetail from "./components/fan/MatchDetail";
import TransportPlanner from "./components/fan/TransportPlanner";
import PhotoGallery from "./components/fan/PhotoGallery";
import LiveUpdates from "./components/fan/LiveUpdates";
import Predictions from "./components/fan/Predictions";
import AccessibilityHub from "./components/fan/AccessibilityHub";
import LostAndFound from "./components/fan/LostAndFound";
import MedBuddy from "./components/fan/MedBuddy";
import EmergencyAlert from "./components/fan/EmergencyAlert";
import AvatarCustomizer from "./components/fan/AvatarCustomizer";
import StaffDashboard from "./components/staff/StaffDashboard";
import PlayerRegistry from "./components/staff/PlayerRegistry";
import CrowdFlow from "./components/staff/CrowdFlow";
import SentimentMap from "./components/staff/SentimentMap";
import SustainabilityHub from "./components/staff/SustainabilityHub";
import StaffAssist from "./components/staff/StaffAssist";
import TicketManagement from "./components/staff/TicketManagement";

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen">
          <Routes>
            {/* Splash Page */}
            <Route path="/" element={<SplashPage />} />

            {/* Login Pages */}
            <Route path="/login/fan" element={<FanLogin />} />
            <Route path="/login/staff" element={<StaffLogin />} />

            {/* Fan Routes */}
            <Route path="/fan" element={<FanLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="matches" element={<MatchSchedule />} />
              <Route path="match/:id" element={<MatchDetail />} />
              <Route path="transport" element={<TransportPlanner />} />
              <Route path="photos" element={<PhotoGallery />} />
              <Route path="updates" element={<LiveUpdates />} />
              <Route path="predictions" element={<Predictions />} />
              <Route path="accessibility" element={<AccessibilityHub />} />
              <Route path="lost-found" element={<LostAndFound />} />
              <Route path="medbuddy" element={<MedBuddy />} />
              <Route path="emergency" element={<EmergencyAlert />} />
              <Route path="avatar" element={<AvatarCustomizer />} />
            </Route>

            {/* Staff Routes */}
            <Route path="/staff" element={<StaffLayout />}>
              <Route index element={<StaffDashboard />} />
              <Route path="players" element={<PlayerRegistry />} />
              <Route path="crowd" element={<CrowdFlow />} />
              <Route path="sentiment" element={<SentimentMap />} />
              <Route path="sustainability" element={<SustainabilityHub />} />
              <Route path="assist" element={<StaffAssist />} />
              <Route path="tickets" element={<TicketManagement />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}