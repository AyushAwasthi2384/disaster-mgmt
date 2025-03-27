import React from "react";
import { BottomNav } from "./Community.jsx";
import { ArrowLeft, FileText, Home, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/api/users/logout");
  };
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b-2 border-gray-700">
      <button
        className="bg-[#2c3344] p-4 text-lg cursor-pointer font-bold"
        onClick={handleLogout}
      >
        Logout
      </button>{" "}
    </div>
  );
};

// GuideCard Component
const GuideCard = ({ title, icon, items }) => {
  return (
    <div className="bg-gray-700 m-4 p-4 rounded-lg">
      <h3 className="flex items-center text-lg font-semibold text-white mb-2">
        {icon}
        <span className="ml-2">{title}</span>
      </h3>
      <ul className="text-gray-300 list-decimal list-inside space-y-2">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

// Main SafetyGuide3 Component
const SafetyGuide3 = () => {
  const postFloodTips = [
    "Prepare an emergency kit:",
    "- Important documents",
    "- First aid supplies",
    "- Non-perishable food",
    "- Water bottles",
    "- Flashlights and batteries",
    "Know your evacuation routes",
    "Keep your vehicle fueled",
    "Follow official instructions",
    "Help neighbors who need assistance",
    "Don't drive through flooded areas",
    "Move to higher ground immediately",
    "Take only essential items",
  ];

  return (
    <div className="bg-gray-900 min-h-screen pb-25 text-white">
      {/* Header */}
      <Header />

      {/* Safety Guide Section */}
      <div className="p-4 bg-gray-900">
        <h2 className="flex items-center text-xl font-bold">
          <FileText className="mr-2 text-blue-400" size={24} />
          Safety Guide
        </h2>
        <button className="flex items-center text-blue-400 mt-2">
          <ArrowLeft className="mr-1" size={18} />
          Back to guides
        </button>
      </div>

      {/* Post-Flood Safety Action Guide */}
      <GuideCard
        title="Post-Flood Safety Action"
        icon={<Home className="text-green-500" size={20} />}
        items={postFloodTips}
      />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default SafetyGuide3;
