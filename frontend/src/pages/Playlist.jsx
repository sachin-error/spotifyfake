import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { Plus, Minus, Heart, Search, Check } from "lucide-react";

function Playlist() {
  const { id } = useParams();
  const {
    playlists,
    playSong,
    toggleLike,
    likedSongs,
    addSongToPlaylist,
    removeSongFromPlaylist,
  } = useContext(PlayerContext);

  const [showAddSongs, setShowAddSongs] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [allSongs, setAllSongs] = useState([]);
  const [toast, setToast] = useState("");

  const playlist = playlists.find((pl) => pl.id === Number(id));
  const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    fetch(`${API}/api/songs/`)
      .then((res) => res.json())
      .then((data) => setAllSongs(data))
      .catch((err) => console.error(err));
  }, []);

  if (!playlist) {
    return <p className="text-hkf-mute p-6">Playlist not found</p>;
  }

  const filteredPlaylistSongs = playlist.songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <div className="text-white p-4 sm:p-6 md:p-8 min-h-screen relative">
      {toast && (
        <div
          className="fixed top-16 sm:top-18 left-1/2 sm:left-[60%] -translate-x-1/2 z-[9999]
          bg-hkf-bg2 border border-[rgba(0,255,100,.25)] shadow-glow
          text-hkf-green px-5 sm:px-8 py-3 sm:py-4 rounded-md max-w-[90vw]
          flex items-center gap-3
          animate-slideDown"
        >
          <Check size={16} className="shrink-0" />
          <span className="truncate">{toast}</span>
        </div>
      )}

      <div className="flex justify-between items-center gap-3 mb-6 md:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold truncate">
          {playlist.name}
        </h1>

        <div className="flex gap-2 sm:gap-4 shrink-0">
          <button
            onClick={() => {
              setShowSearch(!showSearch);
              setShowAddSongs(false);
            }}
            className="border border-[rgba(0,255,100,.15)] p-2.5 sm:p-3 rounded-full hover:border-hkf-green transition"
          >
            <Search size={18} className="text-hkf-green" />
          </button>

          <button
            onClick={() => {
              setShowAddSongs(!showAddSongs);
              setShowSearch(false);
            }}
            className="bg-hkf-green p-2.5 sm:p-3 rounded-full hover:scale-110 transition"
          >
            <Plus size={18} className="text-black" />
          </button>
        </div>
      </div>

      {showSearch && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search in this playlist"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-black/50 px-4 py-2 rounded-full w-full sm:w-80
            outline-none border border-[rgba(0,255,100,.15)] focus:border-hkf-green
            text-white placeholder-hkf-mute transition"
          />
        </div>
      )}

      {showAddSongs && (
        <div className="mb-10">
          <h2 className="text-lg sm:text-xl font-heading font-semibold mb-4">
            Add Songs
          </h2>

          <div className="flex flex-col gap-3 sm:gap-4">
            {allSongs.map((song) => (
              <div
                key={song.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3
                bg-hkf-card/70 border border-[rgba(0,255,100,.10)] p-3 sm:p-4 rounded-lg
                hover:border-hkf-green/50 transition"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={song.cover_image_url}
                    alt={song.title}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded object-cover border border-[rgba(0,255,100,.12)] shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="font-semibold truncate">{song.title}</h3>
                    <p className="text-xs sm:text-sm text-hkf-mute truncate">
                      {song.artist}
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addSongToPlaylist(playlist.id, song);
                    showToast(`${song.title} added successfully`);
                  }}
                  className="flex items-center gap-2 self-end sm:self-auto
                  border border-[rgba(0,255,100,.15)] px-3 py-1.5 rounded-full
                  hover:border-hkf-green transition text-xs sm:text-sm shrink-0"
                >
                  <Plus size={14} className="text-hkf-green" />
                  <span>Add</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {filteredPlaylistSongs.length === 0 ? (
        <p className="text-hkf-mute text-sm">No songs in this playlist</p>
      ) : (
        <div className="flex flex-col gap-3 sm:gap-4">
          {filteredPlaylistSongs.map((song) => {
            const isLiked = likedSongs.find((s) => s.id === song.id);

            return (
              <div
                key={song.id}
                onClick={() => playSong(song)}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3
                bg-hkf-card/70 border border-[rgba(0,255,100,.10)] p-3 sm:p-4 rounded-lg
                hover:border-hkf-green/50 transition cursor-pointer"
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

                <div className="flex items-center gap-4 sm:gap-6 shrink-0 self-end sm:self-auto">
                  <Heart
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(song);
                    }}
                    size={19}
                    className={`cursor-pointer transition ${
                      isLiked
                        ? "text-red-400 fill-red-400 scale-110"
                        : "text-hkf-mute hover:text-hkf-green"
                    }`}
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSongFromPlaylist(playlist.id, song.id);
                      showToast(`${song.title} removed from playlist`);
                    }}
                    className="border border-red-400/50 p-2 rounded-full hover:bg-red-400/10 transition"
                  >
                    <Minus size={16} className="text-red-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Playlist;
