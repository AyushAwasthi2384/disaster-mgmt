import React from "react";
import { Search } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="flex flex-col h-screen bg-[#252B39] text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-[#161E29] border-b border-gray-800">
        <h1 className="text-2xl font-bold text-white">Disaster Management</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#161E29] rounded-xl p-2 pl-4">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent flex-1 focus:outline-none text-white placeholder:text-gray-400"
            />
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition duration-200">
            Search
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6 space-y-8">
        <section className="mb-8">
          <img
            src="https://placehold.co/800x400"
            alt="Disaster Management"
            className="w-full h-[45vh] object-cover rounded-xl hover:scale-101 transition duration-300 ease-in-out"
          />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mission Section */}
          <div className="bg-[#161E29] p-6 rounded-xl hover:drop-shadow-lg transition duration-200">
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p className="text-gray-400">
              Our mission is to provide timely and accurate information about
              disasters and to coordinate effective response efforts to save
              lives and minimize damage.
            </p>
          </div>

          {/* Get Involved Section */}
          <div className="bg-[#161E29] p-6 rounded-xl hover:drop-shadow-lg transition duration-200">
            <h2 className="text-2xl font-semibold mb-3">Get Involved</h2>
            <p className="text-gray-400">
              Join our community of volunteers and responders. Your help can
              make a significant difference in disaster management and recovery.
            </p>
          </div>

          {/* Latest News Section */}
          <div className="bg-[#161E29] p-6 rounded-xl hover:drop-shadow-lg transition duration-200">
            <h2 className="text-2xl font-semibold mb-3">Latest News</h2>
            <p className="text-gray-400">
              Stay updated with the latest news and alerts about ongoing
              disasters and relief efforts.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="p-4 bg-[#161E29] border-t border-gray-800">
        <p className="text-center text-gray-400">
          © 2023 Disaster Management. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
