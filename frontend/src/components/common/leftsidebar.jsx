import { useContext } from "react";
import {
  Home,
  Heart,
  History,
  Mic2,
  Disc3,
  ListMusic,
  Plus,
  Star,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { PlayerContext } from "../../context/PlayerContext";
import SidebarItem from "./SidebarItem";

function LeftSidebar({ variant = "desktop", onNavigate = () => {} }) {
  const { playlists } = useContext(PlayerContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isMobile = variant === "mobile";

  const go = (path) => {
    navigate(path);
    onNavigate();
  };

  return (
    <div
      className={
        isMobile
          ? "w-full p-4"
          : "hidden lg:flex flex-col fixed left-0 top-14 md:top-16 h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4rem)] w-56 xl:w-60 \
          bg-hkf-bg2/60 border-r border-[rgba(0,255,100,.10)] p-4 \
          overflow-y-auto modern-scroll"
      }
    >
      <p className="text-[11px] font-heading font-semibold tracking-widest uppercase text-hkf-mute mb-3 px-1">
        Your Library
      </p>

      <div className="space-y-1 mb-4">
        <SidebarItem
          icon={Home}
          label="Home"
          active={location.pathname === "/"}
          onClick={() => go("/")}
        />
        <SidebarItem
          icon={Heart}
          label="Liked Songs"
          active={location.pathname === "/liked"}
          onClick={() => go("/liked")}
        />
        <SidebarItem
          icon={History}
          label="Recently Played"
          onClick={() => go("/")}
        />
        <SidebarItem icon={Mic2} label="Artists" disabled soon />
        <SidebarItem icon={Disc3} label="Albums" disabled soon />
      </div>

      <div className="border-t border-[rgba(0,255,100,.10)] my-3" />

      <div className="flex items-center justify-between px-1 mb-2">
        <p className="text-[11px] font-heading font-semibold tracking-widest uppercase text-hkf-mute">
          Playlists
        </p>
        <button
          onClick={() => go("/playlists")}
          className="p-1 rounded border border-[rgba(0,255,100,.15)] hover:bg-hkf-green/10 transition"
          aria-label="Manage playlists"
          title="Manage playlists"
        >
          <Plus size={13} className="text-hkf-green" />
        </button>
      </div>

      <div className="space-y-1 mb-4">
        {playlists.length === 0 ? (
          <p className="text-xs text-hkf-mute px-3">No playlists yet</p>
        ) : (
          playlists.map((pl) => (
            <SidebarItem
              key={pl.id}
              icon={ListMusic}
              label={pl.name}
              active={location.pathname === `/playlists/${pl.id}`}
              onClick={() => go(`/playlists/${pl.id}`)}
            />
          ))
        )}
      </div>

      <div className="border-t border-[rgba(0,255,100,.10)] my-3" />

      <div className="space-y-1">
        <SidebarItem
          icon={Star}
          label="Favorites"
          active={location.pathname === "/liked"}
          onClick={() => go("/liked")}
        />
      </div>
    </div>
  );
}

export default LeftSidebar;
