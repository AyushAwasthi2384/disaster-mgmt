import {
  Home,
  Cross,
  MapPin,
  BookText,
  Phone,
  Droplet,
  FileText,
  Bolt,
  PawPrint,
  HeartHandshake,
} from "lucide-react";
import { BottomNav } from "./community";

const Safety = () => {
  const safetyGuides = [
    {
      icon: <Cross className="text-red-500" />,
      title: "Basic First Aid During Floods",
      subtitle: "First Aid",
    },
    {
      icon: <MapPin className="text-blue-500" />,
      title: "Emergency Evacuation Procedures",
      subtitle: "Evacuation",
    },
    {
      icon: <Home className="text-green-500" />,
      title: "Post-Flood Safety Action",
      subtitle: "Post-flood",
    },    
    {
      icon: <Phone className="text-blue-500 w-6 h-6" />,
      title: "Emergency Contact Information",
      subtitle: "Contacts",
    },
    {
      icon: <Droplet className="text-cyan-400 w-6 h-6" />,
      title: "Safe Drinking Water Methods",
      subtitle: "Health & Hygiene",
    },
    {
      icon: <FileText className="text-orange-500 w-6 h-6" />,
      title: "Essential Flood Survival Kit",
      subtitle: "Essentials",
    },
    {
      icon: <Bolt className="text-yellow-400 w-6 h-6" />,
      title: "Electrical Safety Tips",
      subtitle: "Safety",
    },
    {
      icon: <PawPrint className="text-green-400 w-6 h-6" />,
      title: "Animal & Pet Safety During Floods",
      subtitle: "Pets & Livestock",
    },
    {
      icon: <HeartHandshake className="text-purple-500 w-6 h-6" />,
      title: "Mental Health Support After a Disaster",
      subtitle: "Mental Health",
    },
  ];
``
  return (
    <div className="bg-gray-900 min-h-[180vh] text-white ">
      <header>
        <div className="w-full bg-[#252B39] text-left text-lg font-bold p-2 mb-3">
          <img src="https://placehold.co/50" alt="Logo" />
        </div>
      </header>

      <section className="p-2 bg-[#252B39] rounded-3xl m-2">
        <div className=" p-4 rounded-xl">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <BookText className="text-blue-400" />
            Safety Guide
          </h2>
        </div>

        <div className="mt-3 mb-4 space-y-3">
          {safetyGuides.map((guide, index) => (
            <div
              key={index}
              className="bg-gray-900 p-5 rounded-xl flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <div className="text-xl">{guide.icon}</div>
                <div>
                  <h3 className="font-semibold">{guide.title}</h3>
                  <p className="text-gray-400 text-sm">{guide.subtitle}</p>
                </div>
              </div>
              <span className="text-gray-400">{">"}</span>
            </div>
          ))}
        </div>
      </section>

      <BottomNav />
    </div>
  );
};

export default Safety;
