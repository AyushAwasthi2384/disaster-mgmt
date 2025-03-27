import LoginPage from "./pages/Login";
import UserLogout from "./pages/UserLogout";
import SignupPage from "./pages/Signup";
import Safety from "./mobileApp/Safety";
import NotFoundPage from "./pages/NotFound";
import Donation from "./mobileApp/Donation";
import Community from "./mobileApp/Community";
import LandingPage from "./pages/LandingPage";
import DisasterDashboard from "./pages/Dashboard";
import VoiceAssistant from "./mobileApp/Assistant";
import SafetyGuide1 from "./mobileApp/SafetyGuide1";
import SafetyGuide2 from "./mobileApp/SafetyGuide2";
import SafetyGuide3 from "./mobileApp/SafetyGuide3";
import UserProtectedWrapper from "./pages/UserProtectedWrapper.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/Safety"
          element={
            <UserProtectedWrapper>
              <Safety />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/donation"
          element={
            <UserProtectedWrapper>
              <Donation />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/community"
          element={
            <UserProtectedWrapper>
              <Community />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/assistant"
          element={
            <UserProtectedWrapper>
              <VoiceAssistant />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/safetyguide1"
          element={
            <UserProtectedWrapper>
              <SafetyGuide1 />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/safetyguide2"
          element={
            <UserProtectedWrapper>
              <SafetyGuide2 />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/safetyguide3"
          element={
            <UserProtectedWrapper>
              <SafetyGuide3 />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/dashboard"
          element={
            <UserProtectedWrapper>
              <DisasterDashboard />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/api/users/logout"
          element={
            <UserProtectedWrapper>
              <UserLogout />
            </UserProtectedWrapper>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
