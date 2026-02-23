import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from './components/common/navbar.jsx'
import Sidebar from './components/common/sidebar.jsx'        // Right
import LeftSidebar from './components/common/leftsidebar.jsx'
import Player from './components/common/player.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import LikedSongs from "./pages/LikedSong";
import Playlist from "./pages/Playlist";
import Playlists from "./pages/Playlists";

function App() {
  return (
    <Router>
      <div className="h-screen bg-black overflow-hidden">

        {/* Navbar */}
        <NavBar />

        {/* Fixed Left Sidebar */}
        <LeftSidebar />

        {/* Fixed Right Sidebar */}
        <Sidebar />

        {/* Main Scrollable Content */}
        <div className="pt-16 pb-20 pl-40 pr-44 h-full overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/liked" element={<LikedSongs />} />
             <Route path="/playlists/:id" element={<Playlist />} />
              <Route path="/playlists" element={<Playlists />} />
          </Routes>
        </div>

        {/* Bottom Player */}
        <Player />
      </div>
    </Router>
  );
  
 

  

}

export default App;