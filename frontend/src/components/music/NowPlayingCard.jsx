import { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { Heart, Radio } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GlowCard from "../common/GlowCard";

const MotionDiv = motion.div;

function NowPlayingCard() {
  const { currentSong, toggleLike, likedSongs, isPlaying } =
    useContext(PlayerContext);

  const isLiked = likedSongs.find((s) => s?.id === currentSong?.id);

  return (
    <GlowCard hover={false} className="p-4">
      <p className="text-[11px] font-heading font-semibold tracking-widest uppercase text-hkf-mute mb-3">
        Now Playing
      </p>

      <AnimatePresence mode="wait">
        {currentSong ? (
          <MotionDiv
            key={currentSong.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="relative rounded-lg overflow-hidden mb-3">
              <img
                src={currentSong.cover_image_url}
                alt={currentSong.title}
                className="w-full aspect-square object-cover object-top border border-[rgba(0,255,100,.12)]"
              />
              {isPlaying && (
                <span className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 px-2 py-1 rounded-full text-[10px] text-hkf-green">
                  <Radio size={11} className="animate-pulse" /> LIVE
                </span>
              )}
            </div>

            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-semibold text-white truncate">
                  {currentSong.title}
                </h3>
                <p className="text-xs text-hkf-mute truncate">
                  {currentSong.artist}
                </p>
              </div>

              <Heart
                onClick={() => toggleLike(currentSong)}
                size={18}
                className={`shrink-0 mt-0.5 cursor-pointer transition ${
                  isLiked ? "text-red-400 fill-red-400" : "text-hkf-sub hover:text-hkf-green"
                }`}
              />
            </div>
          </MotionDiv>
        ) : (
          <div className="text-center py-8">
            <p className="text-hkf-mute text-sm">Nothing playing</p>
            <p className="text-hkf-mute/60 text-xs mt-1">Pick a track to start listening</p>
          </div>
        )}
      </AnimatePresence>
    </GlowCard>
  );
}

export default NowPlayingCard;
