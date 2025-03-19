import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import DisasterDashboard from "./pages/Dashboard";
import Community from "./mobileApp/community";
import Safety from "./mobileApp/Safety";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SafetyGuide1 from "./mobileApp/SafetyGuide1";
import SafetyGuide2 from "./mobileApp/SafetyGuide2";
import SafetyGuide3 from "./mobileApp/SafetyGuide3";
import VoiceAssistant from "./mobileApp/Assistant";
import Donation from "./mobileApp/Donation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DisasterDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/Community" element={<Community />} />
        <Route path="/Safety" element={<Safety />} />
        <Route path="/safetyguide1" element={<SafetyGuide1 />} />
        <Route path="/SafetyGuide2" element={<SafetyGuide2 />} /> 
        <Route path="/SafetyGuide3" element={<SafetyGuide3 />} /> 
        <Route path="/Assistant" element={<VoiceAssistant />} /> 
        <Route path="/Donation" element={<Donation />} /> 
      </Routes>
    </Router>
  );
}

export default App;
