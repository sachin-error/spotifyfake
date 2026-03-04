// import { useContext, useEffect, useState, useRef } from "react";
// import { PlayerContext } from "../Context/PlayerContext";
// import SongCard from "../components/music/SongCard";
// import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

// function Home() {
//   const { recentlyPlayed = [], setSongsList } = useContext(PlayerContext);
//   const [songs, setSongs] = useState([]);

//   /* =========================
//      🔥 FETCH SONGS + SEND TO CONTEXT
//   ========================= */

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/songs/")
//       .then((res) => res.json())
//       .then((data) => {
//         setSongs(data);
//         setSongsList(data); // 🔥 VERY IMPORTANT FOR NEXT/PREV
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   /* =========================
//      FILTER BY LANGUAGE
//   ========================= */

//   const tamilSongs = songs.filter((song) => song.lang === "tamil");
//   const malayalamSongs = songs.filter((song) => song.lang === "malayalam");
//   const hindiSongs = songs.filter((song) => song.lang === "hindi");
//   const englishSongs = songs.filter((song) => song.lang === "english");

//   /* =========================
//      MODERN SCROLL SECTION
//   ========================= */

//   const Section = ({ title, songs }) => {
//     const scrollRef = useRef(null);

//     const scroll = (direction) => {
//       const container = scrollRef.current;
//       if (!container) return;

//       const scrollAmount = 400;

//       container.scrollBy({
//         left: direction === "left" ? -scrollAmount : scrollAmount,
//         behavior: "smooth",
//       });
//     };

//     return (
//       <div className="mb-14 relative group">
//         <h2 className="text-2xl font-bold mb-6">{title}</h2>

//         {/* LEFT ARROW */}
//         <button
//           onClick={() => scroll("left")}
//           className="absolute left-0 top-1/2 -translate-y-1/2 z-10 
//           bg-black/70 backdrop-blur-md p-2 rounded-full 
//           opacity-0 group-hover:opacity-100 transition"
//         >
//           <HiChevronLeft className="text-white text-2xl" />
//         </button>

//         {/* SONG ROW */}
//         <div
//           ref={scrollRef}
//           className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
//         >
//           {songs.map((song) => (
//             <SongCard key={song.id} song={song} />
//           ))}
//         </div>

//         {/* RIGHT ARROW */}
//         <button
//           onClick={() => scroll("right")}
//           className="absolute right-0 top-1/2 -translate-y-1/2 z-10 
//           bg-black/70 backdrop-blur-md p-2 rounded-full 
//           opacity-0 group-hover:opacity-100 transition"
//         >
//           <HiChevronRight className="text-white text-2xl" />
//         </button>
//       </div>
//     );
//   };

//   return (
//     <div className="bg-black text-white min-h-screen px-8 py-6">

//       {recentlyPlayed.length > 0 && (
//         <Section title="Recently Played" songs={recentlyPlayed} />
//       )}

//       <Section title="🔥 Tamil Hits" songs={tamilSongs} />
//       <Section title="🎵 Malayalam Hits" songs={malayalamSongs} />
//       <Section title="🎶 Hindi Hits" songs={hindiSongs} />
//       <Section title="🎧 English Hits" songs={englishSongs} />

//       <Section title="⭐ Recommended For You" songs={tamilSongs} />
//       <Section title="🆕 New Releases" songs={hindiSongs} />
//       <Section title="📈 Top Charts" songs={englishSongs} />

//     </div>
//   );
// }

// export default Home;

import { useContext, useEffect, useState, useRef } from "react";
import { PlayerContext } from "../Context/PlayerContext";
import SongCard from "../components/music/SongCard";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

function Home() {
  const { recentlyPlayed = [] } = useContext(PlayerContext);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/songs/")
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
      <div className="mb-14 relative group">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>

        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 
          bg-black/70 p-2 rounded-full opacity-0 
          group-hover:opacity-100 transition"
        >
          <HiChevronLeft className="text-white text-2xl" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth no-scrollbar"
        >
          {songs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              allSongs={songs}   // IMPORTANT
            />
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 
          bg-black/70 p-2 rounded-full opacity-0 
          group-hover:opacity-100 transition"
        >
          <HiChevronRight className="text-white text-2xl" />
        </button>
      </div>
    );
  };

  return (
    <div className="bg-black text-white min-h-screen px-2 py-9">
      {recentlyPlayed.length > 0 && (
        <Section title="Recently Played" songs={recentlyPlayed} />
      )}

      <Section title="🔥 Tamil Hits" songs={tamilSongs} />
      <Section title="🎵 Malayalam Hits" songs={malayalamSongs} />
      <Section title="🎶 Hindi Hits" songs={hindiSongs} />
      <Section title="🎧 English Hits" songs={englishSongs} />
    </div>
  );
}

export default Home;