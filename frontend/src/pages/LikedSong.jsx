import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { HiHeart } from "react-icons/hi2";

function LikedSongs() {
  const { likedSongs, toggleLike, playSong } =
    useContext(PlayerContext);

  // Example songs if none liked
  const demoSongs = [
    {
      title: "Arabic Kuthu",
      artist: "Anirudh",
      image: "https://picsum.photos/60?random=31",
    },
    {
      title: "Blinding Lights",
      artist: "The Weeknd",
      image: "https://picsum.photos/60?random=32",
    },
  ];

  const songsToShow =
    likedSongs.length > 0 ? likedSongs : demoSongs;

  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold mb-8">
        ❤️ Liked Songs
      </h1>

      <div className="flex flex-col gap-4">

        {songsToShow.map((song, index) => (
          <div
            key={index}
            className="flex items-center justify-between 
            bg-gray-900 p-4 rounded-lg hover:bg-gray-800 
            transition cursor-pointer"
            onClick={() => playSong(song)}
          >
            {/* LEFT SIDE - Icon + Info */}
            <div className="flex items-center gap-4">
              <img
                src={song.image}
                alt={song.title}
                className="w-14 h-14 rounded object-cover"
              />

              <div>
                <h3 className="font-semibold">
                  {song.title}
                </h3>
                <p className="text-sm text-gray-400">
                  {song.artist}
                </p>
              </div>
            </div>

            {/* RIGHT SIDE - Unlike Button */}
            <HiHeart
              onClick={(e) => {
                e.stopPropagation(); // prevent play
                toggleLike(song);
              }}
              className="text-red-500 text-xl hover:scale-110 transition cursor-pointer"
            />
          </div>
        ))}

      </div>
    </div>
  );
}

export default LikedSongs;