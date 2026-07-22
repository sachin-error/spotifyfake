import { useState } from "react";
import NavBar from "../components/common/navbar";
import Sidebar from "../components/common/sidebar";
import LeftSidebar from "../components/common/leftsidebar";
import Player from "../components/common/player";

function AppLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="crt-screen h-screen bg-hkf-bg overflow-x-hidden">
      <div className="crt-scanlines" />
      <div className="crt-vignette" />

      {/* Navbar */}
      <NavBar
        menuOpen={mobileMenuOpen}
        onMenuToggle={() => setMobileMenuOpen((v) => !v)}
      />

      {/* Left Sidebar - primary nav (desktop) */}
      <LeftSidebar />

      {/* Right Sidebar - now playing / queue / system (desktop) */}
      <Sidebar />

      {/* Mobile drawer: primary nav */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className="absolute right-0 top-0 h-full w-72 max-w-[85%]
            bg-hkf-bg2 border-l border-[rgba(0,255,100,.12)] pt-14 md:pt-16
            overflow-y-auto modern-scroll"
          >
            <LeftSidebar
              variant="mobile"
              onNavigate={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="pt-14 md:pt-16 pb-16 md:pb-24 lg:pl-56 xl:pl-60 lg:pr-72 xl:pr-80 h-full overflow-y-auto modern-scroll">
        {children}
      </div>

      {/* Bottom Player */}
      <Player />
    </div>
  );
}

export default AppLayout;
