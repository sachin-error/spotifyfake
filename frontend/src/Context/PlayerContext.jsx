import { createContext, useRef, useState, useEffect } from "react";

export const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const audioRef = useRef(null);

  const [currentSong, setCurrentSong] = useState(null);
  const [likedSongs, setLikedSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const [playlists, setPlaylists] = useState([
    { id: 1, name: "My Playlist 1", songs: [] },
    { id: 2, name: "Chill Hits", songs: [] },
  ]);

  /* =========================
     🔍 RECENT SEARCH SYSTEM (NEW)
  ========================= */

  const [recentSearches, setRecentSearches] = useState([]);

  const addRecentSearch = (song) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.id !== song.id);
      const updated = [song, ...filtered];
      return updated.slice(0, 4); // only 4 items
    });
  };

  /* =========================
     🔔 GLOBAL TOAST SYSTEM
  ========================= */

  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  };

  /* =========================
     🎵 PLAY SONG
  ========================= */

  const playSong = (song) => {
    const audio = audioRef.current;
    if (!audio) return;

    // Restart if same song
    if (currentSong?.id === song.id) {
      audio.currentTime = 0;
      audio.play();
      return;
    }

    setCurrentSong(song);
    addRecentSearch(song); // 🔥 Add to recent search
  };

  /* =========================
     ⏯ TOGGLE PLAY / PAUSE
  ========================= */

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  /* =========================
     🔊 SET VOLUME
  ========================= */

  const setVolume = (value) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = value;
  };

  /* =========================
     ❤️ LIKE SYSTEM
  ========================= */

  const toggleLike = (song) => {
    setLikedSongs((prev) => {
      const exists = prev.find((s) => s.id === song.id);
      return exists
        ? prev.filter((s) => s.id !== song.id)
        : [...prev, song];
    });
  };

  /* =========================
     📁 CREATE PLAYLIST
  ========================= */

  const createPlaylist = (name) => {
    if (!name.trim()) return;

    const newPlaylist = {
      id: Date.now(),
      name,
      songs: [],
    };

    setPlaylists((prev) => [...prev, newPlaylist]);
    showToast("🎉 Playlist created successfully");
  };

  /* =========================
     🗑 DELETE PLAYLIST
  ========================= */

  const deletePlaylist = (id) => {
    setPlaylists((prev) => prev.filter((pl) => pl.id !== id));
    showToast("🗑 Playlist deleted");
  };

  /* =========================
     ➕ ADD SONG TO PLAYLIST
  ========================= */

  const addSongToPlaylist = (playlistId, song) => {
    let added = false;

    setPlaylists((prev) =>
      prev.map((pl) => {
        if (pl.id === playlistId) {
          const exists = pl.songs.find(
            (s) => s.id === song.id
          );

          if (exists) return pl;

          added = true;

          return {
            ...pl,
            songs: [...pl.songs, song],
          };
        }
        return pl;
      })
    );

  };

  /* =========================
     ➖ REMOVE SONG FROM PLAYLIST
  ========================= */

  const removeSongFromPlaylist = (playlistId, songId) => {
    setPlaylists((prev) =>
      prev.map((pl) =>
        pl.id === playlistId
          ? {
              ...pl,
              songs: pl.songs.filter(
                (s) => s.id !== songId
              ),
            }
          : pl
      )
    );

    showToast("❌ Song removed from playlist");
  };

  /* =========================
     🎧 AUTO PLAY WHEN SONG CHANGES
  ========================= */

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    audio.src = currentSong.audio_url;
    audio.play().catch(console.error);
  }, [currentSong]);

  /* =========================
     🔄 SYNC PLAY STATE
  ========================= */

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        playSong,
        togglePlay,
        isPlaying,
        toggleLike,
        likedSongs,
        setVolume,
        playlists,
        createPlaylist,
        deletePlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
        showToast,
        recentSearches,      // 🔥 Exported
        addRecentSearch,     // 🔥 Exported
        audioRef,
      }}
    >
      {children}

      {/* 🌍 Hidden Audio */}
      <audio ref={audioRef} />

      {/* 🌟 GLASS TOAST */}
      {toast && (
        <div
          className="fixed top-18 left-1/2 -translate-x-1/2 z-[9999]
          backdrop-blur-lg bg-white/10 border border-white/20
          text-white px-8 py-4 rounded-2xl shadow-2xl
          animate-slideDown"
        >
          {toast}
        </div>
      )}
    </PlayerContext.Provider>
  );
}