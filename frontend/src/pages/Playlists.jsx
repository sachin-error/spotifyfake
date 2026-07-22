import { useContext, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, ListMusic } from "lucide-react";

function Playlists() {
  const { playlists, createPlaylist, deletePlaylist } =
    useContext(PlayerContext);

  const navigate = useNavigate();
  const [playlistName, setPlaylistName] = useState("");

  const handleCreate = () => {
    if (!playlistName.trim()) return;
    createPlaylist(playlistName);
    setPlaylistName("");
  };

  return (
    <div className="text-white min-h-screen px-4 sm:px-6 md:px-10 py-6 md:py-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-8 md:mb-10 tracking-tight">
        Your Playlists
      </h1>

      <div className="flex items-center gap-3 sm:gap-4 mb-10 md:mb-12">
        <div className="relative w-full max-w-xs sm:w-80">
          <input
            type="text"
            placeholder="New playlist name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            className="w-full bg-black/50 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full
            outline-none border border-[rgba(0,255,100,.15)] text-white
            placeholder-hkf-mute focus:border-hkf-green transition"
          />
        </div>

        <button
          onClick={handleCreate}
          className="bg-hkf-green p-2.5 sm:p-3 rounded-full
          hover:scale-110 transition shadow-glow shrink-0"
        >
          <Plus size={18} className="text-black" />
        </button>
      </div>

      {playlists.length === 0 ? (
        <p className="text-hkf-mute text-sm">No playlists yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-hkf-card/70 border border-[rgba(0,255,100,.10)] rounded-xl p-5 sm:p-6
              hover:border-hkf-green/50 hover:shadow-glow transition
              relative group cursor-pointer"
              onClick={() => navigate(`/playlists/${playlist.id}`)}
            >
              <ListMusic size={18} className="text-hkf-green mb-3" />

              <h3 className="text-base sm:text-lg font-semibold mb-1 truncate pr-6">
                {playlist.name}
              </h3>

              <p className="text-xs text-hkf-mute">
                {playlist.songs.length} track(s)
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm("Delete this playlist?")) {
                    deletePlaylist(playlist.id);
                  }
                }}
                className="absolute top-4 right-4
                opacity-100 sm:opacity-0 sm:group-hover:opacity-100
                transition"
              >
                <Trash2 size={17} className="text-red-400 hover:scale-110 transition" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Playlists;
