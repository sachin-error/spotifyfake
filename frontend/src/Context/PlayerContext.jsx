import { createContext, useState } from "react";

export const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [likedSongs, setLikedSongs] = useState([]);

  const playSong = (song) => {
    setCurrentSong(song);
  };

  const toggleLike = (song) => {
    setLikedSongs((prev) => {
      const exists = prev.find((s) => s.title === song.title);

      if (exists) {
        return prev.filter((s) => s.title !== song.title);
      } else {
        return [...prev, song];
      }
    });
  };

   const playlists = [
    {
      id: 1,
      name: "My Playlist 1",
      songs: [
        {
          title: "Arabic Kuthu",
          artist: "Anirudh",
          image: "https://picsum.photos/60?random=101",
        },
        {
          title: "Hukum",
          artist: "Anirudh",
          image: "https://picsum.photos/60?random=102",
        },
      ],
    },
    {
      id: 2,
      name: "Chill Hits",
      songs: [
        {
          title: "Blinding Lights",
          artist: "The Weeknd",
          image: "https://picsum.photos/60?random=103",
        },
      ],
    },
  ];


  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        playSong,
        likedSongs,
        toggleLike,
        playlists,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}