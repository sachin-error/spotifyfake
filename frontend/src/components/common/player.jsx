import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { HiPlay, HiPause, HiSpeakerWave, HiHeart } from "react-icons/hi2";

function Player() {
  const {
    currentSong,
    toggleLike,
    likedSongs,
    togglePlay,
    isPlaying,
    setVolume,
    audioRef,
  } = useContext(PlayerContext);

  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.5);

  const isLiked = likedSongs.find(
    (song) => song?.id === currentSong?.id
  );

<<<<<<< HEAD
  // 🎵 Update Time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
      setProgress(
        audio.duration
          ? (audio.currentTime / audio.duration) * 100
          : 0
      );
    };

    audio.addEventListener("timeupdate", updateTime);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, [audioRef, currentSong]);

  // 🎯 Seek
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
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentSong?.audio_url}
      />

      <div className="fixed bottom-0 left-0 w-full h-24 
        bg-gradient-to-r from-black via-gray-900 to-black 
        border-t border-gray-800 text-white px-6 
        flex items-center justify-between"
      >

        {/* LEFT */}
        <div className="flex items-center gap-4 w-1/4">
          {currentSong ? (
            <>
              <img
                src={currentSong.cover_image_url}
                alt={currentSong.title}
                className="w-14 h-14 rounded object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">
                    {currentSong.title}
                  </h4>
                  <HiHeart
                    onClick={() => toggleLike(currentSong)}
                    className={`text-xl cursor-pointer transition ${
                      isLiked
                        ? "text-red-500 scale-110"
                        : "text-gray-400 hover:text-white"
                    }`}
                  />
                </div>
                <p className="text-sm text-gray-400">
                  {currentSong.artist}
                </p>
              </div>
            </>
          ) : (
            <p className="text-gray-400">No song selected</p>
          )}
        </div>

        {/* CENTER */}
        <div className="flex flex-col items-center w-2/4">

          <button
            onClick={togglePlay}
            className="bg-white text-black p-2 rounded-full mb-2 hover:scale-105 transition"
          >
            {isPlaying ? <HiPause /> : <HiPlay />}
          </button>

          <div className="flex items-center gap-3 w-full">
            <span className="text-xs">{formatTime(currentTime)}</span>

            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="w-full h-1 bg-gray-700 rounded-lg cursor-pointer"
            />

            <span className="text-xs">{formatTime(duration)}</span>
          </div>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 w-1/4 justify-end">
          <HiSpeakerWave className="text-xl text-gray-400" />
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
            className="w-28 h-1 bg-gray-700 rounded-lg cursor-pointer"
          />
        </div>

      </div>
    </>
=======
  // 🎵 Listen for time update
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    audio.addEventListener("timeupdate", updateTime);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, [audioRef, currentSong]);

  // 🎯 Seek when user moves slider
  const handleSeek = (e) => {
    const audio = audioRef.current;
    const newProgress = e.target.value;

    if (!audio || !duration) return;

    const newTime = (newProgress / 100) * duration;
    audio.currentTime = newTime;
    setProgress(newProgress);
  };

  // ⏱ Format time
  const formatTime = (time) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full h-24 
      bg-gradient-to-r from-black via-gray-900 to-black 
      border-t border-gray-800 text-white px-6 
      flex items-center justify-between"
    >

      {/* LEFT */}
      <div className="flex items-center gap-4 w-1/4">
        {currentSong ? (
          <>
            <img
              src={currentSong.cover_image_url}
              alt={currentSong.title}
              className="w-14 h-14 rounded object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">
                  {currentSong.title}
                </h4>
                <HiHeart
                  onClick={() => toggleLike(currentSong)}
                  className={`text-xl cursor-pointer transition ${
                    isLiked
                      ? "text-red-500 scale-110"
                      : "text-gray-400 hover:text-white"
                  }`}
                />
              </div>
              <p className="text-sm text-gray-400">
                {currentSong.artist}
              </p>
            </div>
          </>
        ) : (
          <p className="text-gray-400">No song selected</p>
        )}
      </div>

      {/* CENTER */}
      <div className="flex flex-col items-center w-2/4">

        <button
          onClick={togglePlay}
          className="bg-white text-black p-2 rounded-full mb-2 hover:scale-105 transition"
        >
          {isPlaying ? <HiPause /> : <HiPlay />}
        </button>

        {/* Timeline */}
        <div className="flex items-center gap-3 w-full">
          <span className="text-xs">{formatTime(currentTime)}</span>

          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-700 rounded-lg cursor-pointer"
          />

          <span className="text-xs">{formatTime(duration)}</span>
        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 w-1/4 justify-end">
        <HiSpeakerWave className="text-xl text-gray-400" />
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
          className="w-28 h-1 bg-gray-700 rounded-lg cursor-pointer"
        />
      </div>
    </div>
>>>>>>> 7035c5ed0c64a0f44e80f6aa936de9ae74ecb3bb
  );
}

export default Player;