import { useParams } from "react-router-dom";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import songs from "../data/songs";

function Playlist() {
  const tamilSongs = songs.filter(song => song.lang === "tamil");
  const { id } = useParams();
  const { playlists, playSong } = useContext(PlayerContext);

  const playlist = playlists.find(
    (playlist) => playlist.id === Number(id)
  );

  if (!playlist) {
    return <p className="text-white p-6">Playlist not found</p>;
  }

  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold mb-8">
        🎵 {playlist.name}
      </h1>

      <div className="flex flex-col gap-4">
        {playlist.songs.map((song, index) => (
          <div
            key={index}
            onClick={() => playSong(song)}
            className="flex items-center gap-4 
            bg-gray-900 p-4 rounded-lg 
            hover:bg-gray-800 cursor-pointer transition"
          >
            <img
              src={song.image}
              alt={song.title}
              className="w-14 h-14 rounded object-cover"
            />

            <div>
              <h3 className="font-semibold">{song.title}</h3>
              <p className="text-sm text-gray-400">
                {song.artist}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Playlist;