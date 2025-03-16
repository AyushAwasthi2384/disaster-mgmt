import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import DisasterDashboard from "./pages/Dashboard";
import Community from "./mobileApp/community";
import Safety from "./mobileApp/Safety";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
      </Routes>
    </Router>
  );
}

export default App;
