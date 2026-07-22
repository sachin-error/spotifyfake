function TerminalWindow({ path = "guest@hackify:~$", children, className = "" }) {
  return (
    <div
      className={`w-full bg-hkf-card/90 border border-[rgba(0,255,100,.14)] rounded-xl shadow-glow overflow-hidden ${className}`}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-black/50 border-b border-[rgba(0,255,100,.10)]">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-hkf-green/70" />
        <span className="ml-3 text-xs sm:text-sm text-hkf-mute truncate">
          {path}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 sm:p-8">{children}</div>
    </div>
  );
}

export default TerminalWindow;
