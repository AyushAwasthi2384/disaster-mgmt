import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Safety from "./mobileApp/Safety";
import Donation from "./mobileApp/Donation";
import Community from "./mobileApp/community";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import DisasterDashboard from "./pages/Dashboard";
import SafetyGuide1 from "./mobileApp/SafetyGuide1";
import SafetyGuide2 from "./mobileApp/SafetyGuide2";
import SafetyGuide3 from "./mobileApp/SafetyGuide3";
import VoiceAssistant from "./mobileApp/Assistant";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/Safety" element={<Safety />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/community" element={<Community />} />
        <Route path="/assistant" element={<VoiceAssistant />} />
        <Route path="/safetyguide1" element={<SafetyGuide1 />} />
        <Route path="/safetyguide2" element={<SafetyGuide2 />} />
        <Route path="/safetyguide3" element={<SafetyGuide3 />} />
        <Route path="/dashboard" element={<DisasterDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
