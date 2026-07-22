import { useContext, useEffect, useRef, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Heart,
  Volume2,
  ListMusic,
  Laptop2,
  Maximize,
  Minimize,
} from "lucide-react";

function Player() {
  const {
    currentSong,
    toggleLike,
    likedSongs,
    togglePlay,
    isPlaying,
    setVolume,
    audioRef,
    playNext,
    playPrevious,
    songQueue,
    currentIndex,
  } = useContext(PlayerContext);

  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.5);
  const [shuffleActive, setShuffleActive] = useState(false);
  const [repeatActive, setRepeatActive] = useState(false);
  const [queueOpen, setQueueOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const queueRef = useRef(null);
  const isLiked = likedSongs.find((song) => song?.id === currentSong?.id);
  const upNext = (songQueue || []).slice(currentIndex + 1, currentIndex + 6);

  /* =========================
     UPDATE TIME
  ========================= */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };

    audio.addEventListener("timeupdate", updateTime);
    return () => audio.removeEventListener("timeupdate", updateTime);
  }, [audioRef, currentSong]);

  /* Close queue popover on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (queueRef.current && !queueRef.current.contains(e.target)) {
        setQueueOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const newProgress = e.target.value;
    const newTime = (newProgress / 100) * duration;
    audio.currentTime = newTime;
    setProgress(newProgress);
  };

  const formatTime = (time) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      className="fixed bottom-0 left-0 w-full h-16 md:h-24
      glass border-t border-[rgba(0,255,100,.12)] text-white
      px-3 sm:px-4 md:px-6 flex items-center justify-between gap-2 z-40"
    >
      {/* Thin seek bar - mobile only, always visible along the top edge */}
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleSeek}
        className="absolute -top-[3px] left-0 w-full h-[3px] appearance-none bg-hkf-green/15 accent-hkf-green cursor-pointer md:hidden"
      />

      {/* LEFT */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 w-2/5 md:w-1/4 min-w-0">
        {currentSong ? (
          <>
            <img
              src={currentSong.cover_image_url}
              alt={currentSong.title}
              className="w-10 h-10 md:w-14 md:h-14 rounded object-cover border border-[rgba(0,255,100,.15)] shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-sm md:text-base truncate">
                  {currentSong.title}
                </h4>
                <Heart
                  onClick={() => toggleLike(currentSong)}
                  size={17}
                  className={`hidden sm:inline cursor-pointer transition shrink-0 ${
                    isLiked ? "text-red-400 fill-red-400 scale-110" : "text-hkf-mute hover:text-hkf-green"
                  }`}
                />
              </div>
              <p className="text-xs md:text-sm text-hkf-mute truncate">
                {currentSong.artist}
              </p>
            </div>
          </>
        ) : (
          <p className="text-hkf-mute text-sm truncate">No track loaded</p>
        )}
      </div>

      {/* CENTER */}
      <div className="flex flex-col items-center w-2/5 md:w-2/4">
        <div className="flex items-center gap-3 md:gap-5 mb-0 md:mb-2">
          <button
            onClick={() => setShuffleActive((v) => !v)}
            title="Shuffle (coming soon)"
            className={`hidden md:inline transition ${
              shuffleActive ? "text-hkf-green" : "text-hkf-mute hover:text-hkf-sub"
            }`}
          >
            <Shuffle size={16} />
          </button>

          <button
            onClick={playPrevious}
            className="hidden md:inline text-hkf-sub hover:text-hkf-green transition"
          >
            <SkipBack size={20} />
          </button>

          <button
            onClick={togglePlay}
            className="bg-hkf-green text-black p-1.5 md:p-2 rounded-full hover:scale-105 hover:shadow-glow transition"
          >
            {isPlaying ? <Pause size={18} fill="black" /> : <Play size={18} fill="black" className="ml-0.5" />}
          </button>

          <button
            onClick={playNext}
            className="hidden md:inline text-hkf-sub hover:text-hkf-green transition"
          >
            <SkipForward size={20} />
          </button>

          <button
            onClick={() => setRepeatActive((v) => !v)}
            title="Repeat (coming soon)"
            className={`hidden md:inline transition ${
              repeatActive ? "text-hkf-green" : "text-hkf-mute hover:text-hkf-sub"
            }`}
          >
            <Repeat size={16} />
          </button>
        </div>

        {/* Full timeline - desktop only */}
        <div className="hidden md:flex items-center gap-3 w-full">
          <span className="text-xs text-hkf-mute">{formatTime(currentTime)}</span>

          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-full h-1 accent-hkf-green bg-hkf-green/15 rounded-lg cursor-pointer"
          />

          <span className="text-xs text-hkf-mute">{formatTime(duration)}</span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="hidden md:flex items-center gap-3 w-1/4 justify-end relative">
        <Volume2 size={18} className="text-hkf-mute" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            setVolumeState(val);
            setVolume(val);
          }}
          className="w-24 h-1 accent-hkf-green bg-hkf-green/15 rounded-lg cursor-pointer"
        />

        <div ref={queueRef} className="relative">
          <button
            onClick={() => setQueueOpen((v) => !v)}
            title="Queue"
            className={`transition ${queueOpen ? "text-hkf-green" : "text-hkf-mute hover:text-hkf-green"}`}
          >
            <ListMusic size={18} />
          </button>

          {queueOpen && (
            <div className="absolute bottom-10 right-0 w-64 bg-hkf-bg2 border border-[rgba(0,255,100,.15)] rounded-md shadow-glow p-3 animate-slideDown">
              <p className="text-[10px] font-heading font-semibold tracking-widest uppercase text-hkf-mute mb-2">
                Up Next
              </p>
              {upNext.length === 0 ? (
                <p className="text-xs text-hkf-mute">queue empty</p>
              ) : (
                <div className="space-y-2 max-h-56 overflow-y-auto modern-scroll">
                  {upNext.map((song) => (
                    <div key={song.id} className="flex items-center gap-2">
                      <img
                        src={song.cover_image_url}
                        alt={song.title}
                        className="w-8 h-8 rounded object-cover border border-[rgba(0,255,100,.12)] shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs text-white truncate">{song.title}</p>
                        <p className="text-[10px] text-hkf-mute truncate">{song.artist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <button
          title="Single device (soon)"
          className="text-hkf-mute/50 cursor-not-allowed"
        >
          <Laptop2 size={18} />
        </button>

        <button
          onClick={toggleFullscreen}
          title="Fullscreen"
          className="text-hkf-mute hover:text-hkf-green transition"
        >
          {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </button>
      </div>

      {/* Mobile-only like button */}
      <button
        onClick={() => currentSong && toggleLike(currentSong)}
        className="sm:hidden shrink-0"
        aria-label="Like"
      >
        <Heart
          size={19}
          className={`transition ${
            isLiked ? "text-red-400 fill-red-400 scale-110" : "text-hkf-mute"
          }`}
        />
      </button>
    </div>
  );
}

export default Player;
