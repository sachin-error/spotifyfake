import { useContext, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { HiPlay, HiPause, HiSpeakerWave, HiHeart } from "react-icons/hi2";

function Player() {

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const { currentSong, toggleLike, likedSongs } = useContext(PlayerContext);

  const isLiked = likedSongs.find(
    (song) => song?.title === currentSong?.title
  );

  return (
    <div
      className="fixed bottom-0 left-0 w-full h-24 
      bg-gradient-to-r from-black via-gray-900 to-black 
      border-t border-gray-800 text-white px-6 
      flex items-center justify-between"
    >

      {/* LEFT - Song Info */}
      <div className="flex items-center gap-4 w-1/4">
        {currentSong ? (
          <>
            <img
              src={currentSong.image}
              alt={currentSong.title}
              className="w-14 h-14 rounded object-cover"
            />

            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">
                  {currentSong.title}
                </h4>

                {/* Like Button */}
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
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-white text-black p-2 rounded-full mb-2 hover:scale-105 transition"
        >
          {isPlaying ? <HiPause /> : <HiPlay />}
        </button>

        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
          className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:h-3
          [&::-webkit-slider-thumb]:w-3
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-green-500"
        />

      </div>

      {/* RIGHT - Volume */}
      <div className="flex items-center gap-3 w-1/4 justify-end">
        <HiSpeakerWave className="text-xl text-gray-400" />

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="w-28 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:h-3
          [&::-webkit-slider-thumb]:w-3
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-green-500"
        />
      </div>

    </div>
  );
}

export default Player;