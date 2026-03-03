import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { PlayerContext } from "../context/PlayerContext";
import {
  HiPlus,
  HiMinus,
  HiHeart,
  HiMagnifyingGlass,
} from "react-icons/hi2";

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

  const playlist = playlists.find(
    (pl) => pl.id === Number(id)
  );

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/songs/")
      .then((res) => res.json())
      .then((data) => setAllSongs(data))
      .catch((err) => console.error(err));
  }, []);

  if (!playlist) {
    return <p className="text-white p-6">Playlist not found</p>;
  }

  const filteredPlaylistSongs = playlist.songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <div className="text-white p-8 bg-black min-h-screen relative">

      {/* 🌟 GLASS TOAST */}
      {toast && (
        <div
          className="fixed top-18 left-[60%] -translate-x-1/2 z-[9999]
          backdrop-blur-lg bg-white/10 border border-white/20
          text-white px-8 py-4 rounded-2xl shadow-2xl
          animate-slideDown"
        >
          {toast}
        </div>
      )}

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          🎵 {playlist.name}
        </h1>

        <div className="flex gap-4">

          <button
            onClick={() => {
              setShowSearch(!showSearch);
              setShowAddSongs(false);
            }}
            className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition"
          >
            <HiMagnifyingGlass className="text-white text-xl" />
          </button>

          <button
            onClick={() => {
              setShowAddSongs(!showAddSongs);
              setShowSearch(false);
            }}
            className="bg-green-500 p-3 rounded-full hover:scale-110 transition"
          >
            <HiPlus className="text-black text-xl" />
          </button>

        </div>
      </div>

      {/* SEARCH BAR */}
      {showSearch && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search in this playlist..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-900 px-4 py-2 rounded-full w-80 outline-none border border-gray-700"
          />
        </div>
      )}

      {/* ADD SONG SECTION */}
      {showAddSongs && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">
            Add Songs
          </h2>

          <div className="flex flex-col gap-4">
            {allSongs.map((song) => (
              <div
                key={song.id}
                className="flex items-center justify-between 
                bg-gray-900 p-4 rounded-lg 
                hover:bg-gray-800 transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={song.cover_image_url}
                    alt={song.title}
                    className="w-14 h-14 rounded object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">
                      {song.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {song.artist}
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addSongToPlaylist(playlist.id, song);
                    showToast(`🎵 ${song.title} added successfully`);
                  }}
                  className="flex items-center gap-2 
                  bg-gray-800 px-3 py-1.5 rounded-full 
                  hover:bg-gray-700 transition text-sm"
                >
                  <HiPlus className="text-green-500 text-base" />
                  <span>Add to playlist</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PLAYLIST SONGS */}
      {filteredPlaylistSongs.length === 0 ? (
        <p className="text-gray-400">
          No songs in this playlist.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredPlaylistSongs.map((song) => {
            const isLiked = likedSongs.find(
              (s) => s.id === song.id
            );

            return (
              <div
                key={song.id}
                onClick={() => playSong(song)}
                className="flex items-center justify-between 
                bg-gray-900 p-4 rounded-lg 
                hover:bg-gray-800 transition cursor-pointer"
              >
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

                <div className="flex items-center gap-6">

                  <HiHeart
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(song);
                    }}
                    className={`text-xl cursor-pointer transition ${
                      isLiked
                        ? "text-red-500 scale-110"
                        : "text-gray-400 hover:text-white"
                    }`}
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSongFromPlaylist(
                        playlist.id,
                        song.id
                      );
                      showToast(`🎵 ${song.title} removed from playlist`);
                    }}
                    className="bg-red-400 p-2 rounded-full hover:scale-110 transition"
                  >
                    <HiMinus className="text-white text-lg" />
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