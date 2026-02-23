import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../Context/PlayerContext";
import SongCard from "../components/music/SongCard";

function Home() {
  const { recentlyPlayed = [] } = useContext(PlayerContext);

  const [songs, setSongs] = useState([]);

  // 🔥 Fetch songs from Django backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/songs/")
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.error("Error fetching songs:", err));
  }, []);

  // Filter by language (make sure backend has `lang` field)
  const tamilSongs = songs.filter((song) => song.lang === "tamil");
  const malayalamSongs = songs.filter((song) => song.lang === "malayalam");
  const hindiSongs = songs.filter((song) => song.lang === "hindi");
  const englishSongs = songs.filter((song) => song.lang === "english");

  // Reusable Section Component
  const Section = ({ title, songs }) => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      <div className="flex gap-6 overflow-x-auto scrollbar-hide">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-black text-white min-h-screen p-6">

      {/* Recently Played */}
      {recentlyPlayed.length > 0 && (
        <Section title="Recently Played" songs={recentlyPlayed} />
      )}

      {/* Language Sections */}
      <Section title="🔥 Tamil Hits" songs={tamilSongs} />
      <Section title="🎵 Malayalam Hits" songs={malayalamSongs} />
      <Section title="🎶 Hindi Hits" songs={hindiSongs} />
      <Section title="🎧 English Hits" songs={englishSongs} />

      {/* Extra Sections */}
      <Section title="⭐ Recommended For You" songs={tamilSongs} />
      <Section title="🆕 New Releases" songs={hindiSongs} />
      <Section title="📈 Top Charts" songs={englishSongs} />

    </div>
  );
}

export default Home;