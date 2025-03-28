import LoginPage from "./pages/Login";
import UserLogout from "./pages/UserLogout";
import SignupPage from "./pages/Signup";
import NotFoundPage from "./pages/NotFound";

import LandingPage from "./pages/LandingPage";
import DisasterDashboard from "./pages/Dashboard";

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
