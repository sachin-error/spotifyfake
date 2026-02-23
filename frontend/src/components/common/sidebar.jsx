import { HiPlus, HiHeart, HiClock } from "react-icons/hi2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../../context/PlayerContext";


function Sidebar() {

  const navigate = useNavigate("/liked");
  

  // Demo playlist state
  const [playlists, setPlaylists] = useState([
    "My Playlist 1",
    "Chill Hits",
  ]);

  const [recent, setRecent] = useState([
    "Top Tamil Songs",
    "Workout Mix",
  ]);

  // Create new playlist
  const createPlaylist = () => {
    const name = prompt("Enter playlist name:");
    if (name) {
      setPlaylists([...playlists, name]);
    }
    const { playlists } = useContext(PlayerContext);

  };

  return (
    <div className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-50 
    bg-gradient-to-b from-black via-gray-900 to-black 
    border-l border-gray-800 p-4 text-white overflow-y-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Your Library</h2>

        {/* Create Playlist Button */}
        <button
          onClick={createPlaylist}
          className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
        >
          <HiPlus className="text-xl" />
        </button>
      </div>

      {/* Liked Songs */}
      <div
        onClick={() => navigate("/liked")}
        className="flex items-center gap-3 cursor-pointer h-25 hover:text-white text-gray-400 transition"
      >
        ❤️ Liked Songs
      </div>

      {/* User Playlists */}
      <div
  onClick={() => navigate("/playlists")}
  className="flex items-center gap-3 cursor-pointer 
  hover:text-white text-gray-400 transition"
>
   Playlists
</div>

<div className="mt-4 flex flex-col gap-3">

  {playlists.map((playlist) => (
    <div
      key={playlist.id}
      onClick={() => navigate(`/playlists/${playlist.id}`)}
      className="flex items-center gap-3 cursor-pointer 
      hover:text-white text-gray-400 transition"
    >
      🎵 {playlist.name}
    </div>
  ))}

</div>

      {/* Recently Played */}
      <div>
        <h3 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
          <HiClock /> Recently Played
        </h3>

        {recent.map((item, index) => (
          <div
            key={index}
            className="p-2 rounded hover:bg-gray-800 cursor-pointer"
          >
            ⏱ {item}
          </div>
        ))}
      </div>

      

    </div>
  );
}

export default Sidebar;