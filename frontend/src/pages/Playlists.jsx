import { useContext, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { useNavigate } from "react-router-dom";
import { HiPlus, HiTrash } from "react-icons/hi2";

function Playlists() {
  const { playlists, createPlaylist, deletePlaylist } =
    useContext(PlayerContext);

  const navigate = useNavigate();
  const [playlistName, setPlaylistName] = useState("");

  const handleCreate = () => {
    if (!playlistName.trim()) return;
    createPlaylist(playlistName);
    setPlaylistName("");
  };

  return (
    <div className="text-white min-h-screen bg-black px-10 py-8">

      {/* Header */}
      <h1 className="text-4xl font-bold mb-10 tracking-wide">
        Your Playlists
      </h1>

      {/* Modern Create Section */}
      <div className="flex items-center gap-4 mb-12">

        <div className="relative w-80">
          <input
            type="text"
            placeholder="Create new playlist..."
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            className="w-full bg-gray-900 px-5 py-3 rounded-full 
            outline-none border border-gray-700 
            focus:border-green-500 transition"
          />
        </div>

        <button
          onClick={handleCreate}
          className="bg-green-500 p-3 rounded-full 
          hover:scale-110 hover:bg-green-600 
          transition shadow-lg"
        >
          <HiPlus className="text-xl text-black" />
        </button>

      </div>

      {/* Playlist List */}
      {playlists.length === 0 ? (
        <p className="text-gray-500">No playlists yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-gray-900 rounded-xl p-6 
              hover:bg-gray-800 transition 
              relative group cursor-pointer"
              onClick={() => navigate(`/playlists/${playlist.id}`)}
            >

              {/* Playlist Name */}
              <h3 className="text-lg font-semibold mb-4">
                {playlist.name}
              </h3>

              {/* Delete Icon */}
              <button
  onClick={(e) => {
    e.stopPropagation();   // 🚨 prevents opening playlist
    const confirmDelete = window.confirm(
      "Delete this playlist?"
    );

    if (confirmDelete) {
      deletePlaylist(playlist.id);
    }
  }}
  className="absolute top-4 right-4 
  opacity-0 group-hover:opacity-100 
  transition"
>
  <HiTrash className="text-red-500 text-lg hover:scale-110 transition" />
</button>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Playlists;