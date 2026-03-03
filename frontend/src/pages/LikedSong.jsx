import { useContext, useState, useEffect } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { HiHeart, HiPlus } from "react-icons/hi2";

function LikedSongs() {
  const {
    likedSongs,
    toggleLike,
    playSong,
    playlists,
    addSongToPlaylist,
  } = useContext(PlayerContext);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [toast, setToast] = useState(null);

  // Auto hide toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className="text-white p-8 min-h-screen bg-black relative">

      <h1 className="text-3xl font-bold mb-8">
        ❤️ Liked Songs
      </h1>

      {likedSongs.length === 0 ? (
        <p className="text-gray-400">
          No liked songs yet.
        </p>
      ) : (
        <div className="flex flex-col gap-3">

          {likedSongs.map((song) => (
            <div
              key={song.id}
              onClick={() => playSong(song)}
              className="flex items-center justify-between 
              bg-gray-900 p-4 rounded-lg hover:bg-gray-800 
              transition cursor-pointer relative"
            >

              {/* LEFT SIDE */}
              <div className="flex items-center gap-4">
                <img
                  src={song.cover_image_url}
                  alt={song.title}
                  className="w-16 h-16 rounded-md object-cover"
                />

                <div>
                  <h3 className="font-semibold text-lg">
                    {song.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {song.artist}
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex items-center gap-6 relative">

                {/* Add To Playlist Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDropdown(
                      activeDropdown === song.id ? null : song.id
                    );
                  }}
                  className="flex items-center gap-2 
                  bg-gray-800 px-4 py-2 rounded-full 
                  hover:bg-gray-700 transition text-sm"
                >
                  <HiPlus />
                  Add to Playlist
                </button>

                {/* Dropdown */}
                {activeDropdown === song.id && (
                  <div
                    className="absolute right-0 top-12 
                    bg-gray-900 border border-gray-700 
                    rounded-lg shadow-xl p-2 w-52 z-50"
                  >
                    {playlists.length === 0 ? (
                      <p className="text-gray-400 text-sm p-2">
                        No playlists available
                      </p>
                    ) : (
                      playlists.map((playlist) => (
                        <div
                          key={playlist.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            addSongToPlaylist(playlist.id, song);
                            setToast(
                              `🎵 ${song.title} added successfully`
                            );
                            setActiveDropdown(null);
                          }}
                          className="p-2 rounded hover:bg-gray-800 cursor-pointer text-sm"
                        >
                          {playlist.name}
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Unlike Button */}
                <HiHeart
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(song);
                  }}
                  className="text-red-500 text-2xl 
                  hover:scale-110 transition cursor-pointer"
                />

              </div>
            </div>
          ))}

        </div>
      )}

      {/* 🌟 Glassmorphism Toast */}
{toast && (
  <div
    className="fixed top-18 left-[60%] -translate-x-1/2 z-[9999]
    backdrop-blur-lg bg-white/10 border border-white/20
    text-white px-8 py-4 rounded-2xl shadow-2xl
    flex items-center gap-3
    animate-slideDown"
  >
    <span className="text-sm font-semibold tracking-wide">
      {toast}
    </span>
  </div>
)}

    </div>
  );
}

export default LikedSongs;