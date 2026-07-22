import { useContext, useEffect, useState, useRef } from "react";
import { PlayerContext } from "../context/PlayerContext";
import MusicCard from "../components/music/MusicCard";
import TerminalTyping from "../components/common/TerminalTyping";
import StatusBadge from "../components/common/StatusBadge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const MotionDiv = motion.div;

function Home() {
  const { recentSearches = [], playlists } = useContext(PlayerContext);
  const [songs, setSongs] = useState([]);
  const [bootDone, setBootDone] = useState(false);

  const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    fetch(`${API}/api/songs/`)
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.error(err));
  }, []);

  const tamilSongs = songs.filter((s) => s.lang === "tamil");
  const malayalamSongs = songs.filter((s) => s.lang === "malayalam");
  const hindiSongs = songs.filter((s) => s.lang === "hindi");
  const englishSongs = songs.filter((s) => s.lang === "english");

  const Section = ({ title, songs }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
      if (!scrollRef.current) return;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -400 : 400,
        behavior: "smooth",
      });
    };

    return (
      <div className="mb-10 md:mb-14 relative group">
        <h2 className="text-lg sm:text-xl md:text-2xl font-heading font-bold mb-4 md:mb-6 text-white tracking-tight">
          {title}
        </h2>

        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10
          bg-black/80 border border-[rgba(0,255,100,.15)] p-2 rounded-full opacity-0
          group-hover:opacity-100 transition"
        >
          <ChevronLeft size={22} className="text-hkf-green" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 md:gap-5 overflow-x-auto scroll-smooth no-scrollbar"
        >
          {songs.length === 0 ? (
            <p className="text-hkf-mute text-sm">No tracks found</p>
          ) : (
            songs.map((song) => (
              <MusicCard key={song.id} song={song} allSongs={songs} />
            ))
          )}
        </div>

        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10
          bg-black/80 border border-[rgba(0,255,100,.15)] p-2 rounded-full opacity-0
          group-hover:opacity-100 transition"
        >
          <ChevronRight size={22} className="text-hkf-green" />
        </button>
      </div>
    );
  };

  return (
    <div className="bg-transparent text-white min-h-screen px-3 sm:px-4 md:px-6 py-6 md:py-9">
      {/* HERO */}
      <div
        className="mb-6 md:mb-8 rounded-xl border border-[rgba(0,255,100,.14)]
        bg-hkf-card/60 backdrop-blur-sm p-4 sm:p-5 md:p-6 relative overflow-hidden"
      >
        <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight text-white">
            HACKIFY
          </h1>
          <StatusBadge label="Online" />
        </div>

        <TerminalTyping
          className="text-sm sm:text-base mb-3 min-h-[3.25rem]"
          lines={["Connecting...", "Loading songs...", "System ready..."]}
          onDone={() => setBootDone(true)}
        />

        {bootDone && (
          <MotionDiv
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-sm sm:text-base text-hkf-sub"
          >
            <p>
              <span className="text-hkf-green">✓</span> Connection established
            </p>
            <p>
              <span className="text-hkf-green">✓</span> {songs.length} songs loaded
            </p>
            <p>
              <span className="text-hkf-green">✓</span> {playlists.length} playlist(s) synced
            </p>
            <p className="font-heading font-semibold text-white">Welcome back.</p>
          </MotionDiv>
        )}
      </div>

      {recentSearches.length > 0 && (
        <Section title="Recently Played" songs={recentSearches} />
      )}

      <Section title="Tamil Hits" songs={tamilSongs} />
      <Section title="Malayalam Hits" songs={malayalamSongs} />
      <Section title="Hindi Mix" songs={hindiSongs} />
      <Section title="English Pop" songs={englishSongs} />
    </div>
  );
}

export default Home;
