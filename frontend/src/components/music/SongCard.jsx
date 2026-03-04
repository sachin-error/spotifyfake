import { useContext, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { HiHeart, HiPlus } from "react-icons/hi2";

function SongCard({ song, allSongs }) {
  const {
    playSong,
    toggleLike,
    likedSongs,
    playlists,
    addSongToPlaylist,   // 🔥 IMPORTANT
  } = useContext(PlayerContext);

  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);

  const isLiked = likedSongs.find(
    (s) => s.id === song.id
  );

  return (
    <div
      onClick={() => playSong(song, allSongs)}
      className="bg-gray-900 p-3 rounded-2xl 
  w-[150px] sm:w-[170px] md:w-[200px]
  flex-shrink-0 hover:bg-gray-800 transition 
  cursor-pointer group relative shadow-lg"
    >
      {/* IMAGE */}
      <div className="relative">
        <img
          src={song.cover_image_url}
          alt={song.title}
          className="w-full h-32 sm:h-36 md:h-40 object-cover rounded-xl"
        />
      </div>

      {/* SONG INFO */}
      <div className="mt-4">
        <h3 className="font-semibold text-white text-base truncate">
          {song.title}
        </h3>
        <p className="text-gray-400 text-sm truncate">
          {song.artist}
        </p>
      </div>

      {/* ACTION ICONS */}
      <div className="absolute top-4 right-4 flex gap-3">
        <HiHeart
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(song);
          }}
          className={`text-xl transition ${
            isLiked
              ? "text-red-500 scale-110"
              : "text-gray-400 hover:text-white"
          }`}
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowPlaylistMenu((prev) => !prev);
          }}
          className="text-gray-400 hover:text-white transition"
        >
          <HiPlus className="text-xl" />
        </button>
      </div>

      {/* 🔥 PLAYLIST DROPDOWN (MUST BE INSIDE RETURN) */}
      {showPlaylistMenu && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-14 right-4 
          bg-gray-800 rounded-lg shadow-lg 
          p-2 w-44 z-[9999]"
        >
          {playlists.length === 0 ? (
            <div className="p-2 text-sm text-gray-400">
              No playlists
            </div>
          ) : (
            playlists.map((pl) => (
              <div
                key={pl.id}
                onClick={() => {
                  addSongToPlaylist(pl.id, song);
                  setShowPlaylistMenu(false);
                }}
                className="p-2 hover:bg-gray-700 
                rounded cursor-pointer text-sm"
              >
                🎵 {pl.name}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default SongCard;