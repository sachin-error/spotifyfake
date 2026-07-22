import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppLayout from './pages/AppLayout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import LikedSongs from "./pages/LikedSong";
import Playlist from "./pages/Playlist";
import Playlists from "./pages/Playlists";

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/liked" element={<LikedSongs />} />
          <Route path="/playlists/:id" element={<Playlist />} />
          <Route path="/playlists" element={<Playlists />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
