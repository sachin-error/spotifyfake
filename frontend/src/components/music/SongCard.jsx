import { useContext, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { HiHeart, HiPlus } from "react-icons/hi2";

function SongCard({ song }) {
  const {
    playSong,
    toggleLike,
    likedSongs,
    playlists,
    addSongToPlaylist,
  } = useContext(PlayerContext);

  const [showPlaylistMenu, setShowPlaylistMenu] =
    useState(false);

  const isLiked = likedSongs.find(
    (s) => s.id === song.id
  );

  return (
    <div
      onClick={() => playSong(song)}
      className="bg-gray-900 p-2.5 rounded-2xl 
      w-45 min-w-[200px] flex-shrink-0
      hover:bg-gray-800 transition 
      cursor-pointer group relative shadow-lg"
    >
      {/* IMAGE */}
      <div className="relative">
        <img
          src={song.cover_image_url}
          alt={song.title}
          className="w-full h-40 object-cover rounded-xl"
        />

        {/* PLAY BUTTON */}
        <button
          className="absolute bottom-2 right-2 
          bg-green-500 p-2 rounded-full 
          opacity-0 group-hover:opacity-100 
          transition text-white shadow-md"
        >
          ▶
        </button>
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

        {/* LIKE */}
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

        {/* ADD TO PLAYLIST */}
        <HiPlus
          onClick={(e) => {
            e.stopPropagation();
            setShowPlaylistMenu(!showPlaylistMenu);
          }}
          className="text-xl text-gray-400 hover:text-white"
        />
      </div>

      {/* PLAYLIST DROPDOWN */}
      {showPlaylistMenu && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-14 right-4 
          bg-gray-800 rounded-lg shadow-lg 
          p-2 w-44 z-50"
        >
          {playlists.map((pl) => (
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
          ))}
        </div>
      )}
    </div>
  );
}

export default SongCard;