import { HiPlus } from "react-icons/hi2";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../../context/PlayerContext";

function Sidebar() {
  const navigate = useNavigate();
  const { playlists } = useContext(PlayerContext);

  return (
    <div
      className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-50 
      bg-gradient-to-b from-black via-gray-900 to-black 
      border-l border-gray-800 p-4 text-white overflow-y-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-9">
        <h2 className="text-lg font-semibold">Your Library</h2>

        {/* ➕ Go To Playlists Page */}
        <button
          onClick={() => navigate("/playlists")}
          className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
        >
          <HiPlus className="text-xl" />
        </button>
      </div>

      {/* ❤️ Liked Songs (NO CHANGE) */}
      <div
        onClick={() => navigate("/liked")}
        className="flex items-center gap-3 cursor-pointer 
        hover:text-white text-gray-400 transition mb-9"
      >
        ❤️ Liked Songs
      </div>

      {/* 🎵 Playlists Title */}
      <div className="text-sm text-gray-500 mb-6">
        Playlists
      </div>

      {/* Show Maximum 4 Playlists */}
      <div className="flex flex-col gap-3 ">
        {playlists.slice(0, 4).map((playlist) => {
          const cover =
            playlist.songs.length > 0
              ? playlist.songs[0].cover_image_url
              : null;

          return (
            <div
              key={playlist.id}
              onClick={() =>
                navigate(`/playlists/${playlist.id}`)
              }
              className="flex items-center gap-3 cursor-pointer 
              hover:text-white text-gray-400 transition mb-4"
            >
              {/* Playlist Image */}
              {cover ? (
                <img
                  src={cover}
                  alt={playlist.name}
                  className="w-10 h-10 rounded object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded bg-gray-800 flex items-center justify-center text-xs">
                  🎵
                </div>
              )}

              {playlist.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;