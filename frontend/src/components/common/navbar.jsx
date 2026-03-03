import { Navbar } from "flowbite-react";
import { HiHome, HiMagnifyingGlass } from "react-icons/hi2";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import { PlayerContext } from "../../context/PlayerContext";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { playSong } = useContext(PlayerContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const searchRef = useRef(null);

  /* =========================
     🔎 SEARCH FROM BACKEND
  ========================= */

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setResults([]);
      setShowResults(false);
      return;
    }

    const delayDebounce = setTimeout(() => {
      fetch("http://127.0.0.1:8000/api/songs/")
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.filter(
            (song) =>
              song.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              song.artist
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              song.lang
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
          );

          setResults(filtered);
          setShowResults(true);
        })
        .catch((err) => console.error(err));
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  /* =========================
     🔥 CLOSE DROPDOWN ON OUTSIDE CLICK
  ========================= */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* =========================
     🎵 CLICK SONG
  ========================= */

  const handleSongClick = (song) => {
    playSong(song);
    setShowResults(false);
    setSearchTerm("");
    navigate("/");
  };

  return (
    <Navbar
      fluid
      rounded={false}
      className="fixed top-0 left-0 w-full z-50 
      bg-gradient-to-r from-black via-gray-900 to-black 
      backdrop-blur-md border-b border-gray-800 px-6 h-16"
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <div
          onClick={() => navigate("/")}
          className="w-8 h-8 rounded-full bg-green-500 
          flex items-center justify-center 
          font-bold text-black cursor-pointer"
        >
          H
        </div>

        <span
          onClick={() => navigate("/")}
          className="text-xl font-semibold text-white tracking-wide cursor-pointer"
        >
          Hackify
        </span>

        <button
          onClick={() => navigate("/")}
          className={`transition ${
            location.pathname === "/"
              ? "text-white"
              : "text-gray-500 hover:text-white"
          }`}
        >
          <HiHome className="text-2xl" />
        </button>
      </div>

      {/* CENTER SEARCH */}
      <div className="flex-1 flex justify-center">
        <div
          ref={searchRef}
          className="relative w-full max-w-md"
        >
          <HiMagnifyingGlass
            className="absolute left-4 top-1/2 
            -translate-y-1/2 text-gray-400 text-lg"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            onFocus={() =>
              searchTerm && setShowResults(true)
            }
            placeholder="Search songs, artists, language..."
            className="w-full pl-12 pr-4 py-2 rounded-full 
            bg-gray-800/80 text-white placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-green-500
            transition duration-300"
          />

          {/* SEARCH DROPDOWN */}
          {showResults && (
            <div
              className="absolute top-14 left-57 w-full 
              max-h-80 overflow-y-auto modern-scroll
              bg-gray-900 border border-gray-700
              rounded-2xl shadow-2xl 
              animate-slideDown z-50"
            >
              {results.length === 0 ? (
                <div className="p-6 text-center text-gray-300">
                  No matching songs found
                </div>
              ) : (
                results.map((song) => (
                  <div
                    key={song.id}
                    onClick={() =>
                      handleSongClick(song)
                    }
                    className="flex items-center gap-4 
                    p-4 hover:bg-gray-800 
                    transition cursor-pointer"
                  >
                    <img
                      src={song.cover_image_url}
                      alt={song.title}
                      className="w-12 h-12 
                      rounded-lg object-cover"
                    />

                    <div>
                      <h3 className="font-semibold text-white">
                        {song.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {song.artist} • {song.lang}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/login")}
          className={`transition ${
            location.pathname === "/login"
              ? "text-white"
              : "text-gray-300 hover:text-white"
          }`}
        >
          Login
        </button>

        <button
          onClick={() => navigate("/Register")}
          className="bg-white text-black px-4 py-1.5 
          rounded-full font-medium 
          hover:scale-105 transition duration-300"
        >
          Sign Up
        </button>
      </div>
    </Navbar>
  );
}

export default NavBar;