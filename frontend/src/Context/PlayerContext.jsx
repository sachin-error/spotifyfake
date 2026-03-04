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

  const addSongToPlaylist = (playlistId, song) => {
  setPlaylists((prev) =>
    prev.map((pl) => {
      if (pl.id === playlistId) {
        const exists = pl.songs.find(
          (s) => s.id === song.id
        );

        if (exists) return pl; // prevent duplicate

        return {
          ...pl,
          songs: [...pl.songs, song],
        };
      }
      return pl;
    })
  );
};

const createPlaylist = (name) => {
  const newPlaylist = {
    id: Date.now(),
    name,
    songs: [],
  };

  setPlaylists((prev) => [...prev, newPlaylist]);
};

const deletePlaylist = (playlistId) => {
  setPlaylists((prev) =>
    prev.filter((pl) => pl.id !== playlistId)
  );
};

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
};


  /* =========================
     QUEUE SYSTEM
  ========================= */

  const [songQueue, setSongQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const playSong = (song, allSongs = []) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentSong?.id === song.id) {
      audio.currentTime = 0;
      audio.play();
      return;
    }

    if (allSongs.length > 0) {
      setSongQueue(allSongs);

      const index = allSongs.findIndex(
        (s) => s.id === song.id
      );

      setCurrentIndex(index !== -1 ? index : 0);
    }

     addRecentSearch(song);

    setCurrentSong(song);
  };

  const playNext = () => {
    if (songQueue.length === 0) return;

    const nextIndex =
      currentIndex === songQueue.length - 1
        ? 0
        : currentIndex + 1;

    setCurrentIndex(nextIndex);
    setCurrentSong(songQueue[nextIndex]);
  };

  const playPrevious = () => {
    if (songQueue.length === 0) return;

    const prevIndex =
      currentIndex === 0
        ? songQueue.length - 1
        : currentIndex - 1;

    setCurrentIndex(prevIndex);
    setCurrentSong(songQueue[prevIndex]);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const setVolume = (value) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = value;
  };

  const toggleLike = (song) => {
    setLikedSongs((prev) => {
      const exists = prev.find((s) => s.id === song.id);
      return exists
        ? prev.filter((s) => s.id !== song.id)
        : [...prev, song];
    });
  };

  const [recentSearches, setRecentSearches] = useState([]);

  const addRecentSearch = (song) => {
  setRecentSearches((prev) => {
    const filtered = prev.filter((s) => s.id !== song.id);
    const updated = [song, ...filtered];
    return updated.slice(0, 4);
  });
};

  /* =========================
     AUTO PLAY
  ========================= */

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    audio.src = currentSong.audio_url;
    audio.load();
    audio.play().catch(() => {});
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => playNext();

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentIndex, songQueue]);

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        playSong,
        playNext,
        playPrevious,
        togglePlay,
        isPlaying,
        toggleLike,
        likedSongs,
        setVolume,
        playlists,
        audioRef,
        recentSearches,
        addRecentSearch,
        addSongToPlaylist,
        removeSongFromPlaylist,
        createPlaylist,     
        deletePlaylist  
      }}
    >
      {children}
      <audio ref={audioRef} />
    </PlayerContext.Provider>
  );
}