import { useState } from "react";
import {
  Globe,
  Send,
} from "lucide-react";
import { BottomNav } from "./Community";
import { useNavigate } from "react-router-dom";

const Assistant = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [language, setLanguage] = useState("English");
  const [showDropdown, setShowDropdown] = useState(false);

  const languages = [
    "English",
    "Hindi",
    "Bengali",
    "Tamil",
    "Telugu",
    "Marathi",
  ];

  const handleSend = () => {
    if (input.trim() !== "") {
      // Dummy response for demonstration
      setResponse(
        "Here are some key steps to prepare for a flood:\n• Create an emergency kit\n• Know your evacuation route\n• Keep important documents safe\n• Monitor local news and alerts"
      );
      setInput("");
    }
  };

    const navigate = useNavigate();
    const handleLogout = () => {
      navigate("/api/users/logout");
    };
  

  return (
    <div className="min-h-screen bg-[#1a1e29] text-white flex flex-col overflow-x-hidden overflow-y-auto">
      {/* Header */}
      <div className="bg-[#2c3344] p-4 text-lg cursor-pointer font-bold" onClick={handleLogout}>Logout</div>
      

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="bg-[#0f121a] rounded-xl p-4 shadow-md max-w-lg mx-auto">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-lg">Voice Assistant</span>
            <div className="relative">
              {/* Language Selector */}
              <div
                className="flex items-center gap-1 text-gray-400 cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <Globe size={18} />
                <span className="text-sm">{language}</span>
              </div>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-[#1d2330] rounded-lg shadow-lg overflow-hidden z-10">
                  {languages.map((lang, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setLanguage(lang);
                        setShowDropdown(false);
                      }}
                      className={`px-4 py-2 text-sm cursor-pointer hover:bg-[#2c3344] ${
                        lang === language
                          ? "bg-[#2c3344] text-blue-400"
                          : "text-gray-300"
                      }`}
                    >
                      {lang}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chat Section */}
          <div className="bg-[#10131a] rounded-lg p-3 mb-4">
            <div className="bg-blue-500 text-white p-2 rounded-lg inline-block mb-2">
              How can I prepare for a flood?
            </div>
            {response && (
              <div className="bg-[#1d2330] p-3 rounded-lg text-sm leading-5">
                {response.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input Section - Now Above Footer */}
      <div className="bg-[#1d2330] p-3 flex items-center max-w-lg mx-auto w-full mb-4 rounded-lg">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for help or information..."
          className="flex-1 bg-transparent outline-none text-sm text-gray-300 px-2"
        />
        <button
          onClick={handleSend}
          className="bg-[#2c3344] p-2 rounded-lg ml-2 hover:bg-[#3a4255]"
        >
          <Send size={18} className="text-gray-300" />
        </button>
      </div>

      <BottomNav/>

    </div>
  );
};

export default Assistant;
