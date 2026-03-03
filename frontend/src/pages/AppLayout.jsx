import { useState } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Player from "../player/Player";

function AppLayout({ children }) {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-black text-white">

      {/* NAVBAR */}
      <Navbar setOpenSidebar={setOpenSidebar} />

      {/* MAIN SECTION */}
      <div className="flex flex-1 pt-16 overflow-hidden">

        {/* MAIN CONTENT */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-6">
          {children}
        </div>

        {/* RIGHT SIDEBAR (Desktop Only) */}
        <div className="hidden lg:block w-64 border-l border-gray-800">
          <Sidebar />
        </div>

      </div>

      {/* PLAYER */}
      <div className="h-20 border-t border-gray-800">
        <Player />
      </div>

    </div>
  );
}

export default AppLayout;