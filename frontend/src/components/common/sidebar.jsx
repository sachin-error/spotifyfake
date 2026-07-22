import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import NowPlayingCard from "../music/NowPlayingCard";
import TerminalWidget from "./TerminalWidget";
import { ListMusic } from "lucide-react";

function Sidebar() {
  const { songQueue, currentIndex, currentSong, playSong, isPlaying } =
    useContext(PlayerContext);

  const upNext = (songQueue || []).slice(currentIndex + 1, currentIndex + 6);

  const [ping, setPing] = useState(18);
  const [cpu, setCpu] = useState(24);
  const [ram, setRam] = useState(51);

  // Decorative, self-contained jitter for the system readout widgets.
  useEffect(() => {
    const id = setInterval(() => {
      setPing(14 + Math.floor(Math.random() * 12));
      setCpu(18 + Math.floor(Math.random() * 20));
      setRam(45 + Math.floor(Math.random() * 15));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="hidden lg:flex flex-col fixed right-0 top-16 h-[calc(100vh-4rem)] w-72 xl:w-80
      bg-hkf-bg2/60 border-l border-[rgba(0,255,100,.10)] p-4
      overflow-y-auto modern-scroll gap-4 pb-28"
    >
      <NowPlayingCard />

      {/* UP NEXT */}
      <div className="bg-hkf-card/80 border border-[rgba(0,255,100,.12)] rounded-xl p-4">
        <p className="text-[10px] font-heading font-semibold tracking-widest uppercase text-hkf-mute mb-3">
          Up Next
        </p>

        {upNext.length === 0 ? (
          <p className="text-xs text-hkf-mute flex items-center gap-2">
            <ListMusic size={14} /> queue empty
          </p>
        ) : (
          <div className="space-y-2">
            {upNext.map((song) => (
              <div
                key={song.id}
                onClick={() => playSong(song, songQueue)}
                className="flex items-center gap-3 p-1.5 rounded-md hover:bg-hkf-green/5 cursor-pointer transition"
              >
                <img
                  src={song.cover_image_url}
                  alt={song.title}
                  className="w-9 h-9 rounded object-cover border border-[rgba(0,255,100,.12)] shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-white truncate">
                    {song.title}
                  </p>
                  <p className="text-[11px] text-hkf-mute truncate">
                    {song.artist}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <TerminalWidget
        title="network"
        rows={[
          { label: "STATUS", value: "CONNECTED" },
          { label: "PING", value: `${ping} ms` },
          { label: "LINK", value: "ONLINE" },
        ]}
      />

      <TerminalWidget
        title="system"
        rows={[
          { label: "CPU", value: `${cpu}%` },
          { label: "RAM", value: `${ram}%` },
          {
            label: "AUDIO ENGINE",
            value: isPlaying ? "ACTIVE" : "IDLE",
            color: isPlaying ? undefined : "amber",
          },
        ]}
      />

      <div className="mt-auto pt-3 border-t border-[rgba(0,255,100,.08)] flex items-center gap-2">
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
            isPlaying ? "bg-hkf-green animate-pulse" : "bg-hkf-mute"
          }`}
        />
        <p className="text-[11px] text-hkf-mute truncate">
          {currentSong
            ? `Streaming ${currentSong.title}`
            : "Idle — nothing playing"}
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
