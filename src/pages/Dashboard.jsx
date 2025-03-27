import NewsData from "./NewsData.jsx";
import React, { useState } from "react";
import WeatherData from "./WeatherData.jsx";
import { useNavigate } from "react-router-dom";
import { Search, AlertTriangle } from "lucide-react";
import MapComponent from "../component/MapComponent.jsx";

const DisasterDashboard = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [qty, setQty] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [resourceType, setResourceType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { resourceType, qty, name, description };
    console.log("Form Submitted:", formData);
    setIsPopupVisible(false);
    setResourceType("");
    setQty("");
    setName("");
    setDescription("");
  };

  const handleResource = () => {
    setIsPopupVisible(true);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/api/users/logout");
  };

  return (
    <div className="flex h-screen bg-[#252B39] text-white select-none">
      {/* Popup Form for Resource */}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1D2939] p-6 rounded-xl w-1/3 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Resource Update</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">
                  Resource Type
                </label>
                <input
                  type="text"
                  value={resourceType}
                  onChange={(e) => setResourceType(e.target.value)}
                  className="w-full px-3 py-2 bg-[#161E29] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Quantity</label>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="w-full px-3 py-2 bg-[#161E29] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#161E29] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-[#161E29] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsPopupVisible(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Left Sidebar */}
      <div className="w-20 bg-[#161E29] border-r border-gray-800 flex flex-col items-center py-4">
        <div className="w-12 h-12 bg-gray-700 rounded-full overflow-hidden mb-8">
          <img
            src="https://placehold.co/50"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center items-center space-y-6 mt-50">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center"></div>
          <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center"></div>
          <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center"></div>
          <button
            className="mt-52 cursor-pointer bg-blue-600 text-white px-3 py-1 text-center rounded-xl"
            onClick={handleLogout}
          >
            LogOut
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-screen h-screen overflow-auto scrollbar-hide shadow-md">
        <div className="p-4 flex-1">
          <div className="w-full h-[50vh] object-cover rounded-xl hover:scale-101 relative z-0">
            <MapComponent />
          </div>
        </div>

        {/* Weather Widget */}
        <div className="flex p-4 w-full gap-5">
          <WeatherData />

          {/* Search and Disaster Alert Section */}
          <div className="flex flex-col h-screen space-y-4 flex-1">
            {/* Search */}
            <div className="flex gap-3 hover:drop-shadow-lg">
              <div className="flex items-center w-full bg-[#161E29] rounded-xl p-1 pl-4">
                <Search className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Lucknow"
                  className="bg-transparent flex-1 focus:outline-none"
                />
              </div>
              <button className="bg-gray-600 text-white px-6 py-3 text-center rounded-xl">
                Search
              </button>
            </div>

            {/* Disaster Alerts */}
            <div className="bg-[#161E29] rounded-xl hover:drop-shadow-lg p-6">
              <div className="flex flex-col space-y-4">
                {[
                  {
                    title: "Severe Flooding in Jankipuram",
                    color: "bg-red-500",
                    areas: ["Gandhi Maidan", "Amausi Ganj", "Sarvari Nagar"],
                    needs: "Food , clean water , medical aid",
                  },
                  {
                    title: "Forest Fire Spreading in Uttarakhand",
                    color: "bg-red-500",
                    areas: ["Nainital", "Almora", "Ranikhet"],
                    needs: "More firefighting units , emergency shelters",
                  },
                  {
                    title: 'Cyclone "Varun" Hits Odisha Coast',
                    color: "bg-orange-500",
                    areas: ["Puri", "Bhubaneswar", "Cuttack"],
                    needs: "Food , clean water , medical aid",
                  },
                  {
                    title: "Yamuna River Crosses Danger Mark in Delhi",
                    color: "bg-orange-500",
                    areas: ["East Delhi", "Yamuna Bank", "Shahdara"],
                    needs: "Evacuation assistance , emergency shelters",
                  },
                ].map((alert, index) => (
                  <div key={index} className="bg-[#1D2939] mb-5 p-4 rounded-xl">
                    <div className="flex flex-col w-full items-start">
                      <div className="flex w-full items-center">
                        <div
                          className={`w-10 h-10 ${alert.color} rounded-full flex items-center justify-center mr-4`}
                        >
                          <AlertTriangle className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex w-full justify-between items-center">
                          <h3 className="font-semibold">{alert.title}</h3>
                          <p className="text-xs text-gray-400">
                            Date: 10 March 2025
                          </p>
                        </div>
                      </div>

                      <div className="mb-3 mt-3 flex items-center gap-3">
                        <p className="text-xs text-gray-400">Affected Areas:</p>
                        <div className="flex flex-wrap gap-2">
                          {alert.areas.map((area, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-gray-700 rounded-full text-xs"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between w-full">
                        <div className="flex gap-4 items-center justify-start">
                          <p className="text-xs text-gray-400">Urgent Needs:</p>
                          <p className="text-xs">{alert.needs}</p>
                        </div>
                        <div className="flex gap-3">
                          <button className="px-3 py-1 bg-gray-600 rounded-lg text-sm">
                            More Info
                          </button>
                          <button
                            onClick={handleResource}
                            className="px-3 py-1 bg-blue-600 rounded-lg text-sm"
                          >
                            Resource
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-100 overflow-auto">
        <div className="space-y-4 p-3 overflow-auto scrollbar-hide shadow-md">
          <NewsData />
        </div>
      </div>
    </div>
  );
};

export default DisasterDashboard;
