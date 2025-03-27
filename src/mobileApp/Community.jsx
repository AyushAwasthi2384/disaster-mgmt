import React from "react";
import MapComponent from "../component/MapComponent.jsx";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  Dot,
  Volume2,
  Bell,
  MapPin,
  ThumbsUp,
  MessageSquareText,
  Users,
  HelpCircle,
  PhoneCall,
  BookOpen,
  HandCoins,
} from "lucide-react";

const AlertCard = ({ title, message, location, time }) => {
  return (
    <div className="bg-[#e1a453] p-3 rounded-lg">
      <div className="flex space-x-2 items-center">
        <div className="text-amber-700">
          <AlertTriangle />
        </div>
        <div className="h-3 w-3 bg-red-500 rounded-full"></div>
        <h2>{title}</h2>
        <div className="flex pl-18 space-x-3">
          <Bell /> <Volume2 />
        </div>
      </div>
      <p className="font-medium text-[1rem] my-2">{message}</p>
      <p className="font-medium text-[0.9rem] flex">
        {location} <Dot /> {time}
      </p>
    </div>
  );
};

const HazardReport = ({ title, description, date }) => {
  return (
    <div className="border-1 border-gray-400 p-2 rounded-lg my-2">
      <div className="flex space-x-2">
        <div className="text-red-400 my-3">
          <MapPin />
        </div>
        <div className="p-2">
          <h2 className="text-[1rem]">{title}</h2>
          <p className="font-light text-[0.9rem]">{description}</p>
          <p className="font-light text-[0.9rem]">Reported: {date}</p>
          <div className="flex space-x-4 py-2">
            <MessageSquareText />
            <ThumbsUp />
          </div>
        </div>
      </div>
    </div>
  );
};

export const BottomNav = () => {
  const navItems = [
    {
      icon: <Users className="w-8 h-8 text-white my-2 cursor-pointer" />,
      label: "Community",
    },
    {
      icon: <HelpCircle className="w-8 h-8 text-white my-2 cursor-pointer" />,
      label: "Assistant",
    },
    {
      icon: <PhoneCall className="w-8 h-8 text-white cursor-pointer" />,
      label: "SOS",
      isSOS: true,
    },
    {
      icon: <BookOpen className="w-8 h-8 text-white my-2 cursor-pointer" />,
      label: "Safety Guide",
    },
    {
      icon: <HandCoins className="w-8 h-8 text-white my-2 cursor-pointer" />,
      label: "Donate",
    },
  ];

  return (
    <div className="fixed bottom-0 w-full bg-gray-800 px-2 py-2 flex justify-between shadow-md overflow-x-hidden overflow-y-auto">
      {navItems.map((item, index) => (
        <div key={index} className="flex flex-col items-center cursor-pointer">
          {item.isSOS ? (
            <div className="bg-red-500 p-2 rounded-full">{item.icon}</div>
          ) : (
            item.icon
          )}
          <p className="text-[0.8rem]">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

const Community = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/api/users/logout");
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen max-h-fit overflow-y-auto overflow-x-hidden mb-20 flex flex-col items-center">
      <div className="w-full bg-[#252B39] text-left text-lg font-bold p-2">
        <div
          className="bg-[#2c3344] p-4 text-lg cursor-pointer font-bold"
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>

      <div className="w-full text-left text-lg font-bold p-2">
        <AlertCard
          title="High Risk Alert"
          message="Heavy rainfall expected in your area. Please stay alert and prepare for possible flooding."
          location="Downtown Area"
          time="1:51:47 am"
        />
      </div>

      <div className="bg-[#252B39] p-3 rounded-lg my-2 flex-col w-full">
        <h1 className="mb-2 text-center">Community Hazard Reports</h1>
        <div className="w-full h-[60vw] bg-gray-500 rounded-xl text-center">
          <MapComponent />
        </div>

        <HazardReport
          title="Blocked Road"
          description="Main Street blocked by fallen tree"
          date="13/03/2025"
        />
      </div>

      <BottomNav />
    </div>
  );
};

export default Community;
