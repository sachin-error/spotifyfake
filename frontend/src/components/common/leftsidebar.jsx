import { useState } from "react";
import { HiHome, HiMagnifyingGlass, HiClock } from "react-icons/hi2";

function LeftSidebar() {
  const [recentSearches] = useState([
    { title: "Arabic Kuthu", artist: "Anirudh" },
    { title: "Blinding Lights", artist: "The Weeknd" },
    { title: "Kesariya", artist: "Arijit Singh" },
    { title: "Malare", artist: "Vijay Yesudas" },
  ]);

  return (
    <div
    className="fixed left-0 top-16 h-[calc(100vh-5rem)] w-40 
    bg-gradient-to-b from-black via-gray-900 to-black 
    border-l border-gray-800 p-4 text-white overflow-y-auto">

      
      {/* Top Navigation */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-3 hover:text-white text-gray-400 cursor-pointer transition">
          <HiHome className="text-xl" />
          <span className="font-medium">Home</span>
        </div>

        <div className="flex items-center gap-3 hover:text-white text-gray-400 cursor-pointer transition">
          <HiMagnifyingGlass className="text-xl" />
          <span className="font-medium">Search</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 my-4"></div>

      {/* Recently Searched */}
      <div className="flex items-center gap-2 mb-4">
        <HiClock className="text-gray-400" />
        <h2 className="text-sm font-semibold text-gray-300">
          Recently Searched
        </h2>
      </div>

      {/* List */}
      <div className="flex flex-col gap-3 overflow-y-auto">
        {recentSearches.map((song, index) => (
          <div
            key={index}
            className="hover:bg-gray-800 p-2 rounded-md cursor-pointer transition"
          >
            <p className="text-sm font-medium">{song.title}</p>
            <p className="text-xs text-gray-400">{song.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeftSidebar;

