import {
  ChevronLeft,
  ChevronRight,
  Home,
  Search,
  Menu,
  X,
  Bell,
  UploadCloud,
  Settings,
  UserCircle,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import SystemStatus from "./SystemStatus";

function NavBar({ menuOpen = false, onMenuToggle = () => {} }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { playSong } = useContext(PlayerContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const searchRef = useRef(null);
  const notifRef = useRef(null);
  const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  /* =========================
     SEARCH FROM BACKEND
  ========================= */

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setResults([]);
      setShowResults(false);
      return;
    }

    const delayDebounce = setTimeout(() => {
      fetch(`${API}/api/songs/`)
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.filter(
            (song) =>
              song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
              song.lang.toLowerCase().includes(searchTerm.toLowerCase())
          );

          setResults(filtered);
          setShowResults(true);
        })
        .catch((err) => console.error(err));
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  /* =========================
     CLOSE DROPDOWNS ON OUTSIDE CLICK
  ========================= */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSongClick = (song) => {
    playSong(song);
    setShowResults(false);
    setSearchTerm("");
    setMobileSearchOpen(false);
    navigate("/");
  };

  const searchResultsNode =
    showResults && (
      <div
        className="absolute top-12 left-0 w-full
        max-h-80 overflow-y-auto modern-scroll
        bg-black/75 backdrop-blur-xl
        border border-[rgba(0,255,100,.22)]
        rounded-lg shadow-glow-lg
        animate-slideDown z-50"
      >
        {results.length === 0 ? (
          <div className="p-5 text-center text-sm text-hkf-mute">
            No matching songs found
          </div>
        ) : (
          results.map((song) => (
            <div
              key={song.id}
              onClick={() => handleSongClick(song)}
              className="flex items-center gap-3
              px-4 py-3 hover:bg-hkf-green/15
              border-b border-[rgba(0,255,100,.08)] last:border-b-0
              transition cursor-pointer"
            >
              <img
                src={song.cover_image_url}
                alt={song.title}
                className="w-10 h-10 rounded object-cover border border-[rgba(0,255,100,.15)]"
              />

              <div className="min-w-0">
                <h3 className="font-semibold text-white truncate">
                  {song.title}
                </h3>
                <p className="text-xs text-hkf-mute truncate">
                  {song.artist} · {song.lang}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    );

  const anyOverlayOpen = showResults || mobileSearchOpen || notifOpen;

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 h-14 md:h-16
      glass border-b border-[rgba(0,255,100,.12)]
      px-3 sm:px-4 md:px-6 flex items-center justify-between gap-2 md:gap-4"
    >
      {/* Dark scrim behind any open dropdown/overlay, matches the mobile drawer treatment */}
      {anyOverlayOpen && (
        <div
          className="fixed inset-0 z-0 bg-black/60 backdrop-blur-sm"
          onClick={() => {
            setShowResults(false);
            setMobileSearchOpen(false);
            setNotifOpen(false);
          }}
        />
      )}

      {/* LEFT */}
      <div className="relative z-10 flex items-center gap-1.5 sm:gap-2 shrink-0">
        <button
          onClick={onMenuToggle}
          aria-label="Toggle menu"
          className="lg:hidden text-hkf-sub hover:text-hkf-green transition p-1 -ml-1"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Back / Forward - desktop */}
        <div className="hidden md:flex items-center gap-1">
          <button
            onClick={() => navigate(-1)}
            title="Back"
            className="p-1.5 rounded-full bg-black/40 border border-[rgba(0,255,100,.12)] text-hkf-sub hover:text-hkf-green transition"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => navigate(1)}
            title="Forward"
            className="p-1.5 rounded-full bg-black/40 border border-[rgba(0,255,100,.12)] text-hkf-sub hover:text-hkf-green transition"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer select-none ml-1"
        >
          <span className="font-heading font-extrabold text-white tracking-tight">
            HACKIFY
          </span>
          <span className="term-cursor hidden sm:inline-block" />
        </div>

        <button
          onClick={() => navigate("/")}
          className={`hidden sm:block transition ml-1 ${
            location.pathname === "/"
              ? "text-hkf-green"
              : "text-hkf-mute hover:text-hkf-green"
          }`}
          title="Home"
        >
          <Home size={19} />
        </button>
      </div>

      {/* CENTER SEARCH - desktop/tablet inline */}
      <div className="relative z-10 hidden sm:flex flex-1 justify-center min-w-0">
        <div ref={searchRef} className="relative w-full max-w-lg">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-hkf-green/70 text-sm">
            &gt;
          </span>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => searchTerm && setShowResults(true)}
            placeholder="Search songs, artists or playlists..."
            className="w-full pl-7 pr-4 py-1.5 rounded-md
            bg-black/50 border border-[rgba(0,255,100,.15)] text-white placeholder-hkf-mute
            text-sm focus:outline-none focus:border-hkf-green focus:shadow-glow
            transition duration-200"
          />

          {searchResultsNode}
        </div>
      </div>

      {/* RIGHT */}
      <div className="relative z-10 flex items-center gap-2 sm:gap-3 shrink-0">
        <SystemStatus className="hidden xl:inline-flex" />

        {/* Mobile search toggle */}
        <button
          onClick={() => setMobileSearchOpen((v) => !v)}
          aria-label="Search"
          className="sm:hidden text-hkf-sub hover:text-hkf-green transition"
        >
          <Search size={20} />
        </button>

        {/* Notifications */}
        <div ref={notifRef} className="relative hidden sm:block">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            title="Notifications"
            className="text-hkf-sub hover:text-hkf-green transition"
          >
            <Bell size={19} />
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-9 w-56 bg-black/75 backdrop-blur-xl border border-[rgba(0,255,100,.22)] rounded-lg shadow-glow-lg p-4 text-xs text-hkf-mute animate-slideDown">
              No new notifications
            </div>
          )}
        </div>

        <button
          title="Upload (admin only)"
          className="hidden sm:block text-hkf-sub/50 cursor-not-allowed"
        >
          <UploadCloud size={19} />
        </button>

        <button
          title="Settings (coming soon)"
          className="hidden sm:block text-hkf-sub/50 cursor-not-allowed"
        >
          <Settings size={19} />
        </button>

        <button
          onClick={() => navigate("/login")}
          title="Account"
          className={`transition ${
            location.pathname === "/login"
              ? "text-hkf-green"
              : "text-hkf-sub hover:text-hkf-green"
          }`}
        >
          <UserCircle size={22} />
        </button>

        <button
          onClick={() => navigate("/register")}
          className="border border-hkf-green text-hkf-green px-2.5 sm:px-4 py-1 sm:py-1.5
          rounded-md text-xs sm:text-sm font-medium
          hover:bg-hkf-green hover:text-black
          transition duration-200"
        >
          Sign Up
        </button>
      </div>

      {/* MOBILE SEARCH OVERLAY */}
      {mobileSearchOpen && (
        <div
          ref={searchRef}
          className="sm:hidden absolute top-full left-0 w-full px-3 py-3 z-10
          bg-hkf-bg2 border-b border-[rgba(0,255,100,.15)] shadow-glow"
        >
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-hkf-green/70 text-sm">
              &gt;
            </span>
            <input
              autoFocus
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search songs, artists or playlists..."
              className="w-full pl-7 pr-4 py-2 rounded-md
              bg-black/50 border border-[rgba(0,255,100,.15)] text-white placeholder-hkf-mute
              text-sm focus:outline-none focus:border-hkf-green"
            />
            {searchResultsNode}
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
