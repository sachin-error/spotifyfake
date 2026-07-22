import { useContext, useState, useEffect } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { Heart, Plus, Check } from "lucide-react";

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

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className="text-white p-4 sm:p-6 md:p-8 min-h-screen relative">
      <h1 className="flex items-center gap-3 text-2xl sm:text-3xl font-heading font-bold mb-6 md:mb-8">
        <Heart className="text-red-400 fill-red-400" />
        Liked Songs
      </h1>

      {likedSongs.length === 0 ? (
        <p className="text-hkf-mute text-sm">No liked songs yet</p>
      ) : (
        <div className="flex flex-col gap-3">
          {likedSongs.map((song) => (
            <div
              key={song.id}
              onClick={() => playSong(song)}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3
              bg-hkf-card/70 border border-[rgba(0,255,100,.10)] p-3 sm:p-4 rounded-lg hover:border-hkf-green/50
              transition cursor-pointer relative"
            >
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={song.cover_image_url}
                  alt={song.title}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-md object-cover border border-[rgba(0,255,100,.12)] shrink-0"
                />

                <div className="min-w-0">
                  <h3 className="font-semibold text-base sm:text-lg truncate">
                    {song.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-hkf-mute truncate">
                    {song.artist}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:gap-6 relative shrink-0 self-end sm:self-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDropdown(activeDropdown === song.id ? null : song.id);
                  }}
                  className="flex items-center gap-2
                  border border-[rgba(0,255,100,.15)] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full
                  hover:border-hkf-green transition text-xs sm:text-sm text-hkf-green"
                >
                  <Plus size={14} />
                  <span className="hidden xs:inline">Add to Playlist</span>
                </button>

                {activeDropdown === song.id && (
                  <div
                    className="absolute right-0 top-12
                    bg-hkf-bg2 border border-[rgba(0,255,100,.15)]
                    rounded-lg shadow-glow p-2 w-52 z-50"
                  >
                    {playlists.length === 0 ? (
                      <p className="text-hkf-mute text-sm p-2">No playlists yet</p>
                    ) : (
                      playlists.map((playlist) => (
                        <div
                          key={playlist.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            addSongToPlaylist(playlist.id, song);
                            setToast(`${song.title} added successfully`);
                            setActiveDropdown(null);
                          }}
                          className="p-2 rounded hover:bg-hkf-green/10 cursor-pointer text-sm truncate"
                        >
                          {playlist.name}
                        </div>
                      ))
                    )}
                  </div>
                )}

                <Heart
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(song);
                  }}
                  size={20}
                  className="text-red-400 fill-red-400 hover:scale-110 transition cursor-pointer sm:w-6 sm:h-6"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {toast && (
        <div
          className="fixed top-16 sm:top-18 left-1/2 sm:left-[60%] -translate-x-1/2 z-[9999]
          bg-hkf-bg2 border border-[rgba(0,255,100,.25)] shadow-glow
          text-hkf-green px-5 sm:px-8 py-3 sm:py-4 rounded-md
          flex items-center gap-3 max-w-[90vw]
          animate-slideDown"
        >
          <Check size={16} className="shrink-0" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide truncate">
            {toast}
          </span>
        </div>
      )}
    </div>
  );
}

export default LikedSongs;
