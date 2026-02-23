import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { useNavigate } from "react-router-dom";

function Playlists() {
  const { playlists } = useContext(PlayerContext);
  const navigate = useNavigate();

  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold mb-8">
         All Playlists
      </h1>

      <div className="flex flex-col gap-4">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            onClick={() => navigate(`/playlists/${playlist.id}`)}
            className="bg-gray-900 p-4 rounded-lg 
            hover:bg-gray-800 cursor-pointer transition"
          >
            🎵 {playlist.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Playlists;