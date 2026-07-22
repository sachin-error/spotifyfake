import { useContext, useEffect, useRef, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { Heart, Plus, Play } from "lucide-react";
import GlowCard from "../common/GlowCard";

function MusicCard({ song, allSongs }) {
  const { playSong, toggleLike, likedSongs, playlists, addSongToPlaylist } =
    useContext(PlayerContext);

  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  const menuRef = useRef(null);

  const isLiked = likedSongs.find((s) => s.id === song.id);

  useEffect(() => {
    if (!showPlaylistMenu) return;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowPlaylistMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPlaylistMenu]);

  return (
    <GlowCard
      onClick={() => playSong(song, allSongs)}
      className="p-2.5 w-[120px] sm:w-[135px] md:w-[150px] flex-shrink-0 group relative"
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden rounded-lg aspect-square">
        <img
          src={song.cover_image_url}
          alt={song.title}
          className="w-full h-full object-cover object-top rounded-lg border border-[rgba(0,255,100,.08)]"
        />

        {/* Play button fade-in */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/40
          opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <span className="w-8 h-8 rounded-full bg-hkf-green flex items-center justify-center shadow-glow">
            <Play size={15} className="text-black ml-0.5" fill="black" />
          </span>
        </div>
      </div>

      {/* SONG INFO */}
      <div className="mt-2">
        <h3 className="font-semibold text-white text-xs sm:text-sm truncate">
          {song.title}
        </h3>
        <p className="text-hkf-mute text-[11px] sm:text-xs truncate">
          {song.artist}
        </p>
      </div>

      {/* ACTION ICONS */}
      <div className="absolute top-2 right-2 flex gap-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition">
        <Heart
          size={14}
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(song);
          }}
          className={`transition drop-shadow ${
            isLiked ? "text-red-400 fill-red-400 scale-110" : "text-hkf-sub hover:text-hkf-green"
          }`}
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowPlaylistMenu((prev) => !prev);
          }}
          className="text-hkf-sub hover:text-hkf-green transition"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* PLAYLIST DROPDOWN - frosted glass: real blur + enough contrast to stay legible */}
      {showPlaylistMenu && (
        <div
          ref={menuRef}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-10 right-2
          bg-black/75 backdrop-blur-xl
          border border-[rgba(0,255,100,.22)] rounded-lg shadow-glow-lg
          p-2 w-44 z-[9999]"
        >
          {playlists.length === 0 ? (
            <div className="p-2 text-sm text-hkf-mute">No playlists yet</div>
          ) : (
            playlists.map((pl) => (
              <div
                key={pl.id}
                onClick={() => {
                  addSongToPlaylist(pl.id, song);
                  setShowPlaylistMenu(false);
                }}
                className="p-2 hover:bg-hkf-green/15 text-white
                rounded cursor-pointer text-sm truncate"
              >
                {pl.name}
              </div>
            ))
          )}
        </div>
      )}
    </GlowCard>
  );
}

export default MusicCard;
