import React from "react";
import { ArrowLeft, FileText, Ban, Users, Megaphone, PhoneCall, Gift } from "lucide-react";

// Header Component
const Header = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b-2 border-gray-700">
      <h1 className="text-lg font-semibold text-white">logo</h1>
    </div>
  );
};

// GuideCard Component
const GuideCard = ({ title, items }) => {
  return (
    <div className="bg-gray-700 m-4 p-4 rounded-lg">
      <h3 className="flex items-center text-lg font-semibold text-white mb-2">
        <Ban className="mr-2 text-red-500" size={20} />
        {title}
      </h3>
      <ul className="text-gray-300 list-decimal list-inside space-y-2">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

// BottomNav Component
const BottomNav = () => {
  return (
    <div className="fixed bottom-0 w-full bg-gray-800 p-2 flex justify-between items-center border-t border-gray-700">
      <div className="flex flex-col items-center">
        <Users className="text-white" size={20} />
        <span className="text-xs text-gray-300">Community</span>
      </div>
      <div className="flex flex-col items-center">
        <Megaphone className="text-white" size={20} />
        <span className="text-xs text-gray-300">Assistant</span>
      </div>
      <button className="bg-red-500 text-white rounded-full p-4 shadow-lg">
        <PhoneCall size={20} />
      </button>
      <div className="flex flex-col items-center">
        <FileText className="text-white" size={20} />
        <span className="text-xs text-gray-300">Safety Guide</span>
      </div>
      <div className="flex flex-col items-center">
        <Gift className="text-white" size={20} />
        <span className="text-xs text-gray-300">Donate</span>
      </div>
    </div>
  );
};

// Main SafetyGuide1 Component
const SafetyGuide1 = () => {
  const firstAidTips = [
    "Keep a first aid kit ready and accessible",
    "Clean and disinfect wounds immediately",
    "Watch for signs of infection",
    "Use clean, boiled water for cleaning wounds",
    "Keep medications dry and protected",
    "Know basic CPR and rescue breathing",
    "Treat common flood-related injuries:",
    "- Clean cuts and scrapes thoroughly",
    "- Apply antibiotic ointment",
    "- Cover with sterile bandages",
    "Monitor for waterborne diseases",
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-white">
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

      {/* Basic First Aid During Floods Guide */}
      <GuideCard title="Basic First Aid During Floods" items={firstAidTips} />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default SafetyGuide1;
