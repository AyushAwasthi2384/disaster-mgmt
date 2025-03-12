import React from 'react';
import { Search, ChevronRight, AlertTriangle } from 'lucide-react';

const DisasterDashboard = () => {
    return (
        <div className="flex h-screen bg-gray-900 text-white">
            {/* Left Sidebar */}
            <div className="w-20 bg-gray-900 border-r border-gray-800 flex flex-col items-center py-4">
                <div className="w-12 h-12 bg-gray-700 rounded-full overflow-hidden mb-8">
                    <img src="https://placehold.co/50" alt="User avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col space-y-6 mt-8">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center"></div>
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center"></div>
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center"></div>
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center"></div>
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center"></div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-y-auto">
                
                <div className="p-4 flex-1">
                    <img src="https://placehold.co/800x400" alt="Map of Lucknow" className="w-full h-[50vh] object-cover rounded-lg" />
                </div>

                <div className="grid grid-cols-12 gap-4 p-4 h-full">
                    {/* Weather Widget */}
                    <div className="col-span-3 bg-gray-800 rounded-lg p-6">
                        <div className="flex items-end mb-4">
                            <div>
                                <h1 className="text-6xl font-bold">18°<span className="text-3xl">c</span></h1>
                                <p className="text-sm text-gray-400">Tuesday 13, 11:56 am</p>
                            </div>
                            <div className="ml-6">
                                <img src="https://placehold.co/80x80" alt="Partly cloudy" className="w-20 h-20" />
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-2 my-6">
                            {[
                                { temp: "25°c", time: "01:00 pm", icon: "https://placehold.co/30" },
                                { temp: "13°c", time: "04:00 pm", icon: "https://placehold.co/30" },
                                { temp: "09°c", time: "06:00 pm", icon: "https://placehold.co/30" },
                                { temp: "05°c", time: "10:00 pm", icon: "https://placehold.co/30" },
                            ].map((forecast, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <img src={forecast.icon} alt="Weather icon" className="w-8 h-8 mb-1" />
                                    <p className="font-bold">{forecast.temp}</p>
                                    <p className="text-xs text-gray-400">{forecast.time}</p>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2 mt-4">
                            <div className="flex justify-between items-center">
                                <p>Air Quality Index:</p>
                                <div className="flex items-center">
                                    <span className="mr-2">Good</span>
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <p>Humidity:</p>
                                <div className="flex items-center">
                                    <span className="mr-2">52%</span>
                                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-2 mt-8">
                            {["Today", "Wed", "Thu", "Fri"].map((day, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <p className="text-sm mb-1">{day}</p>
                                    <img src="https://placehold.co/30" alt="Weather icon" className="w-8 h-8 mb-1" />
                                    <p className="text-sm font-bold">25°c</p>
                                    <p className="text-xs text-gray-400">13°c</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Search and Disaster Alert Section */}
                    <div className="col-span-9 flex flex-col space-y-4">
                        {/* Search */}
                        <div className="flex items-center bg-gray-800 rounded-lg p-1 pl-4">
                            <Search className="w-5 h-5 text-gray-400 mr-2" />
                            <input
                                type="text"
                                placeholder="Lucknow"
                                className="bg-transparent flex-1 focus:outline-none"
                            />
                            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg">
                                Search
                            </button>
                        </div>

                        {/* Disaster Alerts */}
                        <div className="space-y-4">
                            {[
                                {
                                    title: "Severe Flooding in Jankipuram",
                                    color: "bg-red-500",
                                    areas: ["Gandhi Maidan", "Amausi Ganj", "Sarvari Nagar"],
                                    needs: "Food, clean water, medical aid"
                                },
                                {
                                    title: "Forest Fire Spreading in Uttarakhand",
                                    color: "bg-red-500",
                                    areas: ["Nainital", "Almora", "Ranikhet"],
                                    needs: "More firefighting units, emergency shelters"
                                },
                                {
                                    title: "Cyclone \"Varun\" Hits Odisha Coast",
                                    color: "bg-orange-500",
                                    areas: ["Puri", "Bhubaneswar", "Cuttack"],
                                    needs: "Food, clean water, medical aid"
                                },
                                {
                                    title: "Yamuna River Crosses Danger Mark in Delhi",
                                    color: "bg-orange-500",
                                    areas: ["East Delhi", "Yamuna Bank", "Shahdara"],
                                    needs: "Evacuation assistance, emergency shelters"
                                }
                            ].map((alert, index) => (
                                <div key={index} className="bg-gray-800 rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="flex items-center">
                                            <div className={`w-10 h-10 ${alert.color} rounded-full flex items-center justify-center mr-4`}>
                                                <AlertTriangle className="w-5 h-5 text-white" />
                                            </div>
                                            <h3 className="font-semibold">{alert.title}</h3>
                                        </div>
                                        <p className="text-xs text-gray-400">Date: 10 March 2025</p>
                                    </div>
                                    <div className="ml-14">
                                        <div className="mb-2">
                                            <p className="text-sm text-gray-400 mb-1">Affected Areas:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {alert.areas.map((area, i) => (
                                                    <span key={i} className="px-3 py-1 bg-gray-700 rounded-full text-xs">{area}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <p className="text-sm text-gray-400 mb-1">Urgent Needs:</p>
                                            <p className="text-sm">{alert.needs}</p>
                                        </div>
                                        <div className="flex justify-end gap-3">
                                            <button className="px-4 py-2 bg-gray-600 rounded-lg text-sm">More Info</button>
                                            <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm">Take Action</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* News/Media Sidebar */}
            <div className="w-100 border-l border-gray-800 p-4 overflow-y-auto">
                <div className="col-span-4 flex flex-col space-y-2 mb-4 h-[40vh] overflow-y-auto">
                    {[
                        { area: "Jankipuram, Lucknow", color: "bg-red-500" },
                        { area: "Jankipuram, Lucknow", color: "bg-red-500" },
                        { area: "Hazratganj, Lucknow", color: "bg-orange-500" },
                        { area: "Hazratganj, Lucknow", color: "bg-orange-500" },
                        { area: "Thakurganj, Lucknow", color: "bg-orange-500" },
                        { area: "Thakurganj, Lucknow", color: "bg-orange-500" },
                    ].map((alert, index) => (
                        <div key={index} className="flex items-center bg-gray-800 rounded-lg p-4">
                            <div className={`w-10 h-10 ${alert.color} rounded-full flex items-center justify-center mr-4`}>
                                <span className="text-white font-bold text-xs">SOS</span>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold">{alert.area}</p>
                                <p className="text-xs text-gray-400">updated 4 hrs ago</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                    ))}
                </div>
                <div className="space-y-4 h-[60vh] overflow-y-auto">
                    <div className="rounded-lg overflow-hidden">
                        <img src="https://placehold.co/240x120" alt="Flood news" className="w-full h-32 object-cover" />
                        <div className="p-2 bg-gray-800">
                            <div className="flex items-center mb-1">
                                <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center mr-2">
                                    <span className="text-white text-xs">!</span>
                                </div>
                                <p className="text-xs">Aaj Tak Live</p>
                                <p className="text-xs text-gray-400 ml-auto">10:23 AM</p>
                            </div>
                            <p className="text-xs text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>

                    <div className="rounded-lg overflow-hidden">
                        <img src="https://placehold.co/240x120" alt="Flood news" className="w-full h-32 object-cover" />
                        <div className="p-2 bg-gray-800">
                            <div className="flex items-center mb-1">
                                <div className="w-4 h-4 bg-gray-500 rounded-full flex items-center justify-center mr-2">
                                    <span className="text-white text-xs">i</span>
                                </div>
                                <p className="text-xs">News 18</p>
                                <p className="text-xs text-gray-400 ml-auto">09:45 AM</p>
                            </div>
                            <p className="text-xs text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>

                    <div className="rounded-lg overflow-hidden">
                        <img src="https://placehold.co/240x120" alt="Forest fire news" className="w-full h-32 object-cover" />
                        <div className="p-2 bg-gray-800">
                            <div className="flex items-center mb-1">
                                <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center mr-2">
                                    <span className="text-white text-xs">!</span>
                                </div>
                                <p className="text-xs">ABP News</p>
                                <p className="text-xs text-gray-400 ml-auto">08:15 AM</p>
                            </div>
                            <p className="text-xs text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisasterDashboard;