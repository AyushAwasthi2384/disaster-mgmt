import {
  FileText,
  ArrowLeft,
  PhoneCall,
  Users,
  Megaphone,
  Gift,
} from "lucide-react";

const SafetyGuide2 = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b-2 border-gray-800">
        <h1 className="text-lg font-semibold">logo</h1>
      </div>

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

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 w-full bg-gray-800 p-2 flex justify-between items-center border-t border-gray-700">
        <div className="flex flex-col items-center">
          <Users className="text-white" size={20} />
          <span className="text-xs  pt-4">Community</span>
        </div>
        <div className="flex flex-col items-center">
          <Megaphone className="text-white" size={25} />
          <span className="text-xs pt-3">Assistant</span>
        </div>

        <div className="flex flex-col items-center">
          <button className="bg-red-500 text-white rounded-full p-3 align-middle shadow-lg">
            <PhoneCall size={15} />
          </button>
          <span className="text-xs">SOS</span>
        </div>

        <div className="flex flex-col items-center">
          <FileText className="text-white" size={20} />
          <span className="text-xs  pt-4">Safety Guide</span>
        </div>
        <div className="flex flex-col items-center">
          <Gift className="text-white" size={20} />
          <span className="text-xs  pt-4">Donate</span>
        </div>
      </div>
    </div>
  );
};

export default SafetyGuide2;
