import NavBar from "../components/common/navbar";
import Sidebar from "../components/common/sidebar";
import LeftSidebar from "../components/common/leftsidebar";
import Player from "../components/common/player";
function AppLayout({ children }) {
  return (
    <div className="h-screen bg-black overflow-x-hidden">

      {/* Navbar */}
      <NavBar />

      {/* Left Sidebar */}
      <LeftSidebar />

      {/* Right Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="pt-16 pb-24 md:pl-48 lg:pr-60 h-full overflow-y-auto">
        {children}
      </div>

      {/* Bottom Player */}
      <Player />

    </div>
  );
}

export default AppLayout;