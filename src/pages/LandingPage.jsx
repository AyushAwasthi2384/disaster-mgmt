import { Link } from "react-router-dom";

import {
  Search,
  Bell,
  AlertTriangle,
  Shield,
  Users,
  MapPin,
  ExternalLink,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1A2233] to-[#252B39] select-none text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-[#161E29] border-b border-gray-800 shadow-lg">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-blue-500" />
          <h1 className="text-2xl font-bold text-white">Disaster Management</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            <li>
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="*"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Alerts
              </Link>
            </li>
            <li>
              <Link
                to="*"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Resources
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="*"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center bg-[#1E2736] rounded-xl p-2 pl-4 border border-gray-700 focus-within:border-blue-500 transition duration-300">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search resources..."
              className="bg-transparent flex-1 focus:outline-none text-white placeholder:text-gray-400 w-40"
            />
          </div>
          <button className="cursor-pointer bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition duration-300 flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Alerts
          </button>
          <button className="cursor-pointer bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition duration-300 flex items-center gap-2">
            <Link to="/login">Login</Link>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 select-none bg-black opacity-50 z-10"></div>
        <img
          src="https://placehold.co/1200x500"
          alt="Emergency Response Team"
          className="w-full h-[60vh] object-cover object-center"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-start p-8 md:p-16 max-w-3xl">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
            24/7 Emergency Response
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Coordinated Response When It Matters Most
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-100">
            Providing critical resources and expertise to communities during
            emergencies and natural disasters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300">
              Report Emergency
            </button>
            <button className="cursor-pointer bg-transparent border border-white hover:bg-white hover:text-[#1A2233] text-white px-6 py-3 rounded-lg font-medium transition duration-300">
              View Active Alerts
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-8 py-12 max-w-7xl mx-auto w-full">
        {/* Stats Section */}
        <section className="mb-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#161E29] p-6 rounded-xl border border-gray-800 text-center hover:bg-blue-700 transition duration-300">
            <h3 className="text-3xl font-bold text-blue-400 mb-2">5,000+</h3>
            <p className="text-gray-400 text-sm">Emergency Responses</p>
          </div>
          <div className="bg-[#161E29] p-6 rounded-xl border border-gray-800 text-center hover:bg-blue-700 transition duration-300">
            <h3 className="text-3xl font-bold text-blue-400 mb-2">200+</h3>
            <p className="text-gray-400 text-sm">Expert Responders</p>
          </div>
          <div className="bg-[#161E29] p-6 rounded-xl border border-gray-800 text-center hover:bg-blue-700 transition duration-300">
            <h3 className="text-3xl font-bold text-blue-400 mb-2">95%</h3>
            <p className="text-gray-400 text-sm">Response Rate</p>
          </div>
          <div className="bg-[#161E29] p-6 rounded-xl border border-gray-800 text-center hover:bg-blue-700 transition duration-300">
            <h3 className="text-3xl font-bold text-blue-400 mb-2">24/7</h3>
            <p className="text-gray-400 text-sm">Support Available</p>
          </div>
        </section>

        {/* Emergency Categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Emergency Response Categories
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Category Cards */}
            <div className="bg-[#161E29] p-6 rounded-xl hover:shadow-lg transition duration-300 flex flex-col items-center text-center border border-gray-800 hover:border-blue-500">
              <div className="bg-blue-600/20 p-3 rounded-full mb-4">
                <MapPin className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-semibold mb-2">Natural Disasters</h3>
              <p className="text-sm text-gray-400">
                Emergency response for floods, earthquakes, wildfires
              </p>
            </div>
            <div className="bg-[#161E29] p-6 rounded-xl hover:shadow-lg transition duration-300 flex flex-col items-center text-center border border-gray-800 hover:border-blue-500">
              <div className="bg-blue-600/20 p-3 rounded-full mb-4">
                <AlertTriangle className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-semibold mb-2">Safety Threats</h3>
              <p className="text-sm text-gray-400">
                Response to security incidents and hazardous events
              </p>
            </div>
            <div className="bg-[#161E29] p-6 rounded-xl hover:shadow-lg transition duration-300 flex flex-col items-center text-center border border-gray-800 hover:border-blue-500">
              <div className="bg-blue-600/20 p-3 rounded-full mb-4">
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-semibold mb-2">Community Aid</h3>
              <p className="text-sm text-gray-400">
                Shelter, food, and medical support for communities
              </p>
            </div>
            <div className="bg-[#161E29] p-6 rounded-xl hover:shadow-lg transition duration-300 flex flex-col items-center text-center border border-gray-800 hover:border-blue-500">
              <div className="bg-blue-600/20 p-3 rounded-full mb-4">
                <Shield className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-semibold mb-2">Crisis Prevention</h3>
              <p className="text-sm text-gray-400">
                Proactive measures to mitigate potential disasters
              </p>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mission Section */}
            <div className="bg-[#161E29] p-6 rounded-xl hover:shadow-lg transition duration-300 border border-gray-800">
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <div className="h-8 w-1 bg-blue-500 rounded-full"></div>
                Our Mission
              </h2>
              <p className="text-gray-300 mb-4">
                Our mission is to provide timely, accurate information about
                disasters and coordinate effective response efforts to save
                lives and minimize damage through technological innovation and
                community engagement.
              </p>
              <a
                to="*"
                className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 text-sm font-medium"
              >
                Learn about our approach
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Get Involved Section */}
            <div className="bg-[#161E29] p-6 rounded-xl hover:shadow-lg transition duration-300 border border-gray-800">
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <div className="h-8 w-1 bg-blue-500 rounded-full"></div>
                Get Involved
              </h2>
              <p className="text-gray-300 mb-4">
                Join our network of volunteers and first responders. Your skills
                and dedication can make a significant difference in disaster
                management, recovery, and community resilience.
              </p>
              <a
                to="*"
                className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 text-sm font-medium"
              >
                Volunteer opportunities
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Latest News Section */}
            <div className="bg-[#161E29] p-6 rounded-xl hover:shadow-lg transition duration-300 border border-gray-800">
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <div className="h-8 w-1 bg-blue-500 rounded-full"></div>
                Latest Alerts
              </h2>
              <p className="text-gray-300 mb-4">
                Stay updated with the latest news and alerts about ongoing
                disasters and relief efforts in affected regions worldwide.
              </p>
              <a
                to="*"
                className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 text-sm font-medium"
              >
                View current alerts
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-xl p-8 text-center mb-16">
          <h2 className="text-2xl font-bold mb-4">
            Emergency Preparedness Starts Today
          </h2>
          <p className="max-w-2xl mx-auto mb-6 text-gray-100">
            Download our emergency preparedness resources and mobile app to stay
            informed and ready to respond.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="cursor-pointer bg-white text-blue-800 px-6 py-3 rounded-lg font-medium shadow-lg hover:bg-gray-100 transition duration-300">
              Download App
            </button>
            <button className="cursor-pointer bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-[#1A2233] transition duration-300">
              Get Resources
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#161E29] text-gray-300 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-semibold mb-3">Disaster Management</h3>
            <p className="text-sm text-gray-400 mb-3">All rights reserved</p>
          </div>
          <nav className="flex flex-col md:flex-row gap-6 text-center md:text-left">
            <a to="*" className="hover:text-white">
              About
            </a>
            <a to="*" className="hover:text-white">
              Privacy Policy
            </a>
            <a to="*" className="hover:text-white">
              Terms of Service
            </a>
            <a to="*" className="hover:text-white">
              Contact
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
