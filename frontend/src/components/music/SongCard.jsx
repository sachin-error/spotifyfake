import { useContext, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { HiHeart } from "react-icons/hi2";

function SongCard({ song }) {
  const { playSong } = useContext(PlayerContext);
  const [liked, setLiked] = useState(false);

  const handleLike = (e) => {
    e.stopPropagation(); // Prevent card click (play)
    setLiked(!liked);
  };

  return (
    <div
      onClick={() => playSong(song)}
      className="bg-gray-900 p-4 rounded-lg w-44 hover:bg-gray-800 
      transition cursor-pointer group relative"
    >
      {/* Song Image */}
      <div className="relative">
        <img
          src={song.image}
          alt={song.title}
          className="w-full h-36 object-cover rounded-md"
        />

        {/* Hover Play Button */}
        <button
          className="absolute bottom-2 right-2 bg-green-500 
          p-2 rounded-full opacity-0 group-hover:opacity-100 
          transition"
        >
          ▶
        </button>
      </div>

      {/* Like Button */}
      <HiHeart
        onClick={handleLike}
        className={`absolute top-3 right-3 text-xl transition ${
          liked
            ? "text-red-500 scale-110"
            : "text-gray-400 hover:text-white"
        }`}
      />

      {/* Song Info */}
      <h3 className="mt-3 font-semibold text-sm text-white">
        {song.title}
      </h3>
      <p className="text-gray-400 text-xs">
        {song.artist}
      </p>
    </div>
  );
}

export default SongCard;