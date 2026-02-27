import { createContext, useRef, useState, useEffect } from "react";

export const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const audioRef = useRef(null);

  const [currentSong, setCurrentSong] = useState(null);
  const [likedSongs, setLikedSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSong = (song) => {
    if (!audioRef.current) return;

    setCurrentSong(song);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const setVolume = (value) => {
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  // Auto play when song changes
  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  }, [currentSong]);

  // Sync play state
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

  const toggleLike = (song) => {
    setLikedSongs((prev) => {
      const exists = prev.find((s) => s.id === song.id);
      return exists
        ? prev.filter((s) => s.id !== song.id)
        : [...prev, song];
    });
  };

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
        audioRef,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}