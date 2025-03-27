import { MapPin, Users, Mic, PhoneCall, BookOpen, Heart } from "lucide-react";
import { BottomNav } from "./Community";
import { useNavigate } from "react-router-dom";

const Donation = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
      navigate("/api/users/logout");
    };
  return (
    <div className="min-h-screen bg-[#1a1e29] text-white flex flex-col">
      {/* Header */}
      <div className="bg-[#2c3344] p-4 text-lg cursor-pointer font-bold" onClick={handleLogout}>Logout</div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="bg-[#0f121a] rounded-xl p-4 shadow-md max-w-lg mx-auto">
          {/* Donation Header */}
          <div className="flex items-center gap-2 mb-2">
            <Heart size={20} className="text-blue-500" />
            <h2 className="text-lg font-semibold">Flood Relief Donations</h2>
          </div>
          <p className="text-sm text-gray-400 mb-3">
            Your support makes a difference in flood-affected communities.
          </p>

          {/* Image Section */}
          <img
            src="https://placehold.co/300x150"
            alt="Flood Relief"
            className="w-full h-32 object-cover rounded-lg mb-3"
          />

          {/* Donation Description */}
          <h3 className="text-md font-semibold">Emergency Flood Relief Fund</h3>
          <p className="text-sm text-gray-400 mb-2">
            Support immediate relief efforts for families affected by recent
            flooding. Your donation provides emergency supplies, temporary
            shelter, and essential resources.
          </p>

          {/* Location */}
          <div className="flex items-center gap-1 text-gray-300 text-sm mb-2">
            <MapPin size={16} className="text-blue-400" />
            <span>Downtown Area</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
            <div
              className="bg-blue-500 h-2.5 rounded-full"
              style={{ width: "65%" }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mb-3">
            <span className="text-white">$32,500 raised</span>
            <span>of $50,000</span>
          </div>

          {/* Donate Button */}
          <button className="w-full bg-blue-500 text-white text-sm font-semibold py-2 rounded-lg hover:bg-blue-600">
            Donate Now
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Donation;
