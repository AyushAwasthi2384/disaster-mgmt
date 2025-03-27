import {
  FileText,
  ArrowLeft,
  PhoneCall,
  Users,
  Megaphone,
  Gift,
} from "lucide-react";
import { BottomNav } from "./Community";
import { useNavigate } from "react-router-dom";

const SafetyGuide = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/api/users/logout");
  };
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800">
        <div
          className="bg-[#2c3344] p-4 text-lg cursor-pointer font-bold"
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>

      {/* Safety Guide Section */}
      <div className="p-4 bg-gray-800">
        <h2 className="flex items-center text-xl font-bold">
          <FileText className="mr-2 text-blue-400" size={24} />
          Safety Guide
        </h2>
        <button className="flex items-center text-blue-400 mt-2 cursor-pointer">
          <ArrowLeft className="mr-1 cursor-pointer" size={18} />
          Back to guides
        </button>
      </div>

      {/* Emergency Evacuation Section */}
      <div className="bg-gray-700 m-4 p-4 rounded-lg">
        <h3 className="flex items-center text-lg font-semibold text-white mb-2">
          <Megaphone className="mr-2 text-blue-400" size={20} />
          Emergency Evacuation Procedures
        </h3>
        <ul className="text-gray-300 list-decimal list-inside space-y-2">
          <li>
            Prepare an emergency kit:
            <ul className="list-disc ml-5">
              <li>Important documents</li>
              <li>First aid supplies</li>
              <li>Non-perishable food</li>
              <li>Water bottles</li>
              <li>Flashlights and batteries</li>
            </ul>
          </li>
          <li>Know your evacuation routes</li>
          <li>Keep your vehicle fueled</li>
          <li>Follow official instructions</li>
          <li>Help neighbors who need assistance</li>
          <li>Don't drive through flooded areas</li>
          <li>Move to higher ground immediately</li>
          <li>Take only essential items</li>
        </ul>
      </div>

      <BottomNav />
    </div>
  );
};

export default SafetyGuide;
